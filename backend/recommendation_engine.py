from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re
from difflib import SequenceMatcher

# ----------------------
# Load Data & Prepare Engine
# ----------------------
internships = pd.read_csv("internships.csv")

# Preprocessing functions
def clean_text(x):
    if pd.isna(x):
        return ""
    return str(x).lower().replace(",", " ").replace("/", " ").replace(";", " ")

def tokenize(text):
    return [t.strip() for t in re.split(r"[\s,;/]+", clean_text(text)) if t.strip()]

internships['job_text'] = (
    internships['skills_required'].fillna("") + " " +
    internships['sector'].fillna("") + " " +
    internships['title'].fillna("") + " " +
    internships['eligibility'].fillna("")
).apply(clean_text)

vectorizer = TfidfVectorizer()
intern_vecs = vectorizer.fit_transform(internships['job_text'])

# Fuzzy skill match
def fuzzy_match(skill_list1, skill_list2, threshold=0.6):
    matches = 0
    for s1 in skill_list1:
        for s2 in skill_list2:
            ratio = SequenceMatcher(None, s1, s2).ratio()
            if ratio >= threshold:
                matches += 1
                break
    total = len(set(skill_list1 + skill_list2))
    return matches / total if total > 0 else 0.0

# Recommendation function
def recommend_pm_internships(candidate_data, top_n=5):
    cand_skills = tokenize(candidate_data['skills'])
    cand_edu = tokenize(candidate_data['education'])
    cand_interests = tokenize(candidate_data['interests'])
    cand_loc = clean_text(candidate_data['location'])
    
    # Candidate vector
    profile_text = " ".join([candidate_data.get('skills', ''), candidate_data.get('education',''), candidate_data.get('interests','')])
    cand_vec = vectorizer.transform([clean_text(profile_text)])
    job_sims = cosine_similarity(cand_vec, intern_vecs).flatten()
    
    internships['skill_overlap'] = internships['skills_required'].fillna("").apply(
        lambda x: fuzzy_match(cand_skills, tokenize(x))
    )
    internships['edu_flag'] = internships['eligibility'].fillna("").apply(
        lambda x: 1 if any(word in tokenize(x) for word in cand_edu) else 0
    )
    internships['sector_flag'] = internships['sector'].fillna("").apply(
        lambda x: 1 if any(ci in tokenize(x) for ci in cand_interests) else 0
    )
    internships['loc_flag'] = internships['location'].fillna("").apply(
        lambda x: 1 if cand_loc and cand_loc in clean_text(x) else 0
    )
    internships['job_sim'] = job_sims
    internships['score'] = (
        0.5 * job_sims + 0.4 * internships['skill_overlap'] +
        0.2 * internships['edu_flag'] + 0.15 * internships['sector_flag'] +
        0.05 * internships['loc_flag']
    )
    
    # Fallback to always return top_n
    recs = internships[internships['skill_overlap'] > 0]
    if recs.empty:
        recs = internships.copy()
    recs = recs.sort_values('score', ascending=False).head(top_n).copy()
    
    # Dynamic relevance label with skill-awareness
    scores = recs['score']
    high_threshold = np.percentile(scores, 75)
    medium_threshold = np.percentile(scores, 40)
    
    def relevance_label(row):
        if row['skill_overlap'] >= 0.1:
            if row['score'] >= high_threshold:
                return "High"
            elif row['score'] >= medium_threshold:
                return "Medium"
            else:
                return "Low"
        else:
            if row['score'] >= high_threshold:
                return "Medium"
            else:
                return "Low"
    recs['relevance'] = recs.apply(relevance_label, axis=1)
    
    # Explanations
    explanations = []
    for _, row in recs.iterrows():
        parts = []
        if row['skill_overlap'] >= 0.3:
            parts.append("Skills match")
        elif row['skill_overlap'] > 0:
            parts.append("Partial skills match")
        if row['edu_flag'] == 1:
            parts.append("Education matches")
        if row['sector_flag'] == 1:
            parts.append("Sector aligns")
        if row['loc_flag'] == 1:
            parts.append(f"Location: {candidate_data['location']}")
        if not parts:
            parts.append("Recommended based on overall similarity")
        explanations.append("; ".join(parts))
    recs['reason'] = explanations
    
    return recs[[
        'id', 'title', 'location', 'sector', 'skills_required',
        'eligibility', 'score', 'relevance', 'reason'
    ]].to_dict(orient='records')

# ----------------------
# FastAPI setup
# ----------------------
app = FastAPI(title="PM Internship Recommendation Engine", version="1.0.0")

# Add CORS middleware to allow frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],  # Explicitly allow OPTIONS
    allow_headers=["*"],
)

class Candidate(BaseModel):
    skills: str
    education: str
    interests: str
    location: str

@app.get("/")
def read_root():
    return {"message": "PM Internship Recommendation Engine API", "version": "1.0.0", "status": "running"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "total_internships": len(internships), "cors_enabled": True}

@app.options("/recommend")
def recommend_options():
    return {"message": "CORS preflight"}

@app.post("/recommend")
def recommend(candidate: Candidate):
    try:
        recs = recommend_pm_internships(candidate.dict(), top_n=5)
        return {
            "status": "success",
            "recommendations": recs,
            "total_found": len(recs),
            "candidate_profile": candidate.dict()
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e),
            "recommendations": []
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
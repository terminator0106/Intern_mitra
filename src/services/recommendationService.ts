// API service for internship recommendations
const API_BASE_URL = 'http://localhost:8000';

export interface CandidateData {
  skills: string;
  education: string;
  interests: string;
  location: string;
}

export interface Recommendation {
  id: number;
  title: string;
  location: string;
  sector: string;
  skills_required: string;
  eligibility: string;
  score: number;
  relevance: string;
  reason: string;
}

export interface RecommendationResponse {
  status: string;
  recommendations: Recommendation[];
  total_found: number;
  candidate_profile: CandidateData;
}

// API service class
class RecommendationService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  // Test if API is available
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      return response.ok;
    } catch (error) {
      console.error('API health check failed:', error);
      return false;
    }
  }

  // Get recommendations from the API
  async getRecommendations(candidateData: CandidateData): Promise<RecommendationResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/recommend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(candidateData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status !== 'success') {
        throw new Error(`API error: ${data.message || 'Unknown error'}`);
      }

      return data;
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      throw error;
    }
  }

  // Transform frontend form data to API format
  transformFormData(formData: {
    name: string;
    education: string;
    location: string;
    skills: string[];
    sectors: string[];
  }): CandidateData {
    return {
      skills: formData.skills.join(', '),
      education: formData.education,
      interests: formData.sectors.join(', '),
      location: formData.location,
    };
  }
}

// Export singleton instance
export const recommendationService = new RecommendationService();

// Utility function to format relevance colors
export const getRelevanceColor = (relevance: string): string => {
  switch (relevance.toLowerCase()) {
    case 'high':
      return 'bg-green-100 text-green-700';
    case 'medium':
      return 'bg-blue-100 text-blue-700';
    case 'low':
      return 'bg-amber-100 text-amber-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

// Utility function to get match score percentage
export const getMatchPercentage = (score: number): number => {
  return Math.round(score * 100);
};
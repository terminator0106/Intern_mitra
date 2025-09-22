import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { useEffect, useState } from "react";
import { useToast } from "../hooks/use-toast";
import {
    MapPin,
    Building2,
    Calendar,
    ExternalLink,
    Target,
    Star,
    Clock,
    Users,
    ArrowLeft,
    Heart,
    Bookmark,
    TrendingUp,
    Award,
    IndianRupee,
    GraduationCap,
    Loader2
} from "lucide-react";

interface FormData {
    name: string;
    education: string;
    location: string;
    skills: string[];
    sectors: string[];
}

interface RecommendationResultsProps {
    userData: FormData;
    onBack: () => void;
    onStartOver: () => void;
}

export const RecommendationResults = ({ userData, onBack, onStartOver }: RecommendationResultsProps) => {
    const [recommendations, setRecommendations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [usingApiData, setUsingApiData] = useState(false);
    const { toast } = useToast();

    // Mock fallback data
    const mockInternships = [
        {
            id: 1,
            title: "Software Development Intern",
            sector: "Information Technology",
            location: "Bangalore, Karnataka", 
            skills_required: "React, Node.js, JavaScript",
            eligibility: "BCA, B.Tech",
            score: 0.95,
            relevance: "High",
            reason: "Skills match perfectly with your profile"
        },
        {
            id: 2,
            title: "Digital Marketing Intern",
            sector: "Marketing",
            location: "Mumbai, Maharashtra",
            skills_required: "Social Media, Content Writing",
            eligibility: "MBA, BBA", 
            score: 0.88,
            relevance: "High",
            reason: "Great match for your interests"
        },
        {
            id: 3,
            title: "Data Science Intern", 
            sector: "Analytics",
            location: "Hyderabad, Telangana",
            skills_required: "Python, Machine Learning",
            eligibility: "B.Tech, M.Tech",
            score: 0.82,
            relevance: "Medium", 
            reason: "Good technical fit"
        }
    ];

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                setLoading(true);

                // Transform form data to API format
                const apiData = {
                    skills: userData.skills.join(', '),
                    education: userData.education,
                    interests: userData.sectors.join(', '),
                    location: userData.location,
                };

                const response = await fetch('http://localhost:8000/recommend', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(apiData),
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.status === 'success' && data.recommendations) {
                        setRecommendations(data.recommendations);
                        setUsingApiData(true);
                        toast({
                            title: "🎯 Real Recommendations Loaded!",
                            description: `Found ${data.total_found} matches from your CSV dataset.`,
                        });
                    } else {
                        throw new Error('Invalid API response');
                    }
                } else {
                    throw new Error(`API Error: ${response.status}`);
                }
            } catch (err) {
                console.error('API Error:', err);
                setRecommendations(mockInternships);
                setUsingApiData(false);
                toast({
                    title: "⚠️ Using Sample Data",
                    description: "Couldn't connect to your recommendation API. Make sure it's running on port 8000.",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        // Add delay to show loading
        setTimeout(fetchRecommendations, 1500);
    }, [userData, toast]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 pt-24 pb-16 px-4 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-sky-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-slate-800 mb-2">Finding Your Perfect Matches</h2>
                    <p className="text-slate-600">Analyzing {userData.name}'s profile with AI...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 pt-24 pb-16 px-4">
            <div className="container mx-auto max-w-7xl">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <div className="flex items-center justify-between mb-8">
                        <Button
                            onClick={onBack}
                            variant="outline"
                            className="bg-white/60 hover:bg-white/80 border-white/40 text-slate-700 rounded-xl backdrop-blur-sm"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Profile
                        </Button>

                        <Button
                            onClick={onStartOver}
                            variant="ghost"
                            className="text-slate-600 hover:text-slate-800 hover:bg-white/40 rounded-xl"
                        >
                            Start Over
                        </Button>
                    </div>

                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md rounded-full px-6 py-3 mb-6 border border-white/30 shadow-lg"
                        >
                            <Target className="w-4 h-4 text-green-600" />
                            <span className="text-slate-700 text-sm font-medium">
                                {usingApiData ? "🔥 Live Data from Your CSV" : "📝 Sample Data"}
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-3xl md:text-5xl font-bold text-slate-800 mb-4"
                        >
                            Perfect Matches for{" "}
                            <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                                {userData.name}
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-lg text-slate-600 max-w-2xl mx-auto"
                        >
                            {usingApiData 
                                ? `AI analyzed your profile and found ${recommendations.length} personalized internship matches from your dataset`
                                : `Showing ${recommendations.length} sample internship opportunities (connect your API for real data)`
                            }
                        </motion.p>
                    </div>
                </motion.div>

                {/* Internship Cards Grid */}
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                    {recommendations.map((internship, index) => (
                        <motion.div
                            key={internship.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + (index * 0.1), duration: 0.6 }}
                        >
                            <Card className="group bg-white/80 backdrop-blur-md border border-white/40 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden h-full hover:-translate-y-1">
                                <CardHeader className="pb-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3 flex-1">
                                            <div className="w-14 h-14 bg-gradient-to-br from-sky-100 to-blue-100 rounded-2xl flex items-center justify-center text-2xl shadow-md">
                                                💼
                                            </div>
                                            <div className="flex-1">
                                                <CardTitle className="text-lg font-semibold text-slate-800 group-hover:text-sky-700 transition-colors">
                                                    {internship.title}
                                                </CardTitle>
                                                <p className="text-sm text-slate-600 flex items-center gap-1">
                                                    <Building2 className="w-3 h-3" />
                                                    {internship.sector}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="text-slate-400 hover:text-red-500 h-8 w-8 p-0"
                                            >
                                                <Heart className="w-4 h-4" />
                                            </Button>
                                            <Badge
                                                className={`text-xs font-medium px-3 py-1 rounded-full ${
                                                    internship.relevance === 'High' ? 'bg-green-100 text-green-700' :
                                                    internship.relevance === 'Medium' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-amber-100 text-amber-700'
                                                }`}
                                            >
                                                {Math.round((internship.score || 0.8) * 100)}% Match
                                            </Badge>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="pt-0 flex-1 flex flex-col">
                                    <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-1">
                                        {internship.reason || "Recommended based on your profile"}
                                    </p>

                                    {/* Key Info */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <MapPin className="w-4 h-4 text-slate-400" />
                                            <span>{internship.location}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <GraduationCap className="w-4 h-4 text-green-500" />
                                            <span className="font-medium text-green-700">{internship.eligibility}</span>
                                            <Badge variant="outline" className="text-xs ml-2">
                                                {internship.relevance || "Medium"} Match
                                            </Badge>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="text-slate-700 font-medium">{((internship.score || 0.8) * 5).toFixed(1)}</span>
                                            <span className="text-slate-500">•</span>
                                            <Users className="w-4 h-4 text-slate-400" />
                                            <span className="text-slate-600">AI Score</span>
                                        </div>
                                    </div>

                                    {/* Skills Tags */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {(internship.skills_required || "General Skills").split(',').slice(0, 3).map((skill: string, idx: number) => (
                                            <Badge
                                                key={idx}
                                                variant="secondary"
                                                className="text-xs bg-sky-100 text-sky-700 hover:bg-sky-200"
                                            >
                                                {skill.trim()}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 mt-auto">
                                        <Button
                                            className="flex-1 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                                        >
                                            View Details
                                            <ExternalLink className="w-4 h-4 ml-2" />
                                        </Button>

                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="bg-white/60 hover:bg-white/80 border-white/40 text-slate-700 rounded-xl backdrop-blur-sm"
                                        >
                                            <Bookmark className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="text-center"
                >
                    <div className="bg-white/70 backdrop-blur-md border border-white/30 shadow-lg rounded-2xl p-8 max-w-2xl mx-auto">
                        <h3 className="text-xl font-semibold text-slate-800 mb-2">
                            {usingApiData ? "🎯 These are real recommendations!" : "🔧 Connect Your API"}
                        </h3>
                        <p className="text-slate-600 mb-6">
                            {usingApiData 
                                ? "Powered by your CSV data and AI matching algorithm"
                                : "Start your FastAPI server (python recommendation_engine.py) to see real recommendations"
                            }
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                onClick={onBack}
                                className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-xl px-8"
                            >
                                <GraduationCap className="w-4 h-4 mr-2" />
                                Update Profile
                            </Button>

                            <Button
                                variant="outline"
                                className="bg-white/60 hover:bg-white/80 border-white/40 text-slate-700 rounded-xl px-8 backdrop-blur-sm"
                                onClick={() => window.location.reload()}
                            >
                                <TrendingUp className="w-4 h-4 mr-2" />
                                Refresh Results
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
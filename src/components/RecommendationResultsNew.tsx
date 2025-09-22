import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
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
    GraduationCap
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

// Enhanced mock internship data
const mockInternships = [
    {
        id: 1,
        title: "Software Development Intern",
        company: "TechCorp India",
        logo: "💻",
        description: "Build innovative web applications using modern technologies like React, Node.js, and cloud platforms",
        location: "Bangalore, Karnataka",
        sector: "Information Technology",
        duration: "3 months",
        stipend: "₹15,000/month",
        matchScore: 95,
        skills: ["React", "Node.js", "JavaScript"],
        requirements: "Basic programming knowledge",
        applicants: 120,
        rating: 4.8,
        type: "Paid",
        level: "Beginner Friendly"
    },
    {
        id: 2,
        title: "Digital Marketing Intern",
        company: "Creative Solutions",
        logo: "🎨",
        description: "Learn digital marketing strategies, content creation, and social media management",
        location: "Mumbai, Maharashtra",
        sector: "Marketing",
        duration: "2 months",
        stipend: "₹12,000/month",
        matchScore: 88,
        skills: ["Social Media", "Content Writing", "Analytics"],
        requirements: "Basic marketing knowledge",
        applicants: 85,
        rating: 4.6,
        type: "Paid",
        level: "Entry Level"
    },
    {
        id: 3,
        title: "Data Science Intern",
        company: "DataTech Labs",
        logo: "📊",
        description: "Work on real-world data projects using Python, machine learning, and analytics tools",
        location: "Hyderabad, Telangana",
        sector: "Data Science",
        duration: "4 months",
        stipend: "₹18,000/month",
        matchScore: 82,
        skills: ["Python", "Machine Learning", "SQL"],
        requirements: "Statistics background preferred",
        applicants: 200,
        rating: 4.9,
        type: "Paid",
        level: "Intermediate"
    },
    {
        id: 4,
        title: "UI/UX Design Intern",
        company: "Design Studio Pro",
        logo: "🎭",
        description: "Create beautiful and user-friendly interfaces for mobile and web applications",
        location: "Delhi, NCR",
        sector: "Design",
        duration: "3 months",
        stipend: "₹14,000/month",
        matchScore: 79,
        skills: ["Figma", "Adobe XD", "User Research"],
        requirements: "Design portfolio required",
        applicants: 95,
        rating: 4.7,
        type: "Paid",
        level: "Creative"
    },
    {
        id: 5,
        title: "Content Writing Intern",
        company: "Media House",
        logo: "✍️",
        description: "Write engaging content for websites, blogs, and social media platforms",
        location: "Remote",
        sector: "Content",
        duration: "2 months",
        stipend: "₹10,000/month",
        matchScore: 76,
        skills: ["Writing", "SEO", "Content Strategy"],
        requirements: "Strong writing samples",
        applicants: 150,
        rating: 4.5,
        type: "Paid",
        level: "Flexible"
    }
];

export const RecommendationResults = ({ userData, onBack, onStartOver }: RecommendationResultsProps) => {
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
                            <span className="text-slate-700 text-sm font-medium">Personalized for You</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-3xl md:text-5xl font-bold text-slate-800 mb-4"
                        >
                            Your Perfect{" "}
                            <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                                Matches
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-lg text-slate-600 max-w-2xl mx-auto"
                        >
                            We found {mockInternships.length} amazing internship opportunities tailored to your profile and interests
                        </motion.p>
                    </div>
                </motion.div>

                {/* Internship Cards Grid */}
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                    {mockInternships.map((internship, index) => (
                        <motion.div
                            key={internship.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + (index * 0.1), duration: 0.6 }}
                        >
                            <Card className="group bg-white/80 backdrop-blur-md border border-white/40 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden h-full hover:-translate-y-1">
                                <CardHeader className="pb-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-14 h-14 bg-gradient-to-br from-sky-100 to-blue-100 rounded-2xl flex items-center justify-center text-2xl shadow-md">
                                                {internship.logo}
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg font-semibold text-slate-800 group-hover:text-sky-700 transition-colors">
                                                    {internship.title}
                                                </CardTitle>
                                                <p className="text-sm text-slate-600 flex items-center gap-1">
                                                    <Building2 className="w-3 h-3" />
                                                    {internship.company}
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
                                                className={`text-xs font-medium px-3 py-1 rounded-full ${internship.matchScore >= 90
                                                        ? 'bg-green-100 text-green-700'
                                                        : internship.matchScore >= 80
                                                            ? 'bg-blue-100 text-blue-700'
                                                            : 'bg-amber-100 text-amber-700'
                                                    }`}
                                            >
                                                {internship.matchScore}% Match
                                            </Badge>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="pt-0 flex-1 flex flex-col">
                                    <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-1">
                                        {internship.description}
                                    </p>

                                    {/* Key Info */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <MapPin className="w-4 h-4 text-slate-400" />
                                            <span>{internship.location}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <IndianRupee className="w-4 h-4 text-green-500" />
                                            <span className="font-medium text-green-700">{internship.stipend}</span>
                                            <Badge variant="outline" className="text-xs ml-2">
                                                {internship.type}
                                            </Badge>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Calendar className="w-4 h-4 text-slate-400" />
                                            <span>{internship.duration}</span>
                                            <Clock className="w-4 h-4 text-slate-400 ml-2" />
                                            <span>{internship.level}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="text-slate-700 font-medium">{internship.rating}</span>
                                            <span className="text-slate-500">•</span>
                                            <Users className="w-4 h-4 text-slate-400" />
                                            <span className="text-slate-600">{internship.applicants} applied</span>
                                        </div>
                                    </div>

                                    {/* Skills Tags */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {internship.skills.slice(0, 3).map((skill) => (
                                            <Badge
                                                key={skill}
                                                variant="secondary"
                                                className="text-xs bg-sky-100 text-sky-700 hover:bg-sky-200"
                                            >
                                                {skill}
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
                        <h3 className="text-xl font-semibold text-slate-800 mb-2">Want More Options?</h3>
                        <p className="text-slate-600 mb-6">
                            Refine your profile or explore different sectors to discover even more opportunities
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
                            >
                                <TrendingUp className="w-4 h-4 mr-2" />
                                Explore All Sectors
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
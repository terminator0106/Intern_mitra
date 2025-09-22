import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card } from "./ui/card";
import { ArrowRight, GraduationCap, MapPin, Briefcase, Heart, Search, Sparkles } from "lucide-react";
import { useState } from "react";

interface HeroSectionProps {
    onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
    const [formData, setFormData] = useState({
        education: "",
        location: "",
        interests: "",
        skills: ""
    });

    const handleQuickStart = () => {
        onGetStarted();
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 animate-float">
                    <div className="w-20 h-20 bg-gradient-to-br from-sky-200/30 to-blue-300/30 rounded-3xl backdrop-blur-sm flex items-center justify-center">
                        <GraduationCap className="w-10 h-10 text-sky-600" />
                    </div>
                </div>

                <div className="absolute top-1/3 right-1/4 animate-float" style={{ animationDelay: "2s" }}>
                    <div className="w-16 h-16 bg-gradient-to-br from-green-200/30 to-emerald-300/30 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                        <Briefcase className="w-8 h-8 text-green-600" />
                    </div>
                </div>

                <div className="absolute bottom-1/3 left-1/6 animate-float" style={{ animationDelay: "4s" }}>
                    <div className="w-18 h-18 bg-gradient-to-br from-purple-200/30 to-indigo-300/30 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                        <Heart className="w-9 h-9 text-purple-600" />
                    </div>
                </div>

                {/* Floating Particles */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-sky-300/40 rounded-full"
                        style={{
                            left: `${20 + (i * 15)}%`,
                            top: `${30 + (i * 10)}%`,
                        }}
                        animate={{
                            y: [-20, 20, -20],
                            opacity: [0.4, 0.8, 0.4],
                        }}
                        transition={{
                            duration: 3,
                            delay: i * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    {/* Status Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/30 shadow-lg"
                    >
                        <Sparkles className="w-4 h-4 text-green-600" />
                        <span className="text-slate-700 text-sm font-medium">AI-Powered • Trusted by 10,000+ Students</span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight"
                    >
                        Find the Right{" "}
                        <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                            Internship
                        </span>{" "}
                        for You
                    </motion.h1>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-lg md:text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed"
                    >
                        Discover personalized internship opportunities that match your skills, interests, and career goals.
                        Start your journey toward a successful career today.
                    </motion.p>
                </motion.div>

                {/* Quick Start Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="max-w-2xl mx-auto"
                >
                    <Card className="bg-white/70 backdrop-blur-md border border-white/30 shadow-2xl p-8 rounded-3xl">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-semibold text-slate-800 mb-2">Quick Start</h3>
                            <p className="text-slate-600">Tell us a little about yourself to get personalized recommendations</p>
                        </div>

                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Education Level */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        <GraduationCap className="w-4 h-4 inline mr-2" />
                                        Education Level
                                    </label>
                                    <Select onValueChange={(value) => setFormData({ ...formData, education: value })}>
                                        <SelectTrigger className="bg-white/80 border-white/40 rounded-xl h-12">
                                            <SelectValue placeholder="Select your level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="high-school">High School</SelectItem>
                                            <SelectItem value="undergraduate">Undergraduate</SelectItem>
                                            <SelectItem value="graduate">Graduate</SelectItem>
                                            <SelectItem value="postgraduate">Postgraduate</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Location Preference */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        <MapPin className="w-4 h-4 inline mr-2" />
                                        Preferred Location
                                    </label>
                                    <Select onValueChange={(value) => setFormData({ ...formData, location: value })}>
                                        <SelectTrigger className="bg-white/80 border-white/40 rounded-xl h-12">
                                            <SelectValue placeholder="Choose location" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="remote">Remote</SelectItem>
                                            <SelectItem value="mumbai">Mumbai</SelectItem>
                                            <SelectItem value="delhi">Delhi</SelectItem>
                                            <SelectItem value="bangalore">Bangalore</SelectItem>
                                            <SelectItem value="hyderabad">Hyderabad</SelectItem>
                                            <SelectItem value="pune">Pune</SelectItem>
                                            <SelectItem value="anywhere">Anywhere</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    <Heart className="w-4 h-4 inline mr-2" />
                                    What interests you most?
                                </label>
                                <Input
                                    placeholder="e.g., Technology, Marketing, Design, Finance..."
                                    className="bg-white/80 border-white/40 rounded-xl h-12"
                                    value={formData.interests}
                                    onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Button
                                    onClick={handleQuickStart}
                                    className="flex-1 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-xl h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <Search className="w-5 h-5 mr-2" />
                                    Get My Recommendations
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={handleQuickStart}
                                    className="bg-white/60 hover:bg-white/80 border-white/40 text-slate-700 rounded-xl h-14 text-lg font-medium backdrop-blur-sm"
                                >
                                    Build Full Profile
                                </Button>
                            </div>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex justify-center items-center gap-8 mt-8 pt-6 border-t border-white/30">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-sky-600">10K+</div>
                                <div className="text-sm text-slate-600">Students Helped</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">500+</div>
                                <div className="text-sm text-slate-600">Companies</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">95%</div>
                                <div className="text-sm text-slate-600">Success Rate</div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};
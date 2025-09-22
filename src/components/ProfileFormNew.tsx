import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Progress } from "./ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
    ArrowLeft,
    ArrowRight,
    User,
    GraduationCap,
    MapPin,
    Code,
    Palette,
    Briefcase,
    Building,
    CheckCircle,
    Heart,
    Target,
    Sparkles,
    Users,
    TrendingUp,
    Lightbulb,
    Globe,
    Camera,
    PenTool,
    Calculator,
    Megaphone
} from "lucide-react";
import { useForm } from "react-hook-form";

interface FormData {
    name: string;
    education: string;
    location: string;
    skills: string[];
    sectors: string[];
}

interface ProfileFormProps {
    onComplete: (data: FormData) => void;
    onBack: () => void;
}

const skillsData = [
    { name: "Programming", icon: Code, color: "bg-gradient-to-br from-blue-500 to-blue-600" },
    { name: "Design", icon: Palette, color: "bg-gradient-to-br from-purple-500 to-purple-600" },
    { name: "Business", icon: Briefcase, color: "bg-gradient-to-br from-green-500 to-green-600" },
    { name: "Marketing", icon: Megaphone, color: "bg-gradient-to-br from-orange-500 to-orange-600" },
    { name: "Data Analysis", icon: TrendingUp, color: "bg-gradient-to-br from-indigo-500 to-indigo-600" },
    { name: "Communication", icon: Users, color: "bg-gradient-to-br from-pink-500 to-pink-600" },
    { name: "Writing", icon: PenTool, color: "bg-gradient-to-br from-emerald-500 to-emerald-600" },
    { name: "Photography", icon: Camera, color: "bg-gradient-to-br from-cyan-500 to-cyan-600" },
    { name: "Finance", icon: Calculator, color: "bg-gradient-to-br from-amber-500 to-amber-600" },
];

const sectorsData = [
    { name: "Information Technology", icon: Code, color: "bg-gradient-to-br from-blue-500 to-blue-600" },
    { name: "Healthcare", icon: Heart, color: "bg-gradient-to-br from-red-500 to-red-600" },
    { name: "Finance", icon: TrendingUp, color: "bg-gradient-to-br from-green-500 to-green-600" },
    { name: "Marketing", icon: Megaphone, color: "bg-gradient-to-br from-orange-500 to-orange-600" },
    { name: "Design", icon: Palette, color: "bg-gradient-to-br from-purple-500 to-purple-600" },
    { name: "Education", icon: GraduationCap, color: "bg-gradient-to-br from-indigo-500 to-indigo-600" },
    { name: "Non-Profit", icon: Heart, color: "bg-gradient-to-br from-pink-500 to-pink-600" },
    { name: "Media", icon: Camera, color: "bg-gradient-to-br from-cyan-500 to-cyan-600" },
];

const educationLevels = [
    "High School",
    "Pursuing Undergraduate",
    "Undergraduate Graduate",
    "Pursuing Postgraduate",
    "Postgraduate",
    "PhD"
];

const locations = [
    "Remote",
    "Mumbai, Maharashtra",
    "Delhi, NCR",
    "Bangalore, Karnataka",
    "Hyderabad, Telangana",
    "Pune, Maharashtra",
    "Chennai, Tamil Nadu",
    "Kolkata, West Bengal",
    "Ahmedabad, Gujarat",
    "Jaipur, Rajasthan",
    "Anywhere in India"
];

export const ProfileForm = ({ onComplete, onBack }: ProfileFormProps) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        education: "",
        location: "",
    });

    const totalSteps = 4;
    const progress = (currentStep / totalSteps) * 100;

    const handleSkillToggle = (skill: string) => {
        setSelectedSkills(prev =>
            prev.includes(skill)
                ? prev.filter(s => s !== skill)
                : [...prev, skill]
        );
    };

    const handleSectorToggle = (sector: string) => {
        setSelectedSectors(prev =>
            prev.includes(sector)
                ? prev.filter(s => s !== sector)
                : [...prev, sector]
        );
    };

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleComplete = () => {
        const completeData: FormData = {
            ...formData,
            skills: selectedSkills,
            sectors: selectedSectors,
        };
        onComplete(completeData);
    };

    const canProceed = () => {
        switch (currentStep) {
            case 1:
                return formData.name.length > 0;
            case 2:
                return formData.education && formData.location;
            case 3:
                return selectedSkills.length > 0;
            case 4:
                return selectedSectors.length > 0;
            default:
                return false;
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="space-y-6"
                    >
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-gradient-to-br from-sky-100 to-blue-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                                <User className="w-10 h-10 text-sky-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">Let's get to know you!</h2>
                            <p className="text-slate-600">Tell us your name so we can personalize your experience</p>
                        </div>

                        <div className="space-y-4">
                            <Label htmlFor="name" className="text-lg font-medium text-slate-700 flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                What's your name?
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="h-14 text-lg bg-white/80 border-white/40 rounded-xl focus:ring-2 focus:ring-sky-500 touch-target"
                            />
                        </div>
                    </motion.div>
                );

            case 2:
                return (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="space-y-6"
                    >
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                                <GraduationCap className="w-10 h-10 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">Education & Location</h2>
                            <p className="text-slate-600">Help us understand your background and preferences</p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="education" className="text-lg font-medium text-slate-700 flex items-center gap-2 mb-3">
                                    <GraduationCap className="w-4 h-4" />
                                    Education Level
                                </Label>
                                <Select onValueChange={(value) => setFormData({ ...formData, education: value })}>
                                    <SelectTrigger className="h-14 text-lg bg-white/80 border-white/40 rounded-xl touch-target">
                                        <SelectValue placeholder="Select your education level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {educationLevels.map((level) => (
                                            <SelectItem key={level} value={level.toLowerCase().replace(/\s+/g, '-')}>
                                                {level}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="location" className="text-lg font-medium text-slate-700 flex items-center gap-2 mb-3">
                                    <MapPin className="w-4 h-4" />
                                    Preferred Location
                                </Label>
                                <Select onValueChange={(value) => setFormData({ ...formData, location: value })}>
                                    <SelectTrigger className="h-14 text-lg bg-white/80 border-white/40 rounded-xl touch-target">
                                        <SelectValue placeholder="Choose your preferred location" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {locations.map((location) => (
                                            <SelectItem key={location} value={location.toLowerCase().replace(/\s+/g, '-').replace(',', '')}>
                                                {location}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </motion.div>
                );

            case 3:
                return (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="space-y-6"
                    >
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                                <Target className="w-10 h-10 text-purple-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">Your Skills</h2>
                            <p className="text-slate-600">Select the skills you have or want to develop</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {skillsData.map((skill) => {
                                const isSelected = selectedSkills.includes(skill.name);
                                const IconComponent = skill.icon;

                                return (
                                    <motion.button
                                        key={skill.name}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleSkillToggle(skill.name)}
                                        className={`p-4 rounded-xl border-2 transition-all duration-300 touch-target ${isSelected
                                                ? 'border-sky-300 bg-sky-50 shadow-md'
                                                : 'border-white/40 bg-white/60 hover:bg-white/80'
                                            }`}
                                    >
                                        <div className={`w-12 h-12 ${skill.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                                            <IconComponent className="w-6 h-6 text-white" />
                                        </div>
                                        <span className={`text-sm font-medium ${isSelected ? 'text-sky-700' : 'text-slate-700'}`}>
                                            {skill.name}
                                        </span>
                                        {isSelected && (
                                            <CheckCircle className="w-5 h-5 text-sky-600 mx-auto mt-2" />
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>

                        {selectedSkills.length > 0 && (
                            <div className="mt-6">
                                <p className="text-sm text-slate-600 mb-3">Selected skills:</p>
                                <div className="flex flex-wrap gap-2">
                                    {selectedSkills.map((skill) => (
                                        <Badge key={skill} className="bg-sky-100 text-sky-700 px-3 py-1">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                );

            case 4:
                return (
                    <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="space-y-6"
                    >
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                                <Briefcase className="w-10 h-10 text-orange-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">Sectors of Interest</h2>
                            <p className="text-slate-600">Which industries excite you the most?</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {sectorsData.map((sector) => {
                                const isSelected = selectedSectors.includes(sector.name);
                                const IconComponent = sector.icon;

                                return (
                                    <motion.button
                                        key={sector.name}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleSectorToggle(sector.name)}
                                        className={`p-4 rounded-xl border-2 transition-all duration-300 touch-target ${isSelected
                                                ? 'border-green-300 bg-green-50 shadow-md'
                                                : 'border-white/40 bg-white/60 hover:bg-white/80'
                                            }`}
                                    >
                                        <div className={`w-12 h-12 ${sector.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                                            <IconComponent className="w-6 h-6 text-white" />
                                        </div>
                                        <span className={`text-sm font-medium ${isSelected ? 'text-green-700' : 'text-slate-700'}`}>
                                            {sector.name}
                                        </span>
                                        {isSelected && (
                                            <CheckCircle className="w-5 h-5 text-green-600 mx-auto mt-2" />
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>

                        {selectedSectors.length > 0 && (
                            <div className="mt-6">
                                <p className="text-sm text-slate-600 mb-3">Selected sectors:</p>
                                <div className="flex flex-wrap gap-2">
                                    {selectedSectors.map((sector) => (
                                        <Badge key={sector} className="bg-green-100 text-green-700 px-3 py-1">
                                            {sector}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 pt-24 pb-16 px-4">
            <div className="container mx-auto max-w-2xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <Button
                        onClick={onBack}
                        variant="outline"
                        className="mb-6 bg-white/60 hover:bg-white/80 border-white/40 text-slate-700 rounded-xl backdrop-blur-sm"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Button>

                    <div className="text-center mb-8">
                        <Badge className="bg-white/60 text-slate-700 px-4 py-2 mb-4">
                            Step {currentStep} of {totalSteps}
                        </Badge>
                        <Progress value={progress} className="w-full h-2 mb-4" />
                        <p className="text-sm text-slate-600">
                            {Math.round(progress)}% Complete • {totalSteps - currentStep} steps remaining
                        </p>
                    </div>
                </motion.div>

                {/* Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="bg-white/70 backdrop-blur-md border border-white/30 shadow-2xl rounded-3xl overflow-hidden">
                        <CardContent className="p-8">
                            <AnimatePresence mode="wait">
                                {renderStep()}
                            </AnimatePresence>

                            {/* Navigation */}
                            <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/30">
                                <Button
                                    onClick={handlePrevious}
                                    disabled={currentStep === 1}
                                    variant="outline"
                                    className="bg-white/60 hover:bg-white/80 border-white/40 text-slate-700 rounded-xl backdrop-blur-sm touch-target disabled:opacity-50"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Previous
                                </Button>

                                <div className="flex gap-2">
                                    {Array.from({ length: totalSteps }, (_, index) => (
                                        <div
                                            key={index}
                                            className={`w-2 h-2 rounded-full transition-colors ${index + 1 <= currentStep
                                                    ? 'bg-sky-500'
                                                    : 'bg-slate-300'
                                                }`}
                                        />
                                    ))}
                                </div>

                                {currentStep === totalSteps ? (
                                    <Button
                                        onClick={handleComplete}
                                        disabled={!canProceed()}
                                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 touch-target disabled:opacity-50"
                                    >
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Get My Matches
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleNext}
                                        disabled={!canProceed()}
                                        className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 touch-target disabled:opacity-50"
                                    >
                                        Next Step
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};
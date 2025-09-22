import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
    ArrowLeft,
    HelpCircle,
    Search,
    FileText,
    Clock,
    Users,
    Shield,
    Phone,
    Mail,
    MessageCircle,
    CheckCircle,
    AlertCircle,
    Info,
    BookOpen,
    Target,
    Award,
    Zap,
    Globe,
    Heart
} from "lucide-react";

interface HelpPageProps {
    onBack: () => void;
}

export const HelpPage = ({ onBack }: HelpPageProps) => {
    const faqs = [
        {
            id: "how-it-works",
            question: "How does the internship matching work?",
            answer: "Our AI-powered system analyzes your profile including education, skills, location preferences, and interests to find the most suitable internship opportunities. The algorithm considers company requirements, your qualifications, and compatibility factors to provide a personalized match score for each opportunity."
        },
        {
            id: "getting-started",
            question: "How do I get started with InternMitra?",
            answer: "Getting started is simple! Click 'Get Started' on the homepage, fill out your profile with details about your education, skills, and preferences. Our system will instantly generate personalized internship recommendations based on your profile. The entire process takes less than 5 minutes."
        },
        {
            id: "eligibility",
            question: "What are the eligibility criteria?",
            answer: "Basic eligibility includes: Age 18-25 years, Currently enrolled in or recently graduated from an educational institution, Indian citizen or resident. Specific internships may have additional requirements such as specific skills, education level, or location preferences."
        },
        {
            id: "application-process",
            question: "What is the application process?",
            answer: "After receiving your matches, you can apply directly through our platform. The typical process is: 1) Review recommendations, 2) Click 'Apply' on suitable positions, 3) Complete company-specific applications, 4) Wait for employer review (3-7 days), 5) Participate in interviews if selected, 6) Receive offer decisions."
        },
        {
            id: "documents-needed",
            question: "What documents do I need?",
            answer: "You'll typically need: Resume/CV (PDF format, under 5MB), Educational certificates, Government-issued ID proof, Portfolio (for creative/technical roles), Cover letter (optional but recommended). All documents should be recent and in English or Hindi."
        },
        {
            id: "multiple-applications",
            question: "Can I apply to multiple internships?",
            answer: "Yes! You can apply to up to 5 internships simultaneously. Our system helps you track all applications, manages deadlines, and provides status updates. We recommend applying to 3-4 positions that best match your interests and qualifications."
        },
        {
            id: "timeline",
            question: "How long does the process take?",
            answer: "The complete timeline is: Profile creation (5 minutes) → AI matching (instant) → Application submission (same day) → Employer review (3-7 business days) → Interview process (1-2 weeks) → Final decision (2-5 days). Total process typically takes 2-4 weeks."
        },
        {
            id: "cost",
            question: "Is InternMitra free to use?",
            answer: "Yes! InternMitra is completely free for students and job seekers. We're supported by government initiatives and partner organizations to help young talent find opportunities. There are no hidden charges, subscription fees, or premium features."
        },
        {
            id: "support",
            question: "How can I get additional support?",
            answer: "We offer multiple support channels: AI Chatbot (24/7 instant help), Email support (support@internmitra.in), Phone support (1800-XXX-XXXX, Mon-Fri 9 AM-6 PM), Video tutorials, and comprehensive FAQ section. Our response time is typically under 4 hours."
        },
        {
            id: "privacy",
            question: "How is my personal information protected?",
            answer: "We take data privacy seriously. Your information is encrypted, stored securely, and only shared with employers you apply to. We follow strict data protection guidelines, never sell personal information, and you can delete your account anytime. All communications are secure and confidential."
        }
    ];

    const quickHelp = [
        {
            icon: Search,
            title: "Find Internships",
            description: "Use our AI-powered search to discover opportunities that match your profile",
            color: "bg-blue-500"
        },
        {
            icon: FileText,
            title: "Build Profile",
            description: "Create a comprehensive profile to get better matches",
            color: "bg-green-500"
        },
        {
            icon: Users,
            title: "Apply & Track",
            description: "Apply to multiple positions and track your application status",
            color: "bg-purple-500"
        },
        {
            icon: Award,
            title: "Get Hired",
            description: "Connect with employers and land your dream internship",
            color: "bg-orange-500"
        }
    ];

    const contactMethods = [
        {
            icon: MessageCircle,
            title: "Live Chat",
            description: "Get instant help from our AI assistant",
            action: "Available 24/7",
            color: "text-emerald-600"
        },
        {
            icon: Mail,
            title: "Email Support",
            description: "send us detailed questions",
            action: "support@internmitra.in",
            color: "text-blue-600"
        },
        {
            icon: Phone,
            title: "Phone Support",
            description: "Speak with our support team",
            action: "1800-XXX-XXXX",
            color: "text-purple-600"
        },
        {
            icon: BookOpen,
            title: "Video Tutorials",
            description: "Watch step-by-step guides",
            action: "Coming Soon",
            color: "text-orange-600"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 pt-24 pb-16 px-4">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <Button
                        onClick={onBack}
                        variant="outline"
                        className="mb-8 bg-white/60 hover:bg-white/80 border-white/40 text-slate-700 rounded-xl backdrop-blur-sm"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Button>

                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md rounded-full px-6 py-3 mb-6 border border-white/30 shadow-lg"
                        >
                            <HelpCircle className="w-4 h-4 text-blue-600" />
                            <span className="text-slate-700 text-sm font-medium">Help & Support Center</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-3xl md:text-5xl font-bold text-slate-800 mb-4"
                        >
                            How can we{" "}
                            <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                                help you?
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-lg text-slate-600 max-w-2xl mx-auto"
                        >
                            Find answers to common questions, get support, and learn how to make the most of InternMitra
                        </motion.p>
                    </div>
                </motion.div>

                {/* Quick Help Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                >
                    {quickHelp.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + (index * 0.1), duration: 0.6 }}
                        >
                            <Card className="bg-white/70 backdrop-blur-md border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl h-full group hover:-translate-y-1">
                                <CardContent className="p-6 text-center">
                                    <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <item.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-2">{item.title}</h3>
                                    <p className="text-slate-600 text-sm">{item.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* FAQ Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className="lg:col-span-2"
                    >
                        <Card className="bg-white/70 backdrop-blur-md border border-white/30 shadow-lg rounded-2xl">
                            <CardHeader className="pb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                        <Info className="w-5 h-5 text-white" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold text-slate-800">
                                        Frequently Asked Questions
                                    </CardTitle>
                                </div>
                                <p className="text-slate-600 mt-2">
                                    Find quick answers to the most common questions about InternMitra
                                </p>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="single" collapsible className="space-y-4">
                                    {faqs.map((faq, index) => (
                                        <AccordionItem
                                            key={faq.id}
                                            value={faq.id}
                                            className="bg-white/50 rounded-xl border border-white/40 px-6 py-2"
                                        >
                                            <AccordionTrigger className="text-left font-medium text-slate-800 hover:text-blue-600 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <span className="text-blue-600 text-sm font-semibold">{index + 1}</span>
                                                    </div>
                                                    <span>{faq.question}</span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="text-slate-600 pt-4 pl-9 leading-relaxed">
                                                {faq.answer}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Contact & Resources */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="space-y-6"
                    >
                        {/* Contact Methods */}
                        <Card className="bg-white/70 backdrop-blur-md border border-white/30 shadow-lg rounded-2xl">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                        <MessageCircle className="w-5 h-5 text-white" />
                                    </div>
                                    <CardTitle className="text-xl font-bold text-slate-800">Get Support</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {contactMethods.map((method) => (
                                    <div key={method.title} className="flex items-start gap-4 p-4 bg-white/50 rounded-xl border border-white/40">
                                        <div className={`w-10 h-10 bg-white rounded-lg flex items-center justify-center ${method.color}`}>
                                            <method.icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-slate-800">{method.title}</h4>
                                            <p className="text-sm text-slate-600 mb-1">{method.description}</p>
                                            <Badge variant="outline" className="text-xs">
                                                {method.action}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Quick Stats */}
                        <Card className="bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-lg rounded-2xl">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Heart className="w-6 h-6" />
                                    <h3 className="text-lg font-semibold">Why Students Love Us</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/80">Success Rate</span>
                                        <span className="text-2xl font-bold">95%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/80">Students Helped</span>
                                        <span className="text-2xl font-bold">10K+</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/80">Partner Companies</span>
                                        <span className="text-2xl font-bold">500+</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-white/80">Avg. Response Time</span>
                                        <span className="text-2xl font-bold">&lt;4h</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Emergency Contact */}
                        <Card className="bg-white/70 backdrop-blur-md border border-white/30 shadow-lg rounded-2xl">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                                        <AlertCircle className="w-5 h-5 text-red-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-800">Need Immediate Help?</h3>
                                </div>
                                <p className="text-slate-600 text-sm mb-4">
                                    For urgent technical issues or account problems:
                                </p>
                                <Button className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl">
                                    <Phone className="w-4 h-4 mr-2" />
                                    Emergency Support: 1800-XXX-XXXX
                                </Button>
                                <p className="text-xs text-slate-500 mt-2 text-center">
                                    Available 24/7 for critical issues
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="mt-16 text-center"
                >
                    <Card className="bg-white/70 backdrop-blur-md border border-white/30 shadow-lg rounded-2xl p-8 max-w-2xl mx-auto">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">Still have questions?</h3>
                        <p className="text-slate-600 mb-6">
                            Our support team is here to help you succeed. Don't hesitate to reach out!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-xl px-8">
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Start Live Chat
                            </Button>
                            <Button
                                variant="outline"
                                className="bg-white/60 hover:bg-white/80 border-white/40 text-slate-700 rounded-xl px-8 backdrop-blur-sm"
                            >
                                <Mail className="w-4 h-4 mr-2" />
                                Send Email
                            </Button>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};
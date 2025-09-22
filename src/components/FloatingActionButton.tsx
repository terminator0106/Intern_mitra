import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import {
    MessageCircle,
    Zap,
    Plus,
    X,
    BookmarkPlus,
    Send,
    HelpCircle,
    RefreshCw
} from "lucide-react";
import { useState } from "react";

interface FloatingActionButtonProps {
    currentPage?: "hero" | "form" | "results" | "help";
    onQuickAction?: (action: string) => void;
}

export const FloatingActionButton = ({
    currentPage = "hero",
    onQuickAction
}: FloatingActionButtonProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const getMainAction = () => {
        switch (currentPage) {
            case "hero":
                return {
                    icon: Zap,
                    label: "Get Started",
                    action: "get-started",
                    gradient: "from-sky-500 to-blue-600"
                };
            case "form":
                return {
                    icon: Send,
                    label: "Get Matches",
                    action: "get-matches",
                    gradient: "from-green-500 to-emerald-600"
                };
            case "results":
                return {
                    icon: RefreshCw,
                    label: "Refine Search",
                    action: "refine-search",
                    gradient: "from-purple-500 to-indigo-600"
                };
            case "help":
                return {
                    icon: MessageCircle,
                    label: "Live Chat",
                    action: "chat",
                    gradient: "from-emerald-500 to-green-600"
                };
            default:
                return {
                    icon: Zap,
                    label: "Quick Action",
                    action: "default",
                    gradient: "from-sky-500 to-blue-600"
                };
        }
    };

    const mainAction = getMainAction();

    const quickActions = [
        {
            icon: BookmarkPlus,
            label: "Save for Later",
            action: "save",
            color: "bg-green-500 hover:bg-green-600"
        },
        {
            icon: MessageCircle,
            label: "Get Help",
            action: "help",
            color: "bg-orange-500 hover:bg-orange-600"
        },
        {
            icon: HelpCircle,
            label: "FAQ",
            action: "faq",
            color: "bg-purple-500 hover:bg-purple-600"
        }
    ];

    const handleMainAction = () => {
        if (isExpanded) {
            setIsExpanded(false);
        } else {
            onQuickAction?.(mainAction.action);
        }
    };

    const handleQuickAction = (action: string) => {
        onQuickAction?.(action);
        setIsExpanded(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-3 mb-4"
                    >
                        {quickActions.map((action, index) => (
                            <motion.div
                                key={action.action}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: index * 0.05, duration: 0.2 }}
                            >
                                <Button
                                    size="lg"
                                    onClick={() => handleQuickAction(action.action)}
                                    className={`${action.color} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 h-12 w-12 p-0 group`}
                                >
                                    <action.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                </Button>

                                {/* Tooltip */}
                                <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-800 text-white text-sm px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                                    {action.label}
                                    <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-slate-800"></div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main FAB */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
            >
                <Button
                    size="lg"
                    onClick={handleMainAction}
                    onMouseEnter={() => !isExpanded && setIsExpanded(true)}
                    onMouseLeave={() => setIsExpanded(false)}
                    className={`bg-gradient-to-r ${mainAction.gradient} hover:shadow-2xl text-white rounded-full shadow-xl transition-all duration-300 h-16 w-16 p-0 relative overflow-hidden group`}
                >
                    <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>

                    <AnimatePresence mode="wait">
                        {isExpanded ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="relative z-10"
                            >
                                <X className="w-6 h-6" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="main"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="relative z-10"
                            >
                                <mainAction.icon className="w-6 h-6" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Ripple Effect */}
                    <motion.div
                        className="absolute inset-0 bg-white/30 rounded-full"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 4, opacity: 0 }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
                    />
                </Button>

                {/* Main Action Tooltip */}
                {!isExpanded && (
                    <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-slate-800 text-white text-sm px-4 py-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap">
                        {mainAction.label}
                        <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-slate-800"></div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};
import { motion } from "framer-motion";
import { Home, BookmarkCheck, User, HelpCircle, Globe } from "lucide-react";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface NavbarProps {
    currentPage?: "hero" | "form" | "results" | "help";
    onNavigate?: (page: "hero" | "form" | "results" | "help") => void;
}

export const Navbar = ({ currentPage = "hero", onNavigate }: NavbarProps) => {
    const navItems = [
        { icon: Home, label: "Home", key: "hero" },
        { icon: BookmarkCheck, label: "My Recommendations", key: "results" },
        { icon: User, label: "Profile", key: "form" },
        { icon: HelpCircle, label: "Help", key: "help" },
    ];

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed top-0 left-0 right-0 z-50 p-4"
        >
            <div className="max-w-7xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
                    <div className="flex items-center justify-between px-6 py-4">
                        {/* Logo */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center space-x-3"
                        >
                            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-gray-900 font-bold text-lg">IM</span>
                            </div>
                            <div>
                                <h1 className="text-gray-900 font-semibold text-lg">InternMitra</h1>
                                <p className="text-gray-900/70 text-xs">Find Your Path</p>
                            </div>
                        </motion.div>

                        {/* Navigation Items */}
                        <div className="hidden md:flex items-center space-x-2">
                            {navItems.map((item) => (
                                <motion.button
                                    key={item.key}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => onNavigate && onNavigate(item.key as any)}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${currentPage === item.key
                                        ? "bg-white/20 text-gray-900 shadow-md"
                                        : "text-gray-900/80 hover:bg-white/10 hover:text-blue-500"
                                        }`}
                                >
                                    <item.icon className="w-4 h-4" />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </motion.button>
                            ))}
                        </div>

                        {/* Mobile Menu & Language Toggle */}
                        <div className="flex items-center space-x-3">
                            {/* Language Toggle */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-gray-900/80 hover:text-white hover:bg-white/10 rounded-xl"
                                    >
                                        <Globe className="w-4 h-4" />
                                        <span className="hidden sm:ml-2 sm:inline">EN</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-white/95 backdrop-blur-md border-white/20">
                                    <DropdownMenuItem>English</DropdownMenuItem>
                                    <DropdownMenuItem>हिंदी</DropdownMenuItem>
                                    <DropdownMenuItem>বাংলা</DropdownMenuItem>
                                    <DropdownMenuItem>தமிழ்</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Mobile Menu */}
                            <div className="md:hidden">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-gray-900/80 hover:text-white hover:bg-white/10 rounded-xl"
                                        >
                                            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                                                <div className="w-4 h-0.5 bg-current"></div>
                                                <div className="w-4 h-0.5 bg-current"></div>
                                                <div className="w-4 h-0.5 bg-current"></div>
                                            </div>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="bg-white/95 backdrop-blur-md border-white/20 w-48">
                                        {navItems.map((item) => (
                                            <DropdownMenuItem
                                                key={item.key}
                                                onClick={() => onNavigate && onNavigate(item.key as any)}
                                                className="flex items-center space-x-2"
                                            >
                                                <item.icon className="w-4 h-4" />
                                                <span>{item.label}</span>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};
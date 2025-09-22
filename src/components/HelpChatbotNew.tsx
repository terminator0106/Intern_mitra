import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MessageCircle, X, Send, Bot, User, HelpCircle, Globe, Volume2, VolumeX } from "lucide-react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

interface Message {
    id: number;
    text: string;
    isBot: boolean;
    timestamp: Date;
    language?: string;
}

export const HelpChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hi! I'm InternMitra, your AI assistant. I'm here to help you find the perfect internship. How can I assist you today? 🌟",
            isBot: true,
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [language, setLanguage] = useState("en");
    const [voiceEnabled, setVoiceEnabled] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const quickQuestions = [
        { en: "How does the matching work?", hi: "मैचिंग कैसे काम करती है?", id: "matching" },
        { en: "What documents do I need?", hi: "मुझे कौन से दस्तावेज चाहिए?", id: "documents" },
        { en: "How long does the process take?", hi: "प्रक्रिया में कितना समय लगता है?", id: "timeline" },
        { en: "Can I apply to multiple internships?", hi: "क्या मैं कई इंटर्नशिप के लिए आवेदन कर सकता हूं?", id: "multiple" },
        { en: "What are the eligibility criteria?", hi: "पात्रता मानदंड क्या हैं?", id: "eligibility" },
        { en: "Is this service free?", hi: "क्या यह सेवा मुफ्त है?", id: "free" }
    ];

    const languages = [
        { code: "en", name: "English", flag: "🇺🇸" },
        { code: "hi", name: "हिंदी", flag: "🇮🇳" },
        { code: "bn", name: "বাংলা", flag: "🇧🇩" },
        { code: "ta", name: "தமிழ்", flag: "🇮🇳" }
    ];

    const botResponses = {
        matching: {
            en: "Our AI analyzes your skills, education, location, and interests to find internships that match your profile. We use advanced algorithms to ensure you get the most relevant opportunities! 🎯",
            hi: "हमारी AI आपके कौशल, शिक्षा, स्थान और रुचियों का विश्लेषण करके आपकी प्रोफाइल से मेल खाने वाली इंटर्नशिप खोजती है। 🎯"
        },
        documents: {
            en: "You'll need: 1) Resume/CV 2) Educational certificates 3) ID proof 4) Portfolio (for creative roles). All documents should be in PDF format and under 5MB. 📄",
            hi: "आपको चाहिए: 1) रिज्यूमे 2) शैक्षणिक प्रमाणपत्र 3) ID प्रूफ 4) पोर्टफोलियो (रचनात्मक भूमिकाओं के लिए)। 📄"
        },
        timeline: {
            en: "The complete process typically takes 7-14 days: Profile creation (5 mins) → AI matching (instant) → Application review (3-7 days) → Interview scheduling (2-5 days). ⏰",
            hi: "पूरी प्रक्रिया आमतौर पर 7-14 दिन लेती है: प्रोफाइल बनाना (5 मिनट) → AI मैचिंग (तुरंत) → आवेदन समीक्षा (3-7 दिन) → साक्षात्कार (2-5 दिन)। ⏰"
        },
        multiple: {
            en: "Absolutely! You can apply to up to 5 internships simultaneously. Our system helps you track all applications and manages deadlines for you. 📱",
            hi: "बिल्कुल! आप एक साथ 5 तक इंटर्नशिप के लिए आवेदन कर सकते हैं। हमारा सिस्टम सभी आवेदनों को ट्रैक करने में मदद करता है। 📱"
        },
        eligibility: {
            en: "Basic criteria: Age 18-25, Currently enrolled in or recently graduated from an educational institution, Indian citizen or resident. Specific roles may have additional requirements. ✅",
            hi: "बुनियादी मानदंड: आयु 18-25, वर्तमान में नामांकित या हाल ही में स्नातक, भारतीय नागरिक या निवासी। ✅"
        },
        free: {
            en: "Yes! InternMitra is completely free for students. We're supported by government initiatives to help young talent find opportunities. No hidden charges ever! 💫",
            hi: "हाँ! InternMitra छात्रों के लिए पूरी तरह से मुफ्त है। हम युवा प्रतिभा को अवसर खोजने में मदद करने के लिए सरकारी पहलों द्वारा समर्थित हैं। 💫"
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (messageText?: string) => {
        const textToSend = messageText || inputMessage;
        if (!textToSend.trim()) return;

        const newMessage: Message = {
            id: messages.length + 1,
            text: textToSend,
            isBot: false,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMessage]);
        setInputMessage("");
        setIsTyping(true);

        // Simulate bot thinking and response
        setTimeout(() => {
            setIsTyping(false);

            // Check if it's a quick question
            const quickQuestion = quickQuestions.find(q =>
                q.en === textToSend || q.hi === textToSend
            );

            let responseText = "";
            if (quickQuestion && botResponses[quickQuestion.id as keyof typeof botResponses]) {
                responseText = botResponses[quickQuestion.id as keyof typeof botResponses][language as keyof typeof botResponses.matching] || botResponses[quickQuestion.id as keyof typeof botResponses].en;
            } else {
                responseText = language === "hi"
                    ? "धन्यवाद आपके प्रश्न के लिए! विस्तृत सहायता के लिए, कृपया हमारी सहायता टीम से संपर्क करें: support@internmitra.in या 1800-XXX-XXXX पर कॉल करें। 💬"
                    : "Thank you for your question! For detailed assistance, please contact our support team at support@internmitra.in or call 1800-XXX-XXXX for immediate help. 💬";
            }

            const botResponse: Message = {
                id: messages.length + 2,
                text: responseText,
                isBot: true,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botResponse]);

            // Text-to-speech if enabled
            if (voiceEnabled && 'speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(responseText);
                utterance.lang = language === "hi" ? "hi-IN" : "en-US";
                speechSynthesis.speak(utterance);
            }
        }, 1500);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const getCurrentQuestions = () => {
        return quickQuestions.map(q => ({
            text: q[language as keyof typeof q] || q.en,
            original: q.en
        }));
    };

    return (
        <>
            {/* Chat Toggle Button */}
            <motion.div
                className="fixed bottom-6 left-6 z-40"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2, type: "spring", stiffness: 200 }}
            >
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 h-16 w-16 p-0 group"
                    aria-label="Open help chatbot"
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X className="w-6 h-6" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="chat"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <MessageCircle className="w-6 h-6" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Pulse Animation */}
                    <motion.div
                        className="absolute inset-0 bg-emerald-400/30 rounded-full"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                </Button>
            </motion.div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 100 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed bottom-24 left-6 z-50 w-80 md:w-96"
                    >
                        <Card className="bg-white/95 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl overflow-hidden">
                            {/* Header */}
                            <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                            <Bot className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">InternMitra AI</CardTitle>
                                            <p className="text-white/80 text-sm">
                                                {language === "hi" ? "यहाँ मदद के लिए" : "Here to help"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {/* Voice Toggle */}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setVoiceEnabled(!voiceEnabled)}
                                            className="text-white/80 hover:text-white hover:bg-white/10 h-8 w-8 p-0"
                                            aria-label="Toggle voice responses"
                                        >
                                            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                                        </Button>

                                        {/* Language Selector */}
                                        <Select value={language} onValueChange={setLanguage}>
                                            <SelectTrigger className="w-16 h-8 bg-white/10 border-white/20 text-white text-xs">
                                                <Globe className="w-3 h-3" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {languages.map((lang) => (
                                                    <SelectItem key={lang.code} value={lang.code} className="text-xs">
                                                        {lang.flag} {lang.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardHeader>

                            {/* Messages */}
                            <CardContent className="h-80 overflow-y-auto custom-scrollbar p-4 space-y-4">
                                <AnimatePresence>
                                    {messages.map((message) => (
                                        <motion.div
                                            key={message.id}
                                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                            transition={{ duration: 0.3 }}
                                            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                                        >
                                            <div className={`max-w-[75%] ${message.isBot ? 'order-2' : 'order-1'}`}>
                                                <div
                                                    className={`p-3 rounded-2xl shadow-sm ${message.isBot
                                                            ? 'bg-gray-100 text-gray-800'
                                                            : 'bg-gradient-to-r from-sky-500 to-blue-600 text-white'
                                                        }`}
                                                >
                                                    <p className="text-sm leading-relaxed">{message.text}</p>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1 px-2">
                                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>

                                            {message.isBot && (
                                                <div className="order-1 mr-2 mt-1">
                                                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                                                        <Bot className="w-3 h-3 text-white" />
                                                    </div>
                                                </div>
                                            )}

                                            {!message.isBot && (
                                                <div className="order-2 ml-2 mt-1">
                                                    <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center">
                                                        <User className="w-3 h-3 text-white" />
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {/* Typing Indicator */}
                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex justify-start"
                                    >
                                        <div className="bg-gray-100 p-3 rounded-2xl shadow-sm">
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                <div ref={messagesEndRef} />
                            </CardContent>

                            {/* Quick Questions */}
                            <div className="p-4 border-t border-gray-200">
                                <p className="text-xs text-gray-600 mb-2">
                                    {language === "hi" ? "त्वरित प्रश्न:" : "Quick questions:"}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {getCurrentQuestions().slice(0, 3).map((question, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSendMessage(question.original)}
                                            className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200 transition-colors"
                                        >
                                            {question.text}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Input */}
                            <div className="p-4 border-t border-gray-200">
                                <div className="flex gap-2">
                                    <Input
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder={
                                            language === "hi"
                                                ? "अपना प्रश्न यहाँ लिखें..."
                                                : "Type your question here..."
                                        }
                                        className="flex-1 rounded-xl border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        maxLength={500}
                                    />
                                    <Button
                                        onClick={() => handleSendMessage()}
                                        disabled={!inputMessage.trim() || isTyping}
                                        className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 rounded-xl p-2 disabled:opacity-50"
                                        aria-label="Send message"
                                    >
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-xs text-gray-500">
                                        {inputMessage.length}/500
                                    </p>
                                    <Badge variant="outline" className="text-xs">
                                        {language === "hi" ? "AI द्वारा संचालित" : "Powered by AI"}
                                    </Badge>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
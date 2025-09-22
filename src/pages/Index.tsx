import { useState } from "react";
import { HeroSection } from "@/components/HeroSectionNew";
import { ProfileForm } from "@/components/ProfileFormNew";
import { RecommendationResults } from "@/components/RecommendationResultsNew";
import { LanguageToggle } from "@/components/LanguageToggle";
import { HelpChatbot } from "@/components/HelpChatbotNew";
import { Navbar } from "@/components/Navbar";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { HelpPage } from "@/pages/HelpPage";

interface FormData {
  name: string;
  education: string;
  location: string;
  skills: string[];
  sectors: string[];
}

type PageState = "hero" | "form" | "results" | "help";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<PageState>("hero");
  const [userData, setUserData] = useState<FormData | null>(null);

  const handleGetStarted = () => {
    setCurrentPage("form");
  };

  const handleFormComplete = (data: FormData) => {
    setUserData(data);
    setCurrentPage("results");
  };

  const handleBackToForm = () => {
    setCurrentPage("form");
  };

  const handleStartOver = () => {
    setUserData(null);
    setCurrentPage("hero");
  };

  const handleBackToHero = () => {
    setCurrentPage("hero");
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "get-started":
        handleGetStarted();
        break;
      case "get-matches":
        // This would be handled by the form component
        break;
      case "refine-search":
        handleBackToForm();
        break;
      case "help":
        setCurrentPage("help");
        break;
      default:
        break;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      {/* Remove the standalone LanguageToggle as it's now in the Navbar */}

      {currentPage === "hero" && (
        <HeroSection onGetStarted={handleGetStarted} />
      )}

      {currentPage === "form" && (
        <ProfileForm
          onComplete={handleFormComplete}
          onBack={handleBackToHero}
        />
      )}

      {currentPage === "results" && userData && (
        <RecommendationResults
          userData={userData}
          onBack={handleBackToForm}
          onStartOver={handleStartOver}
        />
      )}

      {currentPage === "help" && (
        <HelpPage onBack={handleBackToHero} />
      )}

      <HelpChatbot />
      <FloatingActionButton
        currentPage={currentPage}
        onQuickAction={handleQuickAction}
      />
    </main>
  );
};

export default Index;

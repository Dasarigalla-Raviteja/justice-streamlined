import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import LostCaseSection from "@/components/LostCaseSection";
import SystemActivationSection from "@/components/SystemActivationSection";
import SolutionSection from "@/components/SolutionSection";
import JudicialControlSection from "@/components/JudicialControlSection";
import ImpactSection from "@/components/ImpactSection";
import FinalSection from "@/components/FinalSection";

const Index = () => {
  return (
    <main className="relative">
      <HeroSection />
      <ProblemSection />
      <LostCaseSection />
      <SystemActivationSection />
      <SolutionSection />
      <JudicialControlSection />
      <ImpactSection />
      <FinalSection />
    </main>
  );
};

export default Index;

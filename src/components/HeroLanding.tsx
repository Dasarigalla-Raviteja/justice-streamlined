import scalesHeroImg from "@/assets/scales-hero.png";

interface HeroLandingProps {
  onEnter: () => void;
}

const HeroLanding = ({ onEnter }: HeroLandingProps) => {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-[#1a1208] cursor-pointer"
      onClick={onEnter}
    >
      {/* Hero Image */}
      <div className="relative w-full max-w-2xl px-8">
        <img 
          src={scalesHeroImg} 
          alt="Scales of Justice - Case files balanced with technology" 
          className="w-full h-auto"
        />
      </div>
      
      {/* Access System Text */}
      <div className="mt-8 text-center">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#c9a954] tracking-wider uppercase">
          Access System
        </h1>
        <p className="text-[#a08844] text-sm mt-2 animate-pulse">
          Click anywhere to enter
        </p>
      </div>
    </div>
  );
};

export default HeroLanding;

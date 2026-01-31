import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import TransitionOverlay from "./TransitionOverlay";
import LoginGate from "./LoginGate";
import judicialHeroBg from "@/assets/judicial-hero-bg.jpg";

const LandingPage = () => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [showLoginGate, setShowLoginGate] = useState(false);

  const handleLaunch = () => {
    setIsLaunching(true);
    
    setTimeout(() => {
      setShowTransition(true);
    }, 1500);

    setTimeout(() => {
      setShowLoginGate(true);
    }, 3500);
  };

  if (showLoginGate) {
    return <LoginGate />;
  }

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-background">
      {/* Full-screen clickable background image */}
      <motion.button
        onClick={handleLaunch}
        disabled={isLaunching}
        className="absolute inset-0 z-0 cursor-pointer disabled:cursor-wait border-0 bg-transparent p-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        whileHover={{ scale: 1.01 }}
      >
        <img
          src={judicialHeroBg}
          alt="Scales of Justice - Click to Access System"
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle dark overlay for text readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to bottom, 
                hsl(222 47% 7% / 0.7) 0%, 
                hsl(222 47% 7% / 0.2) 30%,
                hsl(222 47% 7% / 0.2) 70%,
                hsl(222 47% 7% / 0.8) 100%
              )
            `
          }}
        />
      </motion.button>

      {/* Top - Institutional title */}
      <motion.header
        className="relative z-10 pt-12 md:pt-16"
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: isLaunching && showTransition ? 0 : 1, 
          y: 0 
        }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <p className="text-center text-muted-foreground text-xs tracking-[0.4em] uppercase font-sans">
          A Judicial Monitoring Platform
        </p>
      </motion.header>

      {/* Center - Spacer to push content into place */}
      <div className="flex-1" />

      {/* Click anywhere hint */}
      <motion.footer
        className="relative z-10 pb-8 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isLaunching ? 0 : 0.6
        }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <p className="text-xs text-muted-foreground tracking-[0.2em] uppercase">
          {isLaunching ? "Authenticating..." : "Click to enter"}
        </p>
      </motion.footer>

      {/* Transition Overlay */}
      <AnimatePresence>
        {showTransition && <TransitionOverlay />}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;

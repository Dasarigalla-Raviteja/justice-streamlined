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
      {/* Full-screen background image - centered */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <img
          src={judicialHeroBg}
          alt="Scales of Justice"
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
      </motion.div>

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

      {/* Bottom - Primary action button */}
      <motion.footer
        className="relative z-10 pb-16 md:pb-20 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isLaunching && showTransition ? 0 : 1, 
          y: 0 
        }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <motion.button
          onClick={handleLaunch}
          disabled={isLaunching}
          className="px-10 py-4 font-sans text-sm tracking-[0.2em] uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-primary-foreground hover:bg-primary/90 border border-primary/30"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLaunching ? "Authenticating..." : "Access System"}
        </motion.button>
      </motion.footer>

      {/* Transition Overlay */}
      <AnimatePresence>
        {showTransition && <TransitionOverlay />}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import TransitionOverlay from "./TransitionOverlay";
import LoginGate from "./LoginGate";
import justiceScales from "@/assets/justice-scales.png";

const LandingPage = () => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [showLoginGate, setShowLoginGate] = useState(false);

  const handleLaunch = () => {
    setIsLaunching(true);
    
    // Start transition overlay after clock activates
    setTimeout(() => {
      setShowTransition(true);
    }, 1500);

    // Show login gate after transition
    setTimeout(() => {
      setShowLoginGate(true);
    }, 3500);
  };

  if (showLoginGate) {
    return <LoginGate />;
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Subtle ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/10" />
      
      {/* Very subtle vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, hsl(222 47% 3% / 0.6) 100%)"
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLaunching && showTransition ? 0 : 1 }}
        transition={{ duration: 1 }}
      >
        {/* Micro text above */}
        <motion.p
          className="text-muted-foreground text-xs tracking-[0.4em] uppercase mb-6 md:mb-8 font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          A Judicial Monitoring Platform
        </motion.p>

        {/* Justice Scales Image */}
        <motion.div
          className="relative w-64 h-48 md:w-80 md:h-60 lg:w-96 lg:h-72"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: 1, 
            scale: isLaunching ? 1.02 : 1 
          }}
          transition={{ duration: 2, delay: 0.2 }}
        >
          <motion.img
            src={justiceScales}
            alt="Scales of Justice"
            className="w-full h-full object-contain rounded-lg"
            animate={{
              filter: isLaunching ? "brightness(1.1)" : "brightness(1)"
            }}
            transition={{ duration: 1 }}
          />
          {/* Subtle glow effect when activating */}
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isLaunching ? 0.3 : 0,
              boxShadow: isLaunching 
                ? "0 0 60px 20px hsl(43 52% 59% / 0.3)" 
                : "0 0 0 0 transparent"
            }}
            transition={{ duration: 1.5 }}
          />
        </motion.div>

        {/* System State Indicator */}
        <motion.div
          className="flex items-center gap-2 mt-4 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <span 
            className={`w-2 h-2 rounded-full transition-colors duration-1000 ${
              isLaunching ? 'bg-primary' : 'bg-muted-foreground/50'
            }`}
          />
          <span className="text-xs font-sans text-muted-foreground/70 tracking-wider">
            System State: {isLaunching ? 'Monitoring Enabled' : 'Inactive'}
          </span>
        </motion.div>

        {/* Headlines */}
        <motion.div
          className="mt-4 md:mt-6 mb-6 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-2 tracking-tight">
            Justice is waiting.
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl font-serif text-primary">
            Time is not.
          </p>
        </motion.div>

        {/* Launch Button */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          {/* Action Clarifier */}
          <p className="text-muted-foreground/60 text-xs font-sans italic tracking-wide">
            Begin monitored case scheduling
          </p>

          <motion.button
            onClick={handleLaunch}
            disabled={isLaunching}
            className="group relative px-10 py-4 bg-transparent border border-primary/50 text-foreground font-sans text-sm tracking-[0.2em] uppercase transition-all duration-500 hover:border-primary hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ 
              boxShadow: "0 0 30px hsl(43 52% 59% / 0.2)" 
            }}
          >
            <span className="relative z-10">
              {isLaunching ? "Initiating..." : "Enter Monitoring System"}
            </span>
            
            {/* Subtle corner accents */}
            <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/70 transition-all duration-300 group-hover:w-4 group-hover:h-4" />
            <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/70 transition-all duration-300 group-hover:w-4 group-hover:h-4" />
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/70 transition-all duration-300 group-hover:w-4 group-hover:h-4" />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/70 transition-all duration-300 group-hover:w-4 group-hover:h-4" />
          </motion.button>

          <p className="text-muted-foreground text-xs tracking-wider">
            For authorized judicial and administrative use
          </p>
        </motion.div>
      </motion.div>

      {/* Transition Overlay */}
      <AnimatePresence>
        {showTransition && <TransitionOverlay />}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;

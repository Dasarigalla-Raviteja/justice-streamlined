import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import IdleClock from "./IdleClock";
import TransitionOverlay from "./TransitionOverlay";
import DashboardApp from "./DashboardApp";

const LandingPage = () => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleLaunch = () => {
    setIsLaunching(true);
    
    // Start transition overlay after clock activates
    setTimeout(() => {
      setShowTransition(true);
    }, 1500);

    // Show dashboard after transition
    setTimeout(() => {
      setShowDashboard(true);
    }, 3500);
  };

  if (showDashboard) {
    return <DashboardApp />;
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
          className="text-muted-foreground text-xs tracking-[0.4em] uppercase mb-16 font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          A Judicial Monitoring Platform
        </motion.p>

        {/* The Clock */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.2 }}
        >
          <IdleClock isActivating={isLaunching} />
        </motion.div>

        {/* Headlines */}
        <motion.div
          className="mt-16 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-3 tracking-tight">
            Justice is waiting.
          </h1>
          <p className="text-2xl md:text-3xl lg:text-4xl font-serif text-primary">
            Time is not.
          </p>
        </motion.div>

        {/* Launch Button */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
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

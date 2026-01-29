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
      {/* Full-screen background image */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ 
          opacity: 1, 
          scale: isLaunching ? 1.05 : 1 
        }}
        transition={{ duration: 2, delay: 0.2 }}
      >
        <img
          src={judicialHeroBg}
          alt="Scales of Justice"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay gradient for text readability - heavier on right side */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to right, 
                hsl(222 47% 3% / 0.3) 0%, 
                hsl(222 47% 3% / 0.6) 50%,
                hsl(222 47% 3% / 0.85) 100%
              ),
              linear-gradient(to bottom, 
                hsl(222 47% 3% / 0.5) 0%, 
                hsl(222 47% 3% / 0.3) 40%,
                hsl(222 47% 3% / 0.7) 100%
              )
            `
          }}
        />
        {/* Vignette effect */}
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 30% 50%, transparent 30%, hsl(222 47% 3% / 0.7) 100%)"
          }}
        />
        {/* Gold tint overlay when activating */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isLaunching ? 0.2 : 0
          }}
          transition={{ duration: 1.5 }}
          style={{
            background: "linear-gradient(135deg, hsl(43 52% 50% / 0.2), transparent 60%)"
          }}
        />
      </motion.div>

      {/* Top center - Platform label */}
      <motion.div
        className="relative z-10 w-full pt-12 md:pt-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isLaunching && showTransition ? 0 : 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <p className="text-center text-muted-foreground text-xs tracking-[0.4em] uppercase font-sans">
          A Judicial Monitoring Platform
        </p>
      </motion.div>

      {/* Main content - glassmorphism panel on right */}
      <motion.div
        className="relative z-10 flex-1 flex items-center justify-center md:justify-end px-6 md:px-12 lg:px-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLaunching && showTransition ? 0 : 1 }}
        transition={{ duration: 1 }}
      >
        {/* Glassmorphism Content Panel */}
        <motion.div 
          className="relative w-full max-w-lg p-8 md:p-10 lg:p-12 rounded-2xl"
          style={{
            background: "linear-gradient(135deg, hsl(222 47% 8% / 0.85), hsl(222 47% 5% / 0.9))",
            backdropFilter: "blur(20px)",
            border: "1px solid hsl(43 52% 50% / 0.15)",
            boxShadow: "0 8px 32px hsl(222 47% 3% / 0.5), inset 0 1px 0 hsl(43 52% 50% / 0.1)"
          }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          {/* System State Indicator */}
          <motion.div
            className="flex items-center justify-center gap-2 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <span className="text-xs font-sans text-muted-foreground/80 tracking-wider uppercase">
              System State: {isLaunching ? 'Monitoring Enabled' : 'Inactive'}
            </span>
            <span 
              className={`w-2 h-2 rounded-full transition-colors duration-1000 ${
                isLaunching ? 'bg-primary' : 'bg-muted-foreground/50'
              }`}
            />
          </motion.div>

          {/* Headlines */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-3 tracking-tight"
            >
              Justice is waiting.
            </h1>
            <p 
              className="text-xl md:text-2xl lg:text-3xl font-serif"
              style={{ color: "#C9A24D" }}
            >
              Time is not.
            </p>
          </motion.div>

          {/* Launch Button */}
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
          >
            <motion.button
              onClick={handleLaunch}
              disabled={isLaunching}
              className="group relative w-full px-8 py-4 font-sans text-sm tracking-[0.2em] uppercase transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
              style={{
                background: "hsl(222 47% 10%)",
                border: "1px solid #C9A24D",
                color: "#C9A24D",
                boxShadow: "0 4px 20px hsl(222 47% 3% / 0.6)"
              }}
              whileHover={{ 
                boxShadow: "0 4px 30px hsl(222 47% 3% / 0.8), 0 0 20px hsl(43 52% 50% / 0.2)",
                background: "hsl(222 47% 12%)"
              }}
            >
              <span className="relative z-10">
                {isLaunching ? "Initiating..." : "Enter Monitoring System"}
              </span>
              
              {/* Corner accents */}
              <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/60 rounded-tl transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-primary" />
              <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/60 rounded-tr transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-primary" />
              <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/60 rounded-bl transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-primary" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/60 rounded-br transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-primary" />
            </motion.button>

            <p className="text-muted-foreground/60 text-xs font-sans tracking-wide text-center">
              For authorized judicial and administrative use
            </p>
          </motion.div>
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
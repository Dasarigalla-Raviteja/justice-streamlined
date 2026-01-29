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

      {/* Main content - enterprise system panel */}
      <motion.div
        className="relative z-10 flex-1 flex items-center justify-center md:justify-end px-6 md:px-12 lg:px-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLaunching && showTransition ? 0 : 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Enterprise System Panel */}
        <motion.div 
          className="relative w-full max-w-md border border-border/60 bg-card/95"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Panel Header */}
          <div className="border-b border-border/60 px-6 py-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans text-muted-foreground tracking-wider uppercase">
                Judicial Monitoring Platform
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-sans text-muted-foreground/70 uppercase tracking-wide">
                  {isLaunching ? 'Active' : 'Standby'}
                </span>
                <span 
                  className={`w-2 h-2 rounded-full ${
                    isLaunching ? 'bg-primary' : 'bg-muted-foreground/40'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Panel Body */}
          <div className="px-6 py-8">
            {/* System Title */}
            <h1 className="text-2xl md:text-3xl font-serif text-foreground mb-2 tracking-tight">
              Justice is waiting.
            </h1>
            <p 
              className="text-lg md:text-xl font-serif mb-6"
              style={{ color: "#C9A24D" }}
            >
              Time is not.
            </p>

            {/* System Description */}
            <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-8">
              Real-time monitoring and accountability system for judicial proceedings. Track case timelines, identify delays, and ensure timely justice delivery.
            </p>

            {/* Status Indicators */}
            <div className="grid grid-cols-3 gap-4 mb-8 py-4 border-y border-border/40">
              <div className="text-center">
                <span className="block text-xs text-muted-foreground/70 uppercase tracking-wide mb-1">Cases</span>
                <span className="text-lg font-sans text-foreground">2,847</span>
              </div>
              <div className="text-center border-x border-border/40">
                <span className="block text-xs text-muted-foreground/70 uppercase tracking-wide mb-1">Pending</span>
                <span className="text-lg font-sans text-status-warning">412</span>
              </div>
              <div className="text-center">
                <span className="block text-xs text-muted-foreground/70 uppercase tracking-wide mb-1">Critical</span>
                <span className="text-lg font-sans text-status-danger">23</span>
              </div>
            </div>

            {/* Primary Action */}
            <motion.button
              onClick={handleLaunch}
              disabled={isLaunching}
              className="w-full px-6 py-3 font-sans text-sm tracking-wide uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isLaunching ? "Authenticating..." : "Access System"}
            </motion.button>
          </div>

          {/* Panel Footer */}
          <div className="border-t border-border/60 px-6 py-3">
            <p className="text-[11px] text-muted-foreground/60 font-sans text-center tracking-wide">
              Authorized personnel only • Secure connection required
            </p>
          </div>
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
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Input } from "./ui/input";
import DashboardApp from "./DashboardApp";

const LoginGate = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsAuthenticating(true);

    // Simulate authentication delay
    setTimeout(() => {
      if (username === "admin" && password === "admin") {
        setAccessGranted(true);
        setTimeout(() => {
          setShowDashboard(true);
        }, 1500);
      } else {
        setError("Invalid credentials. Access denied.");
        setIsAuthenticating(false);
      }
    }, 1500);
  };

  const handleExit = () => {
    setShowDashboard(false);
    setAccessGranted(false);
    setIsAuthenticating(false);
    setUsername("");
    setPassword("");
  };

  if (showDashboard) {
    return <DashboardApp onExit={handleExit} />;
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
        className="relative z-10 flex flex-col items-center w-full max-w-md px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: accessGranted ? 0 : 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* System Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <p className="text-muted-foreground text-xs tracking-[0.3em] uppercase font-sans">
            Judicial Case Monitoring System
          </p>
        </motion.div>

        {/* Login Panel */}
        <motion.div
          className="w-full border border-border/30 bg-card/5 backdrop-blur-sm p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {/* Security Notice */}
          <p className="text-muted-foreground/60 text-[10px] tracking-wider text-center mb-8 font-sans">
            Restricted Access — Authorized Judicial and Administrative Personnel Only
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="text-muted-foreground text-xs tracking-wider uppercase font-sans">
                Username / Official ID
              </label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-background/50 border-border/40 h-12 text-foreground placeholder:text-muted-foreground/30 focus:border-primary/50 transition-colors"
                placeholder=""
                disabled={isAuthenticating}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-muted-foreground text-xs tracking-wider uppercase font-sans">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background/50 border-border/40 h-12 text-foreground placeholder:text-muted-foreground/30 focus:border-primary/50 transition-colors"
                placeholder=""
                disabled={isAuthenticating}
              />
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-destructive text-xs text-center font-sans"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isAuthenticating || !username || !password}
              className="w-full py-4 bg-transparent border border-primary/50 text-foreground font-sans text-sm tracking-[0.15em] uppercase transition-all duration-500 hover:border-primary hover:bg-primary/5 disabled:opacity-40 disabled:cursor-not-allowed"
              whileHover={!isAuthenticating ? { 
                boxShadow: "0 0 20px hsl(43 52% 59% / 0.15)" 
              } : {}}
            >
              {isAuthenticating ? "Authenticating..." : "Verify Credentials"}
            </motion.button>
          </form>

          {/* System Verification Indicators */}
          <div className="mt-8 pt-6 border-t border-border/20 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/70" />
              <span className="text-[10px] font-sans text-muted-foreground/60 tracking-wider">
                Security Mode: Active
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
              <span className="text-[10px] font-sans text-muted-foreground/60 tracking-wider">
                Access Level: Judicial Monitoring
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Access Granted Overlay */}
      <AnimatePresence>
        {accessGranted && (
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p
              className="text-foreground text-lg tracking-[0.3em] uppercase font-sans"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Access Granted
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginGate;

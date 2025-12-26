import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Calendar, AlertTriangle, FileText, Gavel, CheckCircle, CircleDot, History } from "lucide-react";

interface CaseData {
  id: string;
  category: string;
  priority: string;
  status: "on-track" | "warning" | "delayed";
  statusLabel: string;
  court: string;
  nextHearing: string;
  delayDays?: number;
  filingDate: string;
  parties: string;
}

interface TimelineStage {
  stage: string;
  planned: string;
  actual: string | null;
  delay: number;
  completed: boolean;
}

interface CaseDetailPanelProps {
  caseData: CaseData | null;
  isOpen: boolean;
  onClose: () => void;
}

const CaseDetailPanel = ({ caseData, isOpen, onClose }: CaseDetailPanelProps) => {
  if (!caseData) return null;

  const timelineStages: TimelineStage[] = [
    { stage: "Case Filing", planned: caseData.filingDate, actual: caseData.filingDate, delay: 0, completed: true },
    { stage: "Notice Issued", planned: "2024-02-15", actual: "2024-02-18", delay: 3, completed: true },
    { stage: "First Hearing", planned: "2024-03-10", actual: "2024-03-10", delay: 0, completed: true },
    { stage: "Evidence Submission", planned: "2024-04-20", actual: "2024-05-02", delay: 12, completed: true },
    { stage: "Arguments", planned: "2024-06-15", actual: null, delay: 0, completed: false },
    { stage: "Final Order", planned: "2024-08-01", actual: null, delay: 0, completed: false },
  ];

  const alerts = [
    { type: "warning", message: "Multiple adjournments detected (3 in last 60 days)" },
    { type: "info", message: "Expected hearing gap exceeded by 8 days" },
  ];

  const auditHistory = [
    { date: "2024-05-02", action: "Evidence deadline extended", reason: "Additional documents requested by counsel" },
    { date: "2024-04-15", action: "Hearing rescheduled", reason: "Court holiday adjustment" },
    { date: "2024-03-10", action: "First hearing completed", reason: "Preliminary arguments heard" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track": return "bg-[hsl(var(--status-success))]";
      case "warning": return "bg-[hsl(var(--status-warning))]";
      case "delayed": return "bg-[hsl(var(--status-danger))]";
      default: return "bg-muted";
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "on-track": return "text-[hsl(var(--status-success))]";
      case "warning": return "text-[hsl(var(--status-warning))]";
      case "delayed": return "text-[hsl(var(--status-danger))]";
      default: return "text-muted-foreground";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-xl bg-card border-l border-border/50 z-50 overflow-hidden flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="p-6 border-b border-border/30 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-xl text-foreground">{caseData.id}</h2>
                  <span className={`text-xs px-2 py-1 rounded ${getStatusColor(caseData.status)}/20 ${getStatusTextColor(caseData.status)}`}>
                    {caseData.statusLabel}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{caseData.parties}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Section 1: Case Overview */}
              <section>
                <h3 className="font-serif text-lg text-foreground mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  Case Overview
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-panel p-4">
                    <p className="text-xs text-muted-foreground mb-1">Category</p>
                    <p className="text-sm text-foreground">{caseData.category}</p>
                  </div>
                  <div className="glass-panel p-4">
                    <p className="text-xs text-muted-foreground mb-1">Priority</p>
                    <p className="text-sm text-foreground">{caseData.priority}</p>
                  </div>
                  <div className="glass-panel p-4">
                    <p className="text-xs text-muted-foreground mb-1">Assigned Court</p>
                    <p className="text-sm text-foreground">{caseData.court}</p>
                  </div>
                  <div className="glass-panel p-4">
                    <p className="text-xs text-muted-foreground mb-1">Next Hearing</p>
                    <p className="text-sm text-foreground">{caseData.nextHearing}</p>
                  </div>
                </div>
              </section>

              {/* Section 2: Case Timeline */}
              <section>
                <h3 className="font-serif text-lg text-foreground mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  Case Timeline
                </h3>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-3 top-3 bottom-3 w-0.5 bg-border/50" />
                  
                  <div className="space-y-4">
                    {timelineStages.map((stage, index) => (
                      <div key={index} className="relative flex gap-4 pl-8">
                        {/* Node */}
                        <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center ${
                          stage.completed 
                            ? stage.delay > 0 
                              ? "bg-[hsl(var(--status-warning))]/20" 
                              : "bg-[hsl(var(--status-success))]/20"
                            : "bg-muted/50"
                        }`}>
                          {stage.completed ? (
                            stage.delay > 0 ? (
                              <AlertTriangle className="w-3 h-3 text-[hsl(var(--status-warning))]" />
                            ) : (
                              <CheckCircle className="w-3 h-3 text-[hsl(var(--status-success))]" />
                            )
                          ) : (
                            <CircleDot className="w-3 h-3 text-muted-foreground" />
                          )}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 glass-panel p-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-foreground">{stage.stage}</p>
                            {stage.delay > 0 && (
                              <span className="text-xs text-[hsl(var(--status-warning))]">
                                +{stage.delay} days
                              </span>
                            )}
                          </div>
                          <div className="flex gap-6 text-xs text-muted-foreground">
                            <div>
                              <span className="text-muted-foreground/70">Planned: </span>
                              {stage.planned}
                            </div>
                            <div>
                              <span className="text-muted-foreground/70">Actual: </span>
                              {stage.actual || "Pending"}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Section 3: Alerts & Monitoring Flags */}
              <section>
                <h3 className="font-serif text-lg text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-primary" />
                  Monitoring Alerts
                </h3>
                <div className="space-y-3">
                  {alerts.map((alert, index) => (
                    <div 
                      key={index} 
                      className={`glass-panel p-4 border-l-2 ${
                        alert.type === "warning" 
                          ? "border-l-[hsl(var(--status-warning))]" 
                          : "border-l-primary"
                      }`}
                    >
                      <p className="text-sm text-foreground">{alert.message}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 4: Audit & Action History */}
              <section>
                <h3 className="font-serif text-lg text-foreground mb-4 flex items-center gap-2">
                  <History className="w-4 h-4 text-primary" />
                  Audit History
                </h3>
                <div className="space-y-3">
                  {auditHistory.map((entry, index) => (
                    <div key={index} className="glass-panel p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-foreground">{entry.action}</p>
                        <span className="text-xs text-muted-foreground">{entry.date}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{entry.reason}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Footer Disclaimer */}
            <div className="p-4 border-t border-border/30 bg-muted/20">
              <p className="text-xs text-muted-foreground text-center">
                This system supports monitoring and scheduling only. All judicial decisions remain with the court.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CaseDetailPanel;

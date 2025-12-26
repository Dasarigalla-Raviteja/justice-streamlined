import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Filter, ArrowUpDown, Calendar, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import CaseDetailPanel from "./CaseDetailPanel";

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
  progress: number;
}

const ActiveCasesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortBy, setSortBy] = useState("hearing");
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const cases: CaseData[] = [
    { id: "CIV-2024-0847", category: "Civil Dispute", priority: "Standard", status: "on-track", statusLabel: "On Track", court: "District Court, Delhi", nextHearing: "2024-12-28", filingDate: "2024-01-15", parties: "Sharma vs. Municipal Corp.", progress: 65 },
    { id: "CRM-2024-1203", category: "Criminal Case", priority: "High", status: "warning", statusLabel: "Warning", court: "Sessions Court, Mumbai", nextHearing: "2024-12-30", delayDays: 8, filingDate: "2024-02-20", parties: "State vs. Mehta", progress: 45 },
    { id: "FAM-2024-0392", category: "Family Court", priority: "Standard", status: "on-track", statusLabel: "On Track", court: "Family Court, Bangalore", nextHearing: "2025-01-05", filingDate: "2024-03-10", parties: "Reddy vs. Reddy", progress: 30 },
    { id: "COM-2024-0156", category: "Commercial", priority: "Urgent", status: "delayed", statusLabel: "Delayed", court: "High Court, Chennai", nextHearing: "2024-12-27", delayDays: 21, filingDate: "2023-11-05", parties: "TechCorp vs. InfoSys Ltd.", progress: 80 },
    { id: "CIV-2024-1089", category: "Civil Dispute", priority: "Standard", status: "on-track", statusLabel: "On Track", court: "District Court, Kolkata", nextHearing: "2025-01-10", filingDate: "2024-04-22", parties: "Das vs. State Bank", progress: 25 },
    { id: "TAX-2024-0234", category: "Taxation", priority: "High", status: "warning", statusLabel: "Warning", court: "Tax Tribunal, Delhi", nextHearing: "2024-12-29", delayDays: 5, filingDate: "2024-01-30", parties: "Revenue vs. GlobalTrade Inc.", progress: 55 },
    { id: "CON-2024-0018", category: "Constitutional", priority: "Urgent", status: "on-track", statusLabel: "On Track", court: "Supreme Court", nextHearing: "2025-01-15", filingDate: "2024-05-01", parties: "Citizens Forum vs. Union of India", progress: 40 },
    { id: "CRM-2024-0892", category: "Criminal Case", priority: "High", status: "delayed", statusLabel: "Delayed", court: "Sessions Court, Hyderabad", nextHearing: "2024-12-26", delayDays: 14, filingDate: "2023-12-10", parties: "State vs. Rao", progress: 70 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on-track": return <CheckCircle className="w-4 h-4 text-[hsl(var(--status-success))]" />;
      case "warning": return <Clock className="w-4 h-4 text-[hsl(var(--status-warning))]" />;
      case "delayed": return <AlertTriangle className="w-4 h-4 text-[hsl(var(--status-danger))]" />;
      default: return null;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "on-track": return "bg-[hsl(var(--status-success))]/10 text-[hsl(var(--status-success))]";
      case "warning": return "bg-[hsl(var(--status-warning))]/10 text-[hsl(var(--status-warning))]";
      case "delayed": return "bg-[hsl(var(--status-danger))]/10 text-[hsl(var(--status-danger))]";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "on-track": return "bg-[hsl(var(--status-success))]";
      case "warning": return "bg-[hsl(var(--status-warning))]";
      case "delayed": return "bg-[hsl(var(--status-danger))]";
      default: return "bg-primary";
    }
  };

  const handleCaseClick = (caseData: CaseData) => {
    setSelectedCase(caseData);
    setIsPanelOpen(true);
  };

  const filteredCases = cases.filter((c) => {
    if (searchQuery && !c.id.toLowerCase().includes(searchQuery.toLowerCase()) && !c.parties.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (categoryFilter && c.category !== categoryFilter) return false;
    if (statusFilter && c.status !== statusFilter) return false;
    if (priorityFilter && c.priority !== priorityFilter) return false;
    return true;
  });

  const sortedCases = [...filteredCases].sort((a, b) => {
    if (sortBy === "hearing") {
      return new Date(a.nextHearing).getTime() - new Date(b.nextHearing).getTime();
    }
    if (sortBy === "delay") {
      return (b.delayDays || 0) - (a.delayDays || 0);
    }
    return 0;
  });

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="h-16 bg-card/50 border-b border-border/30 flex items-center justify-between px-6">
        <div>
          <h2 className="font-serif text-xl text-foreground">Active Cases</h2>
          <p className="text-xs text-muted-foreground">Monitor case progress and identify timeline deviations</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--status-success))]" />
            {sortedCases.length} cases displayed
          </div>
        </div>
      </header>

      {/* Control Bar */}
      <div className="p-4 bg-card/30 border-b border-border/20">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by Case ID or party name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-muted/50 border border-border/50 rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-muted/50 border border-border/50 rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
            >
              <option value="">All Categories</option>
              <option value="Civil Dispute">Civil Dispute</option>
              <option value="Criminal Case">Criminal Case</option>
              <option value="Family Court">Family Court</option>
              <option value="Commercial">Commercial</option>
              <option value="Constitutional">Constitutional</option>
              <option value="Taxation">Taxation</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-muted/50 border border-border/50 rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
            >
              <option value="">All Status</option>
              <option value="on-track">On Track</option>
              <option value="warning">Warning</option>
              <option value="delayed">Delayed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-muted/50 border border-border/50 rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
            >
              <option value="">All Priorities</option>
              <option value="Standard">Standard</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-muted/50 border border-border/50 rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
            >
              <option value="hearing">Next Hearing Date</option>
              <option value="delay">Delay Severity</option>
            </select>
          </div>
        </div>
      </div>

      {/* Case Grid */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {sortedCases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              className="glass-panel p-5 cursor-pointer hover:border-primary/30 transition-all duration-200 hover:shadow-[var(--glow-gold)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleCaseClick(caseItem)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-serif text-lg text-foreground">{caseItem.id}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{caseItem.category}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded flex items-center gap-1.5 ${getStatusBadgeClass(caseItem.status)}`}>
                  {getStatusIcon(caseItem.status)}
                  {caseItem.statusLabel}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                  <span>Case Progress</span>
                  <span>{caseItem.progress}%</span>
                </div>
                <div className="h-1.5 bg-muted/50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${getProgressColor(caseItem.status)}`}
                    style={{ width: `${caseItem.progress}%` }}
                  />
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Next: {caseItem.nextHearing}</span>
                </div>
                {caseItem.delayDays && (
                  <div className="flex items-center gap-2 text-[hsl(var(--status-danger))]">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Delayed by {caseItem.delayDays} days</span>
                  </div>
                )}
              </div>

              {/* Priority Badge */}
              <div className="mt-4 pt-3 border-t border-border/20">
                <span className={`text-xs px-2 py-1 rounded ${
                  caseItem.priority === "Urgent" 
                    ? "bg-[hsl(var(--status-danger))]/10 text-[hsl(var(--status-danger))]"
                    : caseItem.priority === "High"
                    ? "bg-[hsl(var(--status-warning))]/10 text-[hsl(var(--status-warning))]"
                    : "bg-primary/10 text-primary"
                }`}>
                  {caseItem.priority} Priority
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {sortedCases.length === 0 && (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">No cases match the selected filters.</p>
          </div>
        )}
      </div>

      {/* Case Detail Panel */}
      <CaseDetailPanel
        caseData={selectedCase}
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      />
    </div>
  );
};

export default ActiveCasesPage;

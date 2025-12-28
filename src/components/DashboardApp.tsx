import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { FileText, Clock, CheckCircle, AlertTriangle, BarChart3, Users, Settings, LogOut, Scale, Shield, Loader2 } from "lucide-react";
import ActiveCasesPage from "./ActiveCasesPage";

interface DashboardAppProps {
  onExit?: () => void;
}

const DashboardApp = ({ onExit }: DashboardAppProps) => {
  const [activeTab, setActiveTab] = useState("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sidebarItems = [
    { id: "upload", icon: Scale, label: "Case Upload" },
    { id: "cases", icon: FileText, label: "Active Cases" },
    { id: "timeline", icon: Clock, label: "Timeline" },
    { id: "analytics", icon: BarChart3, label: "Analytics" },
    { id: "users", icon: Users, label: "Users" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
    setSelectedFile(null);
    setCategory("");
    setPriority("");
  };

  const isFormValid = selectedFile && category && priority;

  const recentActivity = [
    { id: "CIV-2024-0847", status: "On Schedule", statusType: "success", action: "Hearing completed within expected timeline", time: "2 hours ago" },
    { id: "CRM-2024-1203", status: "Pending", statusType: "warning", action: "Rescheduling requested — awaiting judicial approval", time: "4 hours ago" },
    { id: "FAM-2024-0392", status: "On Schedule", statusType: "success", action: "Evidence submission deadline met", time: "6 hours ago" },
    { id: "COM-2024-0156", status: "Overdue", statusType: "danger", action: "Hearing exceeded scheduled timeline — requires attention", time: "1 day ago" },
  ];

  return (
    <motion.div
      className="min-h-screen bg-background flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border/50 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-border/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-primary/50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-serif text-lg text-foreground">Time of Justice</h1>
              <p className="text-xs text-muted-foreground">Monitoring System</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                    activeTab === item.id
                      ? "bg-primary/10 text-primary border-l-2 border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-border/30">
          <button 
            onClick={onExit}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Exit System
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {activeTab === "cases" ? (
          <ActiveCasesPage />
        ) : (
          <>
            {/* Header */}
            <header className="h-16 bg-card/50 border-b border-border/30 flex items-center justify-between px-6">
              <div>
                <h2 className="font-serif text-xl text-foreground">Case Upload & Analysis</h2>
                <p className="text-xs text-muted-foreground">Submit official case documents for judicial timeline monitoring</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-[hsl(var(--status-success))]" />
                  System Active
                </div>
              </div>
            </header>

        {/* Content area */}
        <div className="flex-1 p-6 overflow-auto">
          {/* Operational Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <motion.div
              className="glass-panel p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Active Cases</p>
                  <p className="text-3xl font-serif text-primary mt-1">2,847</p>
                  <p className="text-xs text-muted-foreground mt-2">Cases currently under monitoring</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="glass-panel p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">On Schedule</p>
                  <p className="text-3xl font-serif text-[hsl(var(--status-success))] mt-1">1,923</p>
                  <p className="text-xs text-muted-foreground mt-2">Proceeding within defined timelines</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-[hsl(var(--status-success))]/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-[hsl(var(--status-success))]" />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="glass-panel p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Requires Attention</p>
                  <p className="text-3xl font-serif text-[hsl(var(--status-danger))] mt-1">312</p>
                  <p className="text-xs text-muted-foreground mt-2">Cases exceeding expected timelines</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-[hsl(var(--status-danger))]/10 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-[hsl(var(--status-danger))]" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Upload section */}
          <motion.div
            className="glass-panel p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Scale className="w-6 h-6 text-primary" />
              <h3 className="font-serif text-xl text-foreground">Upload Case Documents</h3>
            </div>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".pdf"
              className="hidden"
            />
            
            <div 
              onClick={handleUploadClick}
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 cursor-pointer ${
                selectedFile 
                  ? "border-primary/50 bg-primary/5" 
                  : "border-border/50 hover:border-primary/30 hover:bg-muted/20"
              }`}
            >
              {selectedFile ? (
                <>
                  <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                  <p className="text-foreground font-medium mb-1">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB — Click to change file
                  </p>
                </>
              ) : (
                <>
                  <Scale className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-foreground mb-2">Select official case documents from your device to initiate monitoring</p>
                  <p className="text-sm text-primary/80">Supported format: PDF only</p>
                </>
              )}
            </div>

            {/* Security Notice */}
            <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
              <Shield className="w-3.5 h-3.5 text-[hsl(43,59%,54%)]" />
              <span>All documents are securely processed and accessible only to authorized judicial personnel.</span>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-foreground mb-2">Case Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-muted/50 border border-border/50 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                >
                  <option value="">Select Category</option>
                  <option value="civil">Civil Dispute</option>
                  <option value="criminal">Criminal Case</option>
                  <option value="family">Family Court</option>
                  <option value="commercial">Commercial Litigation</option>
                  <option value="constitutional">Constitutional Matter</option>
                  <option value="taxation">Taxation</option>
                </select>
                <p className="text-xs text-muted-foreground mt-2">Used to estimate standard judicial timelines</p>
              </div>
              <div>
                <label className="block text-sm text-foreground mb-2">Priority Level</label>
                <select 
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full bg-muted/50 border border-border/50 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                >
                  <option value="">Select Priority</option>
                  <option value="standard">Standard</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent</option>
                </select>
                <p className="text-xs text-muted-foreground mt-2">Affects monitoring alerts, not judicial decisions</p>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-4">
              <button 
                onClick={() => {
                  setSelectedFile(null);
                  setCategory("");
                  setPriority("");
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
                className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear Form
              </button>
              <button 
                onClick={handleAnalyze}
                disabled={!isFormValid || isAnalyzing}
                className={`px-6 py-3 font-medium rounded-lg flex items-center gap-2 transition-all duration-300 ${
                  isFormValid && !isAnalyzing
                    ? "bg-[hsl(var(--btn-judicial))] text-[hsl(var(--btn-judicial-foreground))] hover:bg-[hsl(var(--btn-judicial-hover))] hover:shadow-[var(--glow-gold)]"
                    : "bg-[hsl(var(--btn-judicial-disabled))] text-muted-foreground cursor-not-allowed"
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Generate Monitoring Timeline"
                )}
              </button>
            </div>
          </motion.div>

          {/* Recent activity */}
          <motion.div
            className="glass-panel p-8 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="font-serif text-xl text-foreground mb-6">Recent Case Activity</h3>
            
            <div className="space-y-4">
              {recentActivity.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-4 border-b border-border/30 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className={`w-2.5 h-2.5 rounded-full ${
                      item.statusType === "success" ? "bg-[hsl(var(--status-success))]" :
                      item.statusType === "warning" ? "bg-[hsl(var(--status-warning))]" :
                      "bg-[hsl(var(--status-danger))]"
                    }`} />
                    <div>
                      <div className="flex items-center gap-3">
                        <p className="text-foreground font-medium">{item.id}</p>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          item.statusType === "success" 
                            ? "bg-[hsl(var(--status-success))]/10 text-[hsl(var(--status-success))]" 
                            : item.statusType === "warning"
                            ? "bg-[hsl(var(--status-warning))]/10 text-[hsl(var(--status-warning))]"
                            : "bg-[hsl(var(--status-danger))]/10 text-[hsl(var(--status-danger))]"
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{item.action}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground/70">{item.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
          </>
        )}
      </main>
    </motion.div>
  );
};

export default DashboardApp;

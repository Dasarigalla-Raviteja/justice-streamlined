import { motion } from "framer-motion";
import { useState } from "react";
import { Upload, FileText, Clock, CheckCircle, AlertTriangle, Calendar, BarChart3, Users, Settings, LogOut } from "lucide-react";

const DashboardApp = () => {
  const [activeTab, setActiveTab] = useState("upload");

  const sidebarItems = [
    { id: "upload", icon: Upload, label: "Case Upload" },
    { id: "cases", icon: FileText, label: "Active Cases" },
    { id: "timeline", icon: Clock, label: "Timeline" },
    { id: "analytics", icon: BarChart3, label: "Analytics" },
    { id: "users", icon: Users, label: "Users" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <motion.div
      className="min-h-screen bg-secondary/30 flex"
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
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="w-4 h-4" />
            Exit System
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-card/50 border-b border-border/30 flex items-center justify-between px-6">
          <div>
            <h2 className="font-serif text-xl text-foreground">Case Upload & Analysis</h2>
            <p className="text-xs text-muted-foreground">Submit case files for ML-powered timeline analysis</p>
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
          {/* Stats row */}
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
                  <p className="text-3xl font-serif text-foreground mt-1">2,847</p>
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
            <h3 className="font-serif text-xl text-foreground mb-6">Upload Case Files</h3>
            
            <div className="border-2 border-dashed border-border/50 rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-foreground mb-2">Drop case files here or click to browse</p>
              <p className="text-sm text-muted-foreground">Supports PDF, DOCX, and structured data formats</p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Case Category</label>
                <select className="w-full bg-muted/50 border border-border/50 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary/50">
                  <option>Civil Dispute</option>
                  <option>Criminal Case</option>
                  <option>Family Court</option>
                  <option>Commercial Litigation</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Priority Level</label>
                <select className="w-full bg-muted/50 border border-border/50 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary/50">
                  <option>Standard</option>
                  <option>High Priority</option>
                  <option>Urgent</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors">
                Cancel
              </button>
              <button className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Analyze & Generate Timeline
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
              {[
                { id: "CIV-2024-0847", status: "success", action: "Hearing completed on schedule", time: "2 hours ago" },
                { id: "CRM-2024-1203", status: "warning", action: "Rescheduling requested - awaiting approval", time: "4 hours ago" },
                { id: "FAM-2024-0392", status: "success", action: "Evidence submission deadline met", time: "6 hours ago" },
                { id: "COM-2024-0156", status: "danger", action: "Hearing overdue - immediate action required", time: "1 day ago" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between py-4 border-b border-border/30 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${
                      item.status === "success" ? "bg-[hsl(var(--status-success))]" :
                      item.status === "warning" ? "bg-[hsl(var(--status-warning))]" :
                      "bg-[hsl(var(--status-danger))]"
                    }`} />
                    <div>
                      <p className="text-foreground font-medium">{item.id}</p>
                      <p className="text-sm text-muted-foreground">{item.action}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
};

export default DashboardApp;

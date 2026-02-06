import { useState, useRef, useEffect } from "react";
import { FileText, Clock, BarChart3, Users, Settings, LogOut, Upload, AlertCircle, CheckCircle, Home } from "lucide-react";
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
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  };
  const navItems = [
    { id: "home", label: "Home" },
    { id: "upload", label: "Case Upload" },
    { id: "cases", label: "Case Status" },
    { id: "reports", label: "Reports" },
    { id: "users", label: "Users" },
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

  const recentCases = [
    { id: "CIV/2024/0847", type: "Civil", status: "On Schedule", court: "District Court, Delhi", date: "15-01-2024" },
    { id: "CRM/2024/1203", type: "Criminal", status: "Pending", court: "Sessions Court, Mumbai", date: "14-01-2024" },
    { id: "FAM/2024/0392", type: "Family", status: "Disposed", court: "Family Court, Chennai", date: "13-01-2024" },
    { id: "COM/2024/0156", type: "Commercial", status: "Delayed", court: "High Court, Kolkata", date: "12-01-2024" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Government Header */}
      <header className="govt-header">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-foreground/20 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Judicial Case Monitoring System</h1>
                <p className="text-xs text-primary-foreground/80">Government of India | Department of Justice</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/80">
              <span>{formatDate(currentTime)}</span>
              <span className="font-mono">{formatTime(currentTime)}</span>
              <span>Welcome, Administrator</span>
              <button 
                onClick={onExit}
                className="flex items-center gap-1 hover:text-primary-foreground"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto">
          <ul className="flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-2 text-sm border-b-2 transition-colors ${
                    activeTab === item.id
                      ? "border-primary text-primary font-medium bg-background"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:bg-background/50"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4">
        {activeTab === "cases" ? (
          <ActiveCasesPage />
        ) : (
          <>
            {/* Breadcrumb */}
            <div className="text-sm text-muted-foreground mb-4">
              Home &gt; Case Upload &gt; Submit New Case
            </div>

            {/* Statistics Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="govt-stat-tile">
                <p className="text-sm text-muted-foreground mb-1">Active Cases</p>
                <p className="text-2xl font-bold text-foreground">2,847</p>
                <p className="text-xs text-muted-foreground mt-1">Currently under monitoring</p>
              </div>
              <div className="govt-stat-tile">
                <p className="text-sm text-muted-foreground mb-1">Pending Cases</p>
                <p className="text-2xl font-bold text-status-warning">612</p>
                <p className="text-xs text-muted-foreground mt-1">Awaiting next hearing</p>
              </div>
              <div className="govt-stat-tile">
                <p className="text-sm text-muted-foreground mb-1">Disposed Cases</p>
                <p className="text-2xl font-bold text-status-success">4,521</p>
                <p className="text-xs text-muted-foreground mt-1">Successfully resolved</p>
              </div>
              <div className="govt-stat-tile">
                <p className="text-sm text-muted-foreground mb-1">Delayed Cases</p>
                <p className="text-2xl font-bold text-status-danger">89</p>
                <p className="text-xs text-muted-foreground mt-1">Exceeding timelines</p>
              </div>
            </div>

            {/* Upload Section */}
            <div className="govt-section mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Upload Case Documents
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* File Upload */}
                <div>
                  <label className="govt-label">Select Case Document (PDF only)</label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept=".pdf"
                    className="hidden"
                  />
                  <div 
                    onClick={handleUploadClick}
                    className={`border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${
                      selectedFile 
                        ? "border-status-success bg-status-success/5" 
                        : "border-border hover:border-primary hover:bg-muted/50"
                    }`}
                  >
                    {selectedFile ? (
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5 text-status-success" />
                        <span className="text-sm">{selectedFile.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Click to select PDF file</p>
                        <p className="text-xs text-muted-foreground mt-1">Maximum file size: 10MB</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="govt-label">Select Case Category</label>
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="govt-select"
                    >
                      <option value="">-- Select Category --</option>
                      <option value="civil">Civil Dispute</option>
                      <option value="criminal">Criminal Case</option>
                      <option value="family">Family Court</option>
                      <option value="commercial">Commercial Litigation</option>
                      <option value="constitutional">Constitutional Matter</option>
                      <option value="taxation">Taxation</option>
                    </select>
                  </div>
                  <div>
                    <label className="govt-label">Select Priority Level</label>
                    <select 
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="govt-select"
                    >
                      <option value="">-- Select Priority --</option>
                      <option value="standard">Standard</option>
                      <option value="high">High Priority</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 pt-4 border-t border-border">
                <button 
                  onClick={handleAnalyze}
                  disabled={!isFormValid || isAnalyzing}
                  className="govt-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? "Processing..." : "Submit"}
                </button>
                <button 
                  onClick={handleAnalyze}
                  disabled={!isFormValid || isAnalyzing}
                  className="govt-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Generate Case Timeline
                </button>
                <button 
                  onClick={() => {
                    setSelectedFile(null);
                    setCategory("");
                    setPriority("");
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  className="govt-btn-secondary"
                >
                  Clear Form
                </button>
              </div>

              {/* Notice */}
              <div className="flex items-start gap-2 mt-4 p-3 bg-muted border border-border">
                <AlertCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  All documents are processed securely and accessible only to authorized judicial personnel. 
                  Ensure the uploaded document is an official court filing.
                </p>
              </div>
            </div>

            {/* Recent Cases Table */}
            <div className="govt-section">
              <h2 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
                Recent Case Filings
              </h2>
              
              <table className="govt-table">
                <thead>
                  <tr>
                    <th>Case Number</th>
                    <th>Case Type</th>
                    <th>Court</th>
                    <th>Filing Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCases.map((item, index) => (
                    <tr key={index}>
                      <td className="font-medium">{item.id}</td>
                      <td>{item.type}</td>
                      <td>{item.court}</td>
                      <td>{item.date}</td>
                      <td>
                        <span className={`px-2 py-0.5 text-xs ${
                          item.status === "On Schedule" 
                            ? "bg-status-success/10 text-status-success" 
                            : item.status === "Pending"
                            ? "bg-status-warning/10 text-status-warning"
                            : item.status === "Disposed"
                            ? "bg-muted text-muted-foreground"
                            : "bg-status-danger/10 text-status-danger"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <button className="text-primary hover:underline text-sm">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end mt-4">
                <button className="text-primary hover:underline text-sm">
                  View All Cases &rarr;
                </button>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-muted border-t border-border mt-8 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <div>
              <p>© 2024 Department of Justice, Government of India. All Rights Reserved.</p>
              <p className="mt-1">Designed and Developed by National Informatics Centre (NIC)</p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-foreground">Terms of Use</a>
              <a href="#" className="hover:text-foreground">Privacy Policy</a>
              <a href="#" className="hover:text-foreground">Disclaimer</a>
              <a href="#" className="hover:text-foreground">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardApp;

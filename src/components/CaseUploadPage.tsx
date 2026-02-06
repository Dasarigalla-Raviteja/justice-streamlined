import { useState, useRef } from "react";
import { Upload, AlertCircle, CheckCircle } from "lucide-react";

const CaseUploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div>
      <div className="text-sm text-muted-foreground mb-4">
        Home &gt; Case Upload &gt; Submit New Case
      </div>

      <div className="bg-card rounded-lg border border-border shadow-sm p-5">
        <h2 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
          Upload Case Documents
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="govt-label">Select Case Document (PDF only)</label>
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept=".pdf" className="hidden" />
            <div
              onClick={handleUploadClick}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                selectedFile ? "border-green-400 bg-green-50" : "border-border hover:border-primary hover:bg-muted/50"
              }`}
            >
              {selectedFile ? (
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
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

          <div className="space-y-4">
            <div>
              <label className="govt-label">Select Case Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="govt-select rounded">
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
              <select value={priority} onChange={(e) => setPriority(e.target.value)} className="govt-select rounded">
                <option value="">-- Select Priority --</option>
                <option value="standard">Standard</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6 pt-4 border-t border-border">
          <button onClick={handleAnalyze} disabled={!isFormValid || isAnalyzing} className="govt-btn-primary rounded disabled:opacity-50 disabled:cursor-not-allowed">
            {isAnalyzing ? "Processing..." : "Submit"}
          </button>
          <button onClick={handleAnalyze} disabled={!isFormValid || isAnalyzing} className="govt-btn-primary rounded disabled:opacity-50 disabled:cursor-not-allowed">
            Generate Case Timeline
          </button>
          <button onClick={() => { setSelectedFile(null); setCategory(""); setPriority(""); if (fileInputRef.current) fileInputRef.current.value = ""; }} className="govt-btn-secondary rounded">
            Clear Form
          </button>
        </div>

        <div className="flex items-start gap-2 mt-4 p-3 bg-muted rounded border border-border">
          <AlertCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            All documents are processed securely and accessible only to authorized judicial personnel.
            Ensure the uploaded document is an official court filing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaseUploadPage;

import { useState } from "react";
import { Search, Filter, Eye, X } from "lucide-react";

interface Case {
  id: string;
  type: string;
  parties: string;
  court: string;
  filingDate: string;
  nextHearing: string;
  status: "On Track" | "Warning" | "Delayed";
  priority: "Standard" | "High" | "Urgent";
}

const ActiveCasesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  const cases: Case[] = [
    { id: "CIV/2024/0847", type: "Civil", parties: "Sharma vs. State", court: "District Court, Delhi", filingDate: "15-01-2024", nextHearing: "22-01-2024", status: "On Track", priority: "Standard" },
    { id: "CRM/2024/1203", type: "Criminal", parties: "State vs. Kumar", court: "Sessions Court, Mumbai", filingDate: "14-01-2024", nextHearing: "25-01-2024", status: "Warning", priority: "High" },
    { id: "FAM/2024/0392", type: "Family", parties: "Gupta vs. Gupta", court: "Family Court, Chennai", filingDate: "13-01-2024", nextHearing: "20-01-2024", status: "On Track", priority: "Standard" },
    { id: "COM/2024/0156", type: "Commercial", parties: "ABC Ltd. vs. XYZ Corp.", court: "High Court, Kolkata", filingDate: "12-01-2024", nextHearing: "28-01-2024", status: "Delayed", priority: "Urgent" },
    { id: "CIV/2024/0923", type: "Civil", parties: "Patel vs. Singh", court: "District Court, Ahmedabad", filingDate: "11-01-2024", nextHearing: "23-01-2024", status: "On Track", priority: "Standard" },
    { id: "CRM/2024/1156", type: "Criminal", parties: "State vs. Verma", court: "Sessions Court, Bangalore", filingDate: "10-01-2024", nextHearing: "24-01-2024", status: "Warning", priority: "High" },
  ];

  const filteredCases = cases.filter(c => {
    const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         c.parties.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || c.type.toLowerCase() === categoryFilter.toLowerCase();
    const matchesStatus = !statusFilter || c.status === statusFilter;
    const matchesPriority = !priorityFilter || c.priority === priorityFilter;
    return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
  });

  return (
    <div>
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground mb-4">
        Home &gt; Case Status &gt; Active Cases
      </div>

      {/* Search and Filters */}
      <div className="govt-section mb-4">
        <h2 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
          Search and Filter Cases
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <label className="govt-label">Search by Case ID or Party Name</label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="govt-input pl-9"
                placeholder="Enter Case ID or Party Name"
              />
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div>
            <label className="govt-label">Case Category</label>
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="govt-select"
            >
              <option value="">All Categories</option>
              <option value="civil">Civil</option>
              <option value="criminal">Criminal</option>
              <option value="family">Family</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>
          <div>
            <label className="govt-label">Monitoring Status</label>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="govt-select"
            >
              <option value="">All Status</option>
              <option value="On Track">On Track</option>
              <option value="Warning">Warning</option>
              <option value="Delayed">Delayed</option>
            </select>
          </div>
          <div>
            <label className="govt-label">Priority Level</label>
            <select 
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="govt-select"
            >
              <option value="">All Priorities</option>
              <option value="Standard">Standard</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button className="govt-btn-primary flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Apply Filters
          </button>
          <button 
            className="govt-btn-secondary"
            onClick={() => {
              setSearchQuery("");
              setCategoryFilter("");
              setStatusFilter("");
              setPriorityFilter("");
            }}
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="govt-section">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            Active Cases ({filteredCases.length} records)
          </h2>
          <button className="text-primary hover:underline text-sm">
            Export to Excel
          </button>
        </div>

        <table className="govt-table">
          <thead>
            <tr>
              <th>Case Number</th>
              <th>Type</th>
              <th>Parties</th>
              <th>Court</th>
              <th>Filing Date</th>
              <th>Next Hearing</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.map((c) => (
              <tr key={c.id}>
                <td className="font-medium">{c.id}</td>
                <td>{c.type}</td>
                <td>{c.parties}</td>
                <td>{c.court}</td>
                <td>{c.filingDate}</td>
                <td>{c.nextHearing}</td>
                <td>
                  <span className={`px-2 py-0.5 text-xs ${
                    c.status === "On Track" 
                      ? "bg-status-success/10 text-status-success" 
                      : c.status === "Warning"
                      ? "bg-status-warning/10 text-status-warning"
                      : "bg-status-danger/10 text-status-danger"
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td>
                  <span className={`text-xs ${
                    c.priority === "Urgent" ? "text-status-danger font-medium" :
                    c.priority === "High" ? "text-status-warning" : "text-muted-foreground"
                  }`}>
                    {c.priority}
                  </span>
                </td>
                <td>
                  <button 
                    onClick={() => setSelectedCase(c)}
                    className="text-primary hover:underline text-sm flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing 1 to {filteredCases.length} of {filteredCases.length} entries
          </p>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-border text-sm text-muted-foreground">Previous</button>
            <button className="px-3 py-1 border border-primary bg-primary text-primary-foreground text-sm">1</button>
            <button className="px-3 py-1 border border-border text-sm text-muted-foreground">2</button>
            <button className="px-3 py-1 border border-border text-sm text-muted-foreground">3</button>
            <button className="px-3 py-1 border border-border text-sm text-muted-foreground">Next</button>
          </div>
        </div>
      </div>

      {/* Case Detail Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50">
          <div className="bg-background border border-border w-full max-w-2xl max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center p-4 border-b border-border bg-muted">
              <h3 className="font-semibold">Case Details: {selectedCase.id}</h3>
              <button onClick={() => setSelectedCase(null)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium w-1/3">Case Number</td>
                    <td className="py-2">{selectedCase.id}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium">Case Type</td>
                    <td className="py-2">{selectedCase.type}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium">Parties</td>
                    <td className="py-2">{selectedCase.parties}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium">Court</td>
                    <td className="py-2">{selectedCase.court}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium">Filing Date</td>
                    <td className="py-2">{selectedCase.filingDate}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium">Next Hearing</td>
                    <td className="py-2">{selectedCase.nextHearing}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium">Monitoring Status</td>
                    <td className="py-2">
                      <span className={`px-2 py-0.5 text-xs ${
                        selectedCase.status === "On Track" 
                          ? "bg-status-success/10 text-status-success" 
                          : selectedCase.status === "Warning"
                          ? "bg-status-warning/10 text-status-warning"
                          : "bg-status-danger/10 text-status-danger"
                      }`}>
                        {selectedCase.status}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">Priority</td>
                    <td className="py-2">{selectedCase.priority}</td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-4 p-3 bg-muted border border-border">
                <h4 className="font-medium text-sm mb-2">Timeline History</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• 15-01-2024: Case filed and registered</li>
                  <li>• 16-01-2024: Case assigned to monitoring system</li>
                  <li>• 18-01-2024: First hearing scheduled for 22-01-2024</li>
                </ul>
              </div>

              <div className="flex gap-3 mt-4 pt-4 border-t border-border">
                <button className="govt-btn-primary">View Full Timeline</button>
                <button className="govt-btn-secondary">Download Report</button>
                <button onClick={() => setSelectedCase(null)} className="govt-btn-secondary">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveCasesPage;

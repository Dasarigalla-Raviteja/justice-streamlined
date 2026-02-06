import { FileText, Clock, CheckCircle, AlertTriangle, Scale, Gavel } from "lucide-react";

const statCards = [
  { label: "Active Cases", value: "2,847", desc: "Currently under monitoring", color: "bg-blue-500", icon: FileText },
  { label: "Pending Cases", value: "612", desc: "Awaiting next hearing", color: "bg-orange-500", icon: Clock },
  { label: "Disposed Cases", value: "4,521", desc: "Successfully resolved", color: "bg-green-600", icon: CheckCircle },
  { label: "Delayed Cases", value: "89", desc: "Exceeding predicted timeline", color: "bg-red-500", icon: AlertTriangle },
];

const todaysHearings = [
  { id: "CIV/2024/0847", type: "Civil", court: "District Court, Delhi", time: "10:30", stage: "Arguments", status: "On Schedule" },
  { id: "CRM/2024/1203", type: "Criminal", court: "Sessions Court, Mumbai", time: "11:00", stage: "Evidence", status: "Pending" },
  { id: "FAM/2024/0392", type: "Family", court: "Family Court, Chennai", time: "12:15", stage: "Mediation", status: "On Schedule" },
  { id: "COM/2024/0156", type: "Commercial", court: "High Court, Kolkata", time: "14:00", stage: "Final Hearing", status: "Delayed" },
  { id: "CIV/2024/0953", type: "Civil", court: "District Court, Bangalore", time: "15:30", stage: "Cross Examination", status: "On Schedule" },
  { id: "CRM/2024/1340", type: "Criminal", court: "Sessions Court, Hyderabad", time: "16:00", stage: "Bail Hearing", status: "Pending" },
];

const statusColor = (status: string) => {
  switch (status) {
    case "On Schedule": return "bg-green-100 text-green-700 border-green-200";
    case "Pending": return "bg-orange-100 text-orange-700 border-orange-200";
    case "Delayed": return "bg-red-100 text-red-700 border-red-200";
    default: return "bg-muted text-muted-foreground";
  }
};

const HomePage = () => {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground mb-4">
        Home &gt; Dashboard
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="bg-card rounded-lg border border-border shadow-sm overflow-hidden"
          >
            <div className="flex items-start gap-4 p-5">
              <div className={`${card.color} rounded-lg p-3 text-white flex-shrink-0`}>
                <card.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <p className="text-2xl font-bold text-foreground mt-0.5">{card.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{card.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Today's Hearings */}
      <div className="bg-card rounded-lg border border-border shadow-sm">
        <div className="p-5 border-b border-border flex items-center gap-2">
          <Gavel className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Today's Scheduled Hearings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/60">
                <th className="text-left p-3 font-semibold text-muted-foreground">Case Number</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Case Type</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Court Name</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Hearing Time</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Stage</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {todaysHearings.map((h, i) => (
                <tr key={h.id} className={`border-t border-border ${i % 2 === 0 ? '' : 'bg-muted/30'} hover:bg-muted/50 transition-colors`}>
                  <td className="p-3 font-medium text-primary">{h.id}</td>
                  <td className="p-3">{h.type}</td>
                  <td className="p-3">{h.court}</td>
                  <td className="p-3 font-mono">{h.time}</td>
                  <td className="p-3">{h.stage}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColor(h.status)}`}>
                      {h.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

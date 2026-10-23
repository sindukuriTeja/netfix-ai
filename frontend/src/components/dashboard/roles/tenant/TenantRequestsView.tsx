import React, { useState } from 'react';
import {
  Send,
  Plus,
  Download,
  FileText
} from 'lucide-react';

interface TenantRequestsViewProps {
  onOpenNewRequest: () => void;
}

export const TenantRequestsView: React.FC<TenantRequestsViewProps> = ({ onOpenNewRequest }) => {
  const [reportType, setReportType] = useState('Property Summary');
  const [selectedProperty, setSelectedProperty] = useState('All Properties');
  const [feedback, setFeedback] = useState<string | null>(null);

  const recentReports = [
    { name: 'Property Summary Report', type: 'Property', date: '24 Sep 2025' },
    { name: 'Payment Summary', type: 'Payment', date: '20 Sep 2025' },
    { name: 'Document Register', type: 'Document', date: '15 Sep 2025' },
  ];

  const handleDownloadPdf = (name: string) => {
    const element = document.createElement('a');
    const file = new Blob([`NETFIX AI MARG GROUP - TENANT REPORT\nReport Title: ${name}\nGenerated On: ${new Date().toLocaleDateString()}`], { type: 'application/pdf' });
    element.href = URL.createObjectURL(file);
    element.download = `${name.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setFeedback(`Report "${name}" downloaded successfully.`);
    setTimeout(() => setFeedback(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Send className="w-6 h-6 text-[#00B8FF]" />
            <span>Service & Access Requests</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Raise and track requests for documents, access, changes or services.
          </p>
        </div>
        <button
          onClick={onOpenNewRequest}
          className="px-4 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-sky-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>New Request</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs">
          <span>{feedback}</span>
        </div>
      )}

      {/* Main Report Generator Card (Ref Panel 8) */}
      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <label className="text-slate-400 block mb-1">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-white font-bold"
              >
                <option value="Property Summary">Property Summary</option>
                <option value="Payment History">Payment History</option>
                <option value="Agreement Status">Agreement Status</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Property</label>
              <select
                value={selectedProperty}
                onChange={(e) => setSelectedProperty(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-white font-bold"
              >
                <option value="All Properties">All Properties</option>
                <option value="Riverside Tower">Riverside Tower</option>
                <option value="Skyline Plaza">Skyline Plaza</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => handleDownloadPdf(reportType)}
            className="px-4 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-lg shadow-sky-500/20 mt-4 sm:mt-0"
          >
            <Download className="w-4 h-4" />
            <span>Generate & Download Report</span>
          </button>
        </div>

        {/* Report Preview Box (Ref Panel 8) */}
        <div className="p-6 rounded-xl bg-[#041828] border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-[#00B8FF]" />
              <div>
                <h4 className="font-extrabold text-white text-sm">{reportType} Report</h4>
                <span className="text-[10px] text-slate-400 font-mono">01 Jan 2025 – 30 Jun 2025 • Authorized Output</span>
              </div>
            </div>

            <button
              onClick={() => handleDownloadPdf(reportType)}
              className="px-3 py-1.5 rounded-lg bg-[#00B8FF]/20 text-[#00B8FF] hover:bg-[#00B8FF]/30 font-bold text-xs flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Reports Table (Ref Panel 8) */}
      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-white/10 pb-3">Recent Reports</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#041828] text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-3.5 rounded-l-lg">Report Name</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Date Generated</th>
                <th className="p-3.5 text-right rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentReports.map((r) => (
                <tr key={r.name} className="hover:bg-white/[0.02]">
                  <td className="p-3.5 font-bold text-white">{r.name}</td>
                  <td className="p-3.5 text-slate-300 font-medium">{r.type}</td>
                  <td className="p-3.5 font-mono text-slate-400">{r.date}</td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => handleDownloadPdf(r.name)}
                      className="px-3 py-1.5 rounded-lg bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold flex items-center gap-1 ml-auto cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
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

export default TenantRequestsView;

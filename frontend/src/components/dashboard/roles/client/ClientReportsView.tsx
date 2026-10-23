import React, { useState } from 'react';
import {
  FileText,
  Plus,
  RotateCcw,
  Search,
  Download,
  CheckCircle2
} from 'lucide-react';

interface ClientReportsViewProps {
  onOpenMatter: (matterId: string) => void;
}

export const ClientReportsView: React.FC<ClientReportsViewProps> = ({ onOpenMatter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [newReportType, setNewReportType] = useState('Matter Summary');
  const [newReportMatter, setNewReportMatter] = useState('MAT-301');

  const [reports, setReports] = useState([
    { id: 'REP-101', name: 'REQ-103 REQ Summary', type: 'Matter Summary', matterId: 'MAT-301', date: '24 Sep 2026', by: 'Legal Team' },
    { id: 'REP-102', name: 'Tax Compliance Audit Report', type: 'Compliance', matterId: 'MAT-301', date: '15 Sep 2026', by: 'Legal Team' },
    { id: 'REP-103', name: 'Case Progress Summary', type: 'Progress', matterId: 'MAT-178', date: '10 Sep 2026', by: 'Legal Team' },
    { id: 'REP-104', name: 'Lease Renewal Financial Analysis', type: 'Financial', matterId: 'MAT-299', date: '01 Sep 2026', by: 'MARG Compliance' },
    { id: 'REP-105', name: 'GST Filing Audit Certificate', type: 'Tax Record', matterId: 'MAT-205', date: '25 Aug 2026', by: 'Legal Team' },
    { id: 'REP-106', name: 'Quarterly Legal Risk Dossier', type: 'Risk Analysis', matterId: 'MAT-301', date: '15 Aug 2026', by: 'Amit Sharma' },
  ]);

  const filteredReports = reports.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.matterId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All' || r.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleDownloadPdf = (reportName: string, reportId: string) => {
    // Generate text blob for client side download without SPA redirection
    const element = document.createElement('a');
    const file = new Blob([
      `NETFIX AI MARG GROUP - CLIENT REPORT PDF\nReport ID: ${reportId}\nReport Title: ${reportName}\nGenerated On: ${new Date().toLocaleString()}\nVerified Client Portal Document Output.`
    ], { type: 'application/pdf' });
    element.href = URL.createObjectURL(file);
    element.download = `${reportName.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setDownloadNotice(`Report "${reportName}" downloaded successfully.`);
    setTimeout(() => setDownloadNotice(null), 3500);
  };

  const handleGenerateReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRep = {
      id: `REP-${Math.floor(100 + Math.random() * 900)}`,
      name: `${newReportType} for ${newReportMatter}`,
      type: newReportType,
      matterId: newReportMatter,
      date: 'Today',
      by: 'Vikram Reddy (Client)'
    };
    setReports([newRep, ...reports]);
    setIsGenerateOpen(false);
    setDownloadNotice(`New report "${newRep.name}" generated.`);
    setTimeout(() => setDownloadNotice(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#00B8FF]" />
            <span>Reports ({reports.length})</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            View and generate reports for your matters and account.
          </p>
        </div>
        <button
          onClick={() => setIsGenerateOpen(true)}
          className="px-4 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-sky-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Generate Report</span>
        </button>
      </div>

      {downloadNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Filter Bar (Ref Panel 10) */}
      <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex-1 min-w-[240px] relative">
          <input
            type="text"
            placeholder="Search reports by title or matter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#041828] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-xs text-slate-300 font-medium focus:outline-none focus:border-[#00B8FF]"
          >
            <option value="All">All Report Types</option>
            <option value="Matter Summary">Matter Summary</option>
            <option value="Compliance">Compliance</option>
            <option value="Progress">Progress</option>
            <option value="Financial">Financial</option>
          </select>

          <button
            onClick={() => {
              setSearchQuery('');
              setTypeFilter('All');
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-all cursor-pointer"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Reports Table (Ref Panel 10) */}
      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#041828] text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-3.5 rounded-l-lg">Report Name</th>
                <th className="p-3.5">Report Type</th>
                <th className="p-3.5">Matter</th>
                <th className="p-3.5">Generated Date</th>
                <th className="p-3.5">Generated By</th>
                <th className="p-3.5 text-right rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredReports.map((rep) => (
                <tr key={rep.id} className="hover:bg-white/[0.02]">
                  <td className="p-3.5 font-bold text-white max-w-[220px] truncate">{rep.name}</td>
                  <td className="p-3.5 text-slate-300 font-medium">{rep.type}</td>
                  <td className="p-3.5">
                    <button
                      onClick={() => onOpenMatter(rep.matterId)}
                      className="font-mono text-xs font-bold text-[#00B8FF] hover:underline cursor-pointer"
                    >
                      {rep.matterId}
                    </button>
                  </td>
                  <td className="p-3.5 font-mono text-slate-400">{rep.date}</td>
                  <td className="p-3.5 text-slate-400">{rep.by}</td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleDownloadPdf(rep.name, rep.id)}
                        className="px-3 py-1.5 rounded-lg bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate Report Modal */}
      {isGenerateOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <form onSubmit={handleGenerateReportSubmit} className="bg-[#081525] border border-[#00B8FF]/30 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="font-extrabold text-white text-base border-b border-white/10 pb-3">Generate Client Report</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Select Matter</label>
                <select
                  value={newReportMatter}
                  onChange={(e) => setNewReportMatter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-white font-bold"
                >
                  <option value="MAT-301">MAT-301 Corporate Structuring</option>
                  <option value="MAT-299">MAT-299 Commercial Lease</option>
                  <option value="MAT-178">MAT-178 Tax Appeal</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Report Type</label>
                <select
                  value={newReportType}
                  onChange={(e) => setNewReportType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-white font-bold"
                >
                  <option value="Matter Summary">Matter Summary</option>
                  <option value="Tax Compliance">Tax Compliance</option>
                  <option value="Case Progress">Case Progress</option>
                  <option value="Risk Analysis">Risk Analysis</option>
                </select>
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsGenerateOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#00B8FF] text-white font-bold text-xs"
              >
                Generate PDF Report
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ClientReportsView;

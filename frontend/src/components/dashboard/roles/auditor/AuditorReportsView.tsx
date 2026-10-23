import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Calendar,
  Search,
  Eye,
  Download,
  CheckCircle2
} from 'lucide-react';

interface AuditorReportsViewProps {
  onOpenGenerateModal: () => void;
  onOpenReview: (reviewId: string) => void;
}

export const AuditorReportsView: React.FC<AuditorReportsViewProps> = ({
  onOpenGenerateModal,
  onOpenReview,
}) => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadFeedback, setDownloadFeedback] = useState<string | null>(null);

  const reports = [
    { id: 'RPT-019', name: 'Compliance Summary', type: 'Compliance', reviewId: 'AUD-103', period: 'Q3 2025', status: 'Final', generated: '15 Sep 2025' },
    { id: 'RPT-018', name: 'Audit Findings Report', type: 'Findings', reviewId: 'AUD-103', period: 'Q3 2025', status: 'Awaiting Review', generated: '12 Sep 2025' },
    { id: 'RPT-017', name: 'Risk Assessment', type: 'Risk', reviewId: 'AUD-101', period: 'Q2 2025', status: 'Draft', generated: '10 Sep 2025' },
    { id: 'RPT-016', name: 'Control Effectiveness', type: 'Controls', reviewId: 'AUD-101', period: 'Q2 2025', status: 'Final', generated: '08 Sep 2025' },
    { id: 'RPT-015', name: 'Evidence Register', type: 'Evidence', reviewId: 'AUD-095', period: 'Q3 2025', status: 'Final', generated: '05 Sep 2025' },
  ];

  const handleDownload = (reportName: string) => {
    const dummyContent = `NETFIX AI — AUDIT REPORT\nReport: ${reportName}\nGenerated: ${new Date().toLocaleDateString()}\nScope: AUD-001 Scope Active\nStatus: Official Verified Audit PDF\n`;
    const blob = new Blob([dummyContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportName.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadFeedback(`Downloading ${reportName}.pdf...`);
    setTimeout(() => setDownloadFeedback(null), 3000);
  };

  const filtered = reports.filter((r) => {
    if (statusFilter !== 'All' && r.status !== statusFilter) return false;
    if (
      searchQuery &&
      !r.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !r.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Toast feedback */}
      {downloadFeedback && (
        <div className="p-3 rounded-xl bg-[#00B8FF]/20 border border-[#00B8FF]/40 text-[#00B8FF] text-xs font-bold font-mono animate-bounce flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{downloadFeedback}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-[#00B8FF]" />
            <span>Reports</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Generate and manage regulatory and audit reports.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenGenerateModal}
            className="px-4 py-2 rounded-xl bg-[#00B8FF] text-black font-bold text-xs hover:bg-[#0096d6] transition-colors flex items-center gap-2 shadow-lg shadow-[#00B8FF]/20"
          >
            <Plus className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
          <button className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold hover:bg-white/10 transition-colors flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#00B8FF]" />
            <span>Schedule</span>
          </button>
        </div>
      </div>

      {/* 6 KPI Badges (Matching Panel 8) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Total Reports</span>
          <div className="text-2xl font-extrabold text-[#00B8FF] font-mono">12</div>
          <span className="text-[10px] text-slate-500">In audit database</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Generated</span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">8</div>
          <span className="text-[10px] text-emerald-400/80 font-bold">Ready for export</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Drafts</span>
          <div className="text-2xl font-extrabold text-amber-400 font-mono">2</div>
          <span className="text-[10px] text-slate-500">In progress</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Awaiting Review</span>
          <div className="text-2xl font-extrabold text-purple-400 font-mono">2</div>
          <span className="text-[10px] text-purple-400/80 font-bold">Sign-off required</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Finalized</span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">5</div>
          <span className="text-[10px] text-slate-500">Executed</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Scheduled</span>
          <div className="text-2xl font-extrabold text-sky-400 font-mono">2</div>
          <span className="text-[10px] text-slate-500">Recurring</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#081525] border border-white/10 text-xs font-medium text-slate-400">
          {['All', 'Final', 'Awaiting Review', 'Draft'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                statusFilter === status
                  ? 'bg-[#00B8FF] text-black font-bold shadow-md'
                  : 'hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative flex-1 md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-[#081525] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF]"
          />
        </div>
      </div>

      {/* Reports Table (Matching Panel 8) */}
      <div className="rounded-2xl bg-[#081525]/90 border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-[#040e1a] text-slate-400 font-mono">
                <th className="p-3.5 pl-4">Report ID</th>
                <th className="p-3.5">Report Name</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Review ID</th>
                <th className="p-3.5">Period</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Generated</th>
                <th className="p-3.5 pr-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3.5 pl-4 font-mono font-bold text-[#00B8FF]">{r.id}</td>
                  <td className="p-3.5 font-bold text-white">{r.name}</td>
                  <td className="p-3.5 font-mono text-slate-300">{r.type}</td>
                  <td
                    onClick={() => onOpenReview(r.reviewId)}
                    className="p-3.5 font-mono text-[#00B8FF] hover:underline cursor-pointer"
                  >
                    {r.reviewId}
                  </td>
                  <td className="p-3.5 font-mono text-slate-300">{r.period}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold font-mono ${
                        r.status === 'Final'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : r.status === 'Awaiting Review'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-slate-400">{r.generated}</td>
                  <td className="p-3.5 pr-4 text-right space-x-1">
                    <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white">
                      <Eye className="w-3.5 h-3.5 text-[#00B8FF]" />
                    </button>
                    <button
                      onClick={() => handleDownload(r.name)}
                      className="p-1.5 rounded-lg bg-[#00B8FF]/10 hover:bg-[#00B8FF]/20 text-[#00B8FF]"
                      title="Download Report PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
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

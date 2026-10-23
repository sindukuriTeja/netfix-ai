import React, { useState } from 'react';
import {
  FileCheck,
  Upload,
  Search,
  Eye,
  Download
} from 'lucide-react';

interface AuditorEvidenceViewProps {
  onOpenUploadModal: () => void;
  onOpenEvidenceDetail: (evidenceId: string) => void;
}

export const AuditorEvidenceView: React.FC<AuditorEvidenceViewProps> = ({
  onOpenUploadModal,
  onOpenEvidenceDetail,
}) => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const evidenceList = [
    { id: 'EVD-038', name: 'GST_Return_Q3.pdf', type: 'GST Return', control: 'REQ-GST-014', status: 'Verified', date: '12 Sep 2025' },
    { id: 'EVD-045', name: 'Purchase_Register_Q3.pdf', type: 'Register', control: 'CTL-021', status: 'Verified', date: '11 Sep 2025' },
    { id: 'EVD-052', name: 'Sales_Register_Q3.pdf', type: 'Register', control: 'CTL-021', status: 'Verified', date: '10 Sep 2025' },
    { id: 'EVD-061', name: 'Board_Resolution.pdf', type: 'Board Doc', control: 'REQ-COMP-021', status: 'Pending', date: '08 Sep 2025' },
    { id: 'EVD-067', name: 'Bank_Statement_Aug.pdf', type: 'Bank Statement', control: 'CTL-014', status: 'Verified', date: '06 Sep 2025' },
  ];

  const filtered = evidenceList.filter((e) => {
    if (statusFilter !== 'All' && e.status !== statusFilter) return false;
    if (
      searchQuery &&
      !e.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !e.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <FileCheck className="w-6 h-6 text-[#00B8FF]" />
            <span>Evidence Register</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Evidence items for audits under your scope.
          </p>
        </div>

        <button
          onClick={onOpenUploadModal}
          className="px-4 py-2 rounded-xl bg-[#00B8FF] text-black font-bold text-xs hover:bg-[#0096d6] transition-colors flex items-center gap-2 shadow-lg shadow-[#00B8FF]/20"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Evidence</span>
        </button>
      </div>

      {/* 6 KPI Badges (Matching Panel 6) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Total Evidence</span>
          <div className="text-2xl font-extrabold text-[#00B8FF] font-mono">46</div>
          <span className="text-[10px] text-slate-500">In audit database</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Verified</span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">38</div>
          <span className="text-[10px] text-emerald-400/80 font-bold font-mono">83% verified</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Pending Verification</span>
          <div className="text-2xl font-extrabold text-amber-400 font-mono">5</div>
          <span className="text-[10px] text-amber-400/80 font-bold">Awaiting review</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Rejected</span>
          <div className="text-2xl font-extrabold text-rose-400 font-mono">2</div>
          <span className="text-[10px] text-rose-400/80 font-bold">Integrity issue</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Expired</span>
          <div className="text-2xl font-extrabold text-slate-300 font-mono">0</div>
          <span className="text-[10px] text-slate-500 font-medium font-mono">0 expired</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Missing</span>
          <div className="text-2xl font-extrabold text-rose-500 font-mono">1</div>
          <span className="text-[10px] text-rose-400/80 font-bold">Requested</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#081525] border border-white/10 text-xs font-medium text-slate-400">
          {['All', 'Verified', 'Pending', 'Rejected'].map((status) => (
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
            placeholder="Search evidence ID or file..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-[#081525] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF]"
          />
        </div>
      </div>

      {/* Evidence Table (Matching Panel 6) */}
      <div className="rounded-2xl bg-[#081525]/90 border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-[#040e1a] text-slate-400 font-mono">
                <th className="p-3.5 pl-4">Evidence ID</th>
                <th className="p-3.5">Document Name</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Related To</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Uploaded On</th>
                <th className="p-3.5 pr-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                  <td
                    onClick={() => onOpenEvidenceDetail(item.id)}
                    className="p-3.5 pl-4 font-mono font-bold text-[#00B8FF] hover:underline cursor-pointer"
                  >
                    {item.id}
                  </td>
                  <td
                    onClick={() => onOpenEvidenceDetail(item.id)}
                    className="p-3.5 font-bold text-white font-mono hover:text-[#00B8FF] cursor-pointer"
                  >
                    {item.name}
                  </td>
                  <td className="p-3.5 text-slate-300 font-mono">{item.type}</td>
                  <td className="p-3.5 font-mono text-slate-400">{item.control}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold font-mono ${
                        item.status === 'Verified'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : item.status === 'Pending'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-slate-400">{item.date}</td>
                  <td className="p-3.5 pr-4 text-right space-x-1">
                    <button
                      onClick={() => onOpenEvidenceDetail(item.id)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
                      title="View Evidence Details"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#00B8FF]" />
                    </button>
                    <button
                      onClick={() => onOpenEvidenceDetail(item.id)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
                      title="Download Evidence"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-300" />
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

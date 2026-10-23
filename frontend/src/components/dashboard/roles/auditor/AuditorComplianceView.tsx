import React, { useState } from 'react';
import {
  ShieldCheck,
  Download,
  Search,
  Eye
} from 'lucide-react';

interface AuditorComplianceViewProps {
  onOpenRequirementDetail: (reqId: string) => void;
}

export const AuditorComplianceView: React.FC<AuditorComplianceViewProps> = ({ onOpenRequirementDetail }) => {
  const [subTab, setSubTab] = useState<'matrix' | 'regulation' | 'trend'>('matrix');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const requirements = [
    { id: 'REQ-GST-014', requirement: 'GST Return Filing', regulation: 'GST Act', control: 'CTL-021', evidence: '3/3', status: 'Compliant', risk: 'Low', lastTested: '12 Sep 2025', nextReview: '12 Mar 2026' },
    { id: 'REQ-IT-012', requirement: 'TDS Reconciliation', regulation: 'Income Tax Act', control: 'CTL-005', evidence: '2/4', status: 'Partially', risk: 'Medium', lastTested: '10 Sep 2025', nextReview: '10 Mar 2026' },
    { id: 'REQ-COMP-021', requirement: 'Board Resolution', regulation: 'Companies Act', control: 'CTL-014', evidence: '1/3', status: 'Non-Compliant', risk: 'High', lastTested: '08 Sep 2025', nextReview: '08 Mar 2026' },
    { id: 'REQ-FIN-003', requirement: 'Financial Statements', regulation: 'Companies Act', control: 'CTL-003', evidence: '4/4', status: 'Compliant', risk: 'Low', lastTested: '15 Sep 2025', nextReview: '15 Mar 2026' },
    { id: 'REQ-AUD-001', requirement: 'Statutory Audit', regulation: 'Audit Regs', control: 'CTL-018', evidence: '2/2', status: 'Under Review', risk: 'High', lastTested: '--', nextReview: '30 Sep 2025' },
  ];

  const filtered = requirements.filter((r) => {
    if (statusFilter !== 'All' && r.status !== statusFilter) return false;
    if (
      searchQuery &&
      !r.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !r.requirement.toLowerCase().includes(searchQuery.toLowerCase())
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
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <span>Compliance Assessment</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track regulatory requirements, control compliance, and exceptions.
          </p>
        </div>

        <button className="px-3.5 py-2 rounded-xl bg-[#00B8FF]/10 border border-[#00B8FF]/30 text-[#00B8FF] text-xs font-semibold hover:bg-[#00B8FF]/20 transition-colors flex items-center gap-2">
          <Download className="w-4 h-4" />
          <span>Export Matrix</span>
        </button>
      </div>

      {/* 6 KPI Badges (Matching Panel 4) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Total Requirements</span>
          <div className="text-2xl font-extrabold text-[#00B8FF] font-mono">120</div>
          <span className="text-[10px] text-slate-500 font-medium">In audit scope</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Compliant</span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">91</div>
          <span className="text-[10px] text-emerald-400/80 font-bold font-mono">76% score</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Partially Compliant</span>
          <div className="text-2xl font-extrabold text-amber-400 font-mono">18</div>
          <span className="text-[10px] text-amber-400/80 font-bold font-mono">15% score</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Non-Compliant</span>
          <div className="text-2xl font-extrabold text-rose-400 font-mono">11</div>
          <span className="text-[10px] text-rose-400/80 font-bold font-mono">9% score</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Overdue</span>
          <div className="text-2xl font-extrabold text-amber-400 font-mono">6</div>
          <span className="text-[10px] text-amber-400/80 font-bold">Testing overdue</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Critical Exceptions</span>
          <div className="text-2xl font-extrabold text-rose-400 font-mono">3</div>
          <span className="text-[10px] text-rose-400/80 font-bold">Action required</span>
        </div>
      </div>

      {/* Sub Tabs & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#081525] border border-white/10 text-xs font-medium text-slate-400">
          <button
            onClick={() => setSubTab('matrix')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              subTab === 'matrix' ? 'bg-[#00B8FF] text-black font-bold shadow-md' : 'hover:text-white'
            }`}
          >
            Requirements Matrix
          </button>
          <button
            onClick={() => setSubTab('regulation')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              subTab === 'regulation' ? 'bg-[#00B8FF] text-black font-bold shadow-md' : 'hover:text-white'
            }`}
          >
            Compliance by Regulation
          </button>
          <button
            onClick={() => setSubTab('trend')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              subTab === 'trend' ? 'bg-[#00B8FF] text-black font-bold shadow-md' : 'hover:text-white'
            }`}
          >
            Compliance Trend
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#081525] border border-white/10 text-xs font-medium text-slate-400">
            {['All', 'Compliant', 'Partially', 'Non-Compliant'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  statusFilter === st ? 'bg-[#00B8FF] text-black font-bold shadow-md' : 'hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search requirements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-[#081525] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF]"
            />
          </div>
        </div>
      </div>

      {/* Requirements Table (Matching Panel 4) */}
      <div className="rounded-2xl bg-[#081525]/90 border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-[#040e1a] text-slate-400 font-mono">
                <th className="p-3.5 pl-4">Req. ID</th>
                <th className="p-3.5">Requirement</th>
                <th className="p-3.5">Regulation</th>
                <th className="p-3.5">Control</th>
                <th className="p-3.5">Evidence</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Risk</th>
                <th className="p-3.5">Last Tested</th>
                <th className="p-3.5">Next Review</th>
                <th className="p-3.5 pr-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {filtered.map((req) => (
                <tr key={req.id} className="hover:bg-white/5 transition-colors">
                  <td
                    onClick={() => onOpenRequirementDetail(req.id)}
                    className="p-3.5 pl-4 font-mono font-bold text-[#00B8FF] hover:underline cursor-pointer"
                  >
                    {req.id}
                  </td>
                  <td
                    onClick={() => onOpenRequirementDetail(req.id)}
                    className="p-3.5 font-bold text-white hover:text-[#00B8FF] cursor-pointer"
                  >
                    {req.requirement}
                  </td>
                  <td className="p-3.5 text-slate-300 font-mono">{req.regulation}</td>
                  <td className="p-3.5 font-mono text-slate-400">{req.control}</td>
                  <td className="p-3.5 font-mono text-slate-300">{req.evidence}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold font-mono ${
                        req.status === 'Compliant'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : req.status === 'Partially'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : req.status === 'Non-Compliant'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30'
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        req.risk === 'High' ? 'text-rose-400' : req.risk === 'Medium' ? 'text-amber-400' : 'text-emerald-400'
                      }`}
                    >
                      {req.risk}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-slate-400">{req.lastTested}</td>
                  <td className="p-3.5 font-mono text-slate-400">{req.nextReview}</td>
                  <td className="p-3.5 pr-4 text-right">
                    <button
                      onClick={() => onOpenRequirementDetail(req.id)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
                      title="View Requirement Details"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#00B8FF]" />
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

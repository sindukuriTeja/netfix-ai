import React, { useState } from 'react';
import {
  Lock,
  Plus,
  Search,
  Eye
} from 'lucide-react';

interface AuditorRiskControlsViewProps {
  onOpenAddRiskModal: () => void;
}

export const AuditorRiskControlsView: React.FC<AuditorRiskControlsViewProps> = ({ onOpenAddRiskModal }) => {
  const [subTab, setSubTab] = useState<'register' | 'library' | 'heatmap'>('register');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const risks = [
    { id: 'RSK-042', title: 'Financial Misstatement', category: 'Financial', inherent: 'High', residual: 'High', owner: 'CFO', status: 'Open' },
    { id: 'RSK-038', title: 'Regulatory Non-Compliance', category: 'Regulatory', inherent: 'High', residual: 'Medium', owner: 'Compliance', status: 'Mitigated' },
    { id: 'RSK-027', title: 'Data Security Breach', category: 'Operational', inherent: 'High', residual: 'Medium', owner: 'IT', status: 'Open' },
    { id: 'RSK-019', title: 'Contract Control Failure', category: 'Legal', inherent: 'Medium', residual: 'Low', owner: 'Internal Audit', status: 'Closed' },
    { id: 'RSK-012', title: 'Fraud Risk', category: 'Financial', inherent: 'Medium', residual: 'Low', owner: 'Finance', status: 'Open' },
  ];

  const filtered = risks.filter((r) => {
    if (categoryFilter !== 'All' && r.category !== categoryFilter) return false;
    if (
      searchQuery &&
      !r.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !r.title.toLowerCase().includes(searchQuery.toLowerCase())
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
            <Lock className="w-6 h-6 text-purple-400" />
            <span>Risk & Controls</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Assess and monitor risks, residual exposure, and control effectiveness.
          </p>
        </div>

        <button
          onClick={onOpenAddRiskModal}
          className="px-4 py-2 rounded-xl bg-[#00B8FF] text-black font-bold text-xs hover:bg-[#0096d6] transition-colors flex items-center gap-2 shadow-lg shadow-[#00B8FF]/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Risk</span>
        </button>
      </div>

      {/* 6 KPI Badges (Matching Panel 7) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Total Risks</span>
          <div className="text-2xl font-extrabold text-[#00B8FF] font-mono">12</div>
          <span className="text-[10px] text-slate-500">In audit register</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Critical</span>
          <div className="text-2xl font-extrabold text-rose-400 font-mono">3</div>
          <span className="text-[10px] text-rose-400/80 font-bold">Inherent high</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">High</span>
          <div className="text-2xl font-extrabold text-amber-400 font-mono">4</div>
          <span className="text-[10px] text-amber-400/80 font-bold">Action required</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Medium</span>
          <div className="text-2xl font-extrabold text-sky-400 font-mono">3</div>
          <span className="text-[10px] text-slate-500 font-medium">Monitored</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Low</span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">2</div>
          <span className="text-[10px] text-slate-500 font-medium">Controlled</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Overdue Actions</span>
          <div className="text-2xl font-extrabold text-rose-500 font-mono">4</div>
          <span className="text-[10px] text-rose-400/80 font-bold">Mitigation overdue</span>
        </div>
      </div>

      {/* Sub Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#081525] border border-white/10 text-xs font-medium text-slate-400">
          <button
            onClick={() => setSubTab('register')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              subTab === 'register' ? 'bg-[#00B8FF] text-black font-bold shadow-md' : 'hover:text-white'
            }`}
          >
            Risk Register
          </button>
          <button
            onClick={() => setSubTab('library')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              subTab === 'library' ? 'bg-[#00B8FF] text-black font-bold shadow-md' : 'hover:text-white'
            }`}
          >
            Control Library
          </button>
          <button
            onClick={() => setSubTab('heatmap')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              subTab === 'heatmap' ? 'bg-[#00B8FF] text-black font-bold shadow-md' : 'hover:text-white'
            }`}
          >
            Risk Heatmap
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#081525] border border-white/10 text-xs font-medium text-slate-400">
            {['All', 'Financial', 'Regulatory', 'Operational', 'Legal'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  categoryFilter === cat ? 'bg-[#00B8FF] text-black font-bold shadow-md' : 'hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search risk ID or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-[#081525] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF]"
            />
          </div>
        </div>
      </div>

      {/* Risk Register Table (Matching Panel 7) */}
      <div className="rounded-2xl bg-[#081525]/90 border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-[#040e1a] text-slate-400 font-mono">
                <th className="p-3.5 pl-4">Risk ID</th>
                <th className="p-3.5">Risk Title</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Inherent Risk</th>
                <th className="p-3.5">Residual Risk</th>
                <th className="p-3.5">Owner</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 pr-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3.5 pl-4 font-mono font-bold text-[#00B8FF]">{r.id}</td>
                  <td className="p-3.5 font-bold text-white">{r.title}</td>
                  <td className="p-3.5 font-mono text-slate-300">{r.category}</td>
                  <td className="p-3.5 font-mono">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        r.inherent === 'High' ? 'text-rose-400' : 'text-amber-400'
                      }`}
                    >
                      {r.inherent}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        r.residual === 'High' ? 'text-rose-400' : r.residual === 'Medium' ? 'text-amber-400' : 'text-emerald-400'
                      }`}
                    >
                      {r.residual}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-300">{r.owner}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold font-mono ${
                        r.status === 'Open'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : r.status === 'Mitigated'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3.5 pr-4 text-right">
                    <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white">
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

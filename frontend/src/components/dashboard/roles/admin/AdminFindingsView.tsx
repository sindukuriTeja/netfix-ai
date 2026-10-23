import React, { useState } from 'react';
import {
  AlertTriangle,
  Plus,
  Search
} from 'lucide-react';

export interface AdminFindingsViewProps {
  onOpenAddFindingModal?: () => void;
  onOpenAddFinding?: () => void;
}

export const AdminFindingsView: React.FC<AdminFindingsViewProps> = ({
  onOpenAddFindingModal,
  onOpenAddFinding,
}) => {
  const [severityFilter, setSeverityFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const findings = [
    { id: 'FND-021', title: 'Tax invoice missing for GST claim', regulation: 'GST Act', severity: 'High', severityColor: 'bg-[#FF5555] text-white', status: 'Open', dueDate: '20 Sep 2026' },
    { id: 'FND-102', title: 'TDS mismatch in agreement', regulation: 'Income Tax Act', severity: 'Medium', severityColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30', status: 'In Progress', dueDate: '25 Sep 2026' },
    { id: 'FND-011', title: 'Board resolution incomplete', regulation: 'Companies Act', severity: 'Low', severityColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30', status: 'Resolved', dueDate: '05 Oct 2026' },
    { id: 'FND-008', title: 'Data retention policy update', regulation: 'Companies Act', severity: 'Medium', severityColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30', status: 'Open', dueDate: '10 Oct 2026' },
    { id: 'FND-004', title: 'KYC document expired', regulation: 'RBI Guidelines', severity: 'High', severityColor: 'bg-[#FF5555] text-white', status: 'Open', dueDate: '12 Oct 2026' },
  ];

  const filtered = findings.filter((f) => {
    if (severityFilter !== 'All' && f.severity !== severityFilter) return false;
    if (
      searchQuery &&
      !f.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !f.title.toLowerCase().includes(searchQuery.toLowerCase())
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
            <AlertTriangle className="w-6 h-6 text-rose-400" />
            <span>Audit Findings</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track, assess, and resolve compliance findings across platform domains.
          </p>
        </div>

        <button
          onClick={() => {
            if (onOpenAddFinding) onOpenAddFinding();
            if (onOpenAddFindingModal) onOpenAddFindingModal();
          }}
          className="px-4 py-2 rounded-xl bg-[#00B8FF] text-black font-bold text-xs hover:bg-[#0096d6] transition-colors flex items-center gap-2 shadow-lg shadow-[#00B8FF]/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Finding</span>
        </button>
      </div>

      {/* 6 Top KPI Badges (Matching Panel 8) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Total Findings</span>
          <div className="text-2xl font-extrabold text-[#00B8FF] font-mono">8</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Critical</span>
          <div className="text-2xl font-extrabold text-rose-400 font-mono">2</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">High</span>
          <div className="text-2xl font-extrabold text-amber-400 font-mono">3</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Medium</span>
          <div className="text-2xl font-extrabold text-sky-400 font-mono">2</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Low</span>
          <div className="text-2xl font-extrabold text-slate-300 font-mono">1</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Resolved</span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">5</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#081525] border border-white/10 text-xs font-medium text-slate-400">
          {['All', 'Critical', 'High', 'Medium', 'Low'].map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                severityFilter === sev ? 'bg-[#00B8FF] text-black font-bold shadow-md' : 'hover:text-white'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>

        <div className="relative flex-1 md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search finding ID, title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-[#081525] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF]"
          />
        </div>
      </div>

      {/* Findings Data Table (Matching Panel 8) */}
      <div className="rounded-2xl bg-[#081525]/90 border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-[#040e1a] text-slate-400 font-mono">
                <th className="p-3.5 pl-4">FINDING ID</th>
                <th className="p-3.5">TITLE</th>
                <th className="p-3.5">REGULATION</th>
                <th className="p-3.5">SEVERITY</th>
                <th className="p-3.5">STATUS</th>
                <th className="p-3.5">DUE DATE</th>
                <th className="p-3.5 pr-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {filtered.map((f) => (
                <tr key={f.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3.5 pl-4 font-mono font-bold text-[#00B8FF]">{f.id}</td>
                  <td className="p-3.5 font-bold text-white">{f.title}</td>
                  <td className="p-3.5 font-mono text-slate-300">{f.regulation}</td>
                  <td className="p-3.5 font-mono">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${f.severityColor}`}>
                      {f.severity}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      f.status === 'Open' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {f.status}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-slate-400">{f.dueDate}</td>
                  <td className="p-3.5 pr-4 text-right">
                    <button className="px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-bold text-[11px]">
                      View
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

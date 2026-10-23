import React, { useState } from 'react';
import {
  Activity,
  Plus,
  RotateCcw,
  ChevronRight
} from 'lucide-react';

interface ClientCaseStatusViewProps {
  onOpenMatter: (matterId: string) => void;
  onOpenCreateRequest: () => void;
}

export const ClientCaseStatusView: React.FC<ClientCaseStatusViewProps> = ({
  onOpenMatter,
  onOpenCreateRequest,
}) => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const caseStatuses = [
    { id: 'MAT-301', title: 'Corporate Structuring & Tax Advisory', type: 'Tax Advisory', stage: 'Document Review', progress: 65, status: 'In Progress', nextAction: 'Client Approval', team: 'Legal Team', updated: '2 hours ago' },
    { id: 'MAT-299', title: 'Commercial Lease Agreement Finalization', type: 'Contract', stage: 'Finalization', progress: 85, status: 'Awaiting Client', nextAction: 'Review Draft', team: 'Legal Team', updated: '1 day ago' },
    { id: 'MAT-178', title: 'Tax Appeal & High Court Writ', type: 'Litigation', stage: 'Hearing Scheduled', progress: 40, status: 'In Progress', nextAction: 'Attend Hearing', team: 'Legal Team', updated: '3 days ago' },
    { id: 'MAT-205', title: 'Compliance Review & GST Audit', type: 'Compliance', stage: 'Legal Review', progress: 25, status: 'In Progress', nextAction: 'Provide Documents', team: 'Legal Team', updated: '5 days ago' },
    { id: 'MAT-166', title: 'Property Dispute & Lease Resolution', type: 'Dispute', stage: 'Evidence Collection', progress: 10, status: 'In Progress', nextAction: 'Submit Evidence', team: 'Legal Team', updated: '1 week ago' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Activity className="w-6 h-6 text-[#00B8FF]" />
            <span>Case Status — Progress Tracking</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track the current progress and stage of all your matters.
          </p>
        </div>
        <button
          onClick={onOpenCreateRequest}
          className="px-4 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-sky-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Create Request</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-xs text-slate-300 font-medium focus:outline-none focus:border-[#00B8FF]"
          >
            <option value="All">All Status</option>
            <option value="In Progress">In Progress</option>
            <option value="Awaiting Client">Awaiting Client</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-xs text-slate-300 font-medium focus:outline-none focus:border-[#00B8FF]"
          >
            <option value="All">All Matter Types</option>
            <option value="Tax Advisory">Tax Advisory</option>
            <option value="Contract">Contract</option>
            <option value="Litigation">Litigation</option>
          </select>
        </div>

        <button
          onClick={() => {
            setStatusFilter('All');
            setTypeFilter('All');
          }}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-all cursor-pointer"
          title="Reset Filters"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* 4 Status Summary Cards (Ref Panel 4) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Not Started</span>
          <span className="text-2xl font-mono font-extrabold text-slate-400">0</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">In Progress</span>
          <span className="text-2xl font-mono font-extrabold text-[#00B8FF]">3</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Awaiting Client</span>
          <span className="text-2xl font-mono font-extrabold text-amber-400">1</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Completed</span>
          <span className="text-2xl font-mono font-extrabold text-emerald-400">1</span>
        </div>
      </div>

      {/* Case Status Table (Ref Panel 4) */}
      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#041828] text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-3.5 rounded-l-lg">Matter</th>
                <th className="p-3.5">Current Stage</th>
                <th className="p-3.5">Progress</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Next Action</th>
                <th className="p-3.5">Last Updated</th>
                <th className="p-3.5 text-right rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {caseStatuses.map((cs) => (
                <tr key={cs.id} className="hover:bg-white/[0.02]">
                  <td className="p-3.5">
                    <button
                      onClick={() => onOpenMatter(cs.id)}
                      className="font-mono text-xs font-bold text-[#00B8FF] hover:underline cursor-pointer"
                    >
                      {cs.id}
                    </button>
                    <span className="text-[11px] text-slate-400 block truncate max-w-[180px]">{cs.title}</span>
                  </td>
                  <td className="p-3.5 text-white font-medium">{cs.stage}</td>
                  <td className="p-3.5 min-w-[120px]">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#00B8FF] to-indigo-500 rounded-full transition-all"
                          style={{ width: `${cs.progress}%` }}
                        />
                      </div>
                      <span className="font-mono text-[10px] text-slate-300 font-bold">{cs.progress}%</span>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold border ${
                      cs.status === 'In Progress'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}>
                      {cs.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-200 font-medium">{cs.nextAction}</td>
                  <td className="p-3.5 font-mono text-slate-400">{cs.updated}</td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => onOpenMatter(cs.id)}
                      className="px-3 py-1.5 rounded-lg bg-[#00B8FF]/10 hover:bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30 font-bold text-xs flex items-center gap-1 ml-auto cursor-pointer"
                    >
                      <span>View</span>
                      <ChevronRight className="w-3.5 h-3.5" />
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

export default ClientCaseStatusView;

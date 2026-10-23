import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  Plus,
  RotateCcw,
  ChevronRight
} from 'lucide-react';

interface ClientMyMattersViewProps {
  onOpenMatter: (matterId: string) => void;
  onOpenNewRequest: () => void;
}

export const ClientMyMattersView: React.FC<ClientMyMattersViewProps> = ({
  onOpenMatter,
  onOpenNewRequest,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const matters = [
    { id: 'MAT-301', title: 'Corporate Structuring & Tax Advisory', type: 'Tax Advisory', status: 'In Progress', deadline: '28 Sep 2026', team: 'MARG Legal Team' },
    { id: 'MAT-299', title: 'Commercial Lease Agreement Finalization', type: 'Contract', status: 'Pending Approval', deadline: '15 Oct 2026', team: 'MARG Legal Team' },
    { id: 'MAT-178', title: 'Tax Appeal & High Court Writ', type: 'Litigation', status: 'Hearing Scheduled', deadline: '30 Sep 2026', team: 'Advocate Team' },
    { id: 'MAT-205', title: 'Compliance Review & GST Audit', type: 'Compliance', status: 'Under Review', deadline: '12 Oct 2026', team: 'MARG Compliance' },
    { id: 'MAT-166', title: 'Property Dispute & Lease Resolution', type: 'Dispute', status: 'In Progress', deadline: '20 Oct 2026', team: 'MARG Legal Team' },
  ];

  const filteredMatters = matters.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || m.status === statusFilter;
    const matchesType = typeFilter === 'All' || m.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Pending Approval':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Hearing Scheduled':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'Under Review':
        return 'bg-[#00B8FF]/20 text-[#00B8FF] border-[#00B8FF]/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-[#00B8FF]" />
            <span>My Matters ({matters.length})</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            View and manage all matters associated with your account.
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

      {/* Filter Bar (Ref Panel 2) */}
      <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex-1 min-w-[240px] relative">
          <input
            type="text"
            placeholder="Search by matter name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#041828] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-xs text-slate-300 font-medium focus:outline-none focus:border-[#00B8FF]"
          >
            <option value="All">Status: All</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending Approval">Pending Approval</option>
            <option value="Hearing Scheduled">Hearing Scheduled</option>
            <option value="Under Review">Under Review</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-xs text-slate-300 font-medium focus:outline-none focus:border-[#00B8FF]"
          >
            <option value="All">Matter Type: All</option>
            <option value="Tax Advisory">Tax Advisory</option>
            <option value="Contract">Contract</option>
            <option value="Litigation">Litigation</option>
            <option value="Compliance">Compliance</option>
          </select>

          <button
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('All');
              setTypeFilter('All');
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-all cursor-pointer"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Data Table (Ref Panel 2) */}
      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#041828] text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-3.5 rounded-l-lg">Matter ID</th>
                <th className="p-3.5">Matter Name</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Next Deadline</th>
                <th className="p-3.5 text-right rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredMatters.map((m) => (
                <tr key={m.id} className="hover:bg-white/[0.02] transition-all">
                  <td className="p-3.5">
                    <button
                      onClick={() => onOpenMatter(m.id)}
                      className="font-mono text-xs font-bold text-[#00B8FF] hover:underline cursor-pointer"
                    >
                      {m.id}
                    </button>
                  </td>
                  <td className="p-3.5 font-bold text-white max-w-[260px] truncate">{m.title}</td>
                  <td className="p-3.5 text-slate-300 font-medium">{m.type}</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold border ${getStatusBadge(m.status)}`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-slate-300">{m.deadline}</td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => onOpenMatter(m.id)}
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

        {/* Pagination Controls */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-slate-400 font-mono">
          <span>Showing 1-{filteredMatters.length} of {matters.length} matters</span>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 rounded-lg bg-[#00B8FF] text-white font-bold text-xs">1</button>
            <span className="text-slate-600">10 / page</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientMyMattersView;

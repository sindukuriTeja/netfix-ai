import React, { useState } from 'react';
import { Briefcase, Search, Plus, ExternalLink, RotateCcw } from 'lucide-react';

interface AdvocateAssignedMattersProps {
  onOpenMatter: (matterId: string) => void;
}

interface AssignedMatterItem {
  id: string;
  title: string;
  client: string;
  court: string;
  caseType: string;
  stage: string;
  nextHearing: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Active' | 'Pending' | 'In Review';
}

export const AdvocateAssignedMatters: React.FC<AdvocateAssignedMattersProps> = ({ onOpenMatter }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [courtFilter, setCourtFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [stageFilter, setStageFilter] = useState<string>('All');

  const [matters] = useState<AssignedMatterItem[]>([
    { id: 'MAT-204', title: 'Client vs ABC Corp', client: 'ABC Pvt Ltd', court: 'High Court', caseType: 'Commercial', stage: 'Pleading', nextHearing: '28 Sep 2026', priority: 'High', status: 'Active' },
    { id: 'MAT-178', title: 'Tax Appeal', client: 'XYZ Ltd', court: 'High Court', caseType: 'Civil', stage: 'Hearing', nextHearing: '30 Sep 2026', priority: 'High', status: 'Active' },
    { id: 'MAT-166', title: 'Property Partition', client: 'Rohan Mehta', court: 'District Court', caseType: 'Civil', stage: 'Evidence', nextHearing: '12 Oct 2026', priority: 'Medium', status: 'Active' },
    { id: 'MAT-145', title: 'Labour Dispute', client: 'Sunrise Infra', court: 'NCLT', caseType: 'Labour', stage: 'Research', nextHearing: '-', priority: 'Low', status: 'Active' },
    { id: 'MAT-120', title: 'Contract Enforcement', client: 'Delta Corp', court: 'High Court', caseType: 'Commercial', stage: 'Filing', nextHearing: '-', priority: 'Medium', status: 'Active' },
  ]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setCourtFilter('All');
    setTypeFilter('All');
    setStageFilter('All');
  };

  const filteredMatters = matters.filter((m) => {
    const matchesSearch =
      m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourt = courtFilter === 'All' || m.court === courtFilter;
    const matchesType = typeFilter === 'All' || m.caseType === typeFilter;
    const matchesStage = stageFilter === 'All' || m.stage === stageFilter;
    return matchesSearch && matchesCourt && matchesType && matchesStage;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#00B8FF]" />
            <span>Assigned Matters ({matters.length})</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            All matters assigned to you and accessible within your advocate scope.
          </p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>+ Add New Matter</span>
        </button>
      </div>

      {/* Filter Bar matching Panel 2 */}
      <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 space-y-3 text-xs">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by matter ID, client, case name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
          <select
            value={courtFilter}
            onChange={(e) => setCourtFilter(e.target.value)}
            className="p-2 rounded-xl bg-[#041828] border border-white/10 text-slate-300"
          >
            <option value="All">Court — All</option>
            <option value="High Court">High Court</option>
            <option value="District Court">District Court</option>
            <option value="NCLT">NCLT</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="p-2 rounded-xl bg-[#041828] border border-white/10 text-slate-300"
          >
            <option value="All">Case Type — All</option>
            <option value="Commercial">Commercial</option>
            <option value="Civil">Civil</option>
            <option value="Labour">Labour</option>
          </select>

          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="p-2 rounded-xl bg-[#041828] border border-white/10 text-slate-300"
          >
            <option value="All">Stage — All</option>
            <option value="Pleading">Pleading</option>
            <option value="Hearing">Hearing</option>
            <option value="Evidence">Evidence</option>
            <option value="Research">Research</option>
            <option value="Filing">Filing</option>
          </select>

          <select className="p-2 rounded-xl bg-[#041828] border border-white/10 text-slate-300">
            <option>Status — Active</option>
          </select>

          <select className="p-2 rounded-xl bg-[#041828] border border-white/10 text-slate-300">
            <option>Priority — All</option>
          </select>

          <button
            onClick={handleResetFilters}
            className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Matters Table (Ref Panel 2) */}
      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="pb-3 font-semibold">Matter ID</th>
                <th className="pb-3 font-semibold">Matter Title</th>
                <th className="pb-3 font-semibold">Client</th>
                <th className="pb-3 font-semibold">Court</th>
                <th className="pb-3 font-semibold">Case Type</th>
                <th className="pb-3 font-semibold">Stage</th>
                <th className="pb-3 font-semibold">Next Hearing</th>
                <th className="pb-3 font-semibold">Priority</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredMatters.map((m) => (
                <tr key={m.id} className="hover:bg-white/[0.02]">
                  <td className="py-3.5 font-mono font-extrabold text-[#00B8FF]">{m.id}</td>
                  <td className="py-3.5 font-bold text-white">{m.title}</td>
                  <td className="py-3.5 text-slate-300">{m.client}</td>
                  <td className="py-3.5 text-slate-300">{m.court}</td>
                  <td className="py-3.5 text-slate-300">{m.caseType}</td>
                  <td className="py-3.5 font-bold text-slate-200">{m.stage}</td>
                  <td className="py-3.5 font-mono text-rose-400 font-bold">{m.nextHearing}</td>
                  <td className="py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        m.priority === 'High'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : m.priority === 'Medium'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {m.priority}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {m.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => onOpenMatter(m.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-lg shadow-[#00B8FF]/20"
                    >
                      <span>Open Workspace</span>
                      <ExternalLink className="w-3.5 h-3.5" />
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

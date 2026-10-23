import React, { useState } from 'react';
import { Briefcase, Search, Plus } from 'lucide-react';

interface MatterItem {
  id: string;
  name: string;
  client: string;
  type: string;
  status: 'Active' | 'In Review' | 'On Hold' | 'Resolved';
  risk: 'High' | 'Medium' | 'Low';
  value: string;
  nextDeadline: string;
  department: string;
}

interface ManagementPortfolioListProps {
  onSelectMatter: (matterId: string) => void;
}

export const ManagementPortfolioList: React.FC<ManagementPortfolioListProps> = ({ onSelectMatter }) => {
  const [matters] = useState<MatterItem[]>([
    {
      id: 'MATTER-882',
      name: 'Commercial Litigation & Contract Claims',
      client: 'ABC Pvt Ltd',
      type: 'Litigation',
      status: 'Active',
      risk: 'High',
      value: '₹12.5 Cr',
      nextDeadline: '28 Sep 2026',
      department: 'Legal',
    },
    {
      id: 'MATTER-904',
      name: 'Annual GST & Income Tax Compliance',
      client: 'Sharma Ent',
      type: 'Tax',
      status: 'In Review',
      risk: 'Medium',
      value: '₹30.0 Cr',
      nextDeadline: '15 Oct 2026',
      department: 'Finance',
    },
    {
      id: 'MATTER-087',
      name: 'Contract Breach Dispute Review',
      client: 'Mehta Pvt Ltd',
      type: 'Corporate',
      status: 'Active',
      risk: 'High',
      value: '₹2.1 Cr',
      nextDeadline: '12 Oct 2026',
      department: 'Legal',
    },
    {
      id: 'MATTER-091',
      name: 'Corporate Due Diligence Verification',
      client: 'Verma Traders',
      type: 'Compliance',
      status: 'On Hold',
      risk: 'Low',
      value: '₹15.0 Cr',
      nextDeadline: '25 Oct 2026',
      department: 'Compliance',
    },
    {
      id: 'MATTER-105',
      name: 'Property Title & Lease Agreement Dispute',
      client: 'Kumar Infras',
      type: 'Property',
      status: 'Active',
      risk: 'High',
      value: '₹35.0 Cr',
      nextDeadline: '30 Sep 2026',
      department: 'Property',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const filteredMatters = matters.filter((m) => {
    if (statusFilter !== 'All' && m.status !== statusFilter) return false;
    if (typeFilter !== 'All' && m.type !== typeFilter) return false;
    if (
      searchQuery &&
      !m.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !m.client.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !m.id.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#00B8FF]" />
            <span>Firm Portfolio (24 Matters)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Complete executive view of active and historical matters across MARG Group.
          </p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>+ New Matter</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search matters, clients, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-slate-300 focus:outline-none focus:border-[#00B8FF]"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="In Review">In Review</option>
            <option value="On Hold">On Hold</option>
            <option value="Resolved">Resolved</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-slate-300 focus:outline-none focus:border-[#00B8FF]"
          >
            <option value="All">All Types</option>
            <option value="Litigation">Litigation</option>
            <option value="Tax">Tax</option>
            <option value="Corporate">Corporate</option>
            <option value="Compliance">Compliance</option>
            <option value="Property">Property</option>
          </select>
        </div>
      </div>

      {/* Portfolio Table */}
      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="pb-3 font-semibold">ID</th>
                <th className="pb-3 font-semibold">Matter Name</th>
                <th className="pb-3 font-semibold">Client</th>
                <th className="pb-3 font-semibold">Type</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Risk</th>
                <th className="pb-3 font-semibold">Value</th>
                <th className="pb-3 font-semibold">Next Deadline</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredMatters.map((m) => (
                <tr key={m.id} className="hover:bg-white/[0.02] transition-all">
                  <td className="py-3.5 font-mono font-bold text-[#00B8FF]">{m.id}</td>
                  <td className="py-3.5 font-bold text-white max-w-xs">{m.name}</td>
                  <td className="py-3.5 text-slate-300">{m.client}</td>
                  <td className="py-3.5 font-semibold text-purple-300">{m.type}</td>
                  <td className="py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        m.status === 'Active'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : m.status === 'In Review'
                          ? 'bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        m.risk === 'High'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {m.risk}
                    </span>
                  </td>
                  <td className="py-3.5 font-mono font-bold text-emerald-400">{m.value}</td>
                  <td className="py-3.5 font-mono text-slate-300">{m.nextDeadline}</td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => onSelectMatter(m.id)}
                      className="px-3 py-1.5 rounded-lg bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      View Details
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

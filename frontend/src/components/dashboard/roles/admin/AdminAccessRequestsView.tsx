import React, { useState } from 'react';
import {
  Lock,
  Search
} from 'lucide-react';

export interface AdminAccessRequestsViewProps {
  onOpenAccessRequestDetail?: (requestId: string) => void;
  onSelectRequest?: (requestId: string) => void;
}

export const AdminAccessRequestsView: React.FC<AdminAccessRequestsViewProps> = ({
  onOpenAccessRequestDetail,
  onSelectRequest,
}) => {
  const [statusTab, setStatusTab] = useState('Pending');
  const [searchQuery, setSearchQuery] = useState('');

  const requests = [
    { id: 'AR-9021', requester: 'Teja Reddy', role: 'Client', resource: 'Property Record #PR-9042', duration: '30 days', priority: 'High', priorityColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30', status: 'Pending' },
    { id: 'AR-9018', requester: 'Priya Sharma', role: 'Advocate', resource: 'Case #CS-4012', duration: '90 days', priority: 'Medium', priorityColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30', status: 'Pending' },
    { id: 'AR-9015', requester: 'Aman Verma', role: 'Employee', resource: 'Financial Reports', duration: 'Permanent', priority: 'Low', priorityColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', status: 'In Progress' },
    { id: 'AR-9010', requester: 'Rohan Mehta', role: 'Management', resource: 'Audit Documents', duration: '60 days', priority: 'Pending', priorityColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30', status: 'Pending' },
    { id: 'AR-9004', requester: 'Sneha Iyer', role: 'Tenant/Vendor', resource: 'Maintenance Records', duration: '60 days', priority: 'Medium', priorityColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30', status: 'Pending' },
  ];

  const filtered = requests.filter((r) => {
    if (statusTab !== 'All' && r.status !== statusTab) return false;
    if (
      searchQuery &&
      !r.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !r.requester.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !r.resource.toLowerCase().includes(searchQuery.toLowerCase())
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
            <Lock className="w-6 h-6 text-[#00B8FF]" />
            <span>Access Requests</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review and manage access requests for platform resources.
          </p>
        </div>
      </div>

      {/* Status Filter Tabs (Matching Panel 5) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#081525] border border-white/10 text-xs font-medium text-slate-400">
          {[
            { id: 'Pending', label: 'Pending (18)' },
            { id: 'In Progress', label: 'In Progress (7)' },
            { id: 'Approved', label: 'Approved (124)' },
            { id: 'Rejected', label: 'Rejected (22)' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setStatusTab(t.id)}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                statusTab === t.id ? 'bg-[#00B8FF] text-black font-bold shadow-md' : 'hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="relative flex-1 md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by requester, resource..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-[#081525] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF]"
          />
        </div>
      </div>

      {/* Data Table (Matching Panel 5) */}
      <div className="rounded-2xl bg-[#081525]/90 border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-[#040e1a] text-slate-400 font-mono">
                <th className="p-3.5 pl-4">REQUESTER</th>
                <th className="p-3.5">ROLE</th>
                <th className="p-3.5">RESOURCE</th>
                <th className="p-3.5">DURATION</th>
                <th className="p-3.5">PRIORITY</th>
                <th className="p-3.5">STATUS</th>
                <th className="p-3.5 pr-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-white/5 transition-colors">
                  <td
                    onClick={() => {
                      if (onSelectRequest) onSelectRequest(r.id);
                      if (onOpenAccessRequestDetail) onOpenAccessRequestDetail(r.id);
                    }}
                    className="p-3.5 pl-4 font-bold text-white hover:text-[#00B8FF] cursor-pointer"
                  >
                    {r.requester}
                  </td>
                  <td className="p-3.5 font-mono text-slate-300">{r.role}</td>
                  <td className="p-3.5 font-mono text-[#00B8FF] font-bold">{r.resource}</td>
                  <td className="p-3.5 font-mono text-slate-300">{r.duration}</td>
                  <td className="p-3.5 font-mono">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${r.priorityColor}`}>
                      {r.priority}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3.5 pr-4 text-right">
                    <button
                      onClick={() => {
                        if (onSelectRequest) onSelectRequest(r.id);
                        if (onOpenAccessRequestDetail) onOpenAccessRequestDetail(r.id);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-[#00B8FF] text-black hover:bg-[#0096d6] text-xs font-bold transition-colors"
                    >
                      Review
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

import React, { useState } from 'react';
import {
  FileCheck2,
  Search,
  RotateCcw,
  Eye
} from 'lucide-react';

interface TenantAgreementsViewProps {
  onOpenProperty: (propertyId: string) => void;
}

export const TenantAgreementsView: React.FC<TenantAgreementsViewProps> = ({ onOpenProperty }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedAgreement, setSelectedAgreement] = useState<any | null>(null);

  const agreements = [
    { id: 'AGR-001', propertyId: 'PROP-01', propertyName: 'Riverside Tower', type: 'Lease Agreement', startDate: '01 Jan 2025', endDate: '31 Dec 2026', status: 'Active', details: '5-year commercial lease lock-in for Unit 501.' },
    { id: 'AGR-002', propertyId: 'PROP-02', propertyName: 'Maple Business Park', type: 'Buyer Agreement', startDate: '15 Sep 2025', endDate: '--', status: 'Pending', details: 'Buyer sale deed draft pending execution.' },
    { id: 'AGR-003', propertyId: 'PROP-03', propertyName: 'Skyline Plaza', type: 'Retail Lease', startDate: '01 Mar 2024', endDate: '28 Feb 2026', status: 'Expiring', details: 'Retail lease agreement expiring in 30 days.' },
  ];

  const filteredAgreements = agreements.filter((a) => {
    const matchesSearch = a.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) || a.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <FileCheck2 className="w-6 h-6 text-emerald-400" />
            <span>Agreements & Contracts ({agreements.length})</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            View all agreements related to your properties.
          </p>
        </div>
        <button
          onClick={() => alert('Agreement Templates gallery opened.')}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-bold text-xs cursor-pointer"
        >
          View Templates
        </button>
      </div>

      {/* Filter Bar (Ref Panel 6) */}
      <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex-1 min-w-[240px] relative">
          <input
            type="text"
            placeholder="Search agreements..."
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
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Expiring">Expiring</option>
          </select>

          <button
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('All');
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-all cursor-pointer"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Agreement Table (Ref Panel 6) */}
      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#041828] text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-3.5 rounded-l-lg">Agreement ID</th>
                <th className="p-3.5">Property</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Start Date</th>
                <th className="p-3.5">End Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredAgreements.map((agr) => (
                <tr key={agr.id} className="hover:bg-white/[0.02]">
                  <td className="p-3.5 font-mono font-bold text-[#00B8FF]">{agr.id}</td>
                  <td className="p-3.5">
                    <button
                      onClick={() => onOpenProperty(agr.propertyId)}
                      className="font-bold text-white hover:text-[#00B8FF] hover:underline cursor-pointer"
                    >
                      {agr.propertyName}
                    </button>
                  </td>
                  <td className="p-3.5 text-slate-300 font-medium">{agr.type}</td>
                  <td className="p-3.5 font-mono text-slate-300">{agr.startDate}</td>
                  <td className="p-3.5 font-mono text-slate-300">{agr.endDate}</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold border ${
                      agr.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : agr.status === 'Pending' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                    }`}>
                      {agr.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setSelectedAgreement(agr)}
                      className="px-3 py-1.5 rounded-lg bg-[#00B8FF]/10 hover:bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30 font-bold text-xs flex items-center gap-1 ml-auto cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedAgreement && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-[#081525] border border-[#00B8FF]/30 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-extrabold text-white text-base">{selectedAgreement.type}</h3>
              <span className="font-mono text-xs text-[#00B8FF] font-bold">{selectedAgreement.id}</span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 block">Property:</span>
                <span className="font-bold text-white">{selectedAgreement.propertyName}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Term Duration:</span>
                <span className="font-mono text-slate-200">{selectedAgreement.startDate} to {selectedAgreement.endDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Agreement Details:</span>
                <p className="text-slate-200 mt-1 bg-[#041828] p-3 rounded-xl border border-white/5">{selectedAgreement.details}</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedAgreement(null)}
                className="px-4 py-2 rounded-xl bg-[#00B8FF] text-white font-bold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantAgreementsView;

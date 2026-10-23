import React, { useState } from 'react';
import {
  Home,
  Plus,
  Search,
  RotateCcw,
  ChevronRight,
  Building
} from 'lucide-react';

interface TenantPropertiesViewProps {
  onOpenProperty: (propertyId: string) => void;
  onOpenAddPropertyRequest: () => void;
}

export const TenantPropertiesView: React.FC<TenantPropertiesViewProps> = ({
  onOpenProperty,
  onOpenAddPropertyRequest,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const properties = [
    { id: 'PROP-01', name: 'Riverside Tower', unit: 'Unit 501', type: 'Office', location: 'Mumbai', agreement: 'Active', paymentStatus: 'Due', nextDue: '28 Sep 2025' },
    { id: 'PROP-02', name: 'Maple Business Park', unit: 'Suite 12', type: 'Commercial', location: 'Bengaluru', agreement: 'Pending', paymentStatus: '--', nextDue: '--' },
    { id: 'PROP-03', name: 'Skyline Plaza', unit: 'Retail 4', type: 'Retail', location: 'Hyderabad', agreement: 'Active', paymentStatus: 'Paid', nextDue: '15 Oct 2025' },
  ];

  const filteredProps = properties.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All' || p.type === typeFilter;
    const matchesStatus = statusFilter === 'All' || p.agreement === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Home className="w-6 h-6 text-[#00B8FF]" />
            <span>Your Properties & Assets ({properties.length})</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            View and manage all your associated properties, units and assets.
          </p>
        </div>
        <button
          onClick={onOpenAddPropertyRequest}
          className="px-4 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-sky-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Property (Request)</span>
        </button>
      </div>

      {/* Filter Bar (Ref Panel 2) */}
      <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex-1 min-w-[240px] relative">
          <input
            type="text"
            placeholder="Search properties, locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#041828] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-xs text-slate-300 font-medium focus:outline-none focus:border-[#00B8FF]"
          >
            <option value="All">All Types</option>
            <option value="Office">Office</option>
            <option value="Commercial">Commercial</option>
            <option value="Retail">Retail</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-xs text-slate-300 font-medium focus:outline-none focus:border-[#00B8FF]"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
          </select>

          <button
            onClick={() => {
              setSearchQuery('');
              setTypeFilter('All');
              setStatusFilter('All');
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-all cursor-pointer"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Property Table (Ref Panel 2) */}
      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#041828] text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-3.5 rounded-l-lg">Property</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Location</th>
                <th className="p-3.5">Agreement</th>
                <th className="p-3.5">Payment Status</th>
                <th className="p-3.5">Next Due</th>
                <th className="p-3.5 text-right rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProps.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02]">
                  <td className="p-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#00B8FF]/10 text-[#00B8FF] flex items-center justify-center font-bold text-xs shrink-0 border border-[#00B8FF]/20">
                        <Building className="w-4 h-4" />
                      </div>
                      <div>
                        <button
                          onClick={() => onOpenProperty(p.id)}
                          className="font-bold text-white hover:text-[#00B8FF] hover:underline text-xs cursor-pointer block"
                        >
                          {p.name}
                        </button>
                        <span className="text-[10px] text-slate-400 font-mono">{p.unit}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 text-slate-300 font-medium">{p.type}</td>
                  <td className="p-3.5 text-slate-300 font-medium">{p.location}</td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      p.agreement === 'Active' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}>
                      {p.agreement}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.paymentStatus === 'Due' ? 'bg-rose-500/20 text-rose-300' : p.paymentStatus === 'Paid' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-500'
                    }`}>
                      {p.paymentStatus}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-slate-300">{p.nextDue}</td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => onOpenProperty(p.id)}
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

export default TenantPropertiesView;

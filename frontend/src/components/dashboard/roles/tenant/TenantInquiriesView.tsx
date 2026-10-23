import React, { useState } from 'react';
import {
  HelpCircle,
  Plus,
  Search,
  RotateCcw,
  Eye
} from 'lucide-react';

interface TenantInquiriesViewProps {
  onOpenNewInquiry: () => void;
  onOpenProperty: (propertyId: string) => void;
}

export const TenantInquiriesView: React.FC<TenantInquiriesViewProps> = ({
  onOpenNewInquiry,
  onOpenProperty,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);

  const inquiries = [
    { id: 'INQ-101', subject: 'Clarification on renewal terms', propertyId: 'PROP-01', propertyName: 'Riverside Tower', category: 'Agreement', status: 'Under Review', priority: 'High', created: '20 Sep 2025', response: 'Legal counsel is reviewing the clause 4.0 terms.' },
    { id: 'INQ-102', subject: 'Maintenance issue in Unit 501', propertyId: 'PROP-01', propertyName: 'Riverside Tower', category: 'Maintenance', status: 'Assigned', priority: 'Medium', created: '18 Sep 2025', response: 'Facilities team dispatched technician.' },
    { id: 'INQ-103', subject: 'Parking space allocation', propertyId: 'PROP-02', propertyName: 'Maple Business Park', category: 'Facilities', status: 'Resolved', priority: 'Low', created: '10 Sep 2025', response: 'Slot #42 assigned to your unit.' },
    { id: 'INQ-104', subject: 'GST invoice clarification', propertyId: 'PROP-03', propertyName: 'Skyline Plaza', category: 'Finance', status: 'Awaiting Reply', priority: 'High', created: '08 Sep 2025', response: 'Finance department generated updated invoice.' },
  ];

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch = inq.subject.toLowerCase().includes(searchQuery.toLowerCase()) || inq.propertyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'All' || inq.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || inq.status === statusFilter;
    return matchesSearch && matchesCat && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#00B8FF]" />
            <span>Inquiries & Questions ({inquiries.length})</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track and communicate your inquiries with the legal and property team.
          </p>
        </div>
        <button
          onClick={onOpenNewInquiry}
          className="px-4 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-sky-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>New Inquiry</span>
        </button>
      </div>

      {/* Filter Bar (Ref Panel 4) */}
      <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex-1 min-w-[240px] relative">
          <input
            type="text"
            placeholder="Search inquiries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#041828] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-xs text-slate-300 font-medium focus:outline-none focus:border-[#00B8FF]"
          >
            <option value="All">All Categories</option>
            <option value="Agreement">Agreement</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Facilities">Facilities</option>
            <option value="Finance">Finance</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-xs text-slate-300 font-medium focus:outline-none focus:border-[#00B8FF]"
          >
            <option value="All">All Status</option>
            <option value="Under Review">Under Review</option>
            <option value="Assigned">Assigned</option>
            <option value="Resolved">Resolved</option>
            <option value="Awaiting Reply">Awaiting Reply</option>
          </select>

          <button
            onClick={() => {
              setSearchQuery('');
              setCategoryFilter('All');
              setStatusFilter('All');
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-all cursor-pointer"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Inquiry Table (Ref Panel 4) */}
      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#041828] text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-3.5 rounded-l-lg">ID</th>
                <th className="p-3.5">Subject</th>
                <th className="p-3.5">Property</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Priority</th>
                <th className="p-3.5">Created</th>
                <th className="p-3.5 text-right rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredInquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-white/[0.02]">
                  <td className="p-3.5 font-mono font-bold text-[#00B8FF]">{inq.id}</td>
                  <td className="p-3.5 font-bold text-white max-w-[220px] truncate">{inq.subject}</td>
                  <td className="p-3.5">
                    <button
                      onClick={() => onOpenProperty(inq.propertyId)}
                      className="text-slate-300 hover:text-[#00B8FF] hover:underline cursor-pointer"
                    >
                      {inq.propertyName}
                    </button>
                  </td>
                  <td className="p-3.5 text-slate-300 font-medium">{inq.category}</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold border ${
                      inq.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-[#00B8FF]/20 text-[#00B8FF] border-[#00B8FF]/30'
                    }`}>
                      {inq.status}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      inq.priority === 'High' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {inq.priority}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-slate-400">{inq.created}</td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setSelectedInquiry(inq)}
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

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-[#081525] border border-[#00B8FF]/30 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-extrabold text-white text-base">{selectedInquiry.subject}</h3>
              <span className="font-mono text-xs text-[#00B8FF] font-bold">{selectedInquiry.id}</span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 block">Property:</span>
                <span className="font-bold text-white">{selectedInquiry.propertyName}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Category:</span>
                <span className="text-slate-200 font-semibold">{selectedInquiry.category}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Latest Team Response:</span>
                <p className="text-slate-200 mt-1 bg-[#041828] p-3 rounded-xl border border-white/5">{selectedInquiry.response}</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedInquiry(null)}
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

export default TenantInquiriesView;

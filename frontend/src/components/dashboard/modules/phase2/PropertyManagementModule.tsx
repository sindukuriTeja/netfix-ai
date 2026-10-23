import React from 'react';
import { Home, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export const PropertyManagementModule: React.FC = () => {
  return (
    <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-5 backdrop-blur-xl flex flex-col justify-between space-y-4 shadow-xl hover:border-teal-500/30 transition-all duration-300">
      {/* Module Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center text-xs border border-teal-500/30">
            18
          </div>
          <div>
            <h3 className="text-sm font-black text-white tracking-tight flex items-center gap-2">
              Property Management
            </h3>
            <p className="text-[11px] text-slate-400">Manage. Lease. Track.</p>
          </div>
        </div>
        <span className="text-[10px] font-bold text-teal-300 bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded">
          REAL ESTATE
        </span>
      </div>

      {/* Property Overview Card */}
      <div className="bg-[#030712]/80 border border-white/10 rounded-xl p-3 space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-teal-400" />
              <span>Sunrise Apartments</span>
            </h4>
            <p className="text-[10px] text-slate-400">Hyderabad, Telangana</p>
          </div>
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
            Occupied
          </span>
        </div>

        {/* Property Metadata Grid */}
        <div className="grid grid-cols-2 gap-1.5 text-[10px] text-slate-300 border-t border-white/5 pt-2">
          <div>
            <span className="text-slate-500 font-semibold block">Type:</span>
            <span className="font-bold">Residential</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold block">Owner Entity:</span>
            <span className="font-bold text-slate-200 truncate block">MARG Technologies</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold block">Current Tenant:</span>
            <span className="font-bold text-teal-300">Ravi Kumar</span>
          </div>
          <div>
            <span className="text-slate-500 font-semibold block">Lease Period:</span>
            <span className="font-bold text-slate-200">01 Jan 24 - 31 Dec 25</span>
          </div>
        </div>
      </div>

      {/* Quick Status Pill Indicators */}
      <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold">
        <span className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span>Lease Active</span>
        </span>
        <span className="px-2 py-1 rounded-lg bg-sky-500/10 text-sky-300 border border-sky-500/20 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-sky-400" />
          <span>Rent On Time</span>
        </span>
        <span className="px-2 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 text-amber-400" />
          <span>Maintenance 2 Requests</span>
        </span>
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
        <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-3 py-1.5 rounded-lg border border-white/10 transition-all">
          View Details
        </button>
        <button className="bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 transition-all">
          <FileText className="w-3.5 h-3.5" />
          <span>Documents (12)</span>
        </button>
      </div>
    </div>
  );
};

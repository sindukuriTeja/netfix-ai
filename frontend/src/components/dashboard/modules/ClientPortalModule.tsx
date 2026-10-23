import React, { useState } from 'react';
import { User, Plus, FileText, Clock, MessageSquare, ShieldCheck } from 'lucide-react';

export const ClientPortalModule: React.FC = () => {
  const [stats] = useState({
    activeCases: 5,
    inReview: 2,
    completed: 3,
    documents: 12,
  });

  const [activities] = useState([
    { id: '1', text: 'Your document has been processed', time: '2 hours ago', icon: FileText },
    { id: '2', text: 'GST Compliance case updated', time: '5 hours ago', icon: Clock },
    { id: '3', text: 'New comment from team', time: '1 day ago', icon: MessageSquare },
  ]);

  return (
    <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-5 shadow-xl relative overflow-hidden backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 font-extrabold text-sm">
            8
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
              Client Portal
            </h3>
            <p className="text-xs text-slate-400">Your Requests. Our Expertise.</p>
          </div>
        </div>

        <button
          onClick={() => {
            const el = document.getElementById('query-system-module');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-sky-500/20"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Submit Request</span>
        </button>
      </div>

      {/* Main Content Grid Left, Feature Checklist Right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Welcome, Stats Cards & Activity (3 Cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-sky-400" />
              <span>Welcome back, Teja!</span>
            </h4>
            <span className="text-[11px] text-slate-400">Track your cases, documents and requests</span>
          </div>

          {/* 4 Stat Cards matching reference image */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center space-y-0.5">
              <span className="text-lg font-extrabold text-sky-400">{stats.activeCases}</span>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Active Cases</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center space-y-0.5">
              <span className="text-lg font-extrabold text-indigo-400">{stats.inReview}</span>
              <p className="text-[10px] font-bold text-slate-400 uppercase">In Review</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center space-y-0.5">
              <span className="text-lg font-extrabold text-emerald-400">{stats.completed}</span>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Completed</p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center space-y-0.5">
              <span className="text-lg font-extrabold text-amber-400">{stats.documents}</span>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Documents</p>
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold text-slate-300">Recent Activity</h5>
            <div className="space-y-2">
              {activities.map((act) => {
                const IconComp = act.icon;
                return (
                  <div
                    key={act.id}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <IconComp className="w-4 h-4 text-sky-400 shrink-0" />
                      <span className="text-slate-200 font-medium">{act.text}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{act.time}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Feature List Column (Right) */}
        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-3 space-y-2.5">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Portal Features</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Client dashboard</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Submit request (Ask Agent)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>My cases / Filings</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>My documents</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Entity selection</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Track status in real-time</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

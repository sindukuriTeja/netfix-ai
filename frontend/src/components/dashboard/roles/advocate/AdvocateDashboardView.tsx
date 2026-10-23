import React from 'react';
import {
  Calendar,
  Activity
} from 'lucide-react';

interface AdvocateDashboardViewProps {
  onNavigateTab: (tabId: string) => void;
  onOpenMatter: (matterId: string) => void;
}

export const AdvocateDashboardView: React.FC<AdvocateDashboardViewProps> = ({
  onNavigateTab,
  onOpenMatter,
}) => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Welcome, Ananya Rao</h1>
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30">
              Bar ID: ADV-001 Verified
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Your legal workspace for assigned matters, hearings, evidence and research.
          </p>
        </div>
      </div>

      {/* KPI Strip (Ref Panel 1 - 8 Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <div
          onClick={() => onNavigateTab('matters')}
          className="p-3.5 rounded-2xl bg-[#081525] border border-white/10 hover:border-[#00B8FF]/40 transition-all cursor-pointer space-y-1"
        >
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Assigned</span>
          <span className="text-xl font-mono font-extrabold text-[#00B8FF]">5</span>
          <span className="text-[9px] text-slate-400 font-mono block">Matters</span>
        </div>

        <div
          onClick={() => onNavigateTab('matters')}
          className="p-3.5 rounded-2xl bg-[#081525] border border-white/10 hover:border-[#00B8FF]/40 transition-all cursor-pointer space-y-1"
        >
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Open</span>
          <span className="text-xl font-mono font-extrabold text-amber-300">3</span>
          <span className="text-[9px] text-slate-400 font-mono block">Matters</span>
        </div>

        <div
          onClick={() => onNavigateTab('deadlines')}
          className="p-3.5 rounded-2xl bg-[#081525] border border-white/10 hover:border-[#00B8FF]/40 transition-all cursor-pointer space-y-1"
        >
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Hearings</span>
          <span className="text-xl font-mono font-extrabold text-purple-400">2</span>
          <span className="text-[9px] text-purple-300 font-mono block">Upcoming</span>
        </div>

        <div
          onClick={() => onNavigateTab('deadlines')}
          className="p-3.5 rounded-2xl bg-[#081525] border border-white/10 hover:border-[#00B8FF]/40 transition-all cursor-pointer space-y-1"
        >
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Tasks</span>
          <span className="text-xl font-mono font-extrabold text-amber-400">4</span>
          <span className="text-[9px] text-amber-300 font-mono block">Pending</span>
        </div>

        <div
          onClick={() => onNavigateTab('evidence')}
          className="p-3.5 rounded-2xl bg-[#081525] border border-white/10 hover:border-[#00B8FF]/40 transition-all cursor-pointer space-y-1"
        >
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Evidence</span>
          <span className="text-xl font-mono font-extrabold text-cyan-400">7</span>
          <span className="text-[9px] text-cyan-300 font-mono block">Items</span>
        </div>

        <div
          onClick={() => onNavigateTab('research')}
          className="p-3.5 rounded-2xl bg-[#081525] border border-white/10 hover:border-[#00B8FF]/40 transition-all cursor-pointer space-y-1"
        >
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Research</span>
          <span className="text-xl font-mono font-extrabold text-blue-400">12</span>
          <span className="text-[9px] text-blue-300 font-mono block">Requests</span>
        </div>

        <div
          onClick={() => onNavigateTab('deadlines')}
          className="p-3.5 rounded-2xl bg-[#081525] border border-white/10 hover:border-[#00B8FF]/40 transition-all cursor-pointer space-y-1"
        >
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Overdue</span>
          <span className="text-xl font-mono font-extrabold text-rose-400">1</span>
          <span className="text-[9px] text-rose-300 font-mono block">Action</span>
        </div>

        <div
          onClick={() => onNavigateTab('documents')}
          className="p-3.5 rounded-2xl bg-[#081525] border border-white/10 hover:border-[#00B8FF]/40 transition-all cursor-pointer space-y-1"
        >
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Review</span>
          <span className="text-xl font-mono font-extrabold text-emerald-400">2</span>
          <span className="text-[9px] text-emerald-300 font-mono block">Docs</span>
        </div>
      </div>

      {/* Main Grid: Left Column (Upcoming Hearings & Deadlines) | Right Column (Recent Activity + Work Queue) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4 text-rose-400" /> Upcoming Hearings & Deadlines
              </h3>
              <button
                onClick={() => onNavigateTab('deadlines')}
                className="text-[10px] font-mono text-[#00B8FF] hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-[#041828] border border-white/5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-center font-mono pr-3 border-r border-white/10">
                    <span className="text-xs font-bold text-rose-400 block">28 Sep</span>
                    <span className="text-[10px] text-slate-400">2026</span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-[#00B8FF]">MAT-204</span>
                      <h4 className="font-bold text-white text-xs">File Written Submission</h4>
                    </div>
                    <p className="text-[11px] text-slate-400">Court: High Court | Client vs ABC Corp</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    High
                  </span>
                  <button
                    onClick={() => onOpenMatter('MAT-204')}
                    className="px-3 py-1.5 rounded-lg bg-[#00B8FF]/10 hover:bg-[#00B8FF]/20 text-[#00B8FF] text-xs font-bold border border-[#00B8FF]/30 cursor-pointer"
                  >
                    View Matter
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#041828] border border-white/5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-center font-mono pr-3 border-r border-white/10">
                    <span className="text-xs font-bold text-rose-400 block">30 Sep</span>
                    <span className="text-[10px] text-slate-400">2026</span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-[#00B8FF]">MAT-178</span>
                      <h4 className="font-bold text-white text-xs">Court Hearing</h4>
                    </div>
                    <p className="text-[11px] text-slate-400">Court: High Court | Tax Appeal</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    High
                  </span>
                  <button
                    onClick={() => onOpenMatter('MAT-178')}
                    className="px-3 py-1.5 rounded-lg bg-[#00B8FF]/10 hover:bg-[#00B8FF]/20 text-[#00B8FF] text-xs font-bold border border-[#00B8FF]/30 cursor-pointer"
                  >
                    View Matter
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#041828] border border-white/5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-center font-mono pr-3 border-r border-white/10">
                    <span className="text-xs font-bold text-amber-400 block">12 Oct</span>
                    <span className="text-[10px] text-slate-400">2026</span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-[#00B8FF]">MAT-166</span>
                      <h4 className="font-bold text-white text-xs">Evidence Disclosure</h4>
                    </div>
                    <p className="text-[11px] text-slate-400">Court: District Court | Property Partition</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Medium
                  </span>
                  <button
                    onClick={() => onOpenMatter('MAT-166')}
                    className="px-3 py-1.5 rounded-lg bg-[#00B8FF]/10 hover:bg-[#00B8FF]/20 text-[#00B8FF] text-xs font-bold border border-[#00B8FF]/30 cursor-pointer"
                  >
                    View Matter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Activity & My Work Queue */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-400" /> Recent Activity
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#041828] border border-white/5 space-y-0.5">
                <span className="text-slate-300 font-bold block">Document uploaded</span>
                <span className="text-[10px] font-mono text-[#00B8FF]">Contract_Agreement.pdf • 2 hours ago</span>
              </div>
              <div className="p-3 rounded-xl bg-[#041828] border border-white/5 space-y-0.5">
                <span className="text-slate-300 font-bold block">Evidence verified</span>
                <span className="text-[10px] font-mono text-emerald-400">EVI-001 • 4 hours ago</span>
              </div>
              <div className="p-3 rounded-xl bg-[#041828] border border-white/5 space-y-0.5">
                <span className="text-slate-300 font-bold block">Research requested</span>
                <span className="text-[10px] font-mono text-purple-300">Arnesh Kumar vs State • 1 day ago</span>
              </div>
              <div className="p-3 rounded-xl bg-[#041828] border border-white/5 space-y-0.5">
                <span className="text-slate-300 font-bold block">Report generated</span>
                <span className="text-[10px] font-mono text-cyan-400">MAT-204_Matter_Report.pdf • 2 days ago</span>
              </div>
            </div>
          </div>

          {/* My Work Queue */}
          <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              My Work Queue
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#041828] border border-white/5">
                <span className="text-slate-300">Documents for review</span>
                <span className="font-mono text-[#00B8FF] font-bold">3</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#041828] border border-white/5">
                <span className="text-slate-300">Evidence pending</span>
                <span className="font-mono text-amber-400 font-bold">2</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#041828] border border-white/5">
                <span className="text-slate-300">Research requests</span>
                <span className="font-mono text-purple-400 font-bold">1</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#041828] border border-white/5">
                <span className="text-slate-300">Upcoming deadlines</span>
                <span className="font-mono text-rose-400 font-bold">4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

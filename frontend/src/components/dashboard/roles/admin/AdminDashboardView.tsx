import React from 'react';
import {
  Users,
  Brain,
  Lock,
  AlertTriangle,
  Activity,
  Clock,
  TrendingUp
} from 'lucide-react';

export interface AdminDashboardViewProps {
  onNavigateTab?: (tabId: string) => void;
  onOpenUserDetail?: (userId: string) => void;
  onOpenAccessRequestDetail?: (requestId: string) => void;
  onNavigateUsers?: () => void;
  onNavigateAccessRequests?: () => void;
  onNavigateAudit?: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  onNavigateTab,
  onOpenUserDetail,
  onOpenAccessRequestDetail,
  onNavigateUsers,
  onNavigateAccessRequests,
  onNavigateAudit,
}) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#061527] via-[#081b33] to-[#040e1a] border border-[#00B8FF]/20 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[#00B8FF]/5 blur-3xl pointer-events-none" />
        <div className="space-y-1 z-10">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Welcome back, Admin</h1>
            <span className="text-xl">👋</span>
          </div>
          <p className="text-xs text-slate-300 font-medium">
            Here's the real-time overview of your NETFIX AI platform.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>All Systems Operational</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-400">
            Mon, 21 Sep 2026 • 10:15 IST
          </div>
        </div>
      </div>

      {/* 4 Top KPI Badges (Matching Panel 1) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <div
          onClick={() => {
            if (onNavigateUsers) onNavigateUsers();
            else if (onNavigateTab) onNavigateTab('user-management');
          }}
          className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 hover:border-[#00B8FF]/50 transition-all cursor-pointer group space-y-2 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Users</span>
            <Users className="w-4 h-4 text-[#00B8FF] group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">12,482</span>
            <span className="text-xs font-bold text-emerald-400 font-mono">+7.8%</span>
          </div>
          <p className="text-[10px] text-slate-500 font-medium">Platform users & accounts</p>
        </div>

        {/* AI Agents */}
        <div
          onClick={() => { if (onNavigateTab) onNavigateTab('ai-agents'); }}
          className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 hover:border-[#00B8FF]/50 transition-all cursor-pointer group space-y-2 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">AI Agents</span>
            <Brain className="w-4 h-4 text-[#00B8FF] group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">26</span>
            <span className="text-xs font-bold text-emerald-400 font-mono">Active: 20</span>
          </div>
          <p className="text-[10px] text-slate-500 font-medium">Orchestrated domain agents</p>
        </div>

        {/* Open Access Requests */}
        <div
          onClick={() => {
            if (onNavigateAccessRequests) onNavigateAccessRequests();
            else if (onNavigateTab) onNavigateTab('access-governance');
          }}
          className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 hover:border-amber-500/50 transition-all cursor-pointer group space-y-2 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Open Access Requests</span>
            <Lock className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-400 font-mono">18</span>
            <span className="text-xs font-bold text-rose-400 font-mono">6 High Priority</span>
          </div>
          <p className="text-[10px] text-amber-400/80 font-bold">Review required</p>
        </div>

        {/* Open Findings */}
        <div
          onClick={() => { if (onNavigateTab) onNavigateTab('regulatory-management'); }}
          className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 hover:border-rose-500/50 transition-all cursor-pointer group space-y-2 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Open Findings</span>
            <AlertTriangle className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-rose-400 font-mono">8</span>
            <span className="text-xs font-bold text-rose-400 font-mono">2 Critical</span>
          </div>
          <p className="text-[10px] text-rose-400/80 font-bold">Audit attention</p>
        </div>
      </div>

      {/* Middle Row: Gauges & Metrics (Matching Panel 1) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Compliance Score */}
        <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-2 flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-400">Compliance Score</span>
          <div className="flex items-center justify-between pt-1">
            <div className="relative w-16 h-16 rounded-full border-4 border-emerald-400 border-t-emerald-500/30 flex items-center justify-center bg-[#040e1a]">
              <span className="text-sm font-extrabold text-white font-mono">76%</span>
            </div>
            <span className="text-xs font-bold text-emerald-400 font-mono flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+3.2%</span>
            </span>
          </div>
        </div>

        {/* Platform Health */}
        <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-2 flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-400">Platform Health</span>
          <div className="flex items-center justify-between pt-1">
            <div className="relative w-16 h-16 rounded-full border-4 border-emerald-400 flex items-center justify-center bg-[#040e1a]">
              <Activity className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="text-lg font-extrabold text-white font-mono">99.8%</span>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-2 flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-400">Active Sessions</span>
          <div className="flex items-center justify-between pt-1">
            <span className="text-3xl font-extrabold text-[#00B8FF] font-mono">421</span>
            <span className="text-xs font-bold text-emerald-400 font-mono">↑12%</span>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-2 flex flex-col justify-between">
          <span className="text-xs font-medium text-slate-400">Pending Approvals</span>
          <div className="flex items-center justify-between pt-1">
            <span className="text-3xl font-extrabold text-amber-400 font-mono">12</span>
            <button
              onClick={() => {
                if (onNavigateAccessRequests) onNavigateAccessRequests();
                else if (onNavigateTab) onNavigateTab('access-governance');
              }}
              className="text-xs text-[#00B8FF] hover:underline font-bold"
            >
              Review All
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Activity Trends + Recent Platform Activity (Panel 1) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Activity Trends */}
        <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#00B8FF]" />
              <span>Activity Trends (Last 30 Days)</span>
            </h3>
            <div className="flex items-center gap-2 text-[11px] font-mono">
              <span className="flex items-center gap-1 text-[#00B8FF]">
                <span className="w-2 h-2 rounded-full bg-[#00B8FF]" /> User Logins
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> AI Executions
              </span>
              <span className="flex items-center gap-1 text-purple-400">
                <span className="w-2 h-2 rounded-full bg-purple-400" /> Access Requests
              </span>
            </div>
          </div>

          <div className="h-44 rounded-xl bg-[#040e1a] border border-white/5 p-4 flex items-end justify-between gap-2">
            {[40, 65, 80, 50, 90, 110, 85, 130, 150, 120, 170, 210].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-gradient-to-t from-[#00B8FF]/20 to-[#00B8FF] rounded-t transition-all hover:opacity-80"
                  style={{ height: `${(h / 210) * 100}%` }}
                />
                <span className="text-[9px] font-mono text-slate-500">Day {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Platform Activity */}
        <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#00B8FF]" />
              <span>Recent Platform Activity</span>
            </h3>
            <button
              onClick={() => {
                if (onNavigateAudit) onNavigateAudit();
                else if (onNavigateTab) onNavigateTab('audit-compliance');
              }}
              className="text-xs text-[#00B8FF] hover:underline font-semibold"
            >
              View Audit Log
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div
              onClick={() => onOpenUserDetail?.('usr-1')}
              className="p-3 rounded-xl bg-[#040e1a] border border-white/5 hover:border-[#00B8FF]/30 transition-all cursor-pointer flex items-center justify-between gap-3"
            >
              <div className="space-y-0.5">
                <span className="font-bold text-white">Teja Reddy logged in (Client)</span>
                <span className="text-[10px] text-slate-500 block font-mono">14:26 • IP: 192.168.1.24 (Chrome / Windows)</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Success
              </span>
            </div>

            <div
              onClick={() => onOpenAccessRequestDetail?.('AR-9021')}
              className="p-3 rounded-xl bg-[#040e1a] border border-white/5 hover:border-amber-500/30 transition-all cursor-pointer flex items-center justify-between gap-3"
            >
              <div className="space-y-0.5">
                <span className="font-bold text-amber-400">Access request submitted (#AR-9021)</span>
                <span className="text-[10px] text-slate-500 block font-mono">14:20 • Teja Reddy requested Property Record #PR-9042</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Pending
              </span>
            </div>

            <div
              onClick={() => { if (onNavigateTab) onNavigateTab('ai-agents'); }}
              className="p-3 rounded-xl bg-[#040e1a] border border-white/5 hover:border-[#00B8FF]/30 transition-all cursor-pointer flex items-center justify-between gap-3"
            >
              <div className="space-y-0.5">
                <span className="font-bold text-[#00B8FF]">Ultron Agent completed document analysis</span>
                <span className="text-[10px] text-slate-500 block font-mono">14:15 • Task #PR-9042 completed in 1.8s</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30">
                Completed
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#040e1a] border border-white/5 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="font-bold text-rose-400">Failed login attempt (john@example.com)</span>
                <span className="text-[10px] text-slate-500 block font-mono">14:10 • IP: 192.168.3.44 (Invalid Password)</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Failed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

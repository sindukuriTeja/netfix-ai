import React from 'react';
import {
  ClipboardList,
  AlertTriangle,
  ShieldCheck,
  FileCheck,
  Clock,
  AlertCircle,
  Calendar
} from 'lucide-react';

interface AuditorDashboardViewProps {
  onNavigateTab: (tabId: string) => void;
  onOpenReview: (reviewId: string) => void;
}

export const AuditorDashboardView: React.FC<AuditorDashboardViewProps> = ({
  onNavigateTab,
  onOpenReview,
}) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#061527] via-[#081b33] to-[#040e1a] border border-[#00B8FF]/20 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[#00B8FF]/5 blur-3xl pointer-events-none" />
        <div className="space-y-1 z-10">
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>Welcome back, Priya Nair</span>
            <span className="text-xl">👋</span>
          </h1>
          <p className="text-xs text-slate-300 font-medium">
            Here's your audit and compliance overview.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 z-10">
          <div className="px-3.5 py-1.5 rounded-xl bg-[#00B8FF]/10 border border-[#00B8FF]/30 text-xs font-mono text-[#00B8FF] flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#00B8FF]" />
            <span>1 Apr 2025 – 31 Mar 2026</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono text-slate-400">
            Last updated: 25 Sep 2025, 10:45 AM
          </div>
        </div>
      </div>

      {/* 6 Top KPI Badges (Matching Panel 1) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Card 1: Assigned Reviews */}
        <div
          onClick={() => onNavigateTab('assigned-reviews')}
          className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 hover:border-[#00B8FF]/50 transition-all cursor-pointer group space-y-2 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-400">Assigned Reviews</span>
            <ClipboardList className="w-4 h-4 text-[#00B8FF] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-extrabold text-[#00B8FF] font-mono">4</div>
          <span className="text-[10px] text-slate-400 font-medium">In audit scope</span>
        </div>

        {/* Card 2: Reviews In Progress */}
        <div
          onClick={() => onNavigateTab('assigned-reviews')}
          className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 hover:border-[#00B8FF]/50 transition-all cursor-pointer group space-y-2 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-400">In Progress</span>
            <Clock className="w-4 h-4 text-[#00B8FF] group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-extrabold text-[#00B8FF] font-mono">3</div>
          <span className="text-[10px] text-slate-400 font-medium">Active testing</span>
        </div>

        {/* Card 3: Open Findings */}
        <div
          onClick={() => onNavigateTab('audit-findings')}
          className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 hover:border-rose-500/50 transition-all cursor-pointer group space-y-2 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-400">Open Findings</span>
            <AlertTriangle className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-rose-400 font-mono">8</span>
            <span className="text-[10px] font-bold text-rose-400/90 font-mono">2 Crit</span>
          </div>
          <span className="text-[10px] text-rose-400/80 font-bold">Action required</span>
        </div>

        {/* Card 4: Overdue Actions */}
        <div
          onClick={() => onNavigateTab('audit-findings')}
          className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 hover:border-amber-500/50 transition-all cursor-pointer group space-y-2 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-400">Overdue Actions</span>
            <AlertCircle className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400 font-mono">2</div>
          <span className="text-[10px] text-amber-400/80 font-bold">Mitigation overdue</span>
        </div>

        {/* Card 5: Compliance */}
        <div
          onClick={() => onNavigateTab('compliance-assessment')}
          className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 hover:border-emerald-500/50 transition-all cursor-pointer group space-y-2 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-400">Compliance</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">76%</div>
          <span className="text-[10px] text-emerald-400/80 font-bold font-mono">↑3.2% vs last mth</span>
        </div>

        {/* Card 6: Evidence Verified */}
        <div
          onClick={() => onNavigateTab('evidence-register')}
          className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 hover:border-sky-500/50 transition-all cursor-pointer group space-y-2 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-400">Evidence Verified</span>
            <FileCheck className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-extrabold text-sky-400 font-mono">82%</div>
          <span className="text-[10px] text-slate-400 font-medium">38/46 verified</span>
        </div>
      </div>

      {/* Middle Row: Donut Donut Bar Charts (Panel 1) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Compliance Status by Regulation */}
        <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Compliance Status by Regulation</span>
            </h3>
            <span className="text-xs font-mono font-bold text-emerald-400">76% Overall</span>
          </div>

          <div className="flex items-center justify-center py-3 relative">
            <div className="w-32 h-32 rounded-full border-8 border-emerald-400 border-t-amber-400 border-r-rose-500 flex items-center justify-center bg-[#040e1a]">
              <div className="text-center">
                <span className="text-2xl font-extrabold text-white font-mono block">76%</span>
                <span className="text-[10px] text-slate-400 font-medium">Compliant</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs pt-1">
            <div className="flex items-center justify-between text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span>Compliant</span>
              </div>
              <span className="font-mono font-bold text-white">68 (76%)</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span>Partially Compliant</span>
              </div>
              <span className="font-mono font-bold text-white">18 (15%)</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span>Non-Compliant</span>
              </div>
              <span className="font-mono font-bold text-white">5 (9%)</span>
            </div>
          </div>
        </div>

        {/* Findings by Severity Bar Chart */}
        <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Findings by Severity</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">Total: 8</span>
          </div>

          <div className="space-y-3.5 pt-2">
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-rose-400 font-bold">Critical</span>
                <span className="text-slate-300 font-mono">2</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: '60%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-amber-400 font-bold">High</span>
                <span className="text-slate-300 font-mono">3</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-sky-400 font-bold">Medium</span>
                <span className="text-slate-300 font-mono">2</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-sky-400 rounded-full" style={{ width: '50%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-400 font-bold">Low</span>
                <span className="text-slate-300 font-mono">1</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-slate-500 rounded-full" style={{ width: '25%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Evidence Status Donut */}
        <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-sky-400" />
              <span>Evidence Status</span>
            </h3>
            <span className="text-xs font-mono font-bold text-sky-400">82% Verified</span>
          </div>

          <div className="flex items-center justify-center py-3 relative">
            <div className="w-32 h-32 rounded-full border-8 border-sky-400 border-t-amber-400 border-r-rose-500 flex items-center justify-center bg-[#040e1a]">
              <div className="text-center">
                <span className="text-2xl font-extrabold text-white font-mono block">82%</span>
                <span className="text-[10px] text-slate-400 font-medium">Verified</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
              <span>Verified (38)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>Pending (5)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>Rejected (2)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
              <span>Missing (1)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Upcoming Deadlines + Recent Audit Activity (Panel 1) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Upcoming Deadlines */}
        <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Upcoming Deadlines</span>
            </h3>
            <button
              onClick={() => onNavigateTab('assigned-reviews')}
              className="text-xs text-[#00B8FF] hover:underline font-semibold"
            >
              View Calendar
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-[#040e1a] border border-white/5 flex items-center justify-between gap-3">
              <div>
                <span className="font-mono text-[10px] text-rose-400 font-bold block">15 Sep 2025</span>
                <span className="font-bold text-white">Submit GST evidence — MARG Tech Corp</span>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 font-mono font-bold shrink-0">
                2 days
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#040e1a] border border-white/5 flex items-center justify-between gap-3">
              <div>
                <span className="font-mono text-[10px] text-amber-400 font-bold block">20 Sep 2025</span>
                <span className="font-bold text-white">Remediation plan due — Policy deviation (FND-102)</span>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-mono font-bold shrink-0">
                7 days
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#040e1a] border border-white/5 flex items-center justify-between gap-3">
              <div>
                <span className="font-mono text-[10px] text-[#00B8FF] font-bold block">30 Sep 2025</span>
                <span className="font-bold text-white">Audit review completion — MARG Tech Corp</span>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-[#00B8FF]/20 text-[#00B8FF] font-mono font-bold shrink-0">
                17 days
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#040e1a] border border-white/5 flex items-center justify-between gap-3">
              <div>
                <span className="font-mono text-[10px] text-emerald-400 font-bold block">05 Oct 2025</span>
                <span className="font-bold text-white">Evidence verification — TDS Reconciliation</span>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono font-bold shrink-0">
                22 days
              </span>
            </div>
          </div>
        </div>

        {/* Recent Audit Activity */}
        <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#00B8FF]" />
              <span>Recent Audit Activity</span>
            </h3>
            <button
              onClick={() => onNavigateTab('audit-activity-log')}
              className="text-xs text-[#00B8FF] hover:underline font-semibold"
            >
              View Activity Log
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-[#040e1a] border border-white/5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400">GST_Return_Q3.pdf verified</span>
                <span className="text-[10px] text-slate-500 font-mono">10:32 AM • You</span>
              </div>
              <p className="text-slate-400">EVD-038 verified for AUD-103 (MARG Tech Corp).</p>
            </div>

            <div className="p-3 rounded-xl bg-[#040e1a] border border-white/5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-rose-400">Finding FND-021 status changed to In Progress</span>
                <span className="text-[10px] text-slate-500 font-mono">09:15 AM • System</span>
              </div>
              <p className="text-slate-400">Tax invoice missing for GST claim #1042.</p>
            </div>

            <div className="p-3 rounded-xl bg-[#040e1a] border border-white/5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-400">Control CTL-021 tested</span>
                <span className="text-[10px] text-slate-500 font-mono">08:45 AM • You</span>
              </div>
              <p className="text-slate-400">GST Return Reconciliation tested — Result: Effective.</p>
            </div>

            <div className="p-3 rounded-xl bg-[#040e1a] border border-white/5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#00B8FF]">Document uploaded — Contract_Agreement_2025.pdf</span>
                <span className="text-[10px] text-slate-500 font-mono">08:20 AM • Finance Team</span>
              </div>
              <p className="text-slate-400">Uploaded for AUD-103 review scope.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Footer */}
      <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white">Active Audit Review Scope</h3>
          <p className="text-xs text-slate-400">Open active review AUD-103 to inspect controls, evidence, and findings.</p>
        </div>
        <button
          onClick={() => onOpenReview('AUD-103')}
          className="px-4 py-2 rounded-xl bg-[#00B8FF] text-black font-bold text-xs hover:bg-[#0096d6] transition-colors shadow-lg shadow-[#00B8FF]/20 shrink-0"
        >
          Open Audit Review AUD-103
        </button>
      </div>
    </div>
  );
};

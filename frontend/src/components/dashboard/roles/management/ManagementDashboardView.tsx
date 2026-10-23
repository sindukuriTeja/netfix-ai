import React, { useState } from 'react';
import {
  Sparkles,
  FileCheck2,
  ChevronRight,
  ArrowUpRight,
  ShieldAlert,
  PieChart as PieIcon,
  Activity
} from 'lucide-react';

interface ManagementDashboardViewProps {
  onNavigateTab: (tabId: string) => void;
  onOpenMatter: (matterId: string) => void;
  onOpenApproval: (approvalId: string) => void;
  onAskAi: (prompt?: string) => void;
}

export const ManagementDashboardView: React.FC<ManagementDashboardViewProps> = ({
  onNavigateTab,
  onOpenMatter,
  onOpenApproval,
  onAskAi,
}) => {
  const [aiFollowupText, setAiFollowupText] = useState('');

  const topRisks = [
    { id: 'MATTER-882', title: 'Commercial Litigation & Contract Claims', client: 'ABC Pvt Ltd', exposure: '₹12.5 Cr', severity: 'High', status: 'Deadline 3 days' },
    { id: 'MATTER-904', title: 'Annual GST & Income Tax Compliance', client: 'Sharma Ent', exposure: '₹30.0 Cr', severity: 'High', status: 'Notice Received' },
    { id: 'MATTER-087', title: 'Contract Breach Dispute Review', client: 'Mehta Pvt Ltd', exposure: '₹2.1 Cr', severity: 'Medium', status: 'In Review' },
    { id: 'MATTER-091', title: 'Corporate Due Diligence Verification', client: 'Verma Traders', exposure: '₹15.0 Cr', severity: 'Medium', status: 'Monitoring' },
  ];

  const pendingApprovals = [
    { id: 'APP-204', title: 'Approve Q3 Financial Compliance Report', department: 'Audit', value: '₹1.2 Cr', due: '28 Sep 2026' },
    { id: 'APP-198', title: 'Legal Counsel Budget Allocation', department: 'Finance', value: '₹40 L', due: '03 Oct 2026' },
    { id: 'APP-195', title: 'Settlement Authorization Sign-off', department: 'Corporate', value: '₹85 L', due: '05 Oct 2026' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Executive Command Center Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#081525] via-[#0b1d35] to-[#041828] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-white">Welcome, Rohan Mehta</h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30">
              Executive Director
            </span>
          </div>
          <p className="text-xs text-slate-300">
            Executive Summary for MARG Group • Wednesday, 24 Sep 2026
          </p>
        </div>

        <button
          onClick={() => onAskAi()}
          className="px-4 py-2.5 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#00B8FF]/20 self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Ask AI</span>
        </button>
      </div>

      {/* Executive KPI Strip (Real Metrics Display) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Metric 1 */}
        <div
          onClick={() => onNavigateTab('Portfolio / Matters')}
          className="p-4 rounded-2xl bg-[#081525] border border-white/10 space-y-1 hover:border-[#00B8FF]/40 transition-all cursor-pointer"
        >
          <span className="text-[11px] text-slate-400 font-semibold block">Active Matters</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white font-mono">24</span>
            <span className="text-[10px] font-bold text-emerald-400 flex items-center">
              +12% <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div
          onClick={() => onNavigateTab('Risk Overview')}
          className="p-4 rounded-2xl bg-[#081525] border border-white/10 space-y-1 hover:border-[#00B8FF]/40 transition-all cursor-pointer"
        >
          <span className="text-[11px] text-slate-400 font-semibold block">High-Risk</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-rose-400 font-mono">5</span>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-500/20 text-rose-300">
              20%
            </span>
          </div>
        </div>

        {/* Metric 3 */}
        <div
          onClick={() => onNavigateTab('Approvals')}
          className="p-4 rounded-2xl bg-[#081525] border border-white/10 space-y-1 hover:border-[#00B8FF]/40 transition-all cursor-pointer"
        >
          <span className="text-[11px] text-slate-400 font-semibold block">Pending Approvals</span>
          <span className="text-2xl font-extrabold text-amber-400 font-mono block">8</span>
        </div>

        {/* Metric 4 */}
        <div
          onClick={() => onNavigateTab('Portfolio / Matters')}
          className="p-4 rounded-2xl bg-[#081525] border border-white/10 space-y-1 hover:border-[#00B8FF]/40 transition-all cursor-pointer"
        >
          <span className="text-[11px] text-slate-400 font-semibold block">Upcoming Deadlines</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-rose-400 font-mono">6</span>
            <span className="text-[9px] font-bold text-rose-300">Next 7 Days</span>
          </div>
        </div>

        {/* Metric 5 */}
        <div
          onClick={() => onNavigateTab('Business Overview')}
          className="p-4 rounded-2xl bg-[#081525] border border-white/10 space-y-1 hover:border-[#00B8FF]/40 transition-all cursor-pointer"
        >
          <span className="text-[11px] text-slate-400 font-semibold block">Portfolio Value</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-emerald-400 font-mono">₹42.5 Cr</span>
            <span className="text-[10px] font-bold text-emerald-400">+8%</span>
          </div>
        </div>

        {/* Metric 6 */}
        <div
          onClick={() => onNavigateTab('Approvals')}
          className="p-4 rounded-2xl bg-[#081525] border border-white/10 space-y-1 hover:border-[#00B8FF]/40 transition-all cursor-pointer"
        >
          <span className="text-[11px] text-slate-400 font-semibold block">Open Actions</span>
          <span className="text-2xl font-extrabold text-[#00B8FF] font-mono block">12</span>
        </div>
      </div>

      {/* Main Grid: Left (Status Donut + Risk Table) | Right (Executive AI Insight + Approvals) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Matters by Status Donut & Top Risk Matters Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Matters by Status Visual Card */}
            <div className="p-5 rounded-2xl bg-[#081525] border border-white/10 space-y-4 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <PieIcon className="w-4 h-4 text-[#00B8FF]" /> Matters by Status
                </h3>
                <span className="text-[10px] font-mono text-slate-400">Total: 47</span>
              </div>

              <div className="flex items-center justify-around py-2">
                {/* Visual Ring Mockup */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path strokeDasharray="51, 100" strokeWidth="4" stroke="#00B8FF" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path strokeDasharray="17, 100" strokeDashoffset="-51" strokeWidth="4" stroke="#818CF8" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path strokeDasharray="34, 100" strokeDashoffset="-68" strokeWidth="4" stroke="#34D399" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-xl font-bold font-mono text-white">24</span>
                    <span className="text-[9px] text-slate-400 block">Active</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00B8FF]" />
                    <span className="text-slate-300">Active (24)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                    <span className="text-slate-300">In Review (8)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-slate-300">Resolved (16)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="text-slate-300">On Hold (4)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Risk Matters Preview */}
            <div className="p-5 rounded-2xl bg-[#081525] border border-white/10 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-400" /> Top Risk Matters
                </h3>
                <button
                  onClick={() => onNavigateTab('Risk Overview')}
                  className="text-xs text-[#00B8FF] font-semibold hover:underline cursor-pointer"
                >
                  View All
                </button>
              </div>

              <div className="space-y-2 text-xs">
                {topRisks.slice(0, 3).map((r) => (
                  <div
                    key={r.id}
                    onClick={() => onOpenMatter(r.id)}
                    className="p-2.5 rounded-xl bg-[#041828] border border-white/5 hover:border-rose-500/30 transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <span className="font-mono text-[10px] font-bold text-[#00B8FF]">{r.id}</span>
                      <h4 className="font-bold text-white text-[11px] truncate max-w-[150px]">{r.title}</h4>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        r.severity === 'High' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {r.severity} Risk
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pending Approvals Snapshot Panel */}
          <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-[#00B8FF]" />
                <span>Pending Approvals Requiring Executive Action</span>
              </h3>
              <button
                onClick={() => onNavigateTab('Approvals')}
                className="text-xs text-[#00B8FF] font-semibold hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>View Queue</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {pendingApprovals.map((app) => (
                <div
                  key={app.id}
                  className="p-3.5 rounded-xl bg-[#041828] border border-white/5 hover:border-[#00B8FF]/30 transition-all flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#00B8FF]">{app.id}</span>
                      <span className="text-slate-400">({app.department})</span>
                    </div>
                    <h4 className="font-bold text-white text-xs">{app.title}</h4>
                    <p className="text-[11px] text-slate-400">
                      Value: <span className="font-mono text-emerald-400 font-bold">{app.value}</span> | Due Date: <span className="font-mono text-rose-400">{app.due}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => onOpenApproval(app.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                  >
                    Review & Decide
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Executive AI Insight + Recent Activity */}
        <div className="space-y-6">
          {/* Executive AI Insight Panel */}
          <div className="p-6 rounded-2xl bg-[#081525] border border-[#00B8FF]/30 space-y-4 shadow-lg shadow-[#00B8FF]/5">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-extrabold text-white flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#00B8FF]" /> Executive AI Insight
              </span>
              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Ultron Verified
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#041828] border border-white/5 space-y-2 text-xs text-slate-200">
              <p className="font-bold text-white">3 matters require immediate management attention:</p>
              <ol className="list-decimal list-inside space-y-1 text-slate-300 leading-relaxed">
                <li><strong className="text-rose-400">CASE-102:</strong> Statutory response due in 3 days. High financial exposure.</li>
                <li><strong className="text-amber-400">CASE-087:</strong> Contract breach dispute flagged with high risk score.</li>
                <li><strong className="text-[#00B8FF]">Approval Queue:</strong> Volume increased 14% this week.</li>
              </ol>
            </div>

            <div className="space-y-2">
              <input
                type="text"
                placeholder="Ask follow-up strategic question..."
                value={aiFollowupText}
                onChange={(e) => setAiFollowupText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onAskAi(aiFollowupText)}
                className="w-full p-2.5 rounded-xl bg-[#041828] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00B8FF]"
              />
              <button
                onClick={() => onAskAi(aiFollowupText || 'Provide strategic guidance for high-risk matters')}
                className="w-full py-2 rounded-xl bg-[#00B8FF]/10 hover:bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30 text-xs font-bold transition-all cursor-pointer"
              >
                Ask Follow-up
              </button>
            </div>
          </div>

          {/* Organization Activity Log */}
          <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-white/10">
              <Activity className="w-4 h-4 text-[#00B8FF]" />
              <span>Recent Activity</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-slate-300">Matter MATTER-882 updated by Lead Counsel</span>
                <span className="font-mono text-[#00B8FF]">1 hour ago</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-slate-300">Executive Approval APP-194 completed</span>
                <span className="font-mono text-emerald-400">3 hours ago</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-slate-300">Q3 Executive Risk Summary Report generated</span>
                <span className="font-mono text-slate-400">5 hours ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">New high-risk alert flagged for CASE-1042</span>
                <span className="font-mono text-rose-400">1 day ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

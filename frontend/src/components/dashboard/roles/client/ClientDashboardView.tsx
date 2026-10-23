import React from 'react';
import {
  Briefcase,
  FileText,
  CheckSquare,
  Send,
  Calendar,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  Clock,
  AlertCircle
} from 'lucide-react';

interface ClientDashboardViewProps {
  onNavigateTab: (tabId: string) => void;
  onOpenMatter: (matterId: string) => void;
}

export const ClientDashboardView: React.FC<ClientDashboardViewProps> = ({
  onNavigateTab,
  onOpenMatter,
}) => {
  const upcomingDeadlines = [
    { matterId: 'MAT-301', title: 'File Written Submission', event: 'File Written Submission', date: '28 Sep 2026', days: 2, status: 'High' },
    { matterId: 'MAT-178', title: 'Court Hearing', event: 'Court Hearing', date: '30 Sep 2026', days: 5, status: 'High' },
    { matterId: 'MAT-205', title: 'Evidence Disclosure', event: 'Evidence Disclosure', date: '12 Oct 2026', days: 17, status: 'Medium' },
  ];

  const recentActivity = [
    {
      id: 'act_1',
      title: 'Document shared by Legal Team',
      detail: 'Contract_Draft_V2.pdf uploaded',
      time: '2 hours ago',
      type: 'documents'
    },
    {
      id: 'act_2',
      title: 'Approval requested',
      detail: 'Settlement Draft - MAT-299',
      time: '1 day ago',
      type: 'approvals'
    },
    {
      id: 'act_3',
      title: 'New message from Legal Team',
      detail: 'Re: Tax Appeal details',
      time: '2 days ago',
      type: 'messages'
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Welcome, Vikram Reddy</h1>
            <span className="px-3 py-1 rounded-full bg-[#00B8FF]/10 text-[#00B8FF] border border-[#00B8FF]/30 text-xs font-mono font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Client Data Isolation Active</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Track your legal matters, approvals, documents and important updates.
          </p>
        </div>
      </div>

      {/* 6 KPI Badges (Ref Panel 1) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div
          onClick={() => onNavigateTab('matters')}
          className="p-4 rounded-2xl bg-[#081525] border border-white/10 hover:border-[#00B8FF]/40 transition-all cursor-pointer space-y-1 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Active Matters</span>
            <Briefcase className="w-3.5 h-3.5 text-[#00B8FF] group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-2xl font-mono font-extrabold text-[#00B8FF]">5</span>
        </div>

        <div
          onClick={() => onNavigateTab('documents')}
          className="p-4 rounded-2xl bg-[#081525] border border-white/10 hover:border-[#00B8FF]/40 transition-all cursor-pointer space-y-1 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Shared Documents</span>
            <FileText className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-2xl font-mono font-extrabold text-purple-400">18</span>
        </div>

        <div
          onClick={() => onNavigateTab('approvals')}
          className="p-4 rounded-2xl bg-[#081525] border border-white/10 hover:border-[#00B8FF]/40 transition-all cursor-pointer space-y-1 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Pending Approvals</span>
            <CheckSquare className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-2xl font-mono font-extrabold text-amber-400">2</span>
        </div>

        <div
          onClick={() => onNavigateTab('requests')}
          className="p-4 rounded-2xl bg-[#081525] border border-white/10 hover:border-[#00B8FF]/40 transition-all cursor-pointer space-y-1 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">My Requests</span>
            <Send className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-2xl font-mono font-extrabold text-emerald-400">3</span>
        </div>

        <div
          onClick={() => onNavigateTab('case-status')}
          className="p-4 rounded-2xl bg-[#081525] border border-white/10 hover:border-[#00B8FF]/40 transition-all cursor-pointer space-y-1 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Upcoming Deadlines</span>
            <Calendar className="w-3.5 h-3.5 text-rose-400 group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-2xl font-mono font-extrabold text-rose-400">4</span>
        </div>

        <div
          onClick={() => onNavigateTab('messages')}
          className="p-4 rounded-2xl bg-[#081525] border border-white/10 hover:border-[#00B8FF]/40 transition-all cursor-pointer space-y-1 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Unread Messages</span>
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-2xl font-mono font-extrabold text-cyan-400">6</span>
        </div>
      </div>

      {/* Main Grid: Upcoming Deadlines & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Upcoming Deadlines (Ref Panel 1) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#00B8FF]" />
              <span>Upcoming Deadlines</span>
            </h3>
            <button
              onClick={() => onNavigateTab('matters')}
              className="text-xs text-[#00B8FF] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#041828] text-slate-400 uppercase font-mono text-[10px]">
                <tr>
                  <th className="p-2.5 rounded-l-lg">Date</th>
                  <th className="p-2.5">Matter</th>
                  <th className="p-2.5">Event</th>
                  <th className="p-2.5">Days</th>
                  <th className="p-2.5 text-right rounded-r-lg">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {upcomingDeadlines.map((d) => (
                  <tr key={d.matterId + d.event} className="hover:bg-white/[0.02]">
                    <td className="p-2.5 font-mono text-slate-300">{d.date}</td>
                    <td className="p-2.5">
                      <button
                        onClick={() => onOpenMatter(d.matterId)}
                        className="font-mono text-[#00B8FF] hover:underline font-bold cursor-pointer"
                      >
                        {d.matterId}
                      </button>
                    </td>
                    <td className="p-2.5 text-white font-medium">{d.event}</td>
                    <td className="p-2.5 font-mono text-slate-300">{d.days}</td>
                    <td className="p-2.5 text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        d.status === 'High' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Recent Activity Feed (Ref Panel 1) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>Recent Activity</span>
            </h3>
          </div>

          <div className="space-y-3">
            {recentActivity.map((act) => (
              <div
                key={act.id}
                onClick={() => onNavigateTab(act.type)}
                className="p-3.5 rounded-xl bg-[#041828] border border-white/5 flex items-start gap-3 hover:border-[#00B8FF]/30 transition-all cursor-pointer"
              >
                <div className="p-2 rounded-lg bg-[#00B8FF]/10 text-[#00B8FF] shrink-0 mt-0.5">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{act.title}</h4>
                  <p className="text-[11px] text-slate-400 font-mono truncate">{act.detail}</p>
                  <span className="text-[10px] text-slate-500 font-mono block mt-1">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboardView;

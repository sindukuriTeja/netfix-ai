import React, { useState } from 'react';
import {
  Bell,
  Trash2,
  CheckCircle2
} from 'lucide-react';

interface AuditorNotificationsViewProps {
  onNavigateTab: (tabId: string) => void;
}

export const AuditorNotificationsView: React.FC<AuditorNotificationsViewProps> = ({ onNavigateTab }) => {
  const [filterTab, setFilterTab] = useState<'all' | 'findings' | 'evidence' | 'reviews' | 'reports'>('all');
  const [notifications, setNotifications] = useState([
    { id: 'n1', title: 'Critical Finding Escalated', detail: 'FND-104 GST invoice missing required immediate validation', priority: 'High', time: '1 hour ago', category: 'findings', tab: 'findings' },
    { id: 'n2', title: 'Evidence Uploaded', detail: 'EVD-984 uploaded for Review AUD-103', priority: 'Medium', time: '3 hours ago', category: 'evidence', tab: 'evidence' },
    { id: 'n3', title: 'Audit Review Milestone', detail: 'AUD-101 reached 65% completion milestone', priority: 'Low', time: '1 day ago', category: 'reviews', tab: 'reviews' },
    { id: 'n4', title: 'Report Draft Ready', detail: 'RPT-018 Audit Findings Report ready for review', priority: 'Medium', time: '2 days ago', category: 'reports', tab: 'reports' },
  ]);

  const filteredNotifs = notifications.filter((n) => {
    if (filterTab === 'all') return true;
    return n.category === filterTab;
  });

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Bell className="w-6 h-6 text-[#00B8FF]" />
            <span>Notifications & Alerts</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time audit alerts, finding escalations, and system updates.
          </p>
        </div>

        {notifications.length > 0 && (
          <button
            onClick={clearAll}
            className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-rose-400 text-xs font-semibold transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#081525] border border-white/10 text-xs font-medium text-slate-400">
        {[
          { id: 'all', label: 'All (4)' },
          { id: 'findings', label: 'Findings (1)' },
          { id: 'evidence', label: 'Evidence (1)' },
          { id: 'reviews', label: 'Reviews (1)' },
          { id: 'reports', label: 'Reports (1)' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setFilterTab(t.id as any)}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              filterTab === t.id ? 'bg-[#00B8FF] text-black font-bold shadow-md' : 'hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filteredNotifs.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#081525]/90 border border-white/10 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <p className="text-sm text-slate-300 font-bold">No active notifications</p>
            <p className="text-xs text-slate-500">Your auditor alert queue is completely clear.</p>
          </div>
        ) : (
          filteredNotifs.map((n) => (
            <div
              key={n.id}
              onClick={() => onNavigateTab(n.tab)}
              className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 hover:border-[#00B8FF]/40 transition-all cursor-pointer flex items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#00B8FF]/10 text-[#00B8FF] shrink-0 mt-0.5">
                  <Bell className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-white">{n.title}</h4>
                  <p className="text-xs text-slate-400">{n.detail}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono ${
                    n.priority === 'High'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {n.priority}
                </span>
                <span className="text-[11px] font-mono text-slate-500">{n.time}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

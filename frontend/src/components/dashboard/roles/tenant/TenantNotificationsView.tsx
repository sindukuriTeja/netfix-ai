import React, { useState } from 'react';
import {
  Bell,
  Trash2
} from 'lucide-react';

interface TenantNotificationsViewProps {
  onNavigateTab: (tabId: string) => void;
}

export const TenantNotificationsView: React.FC<TenantNotificationsViewProps> = ({ onNavigateTab }) => {
  const [filterTab, setFilterTab] = useState<'all' | 'agreements' | 'payments' | 'requests' | 'documents' | 'messages'>('all');
  const [notifications, setNotifications] = useState([
    { id: 'n1', title: 'Payment Due', detail: 'Rent payment for Riverside Tower - Unit 501 is due on 28 Sep 2025', priority: 'High', time: '2 hours ago', category: 'payments', tab: 'payments' },
    { id: 'n2', title: 'Agreement Expiring', detail: 'Retail lease for Skyline Plaza expires in 30 days', priority: 'Medium', time: '1 day ago', category: 'agreements', tab: 'agreements' },
    { id: 'n3', title: 'Document Verified', detail: 'Compliance Certificate has been verified', priority: 'Low', time: '2 days ago', category: 'documents', tab: 'documents' },
    { id: 'n4', title: 'New Message', detail: 'You have a new message from Legal Team', priority: 'Low', time: '3 days ago', category: 'messages', tab: 'messages' },
  ]);

  const filteredNotifs = notifications.filter((n) => {
    if (filterTab === 'all') return true;
    return n.category === filterTab;
  });

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'Medium':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Bell className="w-6 h-6 text-[#00B8FF]" />
            <span>Notifications & Alerts</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Stay updated on important activities.
          </p>
        </div>
        <button
          onClick={() => setNotifications([])}
          className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 cursor-pointer"
          title="Clear All"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Filter Tabs (Ref Panel 10) */}
      <div className="flex items-center gap-1.5 overflow-x-auto border-b border-white/10 pb-2">
        {[
          { id: 'all', label: `All (${notifications.length})` },
          { id: 'agreements', label: 'Agreements (1)' },
          { id: 'payments', label: 'Payments (1)' },
          { id: 'documents', label: 'Documents (1)' },
          { id: 'messages', label: 'Messages (1)' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setFilterTab(t.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              filterTab === t.id
                ? 'bg-[#00B8FF] text-slate-950 font-extrabold'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Notifications List (Ref Panel 10) */}
      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-3">
        {filteredNotifs.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">No notifications found in this category.</div>
        ) : (
          filteredNotifs.map((n) => (
            <div
              key={n.id}
              onClick={() => onNavigateTab(n.tab)}
              className="p-4 rounded-xl bg-[#041828] border border-white/5 flex items-center justify-between gap-4 hover:border-[#00B8FF]/40 transition-all cursor-pointer"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-white">{n.title}</h4>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${getPriorityStyle(n.priority)}`}>
                    {n.priority}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">{n.detail}</p>
              </div>

              <span className="text-[10px] text-slate-500 font-mono shrink-0">{n.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TenantNotificationsView;

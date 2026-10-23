import React, { useState } from 'react';
import { Bell, Check } from 'lucide-react';

interface ExecNotification {
  id: string;
  category: 'Approvals' | 'Risks' | 'Deadlines' | 'Reports' | 'AI Activity';
  title: string;
  time: string;
  priority: 'High' | 'Medium' | 'Low';
  read: boolean;
}

export const ManagementNotificationsView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [notifications, setNotifications] = useState<ExecNotification[]>([
    { id: 'NOTIF-01', category: 'Risks', title: 'High Risk Alert: CASE-1042 Statutory deadline in 3 days. Exposure estimated at ₹1.2 Cr.', time: '2 hours ago', priority: 'High', read: false },
    { id: 'NOTIF-02', category: 'Approvals', title: 'Approval Required: APP-204 Q3 Financial Compliance Report requires executive sign-off.', time: '5 hours ago', priority: 'High', read: false },
    { id: 'NOTIF-03', category: 'Reports', title: 'Q3 Executive Risk Summary Report generated successfully.', time: '1 day ago', priority: 'Low', read: true },
    { id: 'NOTIF-04', category: 'Deadlines', title: 'Upcoming Hearing: CASE-087 trial hearing scheduled for 30 Sep 2026.', time: '1 day ago', priority: 'Medium', read: true },
  ]);

  const handleMarkAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const filteredNotifs = notifications.filter((n) => activeFilter === 'All' || n.category === activeFilter);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#00B8FF]" />
            <span>Notifications (Executive Alerts)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Role-scoped notifications for executive approvals, risk escalations & critical deadlines.
          </p>
        </div>

        <button
          onClick={handleMarkAllRead}
          className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {['All', 'Approvals', 'Risks', 'Deadlines', 'Reports', 'AI Activity'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === cat
                ? 'bg-[#00B8FF] text-white'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notification Stream */}
      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-3 text-xs">
        {filteredNotifs.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${
              n.read ? 'bg-[#041828] border-white/5 text-slate-400' : 'bg-rose-500/5 border-rose-500/20 text-white'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold text-[#00B8FF]">{n.category}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                    n.priority === 'High' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                  }`}
                >
                  {n.priority} Priority
                </span>
              </div>
              <p className="font-semibold text-xs text-slate-200">{n.title}</p>
              <span className="font-mono text-[10px] text-slate-500 block">{n.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

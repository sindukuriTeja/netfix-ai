import React, { useState } from 'react';
import {
  Bell,
  FileText,
  CheckSquare,
  Activity,
  MessageSquare,
  Trash2
} from 'lucide-react';

interface ClientNotificationsViewProps {
  onOpenMatter?: (matterId: string) => void;
  onOpenDocument?: (documentId: string) => void;
  onNavigateTab: (tabId: string) => void;
}

export const ClientNotificationsView: React.FC<ClientNotificationsViewProps> = ({
  onNavigateTab,
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'unread' | 'system'>('all');
  const [notifications, setNotifications] = useState([
    { id: 'not_1', type: 'doc', title: 'Document shared by Legal Team', detail: 'Contract_Draft_V2.pdf for MAT-301', time: '5 hours ago', matterId: 'MAT-301', unread: true, target: 'documents' },
    { id: 'not_2', type: 'approval', title: 'Approval required', detail: 'Settlement Draft for MAT-299', time: '1 day ago', matterId: 'MAT-299', unread: true, target: 'approvals' },
    { id: 'not_3', type: 'status', title: 'Matter status updated', detail: 'MAT-178 moved to Hearing Scheduled', time: '1 day ago', matterId: 'MAT-178', unread: false, target: 'matters' },
    { id: 'not_4', type: 'message', title: 'New message from Legal Team', detail: 'Re: Tax Appeal details', time: '2 days ago', matterId: 'MAT-301', unread: false, target: 'messages' },
  ]);

  const filteredNotifs = notifications.filter((n) => {
    if (filterTab === 'unread') return n.unread;
    if (filterTab === 'system') return n.type === 'status';
    return true;
  });

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'doc':
        return <FileText className="w-4 h-4 text-purple-400" />;
      case 'approval':
        return <CheckSquare className="w-4 h-4 text-amber-400" />;
      case 'status':
        return <Activity className="w-4 h-4 text-[#00B8FF]" />;
      default:
        return <MessageSquare className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Bell className="w-6 h-6 text-[#00B8FF]" />
            <span>Notifications — System Alerts</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Important updates and alerts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleMarkAllRead}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs border border-white/10 cursor-pointer"
          >
            Mark All Read
          </button>
          <button
            onClick={handleClearAll}
            className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 cursor-pointer"
            title="Clear All"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Tabs (Ref Panel 11) */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        {[
          { id: 'all', label: 'All' },
          { id: 'unread', label: 'Unread' },
          { id: 'system', label: 'System Alerts' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setFilterTab(t.id as any)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterTab === t.id
                ? 'bg-[#00B8FF] text-slate-950 font-extrabold'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Notifications List (Ref Panel 11) */}
      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-3">
        {filteredNotifs.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">No notifications found.</div>
        ) : (
          filteredNotifs.map((n) => (
            <div
              key={n.id}
              onClick={() => onNavigateTab(n.target)}
              className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all cursor-pointer ${
                n.unread ? 'bg-[#041828] border-[#00B8FF]/40' : 'bg-[#041828]/60 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-white/5 shrink-0 mt-0.5">
                  {getIcon(n.type)}
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-white">{n.title}</h4>
                    {n.unread && (
                      <span className="w-2 h-2 rounded-full bg-[#00B8FF] animate-pulse" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">{n.detail}</p>
                </div>
              </div>

              <span className="text-[10px] text-slate-500 font-mono shrink-0">{n.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClientNotificationsView;

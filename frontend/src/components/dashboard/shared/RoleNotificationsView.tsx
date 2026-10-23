import React from 'react';
import { Bell, CheckCircle2, Clock } from 'lucide-react';

interface NotificationItem {
  id: string;
  title: string;
  detail: string;
  time: string;
  isRead?: boolean;
}

interface RoleNotificationsViewProps {
  notifications?: NotificationItem[];
  roleTitle?: string;
}

export const RoleNotificationsView: React.FC<RoleNotificationsViewProps> = ({ notifications, roleTitle }) => {
  const defaultList: NotificationItem[] = [
    { id: '1', title: 'Action Item Update', detail: 'Case #CASE-102 requires document review before sign-off.', time: '2 hours ago', isRead: false },
    { id: '2', title: 'System Security Audit', detail: 'Your session was verified with RBAC token protection.', time: '5 hours ago', isRead: true },
    { id: '3', title: 'New Report Available', detail: 'Quarterly compliance summary generated successfully.', time: '1 day ago', isRead: true },
  ];

  const items = notifications && notifications.length > 0 ? notifications : defaultList;

  return (
    <div className="space-y-5 max-w-4xl mx-auto">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#00B8FF]" />
            <span>Role Notifications ({roleTitle || 'Your Workspace'})</span>
          </h2>
          <p className="text-xs text-slate-400">Notifications strictly scoped to your user account and role.</p>
        </div>
        <button className="text-xs font-semibold text-[#00B8FF] hover:underline">Mark All as Read</button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
              item.isRead
                ? 'bg-[#081525]/60 border-white/5 opacity-80'
                : 'bg-[#081525] border-[#00B8FF]/30 shadow-[0_0_15px_rgba(0,184,255,0.08)]'
            }`}
          >
            <div className={`p-2 rounded-xl mt-0.5 ${item.isRead ? 'bg-slate-800 text-slate-400' : 'bg-[#00B8FF]/10 text-[#00B8FF]'}`}>
              {item.isRead ? <CheckCircle2 className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white">{item.title}</h3>
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.time}
                </span>
              </div>
              <p className="text-xs text-slate-300">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleNotificationsView;

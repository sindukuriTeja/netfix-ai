import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Download,
  ShieldCheck,
  Edit,
  MoreHorizontal
} from 'lucide-react';

interface AdminUserDetailViewProps {
  userId: string;
  onBack: () => void;
}

export const AdminUserDetailView: React.FC<AdminUserDetailViewProps> = ({ userId, onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'auth' | 'sessions' | 'activity' | 'access' | 'resources'>('sessions');
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const user = {
    id: userId || 'usr-1',
    name: 'Teja Reddy',
    role: 'Client',
    email: 'teja@example.com',
    phone: '+91 98765 43210',
    status: 'Active',
    registeredOn: '01 Sep 2026',
    mfaStatus: 'Enforced & Active',
    organization: 'MARG Tech Corp'
  };

  const sessionLogs = [
    { date: '21 Sep 2026, 14:26:10', event: 'Login Success', device: 'Chrome / Windows', ip: '192.168.1.24', location: 'Bengaluru, IN', status: 'Success' },
    { date: '21 Sep 2026, 11:05:00', event: 'Logout', device: 'Chrome / Windows', ip: '192.168.1.24', location: 'Bengaluru, IN', status: 'Success' },
    { date: '20 Sep 2026, 16:40:15', event: 'Login Success', device: 'Safari / macOS', ip: '192.168.2.11', location: 'Bengaluru, IN', status: 'Success' },
    { date: '20 Sep 2026, 16:38:00', event: 'OTP Verification', device: 'Safari / macOS', ip: '192.168.2.11', location: 'Bengaluru, IN', status: 'Success' },
    { date: '19 Sep 2026, 09:12:45', event: 'Password Change', device: 'Chrome / Windows', ip: '192.168.3.44', location: 'Mumbai, IN', status: 'Success' },
    { date: '19 Sep 2026, 09:10:10', event: 'Login Failure', device: 'Chrome / Android', ip: '192.168.3.44', location: 'Mumbai, IN', status: 'Failed' },
    { date: '18 Sep 2026, 14:00:22', event: 'MFA Enabled', device: 'Chrome / Windows', ip: '192.168.1.24', location: 'Bengaluru, IN', status: 'Success' },
  ];

  const handleExport = () => {
    const csvContent = sessionLogs.map(l => `${l.date},${l.event},${l.device},${l.ip},${l.location},${l.status}`).join('\n');
    const blob = new Blob([`DATE & TIME,EVENT,DEVICE/BROWSER,IP ADDRESS,LOCATION,STATUS\n${csvContent}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Session_History_${user.name.replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadToast(`Exported session history for ${user.name}`);
    setTimeout(() => setDownloadToast(null), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Toast */}
      {downloadToast && (
        <div className="p-3 rounded-xl bg-[#00B8FF]/20 border border-[#00B8FF]/40 text-[#00B8FF] text-xs font-bold font-mono animate-bounce flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{downloadToast}</span>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-2 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 text-[#00B8FF] group-hover:-translate-x-1 transition-transform" />
          <span>Back to Users</span>
        </button>

        <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
          <span>Users</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-[#00B8FF] font-bold">{user.name}</span>
        </span>
      </div>

      {/* User Header Banner (Panel 3) */}
      <div className="p-6 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#00B8FF]/10 border border-[#00B8FF]/30 flex items-center justify-center font-bold text-[#00B8FF] text-lg font-mono">
              TR
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-extrabold text-white tracking-tight">{user.name}</h1>
                <span className="px-3 py-0.5 rounded-full text-xs font-bold font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {user.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-semibold">{user.role} | {user.email} | {user.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold hover:bg-white/10 transition-colors flex items-center gap-1.5">
              <Edit className="w-3.5 h-3.5 text-[#00B8FF]" />
              <span>Edit User</span>
            </button>
            <button className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold hover:bg-white/10 transition-colors flex items-center gap-1.5">
              <MoreHorizontal className="w-4 h-4 text-slate-400" />
              <span>More Actions</span>
            </button>
          </div>
        </div>

        {/* 6 Sub Tabs (Matching Panel 3) */}
        <div className="flex items-center gap-2 border-t border-white/10 pt-4 overflow-x-auto text-xs font-medium text-slate-400">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'auth', label: 'Authentication' },
            { id: 'sessions', label: 'Sessions' },
            { id: 'activity', label: 'Activity' },
            { id: 'access', label: 'Access & Permissions' },
            { id: 'resources', label: 'Cases & Resources' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === t.id
                  ? 'bg-[#00B8FF] text-black font-bold shadow-md'
                  : 'hover:text-white hover:bg-white/5'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'sessions' && (
        <div className="p-6 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-sm font-bold text-white">Login & Session History</h3>
              <p className="text-xs text-slate-400">Detailed session logs, events, IP addresses, and device metadata.</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-mono">Last 30 days</span>
              <button
                onClick={handleExport}
                className="px-3.5 py-1.5 rounded-xl bg-[#00B8FF]/10 border border-[#00B8FF]/30 text-[#00B8FF] text-xs font-bold hover:bg-[#00B8FF]/20 transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Report</span>
              </button>
            </div>
          </div>

          {/* Session History Table (Matching Panel 3) */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-[#040e1a] text-slate-400 font-mono">
                  <th className="p-3.5 pl-4">DATE & TIME</th>
                  <th className="p-3.5">EVENT</th>
                  <th className="p-3.5">DEVICE / BROWSER</th>
                  <th className="p-3.5">IP ADDRESS</th>
                  <th className="p-3.5">LOCATION</th>
                  <th className="p-3.5 pr-4 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {sessionLogs.map((log, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5 pl-4 font-mono font-bold text-slate-300">{log.date}</td>
                    <td className="p-3.5 font-mono">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.event === 'Login Success' ? 'bg-emerald-500/20 text-emerald-300' : log.event === 'Login Failure' ? 'bg-rose-500/20 text-rose-300' : 'bg-sky-500/20 text-sky-300'
                      }`}>
                        {log.event}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-300 font-mono">{log.device}</td>
                    <td className="p-3.5 font-mono text-[#00B8FF]">{log.ip}</td>
                    <td className="p-3.5 text-slate-400 font-mono">{log.location}</td>
                    <td className="p-3.5 pr-4 text-right font-mono">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        log.status === 'Success' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab !== 'sessions' && (
        <div className="p-8 rounded-2xl bg-[#081525]/90 border border-white/10 text-center space-y-3">
          <ShieldCheck className="w-10 h-10 text-[#00B8FF] mx-auto" />
          <h3 className="text-base font-bold text-white capitalize">{activeTab} View for {user.name}</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Viewing detailed {activeTab} information for {user.name} ({user.organization}). All user permissions and access logs are recorded in the central audit ledger.
          </p>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import {
  History,
  Download,
  Search,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

export const AdminAuditTrailView: React.FC = () => {
  const [eventTypeFilter, setEventTypeFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const auditEvents = [
    { id: 'EVT-9921', timestamp: '21 Sep 2026 14:26:10', user: 'Admin User', event: 'Access Request Approved', module: 'Access Control', resource: 'PR-9042', ip: '190.168.1.24', result: 'Success', details: 'Access request #AR-9021 for Property Record #PR-9042 approved for 30 days.' },
    { id: 'EVT-9918', timestamp: '21 Sep 2026 14:10:04', user: 'Unknown', event: 'Login Failure', module: 'Authentication', resource: '--', ip: '193.168.3.44', result: 'Failed', details: 'Invalid password attempt for john@example.com' },
    { id: 'EVT-9912', timestamp: '21 Sep 2026 13:45:00', user: 'Teja Reddy', event: 'Document Download', module: 'Documents', resource: 'CS-4012', ip: '192.168.1.24', result: 'Success', details: 'Downloaded file Contract_Agreement_2025.pdf' },
    { id: 'EVT-9905', timestamp: '21 Sep 2026 11:20:15', user: 'System Worker', event: 'Task Completed', module: 'AI Operations', resource: '--', ip: '190.168.1.24', result: 'Success', details: 'Ultron AI Orchestrator completed task #PR-9042 in 1.8s' },
    { id: 'EVT-9892', timestamp: '21 Sep 2026 09:12:45', user: 'Rohan Mehta', event: 'Password Changed', module: 'User Management', resource: '--', ip: '192.168.3.44', result: 'Success', details: 'MFA password reset successfully executed' },
  ];

  const handleExport = () => {
    const csvContent = auditEvents.map(e => `${e.timestamp},${e.user},${e.event},${e.module},${e.resource},${e.ip},${e.result}`).join('\n');
    const blob = new Blob([`TIMESTAMP,USER,EVENT,MODULE,RESOURCE,IP ADDRESS,RESULT\n${csvContent}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `System_Audit_Trail_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadToast('Exported system audit logs CSV.');
    setTimeout(() => setDownloadToast(null), 3000);
  };

  const filtered = auditEvents.filter((e) => {
    if (eventTypeFilter !== 'All' && e.module !== eventTypeFilter) return false;
    if (
      searchQuery &&
      !e.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !e.user.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !e.event.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Toast */}
      {downloadToast && (
        <div className="p-3 rounded-xl bg-[#00B8FF]/20 border border-[#00B8FF]/40 text-[#00B8FF] text-xs font-bold font-mono animate-bounce flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{downloadToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <History className="w-6 h-6 text-[#00B8FF]" />
            <span>System Audit Trail</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track all platform activities, user actions, and security events.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="px-4 py-2 rounded-xl bg-[#00B8FF]/10 border border-[#00B8FF]/30 text-[#00B8FF] font-bold text-xs hover:bg-[#00B8FF]/20 transition-colors flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Export Logs</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#081525] border border-white/10 text-xs font-medium text-slate-400">
          {['All', 'Access Control', 'Authentication', 'Documents', 'AI Operations'].map((m) => (
            <button
              key={m}
              onClick={() => setEventTypeFilter(m)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                eventTypeFilter === m ? 'bg-[#00B8FF] text-black font-bold shadow-md' : 'hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="relative flex-1 md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search event ID, user, event..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-[#081525] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF]"
          />
        </div>
      </div>

      {/* Audit Log Table (Matching Panel 7) */}
      <div className="rounded-2xl bg-[#081525]/90 border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-[#040e1a] text-slate-400 font-mono">
                <th className="p-3.5 pl-4">TIMESTAMP</th>
                <th className="p-3.5">USER</th>
                <th className="p-3.5">EVENT</th>
                <th className="p-3.5">MODULE</th>
                <th className="p-3.5">RESOURCE</th>
                <th className="p-3.5">IP ADDRESS</th>
                <th className="p-3.5">RESULT</th>
                <th className="p-3.5 pr-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {filtered.map((e) => (
                <tr key={e.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3.5 pl-4 font-mono font-bold text-slate-300">{e.timestamp}</td>
                  <td className="p-3.5 font-bold text-white">{e.user}</td>
                  <td className="p-3.5 font-mono text-[#00B8FF] font-bold">{e.event}</td>
                  <td className="p-3.5 font-mono text-slate-300">{e.module}</td>
                  <td className="p-3.5 font-mono text-slate-400">{e.resource}</td>
                  <td className="p-3.5 font-mono text-slate-400">{e.ip}</td>
                  <td className="p-3.5 font-mono">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        e.result === 'Success'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {e.result}
                    </span>
                  </td>
                  <td className="p-3.5 pr-4 text-right">
                    <button
                      onClick={() => setSelectedEvent(e)}
                      className="px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-bold text-[11px]"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Event Details Drawer/Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-[#081525] border border-white/10 rounded-2xl max-w-lg w-full p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#00B8FF]" />
                <h3 className="text-base font-bold text-white">Event Detail: {selectedEvent.id}</h3>
              </div>
              <button onClick={() => setSelectedEvent(null)} className="text-slate-400 hover:text-white font-bold text-lg">
                ✕
              </button>
            </div>

            <div className="space-y-3 font-mono text-slate-300">
              <div><strong className="text-slate-500 block text-[10px]">Timestamp:</strong> {selectedEvent.timestamp}</div>
              <div><strong className="text-slate-500 block text-[10px]">Actor / User:</strong> <span className="text-white font-bold">{selectedEvent.user}</span></div>
              <div><strong className="text-slate-500 block text-[10px]">Event Type:</strong> <span className="text-[#00B8FF]">{selectedEvent.event}</span></div>
              <div><strong className="text-slate-500 block text-[10px]">Module:</strong> {selectedEvent.module}</div>
              <div><strong className="text-slate-500 block text-[10px]">Target Resource:</strong> {selectedEvent.resource}</div>
              <div><strong className="text-slate-500 block text-[10px]">IP Address:</strong> {selectedEvent.ip}</div>
              <div>
                <strong className="text-slate-500 block text-[10px]">Structured Event Metadata:</strong>
                <p className="p-3 rounded-xl bg-[#040e1a] border border-white/5 text-slate-200 mt-1 font-sans">
                  {selectedEvent.details}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

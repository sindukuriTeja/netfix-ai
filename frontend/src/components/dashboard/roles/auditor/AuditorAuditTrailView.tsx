import React, { useState } from 'react';
import {
  History,
  ShieldCheck,
  Search
} from 'lucide-react';

export const AuditorAuditTrailView: React.FC = () => {
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const trailEvents = [
    { id: 'LOG-8842', timestamp: '2025-09-25 16:42:10', actor: 'Priya Nair', role: 'Regulator / Auditor', action: 'EVIDENCE_VERIFIED', object: 'EVD-984 (GST_Return_Q3.pdf)', review: 'AUD-103', result: 'Success', hash: 'e3b0c44298fc...7ad0141' },
    { id: 'LOG-8839', timestamp: '2025-09-25 15:18:04', actor: 'Lead Auditor', role: 'Chief Auditor', action: 'FINDING_SEVERITY_UPDATED', object: 'FND-102 (Policy deviation)', review: 'AUD-101', result: 'Success', hash: '8f4b6840d04c...18a5621' },
    { id: 'LOG-8821', timestamp: '2025-09-24 11:05:32', actor: 'Arjun Patel', role: 'Tenant / Buyer', action: 'DOCUMENT_UPLOADED', object: 'DOC-204 (Contract_2025.pdf)', review: 'AUD-103', result: 'Success', hash: '4b227777d4da...88319aa' },
    { id: 'LOG-8815', timestamp: '2025-09-24 09:30:00', actor: 'System Worker', role: 'Automated Bot', action: 'CONTROL_TEST_RUN', object: 'CTL-021 (GST Compliance)', review: 'AUD-103', result: 'Passed', hash: '7c9e6679a01e...44190cb' },
    { id: 'LOG-8790', timestamp: '2025-09-23 18:22:15', actor: 'Priya Nair', role: 'Regulator / Auditor', action: 'REPORT_GENERATED', object: 'RPT-019 (Compliance Summary)', review: 'AUD-103', result: 'Success', hash: '998101aab900...09912bc' },
  ];

  const filtered = trailEvents.filter((e) => {
    if (filterType !== 'All' && !e.action.toLowerCase().includes(filterType.toLowerCase())) return false;
    if (
      searchQuery &&
      !e.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !e.actor.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !e.object.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <History className="w-6 h-6 text-[#00B8FF]" />
            <span>Immutable Audit Trail & Ledger</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Cryptographically signed immutable activity log scoped to AUD-001.
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          <span>SHA-256 Ledger Verified</span>
        </div>
      </div>

      {/* 4 KPI Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Total Logged Events</span>
          <div className="text-2xl font-extrabold text-[#00B8FF] font-mono">1,420</div>
          <span className="text-[10px] text-slate-500">Immutable ledger</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Critical Security Events</span>
          <div className="text-2xl font-extrabold text-rose-400 font-mono">14</div>
          <span className="text-[10px] text-rose-400/80 font-bold">Audited</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Evidence Operations</span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">340</div>
          <span className="text-[10px] text-slate-500">Verified links</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Chain Integrity</span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">100%</div>
          <span className="text-[10px] text-emerald-400/80 font-bold">0 Tamper Alerts</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#081525] border border-white/10 text-xs font-medium text-slate-400">
          {['All', 'Evidence', 'Finding', 'Report', 'Control'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                filterType === t ? 'bg-[#00B8FF] text-black font-bold shadow-md' : 'hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="relative flex-1 md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search event ID, actor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-[#081525] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF]"
          />
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="rounded-2xl bg-[#081525]/90 border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-[#040e1a] text-slate-400 font-mono">
                <th className="p-3.5 pl-4">Log ID</th>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">Actor</th>
                <th className="p-3.5">Action</th>
                <th className="p-3.5">Target Object</th>
                <th className="p-3.5">Review</th>
                <th className="p-3.5">Result</th>
                <th className="p-3.5 pr-4 text-right">Hash Signature</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3.5 pl-4 font-mono font-bold text-[#00B8FF]">{log.id}</td>
                  <td className="p-3.5 font-mono text-slate-400">{log.timestamp}</td>
                  <td className="p-3.5 text-white font-bold">{log.actor}</td>
                  <td className="p-3.5 font-mono">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00B8FF]/20 text-[#00B8FF]">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-200">{log.object}</td>
                  <td className="p-3.5 font-mono text-[#00B8FF]">{log.review}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                      {log.result}
                    </span>
                  </td>
                  <td className="p-3.5 pr-4 text-right font-mono text-[10px] text-slate-500">
                    {log.hash}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

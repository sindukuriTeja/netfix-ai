import React, { useState } from 'react';
import { Clock, CheckCircle, AlertCircle, FileText } from 'lucide-react';

interface ChronologyEvent {
  id: string;
  dateStr: string;
  title: string;
  sourceDocument: string;
  verified: boolean;
  linkedFactId: string;
}

export const ChronologyEngineModule: React.FC = () => {
  const [events] = useState<ChronologyEvent[]>([
    {
      id: 'CE-001',
      dateStr: '12 Jun 2025',
      title: 'Contract signed between MARG and ABC Corp',
      sourceDocument: 'Contract_Agmt_2025.pdf',
      verified: true,
      linkedFactId: 'F-001',
    },
    {
      id: 'CE-002',
      dateStr: '30 Jul 2025',
      title: 'Payment of ₹5,00,000 due date',
      sourceDocument: 'Invoice_001.pdf',
      verified: false,
      linkedFactId: 'F-002',
    },
    {
      id: 'CE-003',
      dateStr: '15 Aug 2025',
      title: 'Legal notice issued by ABC Corp',
      sourceDocument: 'LegalNotice_Aug.pdf',
      verified: true,
      linkedFactId: 'F-003',
    },
    {
      id: 'CE-004',
      dateStr: '01 Sep 2025',
      title: 'Formal reply submitted to legal notice',
      sourceDocument: 'ReplyNotice_Sep.pdf',
      verified: false,
      linkedFactId: 'F-005',
    },
  ]);

  return (
    <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 font-extrabold text-xs flex items-center justify-center border border-orange-500/30">
              21
            </span>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-orange-400" />
                <span>Chronology Engine</span>
              </h3>
              <p className="text-[11px] text-slate-400">Facts into a Timeline.</p>
            </div>
          </div>
          <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-orange-500/10 text-orange-300 border border-orange-500/20">
            {events.length} Timeline Events
          </span>
        </div>

        <div className="flex items-center justify-between mt-3 text-[11px] text-slate-400 bg-white/[0.03] p-2 rounded-xl border border-white/5">
          <span className="font-semibold text-slate-300">Case Timeline</span>
          <select className="bg-[#030712] text-slate-300 border border-white/10 rounded-lg px-2 py-0.5 text-[11px] focus:outline-none">
            <option>All Events</option>
            <option>Verified Only</option>
            <option>Pending Only</option>
          </select>
        </div>
      </div>

      {/* Timeline View */}
      <div className="relative pl-6 space-y-4 max-h-[230px] overflow-y-auto pr-1 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-orange-500/60 before:via-sky-500/40 before:to-emerald-500/60">
        {events.map((ev) => (
          <div key={ev.id} className="relative group">
            {/* Timeline Dot */}
            <div
              className={`absolute -left-[19px] top-1 w-3.5 h-3.5 rounded-full border-2 bg-[#030712] transition-transform group-hover:scale-125 ${
                ev.verified
                  ? 'border-emerald-400 bg-emerald-500/20'
                  : 'border-amber-400 bg-amber-500/20'
              }`}
            />

            <div className="bg-[#030712]/80 border border-white/10 rounded-xl p-3 space-y-1 hover:border-orange-500/30 transition">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-extrabold text-orange-400 font-mono">{ev.dateStr}</span>
                {ev.verified ? (
                  <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Verified
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Pending
                  </span>
                )}
              </div>

              <p className="text-xs font-semibold text-slate-200">{ev.title}</p>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-white/5 font-mono">
                <span className="flex items-center gap-1 truncate max-w-[150px]">
                  <FileText className="w-3 h-3 text-slate-500" />
                  {ev.sourceDocument}
                </span>
                <span className="text-slate-300 font-bold">Ref: {ev.linkedFactId}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <span>Module 21 • Auto-Sequenced Facts</span>
        <span className="text-orange-400 hover:underline cursor-pointer">View Details &rarr;</span>
      </div>
    </div>
  );
};

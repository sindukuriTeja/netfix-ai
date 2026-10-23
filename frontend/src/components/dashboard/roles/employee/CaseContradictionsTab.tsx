import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, FileText } from 'lucide-react';

interface ContradictionItem {
  id: string;
  factA: string;
  docA: string;
  factB: string;
  docB: string;
  conflictReason: string;
  severity: 'High' | 'Medium' | 'Low';
  status: 'Unresolved' | 'Resolved';
}

interface CaseContradictionsTabProps {
  caseId: string;
}

export const CaseContradictionsTab: React.FC<CaseContradictionsTabProps> = ({ caseId }) => {
  const [items, setItems] = useState<ContradictionItem[]>([
    {
      id: 'CONTRA-01',
      factA: 'Transaction Date stated as 12 Aug 2026',
      docA: 'Tax_Invoice_8821.pdf',
      factB: 'Transaction Date recorded as 14 Aug 2026',
      docB: 'Bank_Statement_Q3.pdf',
      conflictReason: '2-day gap between invoice date and bank clearance date requires explanation in reply.',
      severity: 'Medium',
      status: 'Unresolved',
    },
    {
      id: 'CONTRA-02',
      factA: 'Demand Notice states tax period end date as missing',
      docA: 'GST_Notice_2026.pdf',
      factB: 'GSTR-3B receipt confirms tax period ending 30 Jun 2026',
      docB: 'GSTR3B_Receipt.pdf',
      conflictReason: 'Authority notice omits valid filing receipt reference; can be cited as procedural defense.',
      severity: 'High',
      status: 'Unresolved',
    },
  ]);

  const [explanationMap, setExplanationMap] = useState<Record<string, string>>({});

  const handleResolve = (id: string) => {
    setItems(items.map((it) => (it.id === id ? { ...it, status: 'Resolved' } : it)));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span>Contradiction Analysis Engine (Module 15) — {caseId}</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Automated conflict detection across authorized case documents with mandatory human review.
          </p>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block">HUMAN REVIEW MANDATORY</span>
          <p className="text-amber-200/80 mt-0.5">
            AI evaluative contradictions are flagged for human validation. AI findings are never automatically treated as confirmed fact without employee approval.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-2xl border space-y-3 transition-all ${
              item.status === 'Resolved'
                ? 'bg-emerald-500/5 border-emerald-500/20'
                : 'bg-[#081525] border-white/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#00B8FF]">{item.id}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    item.severity === 'High'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {item.severity} Severity
                </span>
              </div>
              <span
                className={`px-2.5 py-1 rounded text-[10px] font-bold font-mono border ${
                  item.status === 'Resolved'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                }`}
              >
                {item.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#041828] border border-white/5 space-y-1">
                <span className="text-slate-400 font-bold block flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-[#00B8FF]" /> Document A: {item.docA}
                </span>
                <p className="text-slate-200">{item.factA}</p>
              </div>

              <div className="p-3 rounded-xl bg-[#041828] border border-white/5 space-y-1">
                <span className="text-slate-400 font-bold block flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-purple-400" /> Document B: {item.docB}
                </span>
                <p className="text-slate-200">{item.factB}</p>
              </div>
            </div>

            <p className="text-xs text-amber-300/90 font-medium">Conflict Reason: {item.conflictReason}</p>

            {item.status !== 'Resolved' && (
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/5">
                <input
                  type="text"
                  placeholder="Add resolution note/explanation..."
                  value={explanationMap[item.id] || ''}
                  onChange={(e) => setExplanationMap({ ...explanationMap, [item.id]: e.target.value })}
                  className="px-3 py-1.5 rounded-xl bg-[#041828] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00B8FF] flex-1"
                />
                <button
                  onClick={() => handleResolve(item.id)}
                  className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark Resolved</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

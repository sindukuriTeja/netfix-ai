import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

interface Contradiction {
  id: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  fact1Ref: string;
  fact2Ref: string;
  status: 'flagged' | 'resolved' | 'dismissed';
}

export const ContradictionAnalysisModule: React.FC = () => {
  const [contradictions, setContradictions] = useState<Contradiction[]>([
    {
      id: 'C-001',
      description: 'Income figure mismatch between ITR filing and Bank Statement',
      severity: 'high',
      fact1Ref: 'F-011',
      fact2Ref: 'F-017',
      status: 'flagged',
    },
    {
      id: 'C-002',
      description: 'Contract start date vs. invoice issue date conflict',
      severity: 'medium',
      fact1Ref: 'F-001',
      fact2Ref: 'F-006',
      status: 'flagged',
    },
    {
      id: 'C-003',
      description: 'GSTIN number variation across two submitted documents',
      severity: 'low',
      fact1Ref: 'F-009',
      fact2Ref: 'F-012',
      status: 'resolved',
    },
    {
      id: 'C-004',
      description: 'Payment amount discrepancy between notice and ledger',
      severity: 'medium',
      fact1Ref: 'F-002',
      fact2Ref: 'F-014',
      status: 'flagged',
    },
  ]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleResolve = (id: string) => {
    setContradictions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'resolved' } : c))
    );
  };

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 1200);
  };

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'high':
        return 'bg-red-500/20 text-red-300 border-red-500/40';
      case 'medium':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'low':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/40';
    }
  };

  return (
    <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 font-extrabold text-xs flex items-center justify-center border border-indigo-500/30">
              23
            </span>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-indigo-400" />
                <span>Contradiction Analysis</span>
              </h3>
              <p className="text-[11px] text-slate-400">Find Inconsistencies. Reduce Risk.</p>
            </div>
          </div>
          <button
            onClick={handleRunAnalysis}
            disabled={isAnalyzing}
            className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 transition flex items-center gap-1"
          >
            <RefreshCw className={`w-3 h-3 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>{isAnalyzing ? 'Analyzing...' : 'Run Analysis'}</span>
          </button>
        </div>

        <div className="flex items-center justify-between mt-3 text-[11px] text-slate-400 bg-white/[0.03] p-2 rounded-xl border border-white/5">
          <span className="font-semibold text-slate-300">
            Flagged Contradictions ({contradictions.filter((c) => c.status === 'flagged').length})
          </span>
          <select className="bg-[#030712] text-slate-300 border border-white/10 rounded-lg px-2 py-0.5 text-[11px] focus:outline-none">
            <option>All Status</option>
            <option>Flagged</option>
            <option>Resolved</option>
          </select>
        </div>
      </div>

      {/* Contradictions List */}
      <div className="space-y-2.5 max-h-[230px] overflow-y-auto pr-1">
        {contradictions.map((item) => (
          <div
            key={item.id}
            className="bg-[#030712]/80 border border-white/10 rounded-xl p-3 space-y-1.5 hover:border-indigo-500/30 transition"
          >
            <div className="flex items-start justify-between gap-2">
              <span
                className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border shrink-0 ${getSeverityBadge(
                  item.severity
                )}`}
              >
                {item.severity}
              </span>
              <p className="text-xs font-semibold text-slate-200 leading-snug flex-1">{item.description}</p>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-white/5 font-mono">
              <span className="text-indigo-300 font-bold">
                {item.fact1Ref} &harr; {item.fact2Ref}
              </span>
              {item.status === 'resolved' ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Resolved
                </span>
              ) : (
                <button
                  onClick={() => handleResolve(item.id)}
                  className="px-2 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-[10px] transition"
                >
                  Flagged (Resolve)
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <span>Module 23 • Multi-Document Inconsistency Check</span>
        <span className="text-indigo-400 hover:underline cursor-pointer">View Details &rarr;</span>
      </div>
    </div>
  );
};

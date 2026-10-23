import React, { useState } from 'react';
import { BookOpen, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface CitationCheck {
  id: string;
  citationText: string;
  sourceType: string;
  verified: boolean;
  notes: string;
}

export const CitationVerificationModule: React.FC = () => {
  const [citations] = useState<CitationCheck[]>([
    {
      id: 'CIT-001',
      citationText: 'Arnesh Kumar vs State of Bihar (2014) 8 SCC 273',
      sourceType: 'draft_document',
      verified: true,
      notes: 'Matched with Supreme Court Case Corpus',
    },
    {
      id: 'CIT-002',
      citationText: 'K. Veeraswami vs Union of India (1991) 3 SCC 655',
      sourceType: 'research_query',
      verified: true,
      notes: 'Exact match verified',
    },
    {
      id: 'CIT-003',
      citationText: 'State of Maharashtra vs Suresh (2000) 1 SCC 471',
      sourceType: 'draft_document',
      verified: false,
      notes: 'Could not verify volume reference in corpus',
    },
    {
      id: 'CIT-004',
      citationText: 'IPC Section 302 - Murder',
      sourceType: 'statute',
      verified: true,
      notes: 'Verified against Indian Penal Code 1860',
    },
  ]);

  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyCitations = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
    }, 1000);
  };

  return (
    <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 font-extrabold text-xs flex items-center justify-center border border-cyan-500/30">
              27
            </span>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Citation & Source Verification</span>
              </h3>
              <p className="text-[11px] text-slate-400">Verify. Trust. Eliminate Hallucinations.</p>
            </div>
          </div>
          <button
            onClick={handleVerifyCitations}
            disabled={isVerifying}
            className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition flex items-center gap-1"
          >
            <ShieldCheck className={`w-3 h-3 ${isVerifying ? 'animate-spin' : ''}`} />
            <span>{isVerifying ? 'Checking...' : 'Verify Citations'}</span>
          </button>
        </div>

        <div className="flex items-center justify-between mt-3 text-[11px] text-slate-400 bg-white/[0.03] p-2 rounded-xl border border-white/5">
          <span className="font-semibold text-slate-300">Citation Verification (Recent)</span>
          <select className="bg-[#030712] text-slate-300 border border-white/10 rounded-lg px-2 py-0.5 text-[11px] focus:outline-none">
            <option>All Status</option>
            <option>Verified</option>
            <option>Could Not Verify</option>
          </select>
        </div>
      </div>

      {/* Citations List */}
      <div className="space-y-2.5 max-h-[230px] overflow-y-auto pr-1">
        {citations.map((c) => (
          <div
            key={c.id}
            className="bg-[#030712]/80 border border-white/10 rounded-xl p-3 space-y-1.5 hover:border-cyan-500/30 transition"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-semibold text-slate-200 leading-snug">{c.citationText}</p>
              {c.verified ? (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold text-[10px] flex items-center gap-1 shrink-0">
                  <CheckCircle2 className="w-3 h-3" /> Verified
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold text-[10px] flex items-center gap-1 shrink-0">
                  <AlertTriangle className="w-3 h-3" /> Could not verify
                </span>
              )}
            </div>

            <p className="text-[10px] text-slate-400 font-mono border-t border-white/5 pt-1">
              Note: {c.notes}
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <span>Module 27 • Legal Citation Guardrail</span>
        <span className="text-cyan-400 hover:underline cursor-pointer">View Details &rarr;</span>
      </div>
    </div>
  );
};

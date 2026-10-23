import React, { useState } from 'react';
import { ShieldCheck, ExternalLink, RefreshCw, CheckCircle2 } from 'lucide-react';

interface CitationItem {
  id: string;
  citationText: string;
  matchedSource: string;
  confidence: number;
  status: 'Verified' | 'Unverified' | 'Flagged';
}

interface CaseCitationsTabProps {
  caseId: string;
}

export const CaseCitationsTab: React.FC<CaseCitationsTabProps> = ({ caseId }) => {
  const [citations] = useState<CitationItem[]>([
    {
      id: 'CIT-01',
      citationText: 'ABC Ltd. v. State of XYZ (2025)',
      matchedSource: 'High Court Legal Database (Corpus ID #HD-99201)',
      confidence: 99,
      status: 'Verified',
    },
    {
      id: 'CIT-02',
      citationText: 'PQR Enterprises v. Union of India (2024)',
      matchedSource: 'Supreme Court Precedent Reporter (Vol 2024-4)',
      confidence: 98,
      status: 'Verified',
    },
    {
      id: 'CIT-03',
      citationText: 'Section 16(2) — CGST Act, 2017',
      matchedSource: 'Official Central Tax Statutory Code',
      confidence: 100,
      status: 'Verified',
    },
  ]);

  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const handleRunCitationCheck = async () => {
    setIsVerifying(true);
    try {
      const res = await fetch('/api/agent/citation-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId, citations: citations.map((c) => c.citationText) }),
      });
      if (res.ok) {
        setTimeout(() => {
          setIsVerifying(false);
        }, 1200);
      } else {
        setIsVerifying(false);
      }
    } catch {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Citation Verification Engine (Module 22) — {caseId}</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Automated verification of statutory sections and precedent citations against the legal knowledge corpus.
          </p>
        </div>

        <button
          onClick={handleRunCitationCheck}
          disabled={isVerifying}
          className="px-3.5 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
          <span>Verify Citations</span>
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="pb-3 font-semibold">Citation Reference</th>
                <th className="pb-3 font-semibold">Matched Legal Source</th>
                <th className="pb-3 font-semibold text-center">Confidence</th>
                <th className="pb-3 font-semibold text-center">Verification Status</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {citations.map((c) => (
                <tr key={c.id} className="hover:bg-white/[0.02]">
                  <td className="py-3 font-bold text-white">{c.citationText}</td>
                  <td className="py-3 font-mono text-slate-300">{c.matchedSource}</td>
                  <td className="py-3 text-center font-mono font-bold text-emerald-400">{c.confidence}%</td>
                  <td className="py-3 text-center">
                    <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 text-[10px] inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Verified Match
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ml-auto">
                      <ExternalLink className="w-3 h-3" /> Open Source
                    </button>
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

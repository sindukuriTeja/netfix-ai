import React, { useState } from 'react';
import { ShieldCheck, Download, RefreshCw, Sparkles } from 'lucide-react';

interface CaseRiskTabProps {
  caseId: string;
}

export const CaseRiskTab: React.FC<CaseRiskTabProps> = ({ caseId }) => {
  const [riskScore, setRiskScore] = useState<number>(78);
  const [isReevaluating, setIsReevaluating] = useState<boolean>(false);

  const riskFactors = [
    { title: 'Deadline approaching (3 days remaining)', severity: 'High' },
    { title: 'Document inconsistency detected', severity: 'Medium' },
    { title: 'Input tax credit mismatch', severity: 'Medium' },
    { title: 'Missing supporting invoices', severity: 'Medium' },
  ];

  const handleReevaluateRisk = async () => {
    setIsReevaluating(true);
    try {
      const res = await fetch('/api/agent/risk-compliance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId, taskDescription: `Re-evaluate risk score for ${caseId}` }),
      });
      if (res.ok) {
        setTimeout(() => {
          setRiskScore(75);
          setIsReevaluating(false);
        }, 1200);
      } else {
        setIsReevaluating(false);
      }
    } catch {
      setIsReevaluating(false);
    }
  };

  const handleDownloadRiskReport = () => {
    window.open(`/api/agent/reports/download/${caseId}_risk`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-rose-400" />
            <span>Risk & Exposure Analysis Engine (Module 19) — {caseId}</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Automated statutory exposure evaluation, risk scoring & mitigation recommendation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReevaluateRisk}
            disabled={isReevaluating}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isReevaluating ? 'animate-spin text-[#00B8FF]' : ''}`} />
            <span>Re-evaluate Risk</span>
          </button>
          <button
            onClick={handleDownloadRiskReport}
            className="px-3.5 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Risk Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 flex flex-col items-center justify-center text-center space-y-4">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Case Risk Score</span>

          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-rose-500"
                strokeDasharray={`${riskScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-extrabold text-white font-mono">{riskScore}</span>
              <span className="text-[10px] text-slate-400 uppercase">/ 100</span>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
            High Risk Case
          </span>
          <span className="text-[11px] text-slate-400">AI-Generated (Requires Employee Review)</span>
        </div>

        <div className="md:col-span-2 p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
          <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Key Risk Factors</h4>

          <div className="space-y-2.5">
            {riskFactors.map((rf, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#041828] border border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-200 font-medium flex items-center gap-2">
                  <span className="font-mono text-[#00B8FF]">{idx + 1}.</span>
                  {rf.title}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    rf.severity === 'High'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {rf.severity}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-[#00B8FF]/10 border border-[#00B8FF]/30 space-y-1 text-xs">
            <span className="font-bold text-[#00B8FF] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> AI Risk Recommendation
            </span>
            <p className="text-slate-200 leading-relaxed">
              Immediate preparation of response with supporting invoices and Tally GSTR-2B reconciliation required to reduce exposure prior to 28 Sep statutory deadline.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

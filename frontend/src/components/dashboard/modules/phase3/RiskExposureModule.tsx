import React, { useState } from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';

export const RiskExposureModule: React.FC = () => {
  const [riskScore] = useState<number>(72);
  const [riskLevel] = useState<'HIGH' | 'MEDIUM' | 'LOW'>('HIGH');

  const riskFactors = [
    { count: 3, label: 'unresolved contradictions' },
    { count: 2, label: 'overdue deadlines' },
    { count: 4, label: 'GST mismatch detected' },
    { count: 4, label: 'Missing supporting document' },
    { count: 5, label: 'High-value financial exposure' },
  ];

  return (
    <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-red-500/20 text-red-400 font-extrabold text-xs flex items-center justify-center border border-red-500/30">
              26
            </span>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <span>Risk & Exposure Analysis</span>
              </h3>
              <p className="text-[11px] text-slate-400">Assess. Prioritize. Mitigate.</p>
            </div>
          </div>
          <button className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 transition flex items-center gap-1">
            <RefreshCw className="w-3 h-3" />
            <span>Re-Assess</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid: Score Gauge & Factors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
        {/* Gauge Card */}
        <div className="bg-[#030712]/90 border border-red-500/30 rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-2">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
            Overall Risk Assessment
          </span>

          {/* Visual Gauge */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-red-500 transition-all duration-1000 ease-out"
                strokeDasharray={`${riskScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-xl font-black text-white">{riskScore}</span>
              <span className="text-[9px] text-slate-400 font-mono">/ 100</span>
            </div>
          </div>

          <span className="px-3 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-black tracking-widest uppercase">
            {riskLevel} RISK
          </span>
        </div>

        {/* Factors List */}
        <div className="space-y-1.5 font-mono text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Key Risk Factors
          </span>
          {riskFactors.map((rf, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 bg-[#030712]/60 border border-white/5 p-1.5 rounded-lg text-[11px]"
            >
              <span className="w-4 h-4 rounded-full bg-red-500/20 text-red-400 font-bold flex items-center justify-center text-[10px] shrink-0">
                {rf.count}
              </span>
              <span className="text-slate-300 truncate">{rf.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <span>Module 26 • Platform Signal Risk Aggregator</span>
        <span className="text-red-400 hover:underline cursor-pointer">View Detailed Analysis &rarr;</span>
      </div>
    </div>
  );
};

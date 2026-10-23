import React, { useState } from 'react';
import { Calculator, FileText, CheckCircle2, TrendingUp } from 'lucide-react';

export const IncomeTaxEngineModule: React.FC = () => {
  const [assessmentYear, setAssessmentYear] = useState('2024 - 2025');
  const [isProcessing, setIsProcessing] = useState(false);
  const [computed, setComputed] = useState(false);

  const handleCompute = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setComputed(true);
    }, 1200);
  };

  return (
    <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-5 backdrop-blur-xl flex flex-col justify-between space-y-4 shadow-xl hover:border-indigo-500/30 transition-all duration-300">
      {/* Module Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs border border-indigo-500/30">
            11
          </div>
          <div>
            <h3 className="text-sm font-black text-white tracking-tight flex items-center gap-2">
              Income Tax Intelligence Engine
            </h3>
            <p className="text-[11px] text-slate-400">Calculate. Optimize. File.</p>
          </div>
        </div>
        <span className="text-[10px] font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
          TAX MODULE
        </span>
      </div>

      {/* Assessment Year Selector */}
      <div>
        <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Assessment Year</label>
        <select
          value={assessmentYear}
          onChange={(e) => setAssessmentYear(e.target.value)}
          className="w-full bg-[#030712] border border-white/10 rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-indigo-500/50"
        >
          <option>2024 - 2025</option>
          <option>2023 - 2024</option>
          <option>2022 - 2023</option>
        </select>
      </div>

      {/* Key Tax Metrics Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-[#030712]/60 p-2.5 rounded-xl border border-white/5 space-y-0.5">
          <span className="text-[10px] text-slate-400 font-semibold block uppercase">Total Income</span>
          <span className="text-sm font-black text-white flex items-center gap-1">
            ₹ 42,80,000 <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1 rounded">+8%</span>
          </span>
        </div>
        <div className="bg-[#030712]/60 p-2.5 rounded-xl border border-white/5 space-y-0.5">
          <span className="text-[10px] text-slate-400 font-semibold block uppercase">Suggested Deductions</span>
          <span className="text-sm font-black text-indigo-400">₹ 6,75,000</span>
        </div>
        <div className="bg-[#030712]/60 p-2.5 rounded-xl border border-white/5 space-y-0.5">
          <span className="text-[10px] text-slate-400 font-semibold block uppercase">Estimated Tax Liability</span>
          <span className="text-sm font-black text-sky-400">₹ 5,42,000</span>
        </div>
        <div className="bg-[#030712]/60 p-2.5 rounded-xl border border-white/5 space-y-0.5">
          <span className="text-[10px] text-slate-400 font-semibold block uppercase">Optimization Potential</span>
          <span className="text-sm font-black text-emerald-400 flex items-center gap-1">
            ₹ 1,20,000 <TrendingUp className="w-3 h-3 text-emerald-400" />
          </span>
        </div>
      </div>

      {/* Processed Documents List */}
      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-2.5 space-y-1.5">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
          <span className="flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>3 Documents Processed</span>
          </span>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-mono">DOCUMENT-DRIVEN</span>
        </div>
        <p className="text-[11px] text-slate-400 line-clamp-1">Form 16, Bank Statements, Investment Proofs</p>
      </div>

      {/* Data Source Safety Notice */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
        <span className="bg-slate-800/80 px-2 py-0.5 rounded text-slate-300">SOURCE DATA</span>
        <span className="text-slate-500">→</span>
        <span className="bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded">COMPUTED DATA</span>
        <span className="text-slate-500">→</span>
        <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">SUGGESTED DEDUCTIONS</span>
      </div>

      {/* Action Footer */}
      <div className="pt-2 flex items-center justify-between gap-2 border-t border-white/10">
        <span className="text-[11px] text-slate-400 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>{computed ? 'Computation Updated' : 'Ready for Computation'}</span>
        </span>
        <button
          onClick={handleCompute}
          disabled={isProcessing}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 transition-all disabled:opacity-50"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>{isProcessing ? 'Calculating...' : 'View Computation'}</span>
        </button>
      </div>
    </div>
  );
};

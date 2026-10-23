import React, { useState } from 'react';
import { Upload, FileCheck, AlertCircle, RefreshCw } from 'lucide-react';

export const TallyReconciliationModule: React.FC = () => {
  const fileName = 'tally_export.csv';
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpload = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-5 backdrop-blur-xl flex flex-col justify-between space-y-4 shadow-xl hover:border-emerald-500/30 transition-all duration-300">
      {/* Module Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs border border-emerald-500/30">
            16
          </div>
          <div>
            <h3 className="text-sm font-black text-white tracking-tight flex items-center gap-2">
              Tally / Financial Reconciliation
            </h3>
            <p className="text-[11px] text-slate-400">Compare. Reconcile. Ensure Accuracy.</p>
          </div>
        </div>
        <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
          RECONCILIATION
        </span>
      </div>

      {/* Upload File Input Area */}
      <div className="bg-[#030712] border border-dashed border-white/20 rounded-xl p-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <Upload className="w-4 h-4 text-emerald-400" />
          <div>
            <span className="font-bold block text-slate-200">Upload Tally Export (CSV/XML)</span>
            <span className="text-[10px] text-slate-400">{fileName}</span>
          </div>
        </div>
        <button
          onClick={handleUpload}
          disabled={isProcessing}
          className="bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 font-bold text-[11px] px-3 py-1 rounded-lg hover:bg-emerald-600/30 transition-all flex items-center gap-1"
        >
          {isProcessing ? <RefreshCw className="w-3 h-3 animate-spin" /> : <FileCheck className="w-3 h-3" />}
          <span>{isProcessing ? 'Processing...' : 'Reconcile'}</span>
        </button>
      </div>

      {/* Summary Stats Grid */}
      <div className="grid grid-cols-3 gap-2 bg-[#030712]/60 p-2.5 rounded-xl border border-white/5 text-center text-xs">
        <div>
          <span className="text-[10px] text-slate-400 font-semibold block uppercase">Total Txns</span>
          <span className="text-sm font-black text-white">1,245</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 font-semibold block uppercase">Matched</span>
          <span className="text-sm font-black text-emerald-400">1,180 (94.8%)</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 font-semibold block uppercase">Discrepancies</span>
          <span className="text-sm font-black text-rose-400">65 (5.2%)</span>
        </div>
      </div>

      {/* Discrepancies Breakdown */}
      <div className="space-y-1.5 text-xs">
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-2 flex items-center justify-between text-[11px]">
          <span className="font-bold text-rose-300 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
            <span>GST Mismatch</span>
          </span>
          <span className="font-mono text-rose-300 font-bold">12 entries</span>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-2 flex items-center justify-between text-[11px]">
          <span className="font-bold text-amber-300 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Invoice Not Found</span>
          </span>
          <span className="font-mono text-amber-300 font-bold">23 entries</span>
        </div>
        <div className="bg-sky-500/10 border border-sky-500/20 rounded-xl p-2 flex items-center justify-between text-[11px]">
          <span className="font-bold text-sky-300 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-sky-400" />
            <span>Amount Difference</span>
          </span>
          <span className="font-mono text-sky-300 font-bold">30 entries</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-white/10">
        <button className="w-full bg-emerald-600/80 hover:bg-emerald-600 text-white font-bold text-xs py-2 rounded-xl transition-all shadow-md">
          View Full Report
        </button>
      </div>
    </div>
  );
};

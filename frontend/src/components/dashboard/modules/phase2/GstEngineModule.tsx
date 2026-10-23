import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, RefreshCw, FileText } from 'lucide-react';

export const GstEngineModule: React.FC = () => {
  const [entity, setEntity] = useState('MARG Technologies Pvt Ltd (GSTIN: 29ABCDE1234F1Z5)');
  const [period, setPeriod] = useState('Jul - Sep 2024');
  const [filingType, setFilingType] = useState('GSTR-1');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(4);
  const [statusText, setStatusText] = useState('Draft ready for approval');

  const handleGenerateDraft = async () => {
    setIsAnalyzing(true);
    setStatusText('Reading invoices...');
    setActiveStep(1);

    setTimeout(() => {
      setStatusText('Validating GSTINs & Invoices...');
      setActiveStep(2);
    }, 800);

    setTimeout(() => {
      setStatusText('Computing GSTR figures...');
      setActiveStep(3);
    }, 1600);

    setTimeout(() => {
      setStatusText('Checking for ITC mismatches...');
      setActiveStep(4);
    }, 2400);

    setTimeout(() => {
      setStatusText('Draft ready! Human review complete.');
      setIsAnalyzing(false);
    }, 3200);
  };

  return (
    <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-5 backdrop-blur-xl flex flex-col justify-between space-y-4 shadow-xl hover:border-sky-500/30 transition-all duration-300">
      {/* Module Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center text-xs border border-sky-500/30">
            10
          </div>
          <div>
            <h3 className="text-sm font-black text-white tracking-tight flex items-center gap-2">
              GST Intelligence Engine
            </h3>
            <p className="text-[11px] text-slate-400">Analyze. Compute. Comply.</p>
          </div>
        </div>
        <span className="text-[10px] font-bold text-sky-300 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded">
          TAX MODULE
        </span>
      </div>

      {/* Selectors */}
      <div className="space-y-3 text-xs">
        <div>
          <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Entity</label>
          <select
            value={entity}
            onChange={(e) => setEntity(e.target.value)}
            className="w-full bg-[#030712] border border-white/10 rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-sky-500/50"
          >
            <option>MARG Technologies Pvt Ltd (GSTIN: 29ABCDE1234F1Z5)</option>
            <option>Teja Enterprises (GSTIN: 37BCFPT1234K1Z2)</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Filing Period</label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full bg-[#030712] border border-white/10 rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-sky-500/50"
            >
              <option>Jul - Sep 2024</option>
              <option>Apr - Jun 2024</option>
              <option>Jan - Mar 2024</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Filing Type</label>
            <select
              value={filingType}
              onChange={(e) => setFilingType(e.target.value)}
              className="w-full bg-[#030712] border border-white/10 rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-sky-500/50"
            >
              <option>GSTR-1</option>
              <option>GSTR-3B</option>
              <option>GSTR-9</option>
            </select>
          </div>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-3 gap-2 bg-[#030712]/60 p-3 rounded-xl border border-white/5 text-center">
        <div>
          <span className="text-[10px] text-slate-400 font-semibold block uppercase">Invoiced Value</span>
          <span className="text-xs sm:text-sm font-black text-emerald-400">₹ 1,24,50,000</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 font-semibold block uppercase">GST Payable</span>
          <span className="text-xs sm:text-sm font-black text-sky-400">₹ 18,67,500</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="w-9 h-9 rounded-full border-2 border-emerald-500/80 flex items-center justify-center bg-emerald-500/10">
            <span className="text-[10px] font-extrabold text-emerald-300">92%</span>
          </div>
          <span className="text-[9px] text-slate-400 font-bold mt-0.5">Matched</span>
        </div>
      </div>

      {/* Mismatches Panel */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-2.5 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>3 Mismatches Flagged</span>
          </span>
          <span className="text-[10px] text-amber-400/80 underline cursor-pointer hover:text-amber-200">View Details →</span>
        </div>
        <div className="text-[11px] text-slate-300 space-y-1">
          <p className="line-clamp-1">• GSTR-2B ITC Mismatch: Invoice #INV-8842 mismatch ₹ 45,200</p>
          <p className="line-clamp-1">• Duplicate GSTIN Entry: Invoice #INV-9901 flagged for credit claim</p>
        </div>
      </div>

      {/* Workflow Steps Indicator */}
      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 pt-1">
        <span className={`px-2 py-0.5 rounded ${activeStep >= 1 ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'bg-slate-800'}`}>1 Read</span>
        <span>→</span>
        <span className={`px-2 py-0.5 rounded ${activeStep >= 2 ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'bg-slate-800'}`}>2 Validate</span>
        <span>→</span>
        <span className={`px-2 py-0.5 rounded ${activeStep >= 3 ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'bg-slate-800'}`}>3 Compute</span>
        <span>→</span>
        <span className={`px-2 py-0.5 rounded ${activeStep >= 4 ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'bg-slate-800'}`}>4 Check</span>
        <span>→</span>
        <span className={`px-2 py-0.5 rounded ${activeStep >= 5 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800'}`}>5 Draft</span>
      </div>

      {/* Status Bar & Action */}
      <div className="pt-2 flex items-center justify-between gap-2 border-t border-white/10">
        <span className="text-[11px] text-sky-300 font-medium flex items-center gap-1">
          {isAnalyzing ? <RefreshCw className="w-3 h-3 animate-spin text-sky-400" /> : <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
          <span>{statusText}</span>
        </span>
        <button
          onClick={handleGenerateDraft}
          disabled={isAnalyzing}
          className="bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 transition-all disabled:opacity-50"
        >
          {isAnalyzing ? <RefreshCw className="w-3 h-3 animate-spin" /> : <FileText className="w-3 h-3" />}
          <span>Generate Draft</span>
        </button>
      </div>
    </div>
  );
};

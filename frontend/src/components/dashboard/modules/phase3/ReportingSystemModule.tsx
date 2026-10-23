import React, { useState } from 'react';
import { BarChart3, Download } from 'lucide-react';

export const ReportingSystemModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'summary' | 'compliance' | 'financial'>('summary');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Report exported successfully (PDF / Excel). Signed secure URL generated.');
    }, 1200);
  };

  return (
    <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 font-extrabold text-xs flex items-center justify-center border border-blue-500/30">
              28
            </span>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-blue-400" />
                <span>Reporting System</span>
              </h3>
              <p className="text-[11px] text-slate-400">Insights for Better Decisions.</p>
            </div>
          </div>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 transition flex items-center gap-1"
          >
            <Download className={`w-3 h-3 ${isExporting ? 'animate-bounce' : ''}`} />
            <span>{isExporting ? 'Exporting...' : 'Export Report'}</span>
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 mt-3 p-1 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] font-semibold">
          <button
            onClick={() => setActiveTab('summary')}
            className={`flex-1 py-1 rounded-lg transition ${
              activeTab === 'summary' ? 'bg-blue-500/20 text-blue-300 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Case Summary
          </button>
          <button
            onClick={() => setActiveTab('compliance')}
            className={`flex-1 py-1 rounded-lg transition ${
              activeTab === 'compliance' ? 'bg-blue-500/20 text-blue-300 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Compliance
          </button>
          <button
            onClick={() => setActiveTab('financial')}
            className={`flex-1 py-1 rounded-lg transition ${
              activeTab === 'financial' ? 'bg-blue-500/20 text-blue-300 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Financial
          </button>
        </div>
      </div>

      {/* Report Content */}
      <div className="space-y-3 font-mono text-xs">
        {activeTab === 'summary' && (
          <div className="space-y-2">
            {/* KPI Row */}
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-[#030712]/80 border border-white/10 rounded-xl p-2 space-y-0.5">
                <span className="text-[10px] text-slate-400 block">Total Cases</span>
                <span className="text-base font-black text-white">128</span>
                <span className="text-[9px] text-emerald-400 font-bold block">&uarr; +12%</span>
              </div>
              <div className="bg-[#030712]/80 border border-white/10 rounded-xl p-2 space-y-0.5">
                <span className="text-[10px] text-slate-400 block">Open Cases</span>
                <span className="text-base font-black text-sky-400">46</span>
              </div>
              <div className="bg-[#030712]/80 border border-white/10 rounded-xl p-2 space-y-0.5">
                <span className="text-[10px] text-slate-400 block">High Risk</span>
                <span className="text-base font-black text-red-400">12</span>
              </div>
              <div className="bg-[#030712]/80 border border-white/10 rounded-xl p-2 space-y-0.5">
                <span className="text-[10px] text-slate-400 block">Overdue</span>
                <span className="text-base font-black text-amber-400">8</span>
              </div>
            </div>

            {/* Breakdown chart simulation */}
            <div className="bg-[#030712]/80 border border-white/10 rounded-xl p-2.5 space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between text-slate-300">
                <span>Case Status Overview</span>
                <span className="text-[10px] text-slate-500">Authorized Aggregation</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-800 flex overflow-hidden">
                <div className="h-full bg-sky-500 w-[36%]" title="Open (36%)" />
                <div className="h-full bg-amber-500 w-[22%]" title="In Review (22%)" />
                <div className="h-full bg-purple-500 w-[14%]" title="Awaiting Approval (14%)" />
                <div className="h-full bg-emerald-500 w-[28%]" title="Completed (28%)" />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-500" /> Open: 46 (36%)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> In Review: 28 (22%)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Completed: 36 (28%)</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'compliance' && (
          <div className="bg-[#030712]/80 border border-white/10 rounded-xl p-3 space-y-2 text-[11px]">
            <span className="font-bold text-slate-300 block">Compliance Overview</span>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">GST Filings On-Time Rate:</span>
              <span className="text-emerald-400 font-bold">96.4%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">ITR Assessments Pending:</span>
              <span className="text-amber-400 font-bold">4 Matters</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Citations Verified:</span>
              <span className="text-sky-400 font-bold">98.2%</span>
            </div>
          </div>
        )}

        {activeTab === 'financial' && (
          <div className="bg-[#030712]/80 border border-white/10 rounded-xl p-3 space-y-2 text-[11px]">
            <span className="font-bold text-slate-300 block">Financial Summary</span>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Total Tax Reconciled:</span>
              <span className="text-emerald-400 font-bold">₹4,82,50,000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Unresolved Discrepancies:</span>
              <span className="text-red-400 font-bold">₹12,40,000 (3 items)</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <span>Module 28 • Cross-Platform MIS Reporting</span>
        <span className="text-blue-400 hover:underline cursor-pointer">View Full Reports &rarr;</span>
      </div>
    </div>
  );
};

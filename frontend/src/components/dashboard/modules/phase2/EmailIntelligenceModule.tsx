import React, { useState } from 'react';
import { CheckSquare, RefreshCw, Send } from 'lucide-react';

export const EmailIntelligenceModule: React.FC = () => {
  const [fromEmail, setFromEmail] = useState('client@abc.com');
  const [subject, setSubject] = useState('Documents for GST Filing');
  const receivedDate = '15 Sep 2024';
  const [bodyText, setBodyText] = useState(
    'Dear Team, Please find attached the sales invoices for Jul-Sep 2024. Kindly confirm if any additional documents are required. Regards, ABC Enterprises'
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcessEmail = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-5 backdrop-blur-xl flex flex-col justify-between space-y-4 shadow-xl hover:border-amber-500/30 transition-all duration-300">
      {/* Module Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs border border-amber-500/30">
            17
          </div>
          <div>
            <h3 className="text-sm font-black text-white tracking-tight flex items-center gap-2">
              Email Intelligence
            </h3>
            <p className="text-[11px] text-slate-400">Capture. Analyze. Take Action.</p>
          </div>
        </div>
        <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
          EMAIL INTAKE
        </span>
      </div>

      {/* From / Subject Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">From</label>
          <input
            type="text"
            value={fromEmail}
            onChange={(e) => setFromEmail(e.target.value)}
            className="w-full bg-[#030712] border border-white/10 rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-amber-500/50"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-[#030712] border border-white/10 rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-amber-500/50"
          />
        </div>
      </div>

      {/* Email Body Preview */}
      <div className="bg-[#030712] border border-white/10 rounded-xl p-3 space-y-1">
        <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-white/5 pb-1">
          <span>Received: {receivedDate}</span>
          <span className="text-amber-400 font-bold">Manual / Paste Mode</span>
        </div>
        <textarea
          value={bodyText}
          onChange={(e) => setBodyText(e.target.value)}
          rows={3}
          className="w-full bg-transparent border-none focus:outline-none text-xs text-slate-300 resize-none leading-relaxed"
        />
      </div>

      {/* Extracted Action Items */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-2.5 space-y-1.5">
        <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
          <CheckSquare className="w-3.5 h-3.5 text-amber-400" />
          <span>Extracted Action Items</span>
        </span>
        <div className="text-[11px] text-slate-300 space-y-1 pl-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Process attached invoices</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-400"></span>
            <span>Link to GST case #C-1042</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
            <span>Send confirmation receipt to client</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
        <span className="text-[10px] text-slate-400">Zero live sync required in Phase 2</span>
        <button
          onClick={handleProcessEmail}
          disabled={isProcessing}
          className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 transition-all disabled:opacity-50"
        >
          {isProcessing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
          <span>{isProcessing ? 'Processing...' : 'Process Email'}</span>
        </button>
      </div>
    </div>
  );
};

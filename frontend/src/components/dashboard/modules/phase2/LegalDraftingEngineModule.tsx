import React, { useState } from 'react';
import { Save, CheckCircle2, EyeOff } from 'lucide-react';

export const LegalDraftingEngineModule: React.FC = () => {
  const [draftType, setDraftType] = useState('Legal Notice');
  const [caseName, setCaseName] = useState('MARG vs ABC Enterprises');
  const [content, setContent] = useState(
    `LEGAL NOTICE\n\nTo,\nM/s ABC Enterprises\n\nSubject: Notice for Breach of Contract & Tax Mismatch\n\nDear Sir/Madam,\nUnder the instructions and on behalf of our client MARG Technologies Pvt Ltd, we hereby issue this legal notice demanding immediate rectification of tax mismatch...`
  );
  const [status, setStatus] = useState<'ai_draft' | 'finalized'>('ai_draft');

  const handleSave = () => {
    // Saved draft
  };

  const handleFinalize = () => {
    setStatus('finalized');
  };

  return (
    <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-5 backdrop-blur-xl flex flex-col justify-between space-y-4 shadow-xl hover:border-blue-500/30 transition-all duration-300">
      {/* Module Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-xs border border-blue-500/30">
            15
          </div>
          <div>
            <h3 className="text-sm font-black text-white tracking-tight flex items-center gap-2">
              Legal Drafting Engine
            </h3>
            <p className="text-[11px] text-slate-400">Draft. Refine. Finalize.</p>
          </div>
        </div>
        <span className="text-[10px] font-bold text-blue-300 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded flex items-center gap-1">
          {status === 'finalized' ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <EyeOff className="w-3 h-3 text-amber-400" />}
          <span>{status === 'finalized' ? 'CLIENT VISIBLE' : 'INTERNAL DRAFT'}</span>
        </span>
      </div>

      {/* Draft Type & Case Selectors */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Draft Type</label>
          <select
            value={draftType}
            onChange={(e) => setDraftType(e.target.value)}
            className="w-full bg-[#030712] border border-white/10 rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-blue-500/50"
          >
            <option>Legal Notice</option>
            <option>Petition</option>
            <option>Affidavit</option>
            <option>Lease Agreement</option>
          </select>
        </div>
        <div>
          <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Case</label>
          <select
            value={caseName}
            onChange={(e) => setCaseName(e.target.value)}
            className="w-full bg-[#030712] border border-white/10 rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-blue-500/50"
          >
            <option>MARG vs ABC Enterprises</option>
            <option>Sharma Property Matter</option>
          </select>
        </div>
      </div>

      {/* Editor Formatting Toolbar */}
      <div className="flex items-center gap-2 bg-[#030712]/80 border border-white/10 px-3 py-1.5 rounded-lg text-slate-300 text-xs font-bold">
        <button className="hover:text-white px-1">Normal ▾</button>
        <div className="h-3 w-[1px] bg-white/10"></div>
        <button className="hover:text-white px-1">B</button>
        <button className="hover:text-white px-1 italic">I</button>
        <button className="hover:text-white px-1 underline">U</button>
        <div className="h-3 w-[1px] bg-white/10"></div>
        <span className="text-[10px] text-slate-400 font-normal">Rich Text Editor</span>
      </div>

      {/* Editable Document Box */}
      <div className="bg-[#030712] border border-white/10 rounded-xl p-3 text-xs text-slate-200 font-mono space-y-1 focus-within:border-blue-500/50 min-h-[110px]">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          className="w-full bg-transparent border-none focus:outline-none resize-none text-slate-200 text-xs leading-relaxed"
        />
      </div>

      {/* Action Footer */}
      <div className="pt-2 flex items-center justify-between gap-2 border-t border-white/10">
        <button
          onClick={handleSave}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-3.5 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5 transition-all"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Draft</span>
        </button>

        <button
          onClick={handleFinalize}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 transition-all"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Finalize</span>
        </button>
      </div>
    </div>
  );
};

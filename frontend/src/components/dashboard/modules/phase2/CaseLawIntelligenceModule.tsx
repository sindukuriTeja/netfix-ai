import React, { useState } from 'react';
import { Search, Scale } from 'lucide-react';

export const CaseLawIntelligenceModule: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [query, setQuery] = useState('');

  const precedents = [
    { title: 'Arnesh Kumar vs State of Bihar', citation: '(2014) 8 SCC 273', relevance: '98%' },
    { title: 'K. Veeraswami vs Union of India', citation: '(1991) 3 SCC 655', relevance: '92%' },
    { title: 'State of Maharashtra vs Suresh', citation: '(2000) 1 SCC 471', relevance: '87%' },
  ];

  return (
    <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-5 backdrop-blur-xl flex flex-col justify-between space-y-4 shadow-xl hover:border-purple-500/30 transition-all duration-300">
      {/* Module Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center text-xs border border-purple-500/30">
            13
          </div>
          <div>
            <h3 className="text-sm font-black text-white tracking-tight flex items-center gap-2">
              Case-Law Intelligence
            </h3>
            <p className="text-[11px] text-slate-400">Research. Discover. Get Answers.</p>
          </div>
        </div>
        <span className="text-[10px] font-bold text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded">
          RESEARCH
        </span>
      </div>

      {/* Query Bar */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a legal question..."
          className="w-full bg-[#030712] border border-white/10 rounded-xl pl-3 pr-9 py-2 text-slate-200 text-xs placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg bg-purple-600 flex items-center justify-center text-white">
          <Search className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 border-b border-white/10 pb-2 text-[11px] font-bold text-slate-400">
        {['All', 'Judgments', 'High Courts', 'Supreme Court'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-2 py-1 rounded-lg transition-all ${
              activeFilter === tab
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'hover:text-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Precedent Cards */}
      <div className="space-y-2">
        {precedents.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#030712]/60 hover:bg-white/[0.04] border border-white/5 rounded-xl p-2.5 flex items-center justify-between transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Scale className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-200 group-hover:text-purple-300 transition-colors block">
                  {item.title}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{item.citation}</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
              Relevance: {item.relevance}
            </span>
          </div>
        ))}
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-white/10">
        <button className="w-full bg-purple-600/80 hover:bg-purple-600 text-white font-bold text-xs py-2 rounded-xl transition-all shadow-md">
          View Full Research
        </button>
      </div>
    </div>
  );
};

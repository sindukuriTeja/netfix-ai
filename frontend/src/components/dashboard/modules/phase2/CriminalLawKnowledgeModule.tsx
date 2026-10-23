import React, { useState } from 'react';
import { Search, BookOpen, ChevronRight } from 'lucide-react';

export const CriminalLawKnowledgeModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('IPC');
  const [searchQuery, setSearchQuery] = useState('');

  const sections = [
    { code: 'Section 302', title: 'Murder', act: 'Indian Penal Code, 1860' },
    { code: 'Section 420', title: 'Cheating', act: 'Indian Penal Code, 1860' },
    { code: 'Section 438', title: 'Anticipatory Bail', act: 'Code of Criminal Procedure, 1973' },
    { code: 'NDPS Act', title: 'Section 21', act: 'Narcotic Drugs and Psychotropic Substances Act' },
  ];

  return (
    <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-5 backdrop-blur-xl flex flex-col justify-between space-y-4 shadow-xl hover:border-violet-500/30 transition-all duration-300">
      {/* Module Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-violet-500/20 text-violet-400 font-bold flex items-center justify-center text-xs border border-violet-500/30">
            12
          </div>
          <div>
            <h3 className="text-sm font-black text-white tracking-tight flex items-center gap-2">
              Criminal Law Knowledge Base
            </h3>
            <p className="text-[11px] text-slate-400">Authoritative Legal Knowledge.</p>
          </div>
        </div>
        <span className="text-[10px] font-bold text-violet-300 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded">
          KNOWLEDGE
        </span>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search criminal law (e.g. IPC 302, bail, NDPS...)"
          className="w-full bg-[#030712] border border-white/10 rounded-xl pl-3 pr-9 py-2 text-slate-200 text-xs placeholder:text-slate-500 focus:outline-none focus:border-violet-500/50"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg bg-violet-600 flex items-center justify-center text-white">
          <Search className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Acts Navigation Tabs */}
      <div className="flex items-center gap-1 border-b border-white/10 pb-2 text-[11px] font-bold text-slate-400 overflow-x-auto">
        {['IPC', 'CrPC', 'NDPS Act', 'Evidence Act', 'More'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              activeTab === tab
                ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                : 'hover:text-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Legal Section List */}
      <div className="space-y-2">
        {sections.map((sec, idx) => (
          <div
            key={idx}
            className="bg-[#030712]/60 hover:bg-white/[0.04] border border-white/5 rounded-xl p-2.5 flex items-center justify-between transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-violet-500/10 text-violet-400 flex items-center justify-center">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-200 group-hover:text-violet-300 transition-colors">
                  {sec.code} - {sec.title}
                </span>
                <p className="text-[10px] text-slate-400">{sec.act}</p>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors" />
          </div>
        ))}
      </div>

      {/* Advanced Search Action */}
      <div className="pt-2 border-t border-white/10">
        <button className="w-full bg-violet-600/80 hover:bg-violet-600 text-white font-bold text-xs py-2 rounded-xl transition-all shadow-md">
          Advanced Search
        </button>
      </div>
    </div>
  );
};

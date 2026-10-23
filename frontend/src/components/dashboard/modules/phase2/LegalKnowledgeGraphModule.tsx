import React from 'react';
import { Layers, ShieldCheck, Share2 } from 'lucide-react';

export const LegalKnowledgeGraphModule: React.FC = () => {
  return (
    <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-5 backdrop-blur-xl flex flex-col justify-between space-y-4 shadow-xl hover:border-cyan-500/30 transition-all duration-300">
      {/* Module Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center text-xs border border-cyan-500/30">
            14
          </div>
          <div>
            <h3 className="text-sm font-black text-white tracking-tight flex items-center gap-2">
              Legal Knowledge Graph
            </h3>
            <p className="text-[11px] text-slate-400">Visualize. Connect. Understand.</p>
          </div>
        </div>
        <span className="text-[10px] font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
          GRAPH LAYER
        </span>
      </div>

      {/* Visual Graph Container */}
      <div className="bg-[#030712]/80 border border-white/10 rounded-xl p-4 relative min-h-[190px] flex items-center justify-center overflow-hidden">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px] opacity-10"></div>

        {/* Center Primary Node */}
        <div className="relative z-10 w-14 h-14 rounded-full bg-indigo-600 border-2 border-cyan-400 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-indigo-500/30 animate-pulse">
          IPC 302
        </div>

        {/* Orbit Nodes */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Top Left: Case Laws */}
          <div className="absolute -top-1 left-4 bg-sky-500/20 border border-sky-400/40 text-sky-200 px-2.5 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1">
            <Share2 className="w-3 h-3 text-sky-400" />
            <span>Case Laws (124)</span>
          </div>

          {/* Top Right: Related Sections */}
          <div className="absolute top-1 right-4 bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 px-2.5 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1">
            <Layers className="w-3 h-3 text-emerald-400" />
            <span>Related Sections (8)</span>
          </div>

          {/* Right Center: Amendments */}
          <div className="absolute top-20 right-1 bg-teal-500/20 border border-teal-400/40 text-teal-200 px-2.5 py-1 rounded-xl text-[10px] font-bold">
            Amendments (3)
          </div>

          {/* Bottom Right: Similar Cases */}
          <div className="absolute bottom-1 right-4 bg-amber-500/20 border border-amber-400/40 text-amber-200 px-2.5 py-1 rounded-xl text-[10px] font-bold">
            Similar Cases (56)
          </div>

          {/* Bottom Left: Legal Concepts */}
          <div className="absolute bottom-1 left-4 bg-rose-500/20 border border-rose-400/40 text-rose-200 px-2.5 py-1 rounded-xl text-[10px] font-bold">
            Legal Concepts (18)
          </div>

          {/* Left Center: Cited By */}
          <div className="absolute top-20 left-1 bg-purple-500/20 border border-purple-400/40 text-purple-200 px-2.5 py-1 rounded-xl text-[10px] font-bold">
            Cited By (89)
          </div>
        </div>
      </div>

      {/* Security Boundary Notice */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
        <span className="flex items-center gap-1 text-cyan-300">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Bound Graph Traversal</span>
        </span>
        <span className="text-slate-500">Zero Private Case Leakage</span>
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-white/10">
        <button className="w-full bg-cyan-600/80 hover:bg-cyan-600 text-white font-bold text-xs py-2 rounded-xl transition-all shadow-md">
          Explore Graph
        </button>
      </div>
    </div>
  );
};

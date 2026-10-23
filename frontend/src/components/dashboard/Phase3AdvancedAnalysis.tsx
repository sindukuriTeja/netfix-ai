import React from 'react';
import { ShieldCheck, Lock, Database, ArrowRight, Cpu, Layers, CheckCircle2, Award, Sparkles } from 'lucide-react';
import { CaseFactEngineModule } from './modules/phase3/CaseFactEngineModule';
import { ChronologyEngineModule } from './modules/phase3/ChronologyEngineModule';
import { EvidenceManagementModule } from './modules/phase3/EvidenceManagementModule';
import { ContradictionAnalysisModule } from './modules/phase3/ContradictionAnalysisModule';
import { LimitationDeadlineModule } from './modules/phase3/LimitationDeadlineModule';
import { AdversarialEngineModule } from './modules/phase3/AdversarialEngineModule';
import { RiskExposureModule } from './modules/phase3/RiskExposureModule';
import { CitationVerificationModule } from './modules/phase3/CitationVerificationModule';
import { ReportingSystemModule } from './modules/phase3/ReportingSystemModule';

export const Phase3AdvancedAnalysis: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-purple-500/30 selection:text-purple-200 p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1800px] mx-auto w-full">
      {/* Top Poster Brand Banner */}
      <header className="bg-[#081525]/90 border border-white/10 rounded-2xl p-6 backdrop-blur-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-2xl relative overflow-hidden">
        <div className="space-y-1 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xl font-black text-white tracking-tight">NETFIX AI</span>
            <span className="text-xs font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded uppercase">
              MARG GROUP
            </span>
          </div>
          <p className="text-xs font-extrabold text-slate-300 tracking-wider">
            Smarter Law. Stronger Decisions. | AI-Powered Integrated Business Intelligence Platform
          </p>
          <p className="text-[11px] text-purple-400/90 font-mono">
            Tax | Legal | Litigation | Corporate | Property | Projects | Compliance
          </p>
          <h1 className="text-lg sm:text-2xl font-black text-white tracking-tight pt-2 flex items-center gap-2">
            <span>PHASE 3 — ADVANCED ANALYSIS & OVERSIGHT LAYER (MODULES 20–28)</span>
          </h1>
          <p className="text-xs text-slate-400 italic">
            Enrich. Cross-check. Analyze. Report. Turning Information into Insight.
          </p>
        </div>

        {/* Security & Architecture Badges */}
        <div className="flex flex-wrap lg:flex-col items-end gap-2 relative z-10">
          <div className="flex flex-wrap gap-2 text-[10px] font-bold">
            <span className="px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-300 border border-sky-500/20 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Role-Based Access</span>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Data Isolation</span>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1">
              <Database className="w-3 h-3" />
              <span>Audit Ready</span>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Human-in-the-Loop</span>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 flex items-center gap-1">
              <Cpu className="w-3 h-3" />
              <span>AI-Ready</span>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-pink-500/10 text-pink-300 border border-pink-500/20 flex items-center gap-1">
              <Award className="w-3 h-3" />
              <span>Complete 28 Modules</span>
            </span>
          </div>
        </div>
      </header>

      {/* Modules 20–28 Grid (3 x 3 Layout matching reference poster image) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Row 1 */}
        <CaseFactEngineModule />
        <ChronologyEngineModule />
        <EvidenceManagementModule />

        {/* Row 2 */}
        <ContradictionAnalysisModule />
        <LimitationDeadlineModule />
        <AdversarialEngineModule />

        {/* Row 3 */}
        <RiskExposureModule />
        <CitationVerificationModule />
        <ReportingSystemModule />
      </div>

      {/* Bottom Footer Panels matching reference poster image */}
      <footer className="space-y-4 pt-4 border-t border-white/10">
        {/* How Phase 3 Connects (End-to-End Data Flow) */}
        <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-4 space-y-3">
          <h4 className="text-xs font-extrabold text-purple-400 uppercase tracking-widest flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>How Phase 3 Connects (End-to-End Data Flow)</span>
          </h4>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-300 font-mono">
            <div className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10">Documents (1–6)</div>
            <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
            <div className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10">Domain Modules (10–19)</div>
            <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
            <div className="px-3 py-1.5 rounded-xl bg-pink-500/20 text-pink-300 border border-pink-500/40">Case Facts (20)</div>
            <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
            <div className="px-3 py-1.5 rounded-xl bg-orange-500/20 text-orange-300 border border-orange-500/40">Timeline (21)</div>
            <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
            <div className="px-3 py-1.5 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/40">Evidence (22)</div>
            <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
            <div className="px-3 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">Contradictions (23)</div>
            <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
            <div className="px-3 py-1.5 rounded-xl bg-red-500/20 text-red-300 border border-red-500/40">Deadlines (24)</div>
            <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
            <div className="px-3 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40">Risk (25–26)</div>
            <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
            <div className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">Citations (27)</div>
            <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
            <div className="px-3 py-1.5 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/40">Reports (28)</div>
          </div>
        </div>

        {/* Workflow & Next Phase 3-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Key Outcomes */}
          <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-4 space-y-2">
            <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Key Outcomes</h5>
            <div className="text-[11px] text-slate-300 space-y-1">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Complete 28-module application platform</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 100% role-based data isolation</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Full audit trail and traceability</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Human-in-the-loop at every critical step</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> AI-ready architecture for next phase</div>
            </div>
          </div>

          {/* Platform Vision */}
          <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-4 flex flex-col justify-center items-center text-center space-y-2">
            <span className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-sky-400 italic">
              "From Data to Insight. From Insight to Impact."
            </span>
            <span className="text-xs font-extrabold text-slate-400 tracking-widest uppercase">— MARG GROUP</span>
          </div>

          {/* Next Phase Readiness */}
          <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-4 space-y-2">
            <h5 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>READY FOR NEXT PHASE</span>
            </h5>
            <div className="text-[11px] text-slate-300 space-y-1 font-mono">
              <p>• AI Agents Integration</p>
              <p>• Ollama Local Models</p>
              <p>• Ultron Orchestrator</p>
              <p>• Multi-Agent Collaboration</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

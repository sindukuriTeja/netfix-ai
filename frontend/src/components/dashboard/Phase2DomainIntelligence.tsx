import React from 'react';
import { ShieldCheck, Lock, Database, ArrowRight, Cpu, Layers, CheckCircle2 } from 'lucide-react';
import { GstEngineModule } from './modules/phase2/GstEngineModule';
import { IncomeTaxEngineModule } from './modules/phase2/IncomeTaxEngineModule';
import { CriminalLawKnowledgeModule } from './modules/phase2/CriminalLawKnowledgeModule';
import { CaseLawIntelligenceModule } from './modules/phase2/CaseLawIntelligenceModule';
import { LegalKnowledgeGraphModule } from './modules/phase2/LegalKnowledgeGraphModule';
import { LegalDraftingEngineModule } from './modules/phase2/LegalDraftingEngineModule';
import { TallyReconciliationModule } from './modules/phase2/TallyReconciliationModule';
import { EmailIntelligenceModule } from './modules/phase2/EmailIntelligenceModule';
import { PropertyManagementModule } from './modules/phase2/PropertyManagementModule';
import { ProjectManagementModule } from './modules/phase2/ProjectManagementModule';
import { LiveAgentActivity } from './LiveAgentActivity';

export const Phase2DomainIntelligence: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-200 p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1800px] mx-auto w-full">
      {/* Top Poster Brand Banner */}
      <header className="bg-[#081525]/90 border border-white/10 rounded-2xl p-6 backdrop-blur-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-2xl relative overflow-hidden">
        <div className="space-y-1 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xl font-black text-white tracking-tight">NETFIX AI</span>
            <span className="text-xs font-bold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded uppercase">
              MARG GROUP
            </span>
          </div>
          <p className="text-xs font-extrabold text-slate-300 tracking-wider">
            AI-Powered Integrated Business Intelligence Platform
          </p>
          <p className="text-[11px] text-sky-400/90 font-mono">
            Tax | Legal | Litigation | Corporate | Property | Projects | Compliance
          </p>
          <h1 className="text-lg sm:text-2xl font-black text-white tracking-tight pt-2 flex items-center gap-2">
            <span>PHASE 2 — DOMAIN INTELLIGENCE LAYER (MODULES 10–19)</span>
          </h1>
          <p className="text-xs text-slate-400 italic">Specialized Intelligence for Real-World Impact. Built on a Secure Foundation.</p>
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
              <span>Secure & Compliant</span>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 flex items-center gap-1">
              <Cpu className="w-3 h-3" />
              <span>AI-Ready Architecture</span>
            </span>
          </div>
        </div>
      </header>

      {/* Modules 10–19 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Row 1 */}
        <GstEngineModule />
        <IncomeTaxEngineModule />
        <CriminalLawKnowledgeModule />

        {/* Row 2 */}
        <CaseLawIntelligenceModule />
        <LegalKnowledgeGraphModule />
        <LegalDraftingEngineModule />

        {/* Row 3 */}
        <TallyReconciliationModule />
        <EmailIntelligenceModule />
        <PropertyManagementModule />

        {/* Row 4 */}
        <ProjectManagementModule />
        <div className="lg:col-span-2">
          <LiveAgentActivity />
        </div>
      </div>

      {/* Bottom Footer Panels matching reference poster image */}
      <footer className="space-y-4 pt-4 border-t border-white/10">
        {/* How Phase 2 Connects with Phase 1 */}
        <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-4 space-y-3">
          <h4 className="text-xs font-extrabold text-sky-400 uppercase tracking-widest flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>How Phase 2 Connects with Phase 1</span>
          </h4>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-300">
            <div className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10">Users & Roles</div>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
            <div className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10">Entities</div>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
            <div className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10">Cases</div>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
            <div className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10">Documents (OCR)</div>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
            <div className="px-3 py-1.5 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-500/40">Domain Modules (10–19)</div>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
            <div className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10">Agent Tasks</div>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
            <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">Human Review</div>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
            <div className="px-3 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">Final Output</div>
          </div>
        </div>

        {/* Workflow & Tech Stack 3-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Workflow */}
          <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-4 space-y-2">
            <h5 className="text-xs font-bold text-sky-400 uppercase tracking-wider">Domain Intelligence Workflow (GST)</h5>
            <div className="text-[11px] text-slate-300 space-y-1">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 1. Upload Documents</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 2. Extract Data (OCR)</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 3. Process Analysis</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 4. Identify Mismatches</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 5. Human Review</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 6. Approve & Finalize</div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-4 space-y-2">
            <h5 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Tech Stack (Phase 2)</h5>
            <div className="text-[11px] text-slate-300 space-y-1">
              <p>• <strong>Frontend:</strong> React, TypeScript, Tailwind CSS</p>
              <p>• <strong>Backend:</strong> Node.js, Express, REST APIs</p>
              <p>• <strong>Database & Storage:</strong> Supabase PostgreSQL</p>
              <p>• <strong>Embeddings & Graph:</strong> pgvector / Knowledge Graph</p>
              <p>• <strong>AI Ready:</strong> Ollama / Local Agent Contracts</p>
            </div>
          </div>

          {/* Key Outcomes */}
          <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-4 space-y-2">
            <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Key Outcomes for Phase 2</h5>
            <div className="text-[11px] text-slate-300 space-y-1">
              <p>✓ 10 Domain Modules Implemented</p>
              <p>✓ Fully Integrated with Phase 1 Foundation</p>
              <p>✓ 100% Role-Based Data Isolation</p>
              <p>✓ Audit Ready & Human Review Workflow</p>
              <p>✓ AI-Ready Architecture for Future Agents</p>
            </div>
          </div>
        </div>

        {/* Phase 3 CTA Footer Bar */}
        <div className="bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-sky-900/60 border border-indigo-500/30 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-300 italic block">
              "From Documents to Intelligence. From Intelligence to Impact."
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold">— MARG GROUP</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-indigo-300 uppercase tracking-wider">READY FOR PHASE 3</span>
            <ArrowRight className="w-4 h-4 text-sky-400" />
          </div>
        </div>
      </footer>
    </div>
  );
};

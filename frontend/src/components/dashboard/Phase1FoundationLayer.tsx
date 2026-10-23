import React from 'react';
import { ShieldCheck, Lock, Database, ArrowRight, Server, Cpu, Layers } from 'lucide-react';
import { UserManagementModule } from './modules/UserManagementModule';
import { EntityManagementModule } from './modules/EntityManagementModule';
import { ClientManagementModule } from './modules/ClientManagementModule';
import { CaseManagementModule } from './modules/CaseManagementModule';
import { DocumentIntakeModule } from './modules/DocumentIntakeModule';
import { OcrDocumentAiModule } from './modules/OcrDocumentAiModule';
import { AdvocateWorkspaceModule } from './modules/AdvocateWorkspaceModule';
import { ClientPortalModule } from './modules/ClientPortalModule';
import { QuerySystemModule } from './modules/QuerySystemModule';

export const Phase1FoundationLayer: React.FC = () => {
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
            <span>PHASE 1 — FOUNDATION LAYER (MODULES 1–9)</span>
          </h1>
          <p className="text-xs text-slate-400 italic">Building the Core. Enabling Intelligence. Ensuring Trust.</p>
        </div>

        {/* Top Right Security Badges */}
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
              <ShieldCheck className="w-3 h-3" />
              <span>Secure & Compliant</span>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1">
              <Database className="w-3 h-3" />
              <span>Audit Ready</span>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/20 flex items-center gap-1">
              <Cpu className="w-3 h-3" />
              <span>AI-Ready Architecture</span>
            </span>
          </div>
        </div>
      </header>

      {/* 9 Modules Grid (3x3 matching reference poster layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <UserManagementModule />
        <EntityManagementModule />
        <ClientManagementModule />

        <CaseManagementModule />
        <DocumentIntakeModule />
        <OcrDocumentAiModule />

        <AdvocateWorkspaceModule />
        <ClientPortalModule />
        <QuerySystemModule />
      </div>

      {/* Bottom Footer Panels matching reference poster image */}
      <footer className="space-y-4 pt-4 border-t border-white/10">
        {/* Panel 1: How It All Connects */}
        <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-4 space-y-3">
          <h4 className="text-xs font-extrabold text-sky-400 uppercase tracking-widest flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>How It All Connects</span>
          </h4>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-300">
            <div className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10">Users & Identity</div>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
            <div className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10">Entities</div>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
            <div className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10">Clients</div>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
            <div className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10">Cases</div>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
            <div className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10">Documents</div>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
            <div className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10">OCR & Extraction</div>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
            <div className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10">Advocate Workspace</div>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
            <div className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10">Client Portal</div>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
            <div className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10">Query System</div>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
            <div className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold">AI Agents</div>
          </div>
        </div>

        {/* Panel 2 & 3: Security & Tech Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-4 space-y-2">
            <h4 className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>Security at Every Layer</span>
            </h4>
            <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-slate-300">
              <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">Role-Based Access Control</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">Data Isolation (Per User/Role)</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">Audit Trail (Who, What, When)</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">Encrypted Storage</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">Secure APIs & Sessions</span>
            </div>
          </div>

          <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-4 space-y-2">
            <h4 className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
              <Server className="w-4 h-4" />
              <span>Tech Stack</span>
            </h4>
            <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-slate-300">
              <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">Express / NestJS</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">PostgreSQL (Supabase)</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">Vite React</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">Supabase Storage</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">Ollama (Tesseract OCR)</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10">Tailwind CSS</span>
            </div>
          </div>
        </div>

        {/* Final Phase Status Bar */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2">
          <span>NETFIX AI | MARG GROUP — Smarter Law. Stronger Decisions.</span>
          <span className="font-extrabold text-sky-400">Phase 1 Complete → Stronger Foundation → Smarter Future</span>
          <span>Secure. Compliant. Scalable. AI-Ready. (2026)</span>
        </div>
      </footer>
    </div>
  );
};

export default Phase1FoundationLayer;

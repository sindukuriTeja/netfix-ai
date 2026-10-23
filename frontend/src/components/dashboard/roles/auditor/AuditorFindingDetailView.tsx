import React, { useState } from 'react';
import {
  ArrowLeft,
  AlertTriangle,
  ChevronRight,
  FileCheck2
} from 'lucide-react';

interface AuditorFindingDetailViewProps {
  findingId: string;
  onBack: () => void;
  onOpenEvidenceDetail?: (evidenceId: string) => void;
}

export const AuditorFindingDetailView: React.FC<AuditorFindingDetailViewProps> = ({
  findingId,
  onBack,
  onOpenEvidenceDetail,
}) => {
  const [subTab, setSubTab] = useState<'overview' | 'evidence' | 'control' | 'cause' | 'remediation' | 'history'>('overview');

  const finding = {
    id: findingId || 'FND-021',
    title: 'Tax invoice missing for GST claim',
    regulation: 'GST Act',
    severity: 'High',
    status: 'Open',
    discoveredOn: '10 Sep 2025',
    assignedTo: 'Rahul Sharma (Finance Controller)',
    dueDate: '20 Sep 2025 (8 days left)',
    observation: 'Missing tax invoice for GST claim #1042 in purchase register for Q3 2025.',
    impact: 'Potential disallowance of input tax credit (ITC) claim of ₹4,50,000, regulatory interest & penalty risk under Section 16(2) of GST Act.',
    relatedEvidence: [
      { id: 'EVD-032', name: 'Invoice_#1042.pdf', status: 'Pending' }
    ],
    control: { id: 'CTL-021', name: 'GST Return Reconciliation', status: 'Partially Effective' }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-2 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 text-[#00B8FF] group-hover:-translate-x-1 transition-transform" />
          <span>Back to Audit Findings</span>
        </button>

        <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
          <span>Audit Findings</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-[#00B8FF] font-bold">{finding.id}</span>
        </span>
      </div>

      {/* Header Banner (Panel 9) */}
      <div className="p-6 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-extrabold text-white tracking-tight font-mono">
                {finding.id} <span className="text-slate-400 font-sans">—</span> {finding.title}
              </h1>
              <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {finding.severity} Severity
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {finding.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-semibold">{finding.regulation} • Discovered on {finding.discoveredOn}</p>
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex items-center gap-2 border-t border-white/10 pt-4 overflow-x-auto text-xs font-medium text-slate-400">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'evidence', label: 'Evidence (1)' },
            { id: 'control', label: 'Control' },
            { id: 'cause', label: 'Root Cause' },
            { id: 'remediation', label: 'Remediation' },
            { id: 'history', label: 'History' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setSubTab(t.id as any)}
              className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                subTab === t.id
                  ? 'bg-[#00B8FF] text-black font-bold shadow-md'
                  : 'hover:text-white hover:bg-white/5'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Grid (Panel 9) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column: Finding Information */}
        <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Finding Information</span>
          </h3>

          <div className="space-y-3 text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px]">Finding ID</span>
              <span className="text-[#00B8FF] font-bold">{finding.id}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Title</span>
              <span className="text-white font-bold">{finding.title}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Regulation</span>
              <span className="text-slate-300">{finding.regulation}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Severity</span>
              <span className="text-rose-400 font-bold">{finding.severity}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Status</span>
              <span className="text-amber-400 font-bold">{finding.status}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Discovered On</span>
              <span className="text-slate-300">{finding.discoveredOn}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Assigned To</span>
              <span className="text-slate-300 font-sans">{finding.assignedTo}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Due Date</span>
              <span className="text-rose-400 font-bold">{finding.dueDate}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Observation & Impact */}
        <div className="lg:col-span-2 space-y-5">
          {/* Card 1: Observation */}
          <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-2">
            <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2">Observation</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">{finding.observation}</p>
          </div>

          {/* Card 2: Impact */}
          <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-2">
            <h3 className="text-sm font-bold text-rose-400 border-b border-white/10 pb-2">Financial & Regulatory Impact</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">{finding.impact}</p>
          </div>

          {/* Card 3: Related Evidence */}
          <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-3">
            <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-[#00B8FF]" />
              <span>Related Evidence</span>
            </h3>

            <div className="space-y-2 text-xs">
              {finding.relatedEvidence.map((ev) => (
                <div key={ev.id} className="p-3 rounded-xl bg-[#040e1a] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#00B8FF]">{ev.id}</span>
                    <span className="text-white font-mono">{ev.name}</span>
                  </div>
                  <button
                    onClick={() => onOpenEvidenceDetail?.(ev.id)}
                    className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 text-[11px] font-bold transition-colors font-mono"
                  >
                    {ev.status}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Eye,
  FileCheck2,
  Lock
} from 'lucide-react';

interface AuditorRequirementDetailViewProps {
  reqId: string;
  onBack: () => void;
  onOpenEvidenceDetail: (evidenceId: string) => void;
}

export const AuditorRequirementDetailView: React.FC<AuditorRequirementDetailViewProps> = ({
  reqId,
  onBack,
  onOpenEvidenceDetail,
}) => {
  const [subTab, setSubTab] = useState<'overview' | 'controls' | 'evidence' | 'history' | 'exceptions' | 'remediation'>('overview');

  const req = {
    id: reqId || 'REQ-GST-014',
    title: 'GST Return Filing',
    regulation: 'GST Act',
    authority: 'Goods and Services Tax Network (GSTN)',
    applicability: 'All registered entities',
    effectiveDate: '01 Jul 2017',
    frequency: 'Quarterly',
    description: 'GST returns to be filed monthly/quarterly as per GST Act.',
    status: 'Compliant',
    lastTested: '12 Sep 2025',
    compliancePercent: '100%',
    nextReview: '12 Mar 2026',
    controls: [
      { id: 'CTL-021', name: 'GST Return Reconciliation', status: 'Effective' },
      { id: 'CTL-024', name: 'Input Tax Credit Validation', status: 'Effective' },
    ],
    supportingEvidence: [
      { id: 'EVD-038', name: 'GST_Return_Q3.pdf', type: 'GST Return', status: 'Verified', date: '12 Sep 2025' },
      { id: 'EVD-045', name: 'Purchase_Register_Q3.pdf', type: 'Register', status: 'Verified', date: '11 Sep 2025' },
      { id: 'EVD-052', name: 'Sales_Register_Q3.pdf', type: 'Register', status: 'Verified', date: '10 Sep 2025' },
    ]
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
          <span>Back to Compliance Assessment</span>
        </button>

        <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
          <span>Compliance Assessment</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-[#00B8FF] font-bold">{req.id}</span>
        </span>
      </div>

      {/* Detail Header Banner (Panel 5) */}
      <div className="p-6 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-extrabold text-white tracking-tight font-mono">
                {req.id} <span className="text-slate-400 font-sans">—</span> {req.title}
              </h1>
              <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {req.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-semibold">{req.regulation} • Applicable for MARG Tech Corp</p>
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex items-center gap-2 border-t border-white/10 pt-4 overflow-x-auto text-xs font-medium text-slate-400">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'controls', label: 'Control Mapping (2)' },
            { id: 'evidence', label: 'Evidence (3)' },
            { id: 'history', label: 'Testing History' },
            { id: 'exceptions', label: 'Exceptions' },
            { id: 'remediation', label: 'Remediation' },
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

      {/* Main Content Grid (Panel 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column: Requirement Details */}
        <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00B8FF]" />
            <span>Requirement Details</span>
          </h3>

          <div className="space-y-3 text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px]">Requirement ID</span>
              <span className="text-[#00B8FF] font-bold">{req.id}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Requirement Name</span>
              <span className="text-white font-bold">{req.title}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Description</span>
              <p className="text-slate-300 font-sans text-[11px]">{req.description}</p>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Regulation</span>
              <span className="text-slate-300">{req.regulation}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Regulatory Authority</span>
              <span className="text-slate-300">{req.authority}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Applicability</span>
              <span className="text-slate-300">{req.applicability}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Effective Date</span>
              <span className="text-slate-300">{req.effectiveDate}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Review Frequency</span>
              <span className="text-slate-300">{req.frequency}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Compliance Status & Related Controls */}
        <div className="lg:col-span-2 space-y-5">
          {/* Card 1: Compliance Status */}
          <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Compliance Status</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-500 block text-[10px]">Current Status</span>
                <span className="text-emerald-400 font-bold">{req.status}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Last Tested</span>
                <span className="text-slate-200">{req.lastTested}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Compliance Score</span>
                <span className="text-emerald-400 font-bold">{req.compliancePercent}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Next Review</span>
                <span className="text-slate-200">{req.nextReview}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Related Controls */}
          <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-3">
            <h3 className="text-sm font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <Lock className="w-4 h-4 text-purple-400" />
              <span>Related Controls</span>
            </h3>

            <div className="space-y-2 text-xs">
              {req.controls.map((c) => (
                <div key={c.id} className="p-3 rounded-xl bg-[#040e1a] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#00B8FF]">{c.id}</span>
                    <span className="text-white font-medium">{c.name}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Supporting Evidence Table (Panel 5 Bottom) */}
      <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-4">
        <h3 className="text-sm font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
          <FileCheck2 className="w-4 h-4 text-sky-400" />
          <span>Supporting Evidence</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-[#040e1a] text-slate-400 font-mono">
                <th className="p-3.5 pl-4">Evidence ID</th>
                <th className="p-3.5">Document</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Uploaded On</th>
                <th className="p-3.5 pr-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {req.supportingEvidence.map((ev) => (
                <tr key={ev.id} className="hover:bg-white/5 transition-colors">
                  <td
                    onClick={() => onOpenEvidenceDetail(ev.id)}
                    className="p-3.5 pl-4 font-mono font-bold text-[#00B8FF] hover:underline cursor-pointer"
                  >
                    {ev.id}
                  </td>
                  <td className="p-3.5 font-bold text-white font-mono">{ev.name}</td>
                  <td className="p-3.5 text-slate-300 font-mono">{ev.type}</td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {ev.status}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-slate-400">{ev.date}</td>
                  <td className="p-3.5 pr-4 text-right">
                    <button
                      onClick={() => onOpenEvidenceDetail(ev.id)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#00B8FF]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

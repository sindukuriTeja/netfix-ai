import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  FileText,
  Clock,
  Plus,
  ChevronRight
} from 'lucide-react';

interface AuditorReviewDetailViewProps {
  reviewId: string;
  onBack: () => void;
  onOpenFindingModal: () => void;
  onOpenReportModal: () => void;
}

export const AuditorReviewDetailView: React.FC<AuditorReviewDetailViewProps> = ({
  reviewId,
  onBack,
  onOpenFindingModal,
  onOpenReportModal,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'scope' | 'controls' | 'evidence' | 'findings' | 'risks' | 'timeline' | 'documents' | 'report'>('overview');

  const review = {
    id: reviewId || 'AUD-103',
    entity: 'MARG Tech Corp',
    type: 'Financial & Tax Audit',
    status: 'In Review',
    period: '01 Apr 2025 – 31 Mar 2026',
    assignedDate: '05 Sep 2025',
    dueDate: '30 Sep 2025',
    progress: 72,
    reviewer: 'Priya Nair',
    riskLevel: 'High Risk',
    complianceScore: '81%',
    lastActivity: '2 hours ago',
    scope: ['GST Compliance', 'Income Tax', 'TDS', 'Financial Records'],
    expectedDocs: 46,
    verifiedDocs: 38,
    controlsTested: 24,
    totalFindings: 5,
    openFindings: 3,
    closedFindings: 2,
    milestones: [
      { text: 'Evidence collection completed', time: '4 days ago' },
      { text: 'Control testing in progress', time: '2 days ago' },
      { text: 'Finding FND-104 escalated to High', time: 'Yesterday' },
      { text: 'Management response received', time: '4 hours ago' }
    ]
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Back Button & Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-2 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 text-[#00B8FF] group-hover:-translate-x-1 transition-transform" />
          <span>Back to Assigned Reviews</span>
        </button>

        <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
          <span>Assigned Reviews</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-[#00B8FF] font-bold">{review.id}</span>
        </span>
      </div>

      {/* Detail Header Banner (Panel 3) */}
      <div className="p-6 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-extrabold text-white tracking-tight font-mono">
                {review.id} <span className="text-slate-400 font-sans">→</span> {review.entity}
              </h1>
              <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30">
                {review.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-semibold">{review.type}</p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="text-right">
              <span className="text-slate-500 block text-[10px]">Progress</span>
              <span className="text-lg font-extrabold text-[#00B8FF]">{review.progress}%</span>
            </div>
            <div className="text-right">
              <span className="text-slate-500 block text-[10px]">Due Date</span>
              <span className="text-slate-200 font-bold">{review.dueDate}</span>
            </div>
            <div className="text-right">
              <span className="px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                {review.riskLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Sub Navigation Tabs (9 Tabs matching Panel 3) */}
        <div className="flex items-center gap-2 border-t border-white/10 pt-4 overflow-x-auto text-xs font-medium text-slate-400">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'scope', label: 'Scope' },
            { id: 'controls', label: 'Controls (31)' },
            { id: 'evidence', label: 'Evidence (38)' },
            { id: 'findings', label: 'Findings (5)' },
            { id: 'risks', label: 'Risks (3)' },
            { id: 'timeline', label: 'Timeline' },
            { id: 'documents', label: 'Documents' },
            { id: 'report', label: 'Report' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === t.id
                  ? 'bg-[#00B8FF] text-black font-bold shadow-md'
                  : 'hover:text-white hover:bg-white/5'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Review Information + Scope */}
          <div className="lg:col-span-2 space-y-5">
            <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-4">
              <h3 className="text-sm font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00B8FF]" />
                <span>Review Information & Audit Scope</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px]">Review ID</span>
                  <span className="text-[#00B8FF] font-bold">{review.id}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Entity</span>
                  <span className="text-white font-bold">{review.entity}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Review Period</span>
                  <span className="text-slate-300">{review.period}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Assigned Auditor</span>
                  <span className="text-slate-300">{review.reviewer}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Compliance Score</span>
                  <span className="text-emerald-400 font-bold">{review.complianceScore}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Last Activity</span>
                  <span className="text-slate-300">{review.lastActivity}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-slate-400 text-xs font-bold block">Audit Scope</span>
                <div className="flex flex-wrap gap-2">
                  {review.scope.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 font-mono"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Statistics Grid */}
            <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-4">
              <h3 className="text-sm font-bold text-white border-b border-white/10 pb-3">
                Key Audit Statistics
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 text-center">
                <div className="p-3 rounded-xl bg-[#040e1a] border border-white/5 space-y-1">
                  <span className="text-lg font-bold text-white font-mono block">{review.expectedDocs}</span>
                  <span className="text-[10px] text-slate-400 block">Expected</span>
                </div>
                <div className="p-3 rounded-xl bg-[#040e1a] border border-white/5 space-y-1">
                  <span className="text-lg font-bold text-emerald-400 font-mono block">{review.verifiedDocs}</span>
                  <span className="text-[10px] text-slate-400 block">Verified</span>
                </div>
                <div className="p-3 rounded-xl bg-[#040e1a] border border-white/5 space-y-1">
                  <span className="text-lg font-bold text-[#00B8FF] font-mono block">{review.controlsTested}</span>
                  <span className="text-[10px] text-slate-400 block">Tested</span>
                </div>
                <div className="p-3 rounded-xl bg-[#040e1a] border border-white/5 space-y-1">
                  <span className="text-lg font-bold text-rose-400 font-mono block">{review.totalFindings}</span>
                  <span className="text-[10px] text-slate-400 block">Findings</span>
                </div>
                <div className="p-3 rounded-xl bg-[#040e1a] border border-white/5 space-y-1">
                  <span className="text-lg font-bold text-amber-400 font-mono block">{review.openFindings}</span>
                  <span className="text-[10px] text-slate-400 block">Open</span>
                </div>
                <div className="p-3 rounded-xl bg-[#040e1a] border border-white/5 space-y-1">
                  <span className="text-lg font-bold text-slate-300 font-mono block">{review.closedFindings}</span>
                  <span className="text-[10px] text-slate-400 block">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Actions & Recent Milestones */}
          <div className="space-y-5">
            {/* Quick Actions Panel */}
            <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-3">
              <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2.5">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={onOpenFindingModal}
                  className="w-full p-2.5 rounded-xl bg-[#00B8FF]/10 border border-[#00B8FF]/30 text-[#00B8FF] hover:bg-[#00B8FF]/20 text-xs font-bold transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span>Manage Findings</span>
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenReportModal}
                  className="w-full p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 text-xs font-bold transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Generate Interim Report</span>
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Recent Milestones Timeline */}
            <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-3">
              <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2.5 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#00B8FF]" />
                <span>Recent Milestones</span>
              </h3>
              <div className="space-y-2 text-xs">
                {review.milestones.map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-[#040e1a] border border-white/5 space-y-0.5">
                    <p className="text-slate-200 font-medium">{m.text}</p>
                    <span className="text-[10px] text-slate-500 font-mono">{m.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fallback view for other sub-tabs */}
      {activeTab !== 'overview' && (
        <div className="p-8 rounded-2xl bg-[#081525]/90 border border-white/10 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#00B8FF]/10 text-[#00B8FF] flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white capitalize">{activeTab} Details for {review.id}</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Viewing detailed {activeTab} data for {review.entity}. All evidence, controls, and risk factors are logged and verified under AUD-001 scope.
          </p>
        </div>
      )}
    </div>
  );
};

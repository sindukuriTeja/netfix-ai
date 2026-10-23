import React, { useState } from 'react';
import {
  ClipboardList,
  Filter,
  Download,
  Search,
  RotateCcw,
  Eye,
  ArrowRight,
  FileCheck2,
  AlertTriangle
} from 'lucide-react';

interface AuditorAssignedReviewsViewProps {
  onOpenReview: (reviewId: string) => void;
}

export const AuditorAssignedReviewsView: React.FC<AuditorAssignedReviewsViewProps> = ({ onOpenReview }) => {
  const [filterTab, setFilterTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const reviews = [
    {
      id: 'AUD-103',
      entity: 'MARG Tech Corp',
      type: 'Financial & Tax Audit',
      period: '01 Apr 2025 – 31 Mar 2026',
      assignedDate: '05 Sep 2025',
      dueDate: '30 Sep 2025',
      progress: 72,
      evidenceVerified: 24,
      evidenceTotal: 31,
      findings: { critical: 1, high: 2, medium: 2 },
      status: 'In Review',
      statusColor: 'bg-[#00B8FF]/20 text-[#00B8FF] border-[#00B8FF]/30',
      actionLabel: 'Open Review',
    },
    {
      id: 'AUD-101',
      entity: 'MARG Legal Division',
      type: 'Governance Compliance',
      period: '01 Jan 2025 – 31 Dec 2025',
      assignedDate: '12 Aug 2025',
      dueDate: '15 Oct 2025',
      progress: 65,
      evidenceVerified: 20,
      evidenceTotal: 30,
      findings: { critical: 0, high: 2, medium: 3 },
      status: 'Findings Issued',
      statusColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      actionLabel: 'Continue',
    },
    {
      id: 'AUD-095',
      entity: 'MARG Commercials',
      type: 'Regulatory Filings',
      period: '01 Jul 2025 – 31 Dec 2025',
      assignedDate: '10 Sep 2025',
      dueDate: '30 Nov 2025',
      progress: 20,
      evidenceVerified: 4,
      evidenceTotal: 21,
      findings: { critical: 0, high: 0, medium: 0 },
      status: 'Open',
      statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      actionLabel: 'Start Review',
    },
  ];

  const filteredReviews = reviews.filter((r) => {
    if (filterTab !== 'All' && r.status !== filterTab) return false;
    if (
      searchQuery &&
      !r.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !r.entity.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <ClipboardList className="w-6 h-6 text-[#00B8FF]" />
            <span>Assigned Audit Reviews</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage and track your assigned audit scopes and compliance reviews.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold hover:bg-white/10 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#00B8FF]" />
            <span>Filter</span>
          </button>
          <button className="px-3.5 py-2 rounded-xl bg-[#00B8FF]/10 border border-[#00B8FF]/30 text-[#00B8FF] text-xs font-semibold hover:bg-[#00B8FF]/20 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#081525] border border-white/10 text-xs font-medium text-slate-400">
          {['All', 'In Review', 'Open', 'Findings Issued'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                filterTab === tab
                  ? 'bg-[#00B8FF] text-black font-bold shadow-md'
                  : 'hover:text-white hover:bg-white/5'
              }`}
            >
              {tab} {tab === 'All' ? `(${reviews.length})` : ''}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-[#081525] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF]"
            />
          </div>
          <button
            onClick={() => {
              setFilterTab('All');
              setSearchQuery('');
            }}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Review Cards Stack (Matching Panel 2) */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="p-6 rounded-2xl bg-[#081525]/90 border border-white/10 hover:border-[#00B8FF]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            {/* Left Section: Info */}
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-extrabold text-[#00B8FF] px-2.5 py-1 rounded-lg bg-[#00B8FF]/10 border border-[#00B8FF]/20">
                  {review.id}
                </span>
                <h3 className="text-base font-extrabold text-white">{review.entity}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold font-mono border ${review.statusColor}`}
                >
                  {review.status}
                </span>
              </div>

              <div className="text-xs text-slate-300 font-semibold">{review.type}</div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono text-slate-400 pt-1">
                <div>
                  <span className="text-slate-500 block text-[10px]">Review Period</span>
                  <span className="text-slate-200">{review.period}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Assigned Date</span>
                  <span className="text-slate-200">{review.assignedDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Due Date</span>
                  <span className="text-amber-400 font-bold">{review.dueDate}</span>
                </div>
              </div>
            </div>

            {/* Middle Section: Progress Wheel & Stats */}
            <div className="flex items-center gap-6 border-y md:border-y-0 md:border-x border-white/10 py-4 md:py-0 md:px-6">
              {/* Circular Progress */}
              <div className="relative w-16 h-16 rounded-full border-4 border-[#00B8FF] border-t-transparent flex items-center justify-center bg-[#040e1a]">
                <span className="text-xs font-bold text-white font-mono">{review.progress}%</span>
              </div>

              {/* Evidence & Findings breakdown */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-[#00B8FF]" />
                  <span className="text-slate-300 font-mono">
                    Evidence: <strong className="text-white">{review.evidenceVerified}/{review.evidenceTotal}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span className="text-slate-300 font-mono">Findings: </span>
                  <div className="flex items-center gap-1 font-mono font-bold">
                    {review.findings.critical > 0 && (
                      <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 text-[10px]">
                        {review.findings.critical} Crit
                      </span>
                    )}
                    {review.findings.high > 0 && (
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px]">
                        {review.findings.high} High
                      </span>
                    )}
                    {review.findings.medium > 0 && (
                      <span className="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-400 text-[10px]">
                        {review.findings.medium} Med
                      </span>
                    )}
                    {review.findings.critical === 0 && review.findings.high === 0 && review.findings.medium === 0 && (
                      <span className="text-emerald-400 text-[10px]">0</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section: Actions */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onOpenReview(review.id)}
                className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Eye className="w-4 h-4 text-[#00B8FF]" />
                <span>View Details</span>
              </button>
              <button
                onClick={() => onOpenReview(review.id)}
                className="px-4 py-2 rounded-xl bg-[#00B8FF] text-black font-bold text-xs hover:bg-[#0096d6] transition-colors flex items-center gap-1.5 shadow-lg shadow-[#00B8FF]/20"
              >
                <span>{review.actionLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

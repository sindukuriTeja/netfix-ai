import React, { useState } from 'react';
import {
  Sparkles,
  AlertTriangle,
  Clock,
  FileText,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ShieldCheck,
  RefreshCw,
  Calendar
} from 'lucide-react';

interface CaseOverviewTabProps {
  caseData: {
    id: string;
    client: string;
    type: string;
    status: string;
    priority: string;
    dueDate: string;
    createdDate?: string;
    updatedDate?: string;
    summary?: string;
  };
  onSelectTab: (tabId: string) => void;
  onAskAi: (query: string) => void;
}

export const CaseOverviewTab: React.FC<CaseOverviewTabProps> = ({
  caseData,
  onSelectTab,
  onAskAi
}) => {
  const [summary, setSummary] = useState<string>(
    caseData.summary ||
      `${caseData.client} has received a GST demand notice for Q3 FY2025 regarding input tax credit mismatch. The case involves review of invoices, reconciliation with Tally data and preparation of response.`
  );
  const [isRegenerating, setIsRegenerating] = useState<boolean>(false);

  const handleRegenerateSummary = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setSummary(
        `AI Summary Updated: ${caseData.client} is undergoing ${caseData.type} (Priority: ${caseData.priority}). Pending tasks include invoice verification against GSTR-2B, drafting legal response to the demand notice, and verifying precedent citations.`
      );
      setIsRegenerating(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#00B8FF]" />
            <h3 className="text-base font-bold text-white">Case Summary</h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30">
              AI-generated summary (editable)
            </span>
          </div>
          <button
            onClick={handleRegenerateSummary}
            disabled={isRegenerating}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 border border-white/10 flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin text-[#00B8FF]' : ''}`} />
            <span>Regenerate</span>
          </button>
        </div>

        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={3}
          className="w-full p-3.5 rounded-xl bg-[#041828] border border-white/10 text-sm text-slate-200 focus:outline-none focus:border-[#00B8FF] transition-all resize-none font-sans"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#081525] border border-white/10 flex items-start justify-between cursor-pointer hover:border-[#00B8FF]/40 transition-all" onClick={() => onSelectTab('Deadlines')}>
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Upcoming Deadline</span>
            <div className="text-base font-bold text-rose-400 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-rose-400" />
              <span>{caseData.dueDate || '28 Sep 2026'}</span>
            </div>
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              3 days remaining
            </span>
          </div>
          <Clock className="w-5 h-5 text-rose-400" />
        </div>

        <div className="p-5 rounded-2xl bg-[#081525] border border-white/10 flex items-start justify-between cursor-pointer hover:border-[#00B8FF]/40 transition-all" onClick={() => onSelectTab('Risk')}>
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Risk Level</span>
            <div className="text-base font-bold text-rose-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>High Risk (78/100)</span>
            </div>
            <span className="text-[11px] text-slate-400 block">Requires employee review</span>
          </div>
          <ShieldCheck className="w-5 h-5 text-rose-400" />
        </div>

        <div className="p-5 rounded-2xl bg-[#081525] border border-white/10 flex items-start justify-between cursor-pointer hover:border-[#00B8FF]/40 transition-all" onClick={() => onSelectTab('Documents')}>
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Documents</span>
            <div className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#00B8FF]" />
              <span>12 Documents</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 inline-block">
              3 pending review
            </span>
          </div>
          <FileText className="w-5 h-5 text-[#00B8FF]" />
        </div>

        <div className="p-5 rounded-2xl bg-[#081525] border border-white/10 flex items-start justify-between cursor-pointer hover:border-[#00B8FF]/40 transition-all" onClick={() => onSelectTab('Contradictions')}>
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Contradictions</span>
            <div className="text-base font-bold text-amber-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>2 Detected</span>
            </div>
            <span className="text-[11px] text-slate-400 block">Date & amount discrepancies</span>
          </div>
          <AlertCircle className="w-5 h-5 text-amber-400" />
        </div>

        <div className="p-5 rounded-2xl bg-[#081525] border border-white/10 flex items-start justify-between cursor-pointer hover:border-[#00B8FF]/40 transition-all" onClick={() => onSelectTab('AI Analysis')}>
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">AI Analyses</span>
            <div className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>4 Completed</span>
            </div>
            <span className="text-[11px] text-slate-400 block">Ultron verified</span>
          </div>
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        </div>

        <div className="p-5 rounded-2xl bg-[#081525] border border-white/10 flex items-start justify-between cursor-pointer hover:border-[#00B8FF]/40 transition-all" onClick={() => onSelectTab('Drafts')}>
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Drafts</span>
            <div className="text-base font-bold text-purple-400 flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" />
              <span>1 Draft</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 inline-block">
              1 awaiting review
            </span>
          </div>
          <FileText className="w-5 h-5 text-purple-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-[#081525] border border-white/10 space-y-3 text-xs">
          <h4 className="font-bold text-white text-sm border-b border-white/10 pb-2">Case Metadata</h4>
          <div className="grid grid-cols-2 gap-3 text-slate-300">
            <div>
              <span className="text-slate-500 block">Client</span>
              <span className="font-bold text-white">{caseData.client}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Assigned Employee</span>
              <span className="font-bold text-[#00B8FF]">Amit Sharma</span>
            </div>
            <div>
              <span className="text-slate-500 block">Created Date</span>
              <span className="font-mono text-slate-300">{caseData.createdDate || '12 Sep 2026'}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Last Updated</span>
              <span className="font-mono text-slate-300">{caseData.updatedDate || '24 Sep 2026'}</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#081525] border border-white/10 space-y-3">
          <h4 className="font-bold text-white text-sm flex items-center gap-2 border-b border-white/10 pb-2">
            <Sparkles className="w-4 h-4 text-[#00B8FF]" />
            <span>Ask AI About This Case</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onAskAi(`Summarize case ${caseData.id} for ${caseData.client}`)}
              className="px-3 py-2 rounded-xl bg-[#00B8FF]/10 hover:bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Summarize this case</span>
            </button>
            <button
              onClick={() => onAskAi(`What needs attention for case ${caseData.id}?`)}
              className="px-3 py-2 rounded-xl bg-[#00B8FF]/10 hover:bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>What needs attention?</span>
            </button>
            <button
              onClick={() => onAskAi(`What documents are missing for ${caseData.id}?`)}
              className="px-3 py-2 rounded-xl bg-[#00B8FF]/10 hover:bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Show missing documents</span>
            </button>
            <button
              onClick={() => onAskAi(`What contradictions were detected in ${caseData.id}?`)}
              className="px-3 py-2 rounded-xl bg-[#00B8FF]/10 hover:bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Show contradictions</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

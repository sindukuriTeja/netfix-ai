import React, { useState } from 'react';
import {
  ArrowLeft,
  Briefcase,
  Maximize2,
  Sparkles,
  Send,
  FileText,
  CheckSquare,
  MessageSquare,
  Calendar,
  Activity,
  Download,
  Eye,
  Clock
} from 'lucide-react';

interface ClientMatterDetailViewProps {
  matterId: string;
  onBack: () => void;
  onAskAi?: (prompt?: string) => void;
}

export const ClientMatterDetailView: React.FC<ClientMatterDetailViewProps> = ({
  matterId,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'documents' | 'approvals' | 'messages' | 'deadlines' | 'activity'>('overview');
  const [aiChatQuery, setAiChatQuery] = useState('');
  const [aiChatLog, setAiChatLog] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    {
      role: 'assistant',
      text: `Context locked to ${matterId} (Corporate Structuring & Tax Advisory). Key upcoming action is reviewing the draft submission due on 28 Sep 2026.`
    }
  ]);

  const handleSendAi = (textToSend?: string) => {
    const prompt = textToSend || aiChatQuery;
    if (!prompt.trim()) return;

    setAiChatLog((prev) => [
      ...prev,
      { role: 'user', text: prompt },
      {
        role: 'assistant',
        text: `Analysis for ${matterId}: "${prompt}". The legal team has uploaded Contract_Agreement_2025.pdf (v2.0) and requires client signoff prior to final submission.`
      }
    ]);
    setAiChatQuery('');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Breadcrumb & Navigation Back */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#00B8FF] transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>My Matters</span>
          <span className="text-slate-600">/</span>
          <span className="text-[#00B8FF] font-mono">{matterId}</span>
        </button>

        <button
          onClick={() => alert(`Full Screen Workspace for ${matterId} active.`)}
          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold flex items-center gap-1.5 border border-white/10 cursor-pointer"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Open in Full Screen</span>
        </button>
      </div>

      {/* Main Title Banner & Metadata (Ref Panel 3) */}
      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-extrabold text-[#00B8FF] bg-[#00B8FF]/10 px-3 py-1 rounded-lg border border-[#00B8FF]/20">
              {matterId}
            </span>
            <h1 className="text-xl font-extrabold text-white">Corporate Structuring & Tax Advisory</h1>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              In Progress
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono border-t border-white/5 pt-3">
          <div>Client: <span className="text-white font-bold">Vikram Reddy</span></div>
          <div>•</div>
          <div>Type: <span className="text-slate-200 font-bold">Tax Advisory</span></div>
          <div>•</div>
          <div>Assigned: <span className="text-[#00B8FF] font-bold">MARG Legal Team</span></div>
        </div>
      </div>

      {/* 7 Workspace Sub-Tabs (Ref Panel 3) */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-white/10 pb-2">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'timeline', label: 'Status Timeline' },
          { id: 'documents', label: 'Documents (4)' },
          { id: 'approvals', label: 'Approvals (1)' },
          { id: 'messages', label: 'Messages (3)' },
          { id: 'deadlines', label: 'Deadlines (2)' },
          { id: 'activity', label: 'Activity' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-[#00B8FF] text-slate-950 shadow-md shadow-sky-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content Areas */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Box: Matter Information (Ref Panel 3) */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Briefcase className="w-4 h-4 text-[#00B8FF]" />
              <span>Matter Information</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Description</span>
                <p className="text-slate-200 font-medium leading-relaxed">
                  Advisory on corporate restructuring and tax implications for FY 2026.
                </p>
              </div>

              <div>
                <span className="text-slate-400 block mb-0.5">Objective</span>
                <p className="text-slate-200 font-medium">
                  Structure business for tax efficiency and compliance.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                <div>
                  <span className="text-slate-400 block mb-0.5">Assigned Team</span>
                  <span className="text-white font-bold">Amit Sharma, Priya Mehta</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Created Date</span>
                  <span className="font-mono text-slate-200">01 Aug 2026</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Last Updated</span>
                  <span className="font-mono text-slate-200">25 Sep 2026</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Current Stage</span>
                  <span className="text-[#00B8FF] font-bold">Document Preview</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#041828] border border-[#00B8FF]/20 space-y-1">
                <span className="text-slate-400 block font-semibold text-[11px]">Next Action</span>
                <p className="text-amber-300 font-bold">Review and approve draft submission</p>
                <span className="text-[10px] text-rose-400 font-mono block">
                  Next Deadline: 28 Sep 2026 (2 days)
                </span>
              </div>
            </div>
          </div>

          {/* Right Box: AI Matter Assistant (Ref Panel 3) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#00B8FF]" />
                  <span>AI Matter Assistant</span>
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00B8FF]/10 text-[#00B8FF]">
                  Context: {matterId} Only
                </span>
              </div>

              {/* Preset Prompts */}
              <div className="mt-3 space-y-2">
                {[
                  'Summarize this matter',
                  'What are the key risks?',
                  'What documents are pending?',
                  'What is the next hearing date?'
                ].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSendAi(prompt)}
                    className="w-full text-left p-2.5 rounded-xl bg-[#041828] hover:bg-[#00B8FF]/10 text-slate-300 hover:text-white border border-white/5 hover:border-[#00B8FF]/30 text-xs font-medium transition-all cursor-pointer flex items-center justify-between"
                  >
                    <span>{prompt}</span>
                    <ChevronRightIcon className="w-3.5 h-3.5 text-[#00B8FF]" />
                  </button>
                ))}
              </div>

              {/* Chat Log */}
              <div className="mt-4 p-3 rounded-xl bg-[#041828] max-h-40 overflow-y-auto space-y-2 text-xs">
                {aiChatLog.map((msg, i) => (
                  <div key={i} className={`p-2.5 rounded-lg ${msg.role === 'user' ? 'bg-[#00B8FF]/20 text-white text-right' : 'bg-white/5 text-slate-200'}`}>
                    {msg.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <div className="relative mt-4">
              <input
                type="text"
                placeholder="Ask anything about this matter..."
                value={aiChatQuery}
                onChange={(e) => setAiChatQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendAi()}
                className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-[#041828] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00B8FF]"
              />
              <button
                onClick={() => handleSendAi()}
                className="absolute right-2 top-2 p-1.5 rounded-lg bg-[#00B8FF] text-slate-950 hover:bg-[#0098D4] cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Timeline Tab */}
      {activeTab === 'timeline' && (
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
            <Activity className="w-4 h-4 text-[#00B8FF]" />
            <span>Matter Progress Timeline</span>
          </h3>

          <div className="space-y-4 max-w-xl mx-auto pt-2">
            {[
              { stage: 'Matter Created', status: 'Completed', date: '01 Aug 2026' },
              { stage: 'Documents Requested', status: 'Completed', date: '05 Aug 2026' },
              { stage: 'Initial Review', status: 'Completed', date: '15 Aug 2026' },
              { stage: 'Legal Review', status: 'Completed', date: '01 Sep 2026' },
              { stage: 'Client Approval', status: 'Current Stage', date: '25 Sep 2026' },
              { stage: 'Filing', status: 'Pending', date: 'Upcoming' },
              { stage: 'Completion', status: 'Pending', date: 'Upcoming' },
            ].map((item, idx) => (
              <div key={item.stage} className="flex items-center gap-4">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                  item.status === 'Completed' ? 'bg-emerald-500 text-slate-950' : item.status === 'Current Stage' ? 'bg-[#00B8FF] text-slate-950 animate-pulse' : 'bg-slate-700 text-slate-400'
                }`}>
                  {idx + 1}
                </div>
                <div className="flex-1 p-3 rounded-xl bg-[#041828] border border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-white">{item.stage}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    item.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-300' : item.status === 'Current Stage' ? 'bg-[#00B8FF]/20 text-[#00B8FF]' : 'bg-slate-500/20 text-slate-400'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
            <FileText className="w-4 h-4 text-[#00B8FF]" />
            <span>Matter Documents ({matterId})</span>
          </h3>

          <div className="space-y-2">
            {['Contract_Agreement_2025.pdf', 'Compliance_Audit_Dossier.pdf', 'Tax_Advisory_Note.docx', 'Financial_Statement_FY26.pdf'].map((doc) => (
              <div key={doc} className="p-3.5 rounded-xl bg-[#041828] border border-white/5 flex items-center justify-between text-xs hover:border-[#00B8FF]/30 transition-all">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-[#00B8FF]" />
                  <span className="font-bold text-white">{doc}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-[#00B8FF] hover:bg-[#0098D4] text-white font-bold text-xs flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approvals Tab */}
      {activeTab === 'approvals' && (
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
            <CheckSquare className="w-4 h-4 text-amber-400" />
            <span>Action Required: Approvals for {matterId}</span>
          </h3>

          <div className="p-4 rounded-xl bg-[#041828] border border-amber-500/30 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">Settlement Draft v2</span>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">Awaiting Approval</span>
            </div>
            <p className="text-slate-300">Legal team submitted revised settlement draft for client signoff.</p>
            <div className="flex gap-2 pt-2">
              <button className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs">Approve</button>
              <button className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs">Request Changes</button>
              <button className="px-4 py-2 rounded-xl bg-rose-500 text-white font-bold text-xs">Reject</button>
            </div>
          </div>
        </div>
      )}

      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
            <MessageSquare className="w-4 h-4 text-[#00B8FF]" />
            <span>Matter Conversation</span>
          </h3>

          <div className="p-4 rounded-xl bg-[#041828] space-y-3">
            <div className="p-3 rounded-lg bg-white/5 text-slate-200">
              <span className="font-bold text-[#00B8FF] block mb-1">Legal Counsel (Amit Sharma)</span>
              <span>Please review the settlement agreement terms attached in the documents section.</span>
            </div>
          </div>
        </div>
      )}

      {/* Deadlines Tab */}
      {activeTab === 'deadlines' && (
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
            <Calendar className="w-4 h-4 text-rose-400" />
            <span>Deadlines & Milestones</span>
          </h3>
          <div className="p-4 rounded-xl bg-[#041828] flex justify-between items-center">
            <div>
              <h4 className="font-bold text-white">Written Submission Filing</h4>
              <span className="text-slate-400 font-mono">Due: 28 Sep 2026</span>
            </div>
            <span className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 font-bold">High Priority</span>
          </div>
        </div>
      )}

      {/* Activity Tab */}
      {activeTab === 'activity' && (
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
            <Clock className="w-4 h-4 text-purple-400" />
            <span>Activity Log for {matterId}</span>
          </h3>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-[#041828] text-slate-300 flex justify-between">
              <span>Client approval requested for Settlement Draft v2</span>
              <span className="font-mono text-slate-500">2 hours ago</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" />
  </svg>
);

export default ClientMatterDetailView;

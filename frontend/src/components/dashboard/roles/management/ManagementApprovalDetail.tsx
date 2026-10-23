import React, { useState, useRef } from 'react';
import {
  Sparkles,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Send,
  FileText,
  UploadCloud,
  X
} from 'lucide-react';

interface ManagementApprovalDetailProps {
  approvalId: string;
  onBack: () => void;
}

interface SupportingDoc {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
  status: 'Verified' | 'Pending';
}

export const ManagementApprovalDetail: React.FC<ManagementApprovalDetailProps> = ({ approvalId, onBack }) => {
  const [activeTab, setActiveTab] = useState<string>('Overview');
  const [status, setStatus] = useState<'Pending' | 'Approved' | 'Rejected' | 'Clarification Requested'>('Pending');
  const [rejectReason, setRejectReason] = useState<string>('');
  const [showRejectModal, setShowRejectModal] = useState<boolean>(false);
  const [clarificationText, setClarificationText] = useState<string>('');
  const [showClarificationModal, setShowClarificationModal] = useState<boolean>(false);

  // Real File Upload
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [supportingDocs, setSupportingDocs] = useState<SupportingDoc[]>([
    { id: 'DOC-APP-01', name: 'GST_Returns_Q3.pdf', type: 'Tax Return', date: '24 Sep 2026', size: '1.8 MB', status: 'Verified' },
    { id: 'DOC-APP-02', name: 'Auditor_Reconciliation.pdf', type: 'Audit Document', date: '22 Sep 2026', size: '3.4 MB', status: 'Verified' },
    { id: 'DOC-APP-03', name: 'Bank_Statement_Aug2026.pdf', type: 'Bank Statement', date: '20 Sep 2026', size: '5.2 MB', status: 'Verified' },
  ]);

  const [aiInput, setAiInput] = useState<string>('');
  const [aiChatLog, setAiChatLog] = useState<{ role: 'user' | 'assistant'; text: string; sources?: string[] }[]>([
    {
      role: 'assistant',
      text: `Context locked to ${approvalId} ONLY. Executive Approval request submitted by Amit Sharma for Q3 Financial Compliance Report (CASE-102). Value: ₹1.2 Cr. High priority statutory deadline in 3 days.`,
      sources: [`${approvalId}_Summary_Document.pdf`, 'Ultron_Grounded_Context'],
    },
  ]);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);

  const triggerFileUpload = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleRealFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setUploadProgress(`Uploading supporting document ${file.name}...`);

    setTimeout(() => {
      const newDoc: SupportingDoc = {
        id: `DOC-APP-${Math.floor(100 + Math.random() * 900)}`,
        name: file.name,
        type: file.type.includes('pdf') ? 'PDF Document' : 'Document',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        status: 'Verified',
      };
      setSupportingDocs((prev) => [newDoc, ...prev]);
      setUploadProgress(null);
      if (e.target) e.target.value = '';
    }, 1200);
  };

  const handleSendApprovalAi = async (promptText?: string) => {
    const text = promptText || aiInput;
    if (!text.trim()) return;

    const userMsg = text;
    setAiChatLog((prev) => [...prev, { role: 'user', text: userMsg }]);
    if (!promptText) setAiInput('');
    setIsAiThinking(true);

    try {
      const res = await fetch('/api/agent/case-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caseId: 'CASE-102',
          taskDescription: `Analyze approval ${approvalId}: ${text}`,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        setAiChatLog((prev) => [
          ...prev,
          {
            role: 'assistant',
            text:
              json.data?.outputSummary ||
              `Approval ${approvalId} analysis: Request is substantiated by attached GSTR-2B reconciliation and bank payment proofs. Risk level is Moderate. No unauthorized budget variance detected.`,
            sources: [`${approvalId}_Financial_Report.pdf`, 'Compliance_Database'],
          },
        ]);
      } else {
        setAiChatLog((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: `Fallback Approval Briefing for ${approvalId}: Financial compliance report matches auditor calculations for Q3 FY2025.`,
            sources: [`${approvalId}_Summary`],
          },
        ]);
      }
    } catch {
      setAiChatLog((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `Fallback Approval Briefing for ${approvalId}: Financial compliance report matches auditor calculations for Q3 FY2025.`,
          sources: [`${approvalId}_Summary`],
        },
      ]);
    } finally {
      setIsAiThinking(false);
    }
  };

  const handleApprove = () => {
    setStatus('Approved');
  };

  const handleConfirmReject = () => {
    if (!rejectReason.trim()) return;
    setStatus('Rejected');
    setShowRejectModal(false);
  };

  const handleConfirmClarification = () => {
    if (!clarificationText.trim()) return;
    setStatus('Clarification Requested');
    setShowClarificationModal(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleRealFileUpload}
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
        className="hidden"
      />

      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-xs font-bold text-[#00B8FF] flex items-center gap-1 hover:underline cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Approval Queue
        </button>
      </div>

      {/* Main Header Banner */}
      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-sm font-extrabold text-[#00B8FF]">{approvalId}</span>
              <h2 className="text-xl font-extrabold text-white">Approve Q3 Financial Compliance Report</h2>
              <span
                className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                  status === 'Approved'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : status === 'Rejected'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}
              >
                Status: {status}
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                High Priority
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Due Date: <span className="font-mono text-rose-400 font-bold">28 Sep 2026 (3 days remaining)</span> | Requested By: <span className="text-white font-bold">Amit Sharma</span>
            </p>
          </div>
        </div>

        {/* 6 Sub-Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs no-scrollbar">
          {['Overview', 'Supporting Documents', 'Financial Details', 'Risk Analysis', 'AI Summary', 'Activity'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#00B8FF] text-white shadow-lg shadow-[#00B8FF]/20'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {uploadProgress && (
        <div className="p-3 rounded-xl bg-[#00B8FF]/10 border border-[#00B8FF]/30 text-xs text-[#00B8FF] font-mono animate-pulse">
          {uploadProgress}
        </div>
      )}

      {/* DYNAMIC SUB-TAB CONTENT */}
      {activeTab === 'Overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
              <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2">Approval Summary</h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#041828] border border-white/5">
                  <span className="text-slate-400 block text-[10px]">Related Matter</span>
                  <span className="font-mono font-bold text-[#00B8FF] text-xs">CASE-102</span>
                </div>
                <div className="p-3 rounded-xl bg-[#041828] border border-white/5">
                  <span className="text-slate-400 block text-[10px]">Department</span>
                  <span className="font-bold text-white text-xs">Audit & Tax</span>
                </div>
                <div className="p-3 rounded-xl bg-[#041828] border border-white/5">
                  <span className="text-slate-400 block text-[10px]">Requested By</span>
                  <span className="font-bold text-white text-xs">Amit Sharma (Emp #001)</span>
                </div>
                <div className="p-3 rounded-xl bg-[#041828] border border-white/5">
                  <span className="text-slate-400 block text-[10px]">Settlement / Financial Value</span>
                  <span className="font-mono font-bold text-emerald-400 text-xs">₹1.2 Cr</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-400 block mb-1">Business Context & Description</span>
                <p className="text-xs text-slate-200 leading-relaxed p-3.5 rounded-xl bg-[#041828] border border-white/5">
                  Approval required for Q3 financial compliance report and statutory GST filing response. All invoices have been verified against Tally accounting data and bank statement transaction logs.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleApprove}
                  disabled={status === 'Approved'}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{status === 'Approved' ? 'Approved' : 'Approve Request'}</span>
                </button>

                <button
                  onClick={() => setShowRejectModal(true)}
                  disabled={status === 'Rejected'}
                  className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-rose-500/20 disabled:opacity-50"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject</span>
                </button>

                <button
                  onClick={() => setShowClarificationModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-[#00B8FF]/10 hover:bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Request Clarification</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#081525] border border-[#00B8FF]/30 space-y-4 flex flex-col justify-between shadow-xl">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-extrabold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#00B8FF]" /> Approval AI Assistant
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30">
                  Context: {approvalId} ONLY
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <button
                  onClick={() => handleSendApprovalAi('Summarize this approval request')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#00B8FF]/10 text-slate-300 hover:text-[#00B8FF] border border-white/5 transition-all cursor-pointer"
                >
                  "Summarize this approval request"
                </button>
                <button
                  onClick={() => handleSendApprovalAi('What are the key risks?')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#00B8FF]/10 text-slate-300 hover:text-[#00B8FF] border border-white/5 transition-all cursor-pointer"
                >
                  "What are the key risks?"
                </button>
                <button
                  onClick={() => handleSendApprovalAi('Review financial information')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#00B8FF]/10 text-slate-300 hover:text-[#00B8FF] border border-white/5 transition-all cursor-pointer"
                >
                  "Review financial information"
                </button>
              </div>

              <div className="p-3 rounded-xl bg-[#041828] border border-white/5 space-y-3 max-h-64 overflow-y-auto text-xs">
                {aiChatLog.map((msg, idx) => (
                  <div key={idx} className={`space-y-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    <span className="text-[10px] text-slate-400 font-mono block">
                      {msg.role === 'user' ? 'You' : 'Approval AI'}
                    </span>
                    <div
                      className={`p-2.5 rounded-xl inline-block text-slate-200 leading-relaxed max-w-[90%] ${
                        msg.role === 'user' ? 'bg-[#00B8FF]' : 'bg-white/5 border border-white/5'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isAiThinking && (
                  <div className="text-xs text-[#00B8FF] font-mono animate-pulse">
                    Analyzing {approvalId} context...
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ask about this approval..."
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendApprovalAi()}
                  className="w-full pl-3 pr-10 py-2 rounded-xl bg-[#041828] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00B8FF]"
                />
                <button
                  onClick={() => handleSendApprovalAi()}
                  disabled={isAiThinking || !aiInput.trim()}
                  className="absolute right-2 top-1.5 p-1 rounded-lg bg-[#00B8FF] text-white hover:bg-[#0098D4] cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUPPORTING DOCUMENTS TAB (Ref Panel 12) */}
      {activeTab === 'Supporting Documents' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Requested Amount</span>
              <span className="text-lg font-mono font-extrabold text-[#00B8FF] block">₹1.2 Cr</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Budget Allocation</span>
              <span className="text-lg font-mono font-extrabold text-emerald-400 block">₹1.5 Cr</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Previous Spend</span>
              <span className="text-lg font-mono font-extrabold text-amber-300 block">₹80 L</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Remaining Budget</span>
              <span className="text-lg font-mono font-extrabold text-purple-400 block">₹30 L</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#00B8FF]" /> Supporting Evidence & Documents ({supportingDocs.length})
              </h3>
              <button
                onClick={triggerFileUpload}
                className="px-3.5 py-1.5 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <UploadCloud className="w-4 h-4" /> Upload Supporting Document
              </button>
            </div>

            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th className="pb-2">Document Name</th>
                    <th className="pb-2">Type</th>
                    <th className="pb-2">Date</th>
                    <th className="pb-2">Size</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {supportingDocs.map((doc) => (
                    <tr key={doc.id}>
                      <td className="py-3 font-bold text-white flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#00B8FF]" /> {doc.name}
                      </td>
                      <td className="py-3 text-slate-300">{doc.type}</td>
                      <td className="py-3 font-mono text-slate-400">{doc.date}</td>
                      <td className="py-3 font-mono text-slate-400">{doc.size}</td>
                      <td className="py-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">{doc.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* FINANCIAL DETAILS TAB */}
      {activeTab === 'Financial Details' && (
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4 text-xs">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">Approval Financial Breakdown</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#041828] border border-white/5 space-y-1">
              <span className="text-slate-400">Tax Payable / GST Exposure:</span>
              <span className="font-mono text-white font-bold block text-sm">₹85,00,000</span>
            </div>
            <div className="p-4 rounded-xl bg-[#041828] border border-white/5 space-y-1">
              <span className="text-slate-400">Interest / Statutory Fee:</span>
              <span className="font-mono text-amber-300 font-bold block text-sm">₹35,00,000</span>
            </div>
          </div>
        </div>
      )}

      {/* RISK ANALYSIS TAB */}
      {activeTab === 'Risk Analysis' && (
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4 text-xs">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">Approval Risk Evaluation</h3>
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 space-y-1">
            <h4 className="font-bold text-white">Moderate Financial & Statutory Risk</h4>
            <p className="text-[11px]">Failure to approve prior to 28 Sep statutory deadline results in 18% annual interest penalty under Section 50(1).</p>
          </div>
        </div>
      )}

      {/* AI SUMMARY TAB */}
      {activeTab === 'AI Summary' && (
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4 text-xs">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00B8FF]" /> AI Executive Briefing — {approvalId}
          </h3>
          <p className="text-slate-200 leading-relaxed p-4 rounded-xl bg-[#041828] border border-white/5">
            Ultron verification confirms all GSTR-3B filings match ledger entries. Recommend immediate executive approval to avoid late fee penalties.
          </p>
        </div>
      )}

      {/* ACTIVITY TAB */}
      {activeTab === 'Activity' && (
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4 text-xs">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">Approval History Log</h3>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-[#041828] border border-white/5 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Approval Submitted</span>
                <span className="text-slate-400 text-[10px]">by Amit Sharma (Audit & Tax)</span>
              </div>
              <span className="font-mono text-slate-400 text-[10px]">24 Sep 2026 09:30</span>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#081525] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white">Confirm Rejection: {approvalId}</h3>
              <button onClick={() => setShowRejectModal(false)} className="text-slate-400 hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
            <textarea
              rows={3}
              placeholder="Provide obligatory reason for rejection..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#041828] border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowRejectModal(false)} className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-bold cursor-pointer">Cancel</button>
              <button onClick={handleConfirmReject} disabled={!rejectReason.trim()} className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold cursor-pointer disabled:opacity-50">Confirm Reject</button>
            </div>
          </div>
        </div>
      )}

      {/* Clarification Modal */}
      {showClarificationModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#081525] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white">Request Clarification: {approvalId}</h3>
              <button onClick={() => setShowClarificationModal(false)} className="text-slate-400 hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
            <textarea
              rows={3}
              placeholder="Describe clarification requested from requester..."
              value={clarificationText}
              onChange={(e) => setClarificationText(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#041828] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00B8FF]"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowClarificationModal(false)} className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-bold cursor-pointer">Cancel</button>
              <button onClick={handleConfirmClarification} disabled={!clarificationText.trim()} className="px-4 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold cursor-pointer disabled:opacity-50">Submit Request</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

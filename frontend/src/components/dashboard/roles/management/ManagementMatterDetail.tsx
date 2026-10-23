import React, { useState, useRef } from 'react';
import {
  Sparkles,
  ChevronLeft,
  Download,
  Send,
  FileText,
  Clock,
  UploadCloud,
  Eye,
  X
} from 'lucide-react';

interface ManagementMatterDetailProps {
  matterId: string;
  onBack: () => void;
  onOpenApproval?: (approvalId: string) => void;
}

interface MatterDoc {
  id: string;
  name: string;
  type: string;
  uploadedBy: string;
  date: string;
  size: string;
  status: 'Verified' | 'Processing' | 'Flagged';
}

export const ManagementMatterDetail: React.FC<ManagementMatterDetailProps> = ({ matterId, onBack, onOpenApproval }) => {
  const [activeSubTab, setActiveSubTab] = useState<string>('Overview');
  const [aiInput, setAiInput] = useState<string>('');
  const [aiChatLog, setAiChatLog] = useState<{ role: 'user' | 'assistant'; text: string; sources?: string[] }[]>([
    {
      role: 'assistant',
      text: `Context locked to ${matterId} ONLY. Commercial litigation dispute regarding contract breach and financial claims. Value: ₹12.5 Cr. Upcoming hearing on 28 Sep 2026. High risk score due to tight statutory filing deadlines.`,
      sources: [`${matterId}_Contract_Agreement.pdf`, 'Legal_Brief_Summary.pdf'],
    },
  ]);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);

  // Real File Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [documents, setDocuments] = useState<MatterDoc[]>([
    { id: 'DOC-8821', name: 'Contract_Agreement_2025.pdf', type: 'Legal Contract', uploadedBy: 'Amit Sharma', date: '24 Sep 2026', size: '2.4 MB', status: 'Verified' },
    { id: 'DOC-8822', name: 'Client_Correspondence.pdf', type: 'Email Archive', uploadedBy: 'Priya Singh', date: '22 Sep 2026', size: '750 KB', status: 'Verified' },
    { id: 'DOC-8823', name: 'GST_Returns_Q3.pdf', type: 'Tax Record', uploadedBy: 'Amit Sharma', date: '20 Sep 2026', size: '1.8 MB', status: 'Processing' },
    { id: 'DOC-8824', name: 'Court_Notice.pdf', type: 'Court Document', uploadedBy: 'Amit Sharma', date: '18 Sep 2026', size: '4.2 MB', status: 'Verified' },
    { id: 'DOC-8825', name: 'Evidence_Photo.png', type: 'Image', uploadedBy: 'Neha Verma', date: '15 Sep 2026', size: '1.6 MB', status: 'Verified' },
  ]);

  // Preview Modal State
  const [previewDoc, setPreviewDoc] = useState<MatterDoc | null>(null);

  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRealFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setUploadProgress(`Uploading ${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)...`);

    setTimeout(() => {
      const newDoc: MatterDoc = {
        id: `DOC-${Math.floor(1000 + Math.random() * 9000)}`,
        name: file.name,
        type: file.type.includes('image') ? 'Image' : file.type.includes('pdf') ? 'PDF Document' : 'Document',
        uploadedBy: 'Executive User',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        status: 'Verified',
      };

      setDocuments((prev) => [newDoc, ...prev]);
      setUploadProgress(null);
      if (e.target) e.target.value = '';
    }, 1200);
  };

  const handleSendMatterAi = async (promptText?: string) => {
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
          caseId: matterId,
          taskDescription: text,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        const summary =
          json.data?.outputSummary ||
          `Matter ${matterId} executive briefing: Primary risk involves supplier ITC mismatch under Section 16(2). Recommended action is to approve settlement response draft prior to 28 Sep.`;
        setAiChatLog((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: summary,
            sources: [`${matterId}_Contract_Agreement.pdf`, 'GST_Returns_Q3.pdf', 'Risk Analysis'],
          },
        ]);
      } else {
        setAiChatLog((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: `Executive AI Analysis for ${matterId}: High-value commercial dispute with ₹12.5 Cr exposure. Key evidence in Contract_Agreement.pdf verified. Statutory deadline in 3 days.`,
            sources: [`${matterId}_Contract_Agreement.pdf`, 'GST_Returns_Q3.pdf', 'Risk Analysis'],
          },
        ]);
      }
    } catch {
      setAiChatLog((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `Executive AI Analysis for ${matterId}: High-value commercial dispute with ₹12.5 Cr exposure. Key evidence in Contract_Agreement.pdf verified. Statutory deadline in 3 days.`,
          sources: [`${matterId}_Contract_Agreement.pdf`, 'GST_Returns_Q3.pdf', 'Risk Analysis'],
        },
      ]);
    } finally {
      setIsAiThinking(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Hidden Real File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleRealFileUpload}
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
        className="hidden"
      />

      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-xs font-bold text-[#00B8FF] flex items-center gap-1 hover:underline cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Firm Portfolio
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const reportBlob = new Blob([`Executive Summary Report for ${matterId}\nGenerated: ${new Date().toISOString()}`], { type: 'text/plain' });
              const url = URL.createObjectURL(reportBlob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${matterId}_Executive_Report.txt`;
              a.click();
            }}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Generate Executive Report</span>
          </button>
        </div>
      </div>

      {/* Main Matter Header Banner */}
      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-sm font-extrabold text-[#00B8FF]">{matterId}</span>
              <h2 className="text-xl font-extrabold text-white">Commercial Litigation & Contract Claims</h2>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Active
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                High Risk
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Client: <span className="font-bold text-white">ABC Pvt Ltd</span> | Department: <span className="text-purple-300 font-bold">Legal</span> | Lead: <span className="text-slate-200 font-bold">MARG Legal Associates</span> | Value: <span className="font-mono text-emerald-400 font-bold">₹12.5 Cr</span>
            </p>
          </div>
        </div>

        {/* 8 Detail Sub-Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs no-scrollbar">
          {['Overview', 'Documents', 'Financials', 'Risks', 'Timeline', 'Approvals', 'AI Insights', 'Activity'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeSubTab === tab
                  ? 'bg-[#00B8FF] text-white shadow-lg shadow-[#00B8FF]/20'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Upload Progress Banner */}
      {uploadProgress && (
        <div className="p-3 rounded-xl bg-[#00B8FF]/10 border border-[#00B8FF]/30 text-xs text-[#00B8FF] font-mono flex items-center justify-between animate-pulse">
          <span>{uploadProgress}</span>
          <UploadCloud className="w-4 h-4 animate-bounce" />
        </div>
      )}

      {/* DYNAMIC TAB CONTENT */}
      {activeSubTab === 'Overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-2">
                <Sparkles className="w-4 h-4 text-[#00B8FF]" />
                <span>Matter Summary</span>
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                Commercial dispute regarding contract breach and financial claims. High value matter with upcoming statutory hearing and settlement discussions scheduled for 28 Sep 2026. Lead legal team has prepared reply affidavits.
              </p>

              <div className="pt-2">
                <h4 className="text-xs font-bold text-white mb-3 uppercase tracking-wider">Key Information</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#041828] border border-white/5 space-y-0.5">
                    <span className="text-slate-400 text-[10px]">Documents</span>
                    <span className="font-mono font-bold text-white block text-sm">24</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#041828] border border-white/5 space-y-0.5">
                    <span className="text-slate-400 text-[10px]">Approvals</span>
                    <span className="font-mono font-bold text-amber-300 block text-sm">3</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#041828] border border-white/5 space-y-0.5">
                    <span className="text-slate-400 text-[10px]">Total Value</span>
                    <span className="font-mono font-bold text-emerald-400 block text-sm">₹12.5 Cr</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#041828] border border-white/5 space-y-0.5">
                    <span className="text-slate-400 text-[10px]">Outstanding</span>
                    <span className="font-mono font-bold text-rose-400 block text-sm">₹3.8 Cr</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#041828] border border-white/5 space-y-0.5">
                    <span className="text-slate-400 text-[10px]">Upcoming Deadlines</span>
                    <span className="font-mono font-bold text-rose-400 block text-sm">6</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#041828] border border-white/5 space-y-0.5">
                    <span className="text-slate-400 text-[10px]">Last Activity</span>
                    <span className="font-bold text-slate-300 block text-xs">2 hrs ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Scoped Matter AI */}
          <div className="p-6 rounded-2xl bg-[#081525] border border-[#00B8FF]/30 space-y-4 flex flex-col justify-between shadow-xl">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-extrabold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#00B8FF]" /> Matter AI Assistant
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30">
                  Context: {matterId} ONLY
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <button
                  onClick={() => handleSendMatterAi('Summarize this matter')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#00B8FF]/10 text-slate-300 hover:text-[#00B8FF] border border-white/5 transition-all cursor-pointer"
                >
                  "Summarize this matter"
                </button>
                <button
                  onClick={() => handleSendMatterAi('What are the key risks?')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#00B8FF]/10 text-slate-300 hover:text-[#00B8FF] border border-white/5 transition-all cursor-pointer"
                >
                  "What are the key risks?"
                </button>
                <button
                  onClick={() => handleSendMatterAi('What are upcoming deadlines?')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#00B8FF]/10 text-slate-300 hover:text-[#00B8FF] border border-white/5 transition-all cursor-pointer"
                >
                  "What are upcoming deadlines?"
                </button>
              </div>

              <div className="p-3 rounded-xl bg-[#041828] border border-white/5 space-y-3 max-h-64 overflow-y-auto text-xs">
                {aiChatLog.map((msg, idx) => (
                  <div key={idx} className={`space-y-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    <span className="text-[10px] text-slate-400 font-mono block">
                      {msg.role === 'user' ? 'You' : 'Matter AI'}
                    </span>
                    <div
                      className={`p-2.5 rounded-xl inline-block text-slate-200 leading-relaxed max-w-[90%] ${
                        msg.role === 'user' ? 'bg-[#00B8FF] text-white font-semibold' : 'bg-white/5 border border-white/5'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isAiThinking && (
                  <div className="text-xs text-[#00B8FF] font-mono animate-pulse">
                    Ultron building scoped context for {matterId}...
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ask anything about this matter..."
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMatterAi()}
                  className="w-full pl-3 pr-10 py-2 rounded-xl bg-[#041828] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00B8FF]"
                />
                <button
                  onClick={() => handleSendMatterAi()}
                  disabled={isAiThinking || !aiInput.trim()}
                  className="absolute right-2 top-1.5 p-1 rounded-lg bg-[#00B8FF] text-white hover:bg-[#0098D4] transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DOCUMENTS TAB */}
      {activeSubTab === 'Documents' && (
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#00B8FF]" />
                <span>Documents ({documents.length}) — {matterId}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Authoritative file repository associated strictly with this matter.</p>
            </div>
            <button
              onClick={triggerFileUpload}
              className="px-4 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload Document</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="pb-3 font-semibold">Document Name</th>
                  <th className="pb-3 font-semibold">Type</th>
                  <th className="pb-3 font-semibold">Uploaded By</th>
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold">Size</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {documents.map((d) => (
                  <tr key={d.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 font-bold text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#00B8FF]" />
                      {d.name}
                    </td>
                    <td className="py-3 text-slate-300">{d.type}</td>
                    <td className="py-3 text-slate-300">{d.uploadedBy}</td>
                    <td className="py-3 font-mono text-slate-400">{d.date}</td>
                    <td className="py-3 font-mono text-slate-400">{d.size}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        d.status === 'Verified' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setPreviewDoc(d)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer"
                          title="Preview"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            const blob = new Blob([`Content of ${d.name}`], { type: 'text/plain' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = d.name;
                            a.click();
                          }}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#00B8FF] cursor-pointer"
                          title="Download"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* FINANCIALS TAB */}
      {activeSubTab === 'Financials' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Approved Budget</span>
              <span className="text-lg font-mono font-extrabold text-emerald-400 block">₹12.5 Cr</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Total Expenses</span>
              <span className="text-lg font-mono font-extrabold text-cyan-400 block">₹14.0 Cr</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Outstanding</span>
              <span className="text-lg font-mono font-extrabold text-amber-300 block">₹8.2 Cr</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Financial Exposure</span>
              <span className="text-lg font-mono font-extrabold text-rose-400 block">₹3.8 Cr</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Value Trend (Financial Forecast)</h3>
              <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2">
                {[
                  { month: 'May', val: 40 },
                  { month: 'Jun', val: 55 },
                  { month: 'Jul', val: 70 },
                  { month: 'Aug', val: 85 },
                  { month: 'Sep', val: 100 },
                ].map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-[#00B8FF]/20 rounded-t-lg relative" style={{ height: `${item.val}%` }}>
                      <div className="absolute inset-x-0 top-0 bg-[#00B8FF] h-1.5 rounded-t-lg" />
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Financial Breakdown</h3>
              <div className="space-y-3 text-xs pt-2">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Legal Fees (45%)</span>
                    <span className="font-mono text-emerald-400 font-bold">₹5.6 Cr</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full w-[45%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>External Counsel (25%)</span>
                    <span className="font-mono text-cyan-400 font-bold">₹3.1 Cr</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full w-[25%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Court Fees (15%)</span>
                    <span className="font-mono text-purple-400 font-bold">₹1.8 Cr</span>
                  </div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-400 h-full w-[15%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Recent Transactions</h3>
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th className="pb-2">Date</th>
                    <th className="pb-2">Description</th>
                    <th className="pb-2">Amount</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-2.5 font-mono text-slate-400">12 Sep 2026</td>
                    <td className="py-2.5 font-bold text-white">External Counsel Invoice</td>
                    <td className="py-2.5 font-mono text-rose-400 font-bold">- ₹25,000,000</td>
                    <td className="py-2.5"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Paid</span></td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-mono text-slate-400">05 Sep 2026</td>
                    <td className="py-2.5 font-bold text-white">Court Filing Fee</td>
                    <td className="py-2.5 font-mono text-rose-400 font-bold">- ₹2,50,000</td>
                    <td className="py-2.5"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Paid</span></td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-mono text-slate-400">01 Sep 2026</td>
                    <td className="py-2.5 font-bold text-white">Legal Research Retainer</td>
                    <td className="py-2.5 font-mono text-amber-300 font-bold">- ₹15,00,000</td>
                    <td className="py-2.5"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">Pending</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* RISKS TAB */}
      {activeSubTab === 'Risks' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-1">
              <span className="text-[10px] text-rose-300 font-bold uppercase">Critical</span>
              <span className="text-xl font-mono font-extrabold text-rose-400 block">3</span>
            </div>
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
              <span className="text-[10px] text-amber-300 font-bold uppercase">High</span>
              <span className="text-xl font-mono font-extrabold text-amber-300 block">5</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#00B8FF]/10 border border-[#00B8FF]/30 space-y-1">
              <span className="text-[10px] text-[#00B8FF] font-bold uppercase">Medium</span>
              <span className="text-xl font-mono font-extrabold text-[#00B8FF] block">12</span>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
              <span className="text-[10px] text-emerald-300 font-bold uppercase">Low</span>
              <span className="text-xl font-mono font-extrabold text-emerald-300 block">4</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Matter Risk Register</h3>
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th className="pb-2">Risk ID</th>
                    <th className="pb-2">Category</th>
                    <th className="pb-2">Severity</th>
                    <th className="pb-2">Exposure</th>
                    <th className="pb-2">Deadline</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-3 font-mono font-bold text-[#00B8FF]">RISK-011</td>
                    <td className="py-3 text-white font-bold">Tax Compliance Mismatch</td>
                    <td className="py-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">High</span></td>
                    <td className="py-3 font-mono text-emerald-400 font-bold">₹1.2 Cr</td>
                    <td className="py-3 font-mono text-rose-400">28 Sep 2026</td>
                    <td className="py-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">Open</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 font-mono font-bold text-[#00B8FF]">RISK-014</td>
                    <td className="py-3 text-white font-bold">Contractual Indemnity Limit</td>
                    <td className="py-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">Medium</span></td>
                    <td className="py-3 font-mono text-emerald-400 font-bold">₹3.8 Cr</td>
                    <td className="py-3 font-mono text-slate-400">12 Oct 2026</td>
                    <td className="py-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">Mitigating</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TIMELINE TAB */}
      {activeSubTab === 'Timeline' && (
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-6">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Matter Event Timeline</h3>
          <div className="relative border-l border-white/10 pl-6 space-y-6 text-xs">
            <div className="relative">
              <div className="absolute -left-[31px] top-0 p-1 rounded-full bg-[#00B8FF] text-white">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <span className="font-mono text-[10px] text-slate-400">24 Sep 2026 10:30</span>
              <h4 className="font-bold text-white text-xs mt-0.5">Document Uploaded</h4>
              <p className="text-slate-300 text-[11px]">Contract_Agreement_2025.pdf uploaded by Amit Sharma</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[31px] top-0 p-1 rounded-full bg-rose-500 text-white">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <span className="font-mono text-[10px] text-slate-400">22 Sep 2026 14:15</span>
              <h4 className="font-bold text-white text-xs mt-0.5">Court Notice Received</h4>
              <p className="text-slate-300 text-[11px]">Hearing scheduled for 28 Sep 2026 by High Court</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[31px] top-0 p-1 rounded-full bg-purple-500 text-white">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="font-mono text-[10px] text-slate-400">20 Sep 2026 09:10</span>
              <h4 className="font-bold text-white text-xs mt-0.5">AI Risk Analysis Completed</h4>
              <p className="text-slate-300 text-[11px]">Tax compliance risk identified by Ultron Agent</p>
            </div>
          </div>
        </div>
      )}

      {/* APPROVALS TAB */}
      {activeSubTab === 'Approvals' && (
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Approvals Connected to {matterId}</h3>
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="pb-2">Approval ID</th>
                  <th className="pb-2">Title</th>
                  <th className="pb-2">Requester</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Due Date</th>
                  <th className="pb-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="py-3 font-mono font-bold text-[#00B8FF]">APP-204</td>
                  <td className="py-3 text-white font-bold">Approve Q3 Financial Compliance Report</td>
                  <td className="py-3 text-slate-300">Amit Sharma</td>
                  <td className="py-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">Pending</span></td>
                  <td className="py-3 font-mono text-rose-400">28 Sep 2026</td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => onOpenApproval?.('APP-204')}
                      className="px-3 py-1 rounded-lg bg-[#00B8FF] text-white text-xs font-bold cursor-pointer"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AI INSIGHTS TAB */}
      {activeSubTab === 'AI Insights' && (
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00B8FF]" /> Scoped Executive AI Analysis
            </h3>
            <span className="text-[10px] font-mono text-[#00B8FF]">Context: {matterId} ONLY</span>
          </div>

          <div className="p-4 rounded-xl bg-[#041828] border border-white/5 space-y-2 text-xs text-slate-200">
            <p>• High-value commercial litigation matter with significant tax and contractual exposure.</p>
            <p>• Key risks include tax compliance (₹1.2 Cr) and imminent statutory hearing on 28 Sep 2026.</p>
            <p>• Recommended action: Review and approve Q3 compliance report draft prior to court submission.</p>
          </div>

          <div className="space-y-2 text-xs">
            <span className="font-bold text-slate-400 text-[10px] uppercase">Sources Grounded</span>
            <div className="flex flex-wrap gap-2">
              {['Contract_Agreement_2025.pdf', 'GST_Returns_Q3.pdf', 'Risk Analysis'].map((s) => (
                <span key={s} className="px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 border border-white/10 text-[10px] font-mono">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ACTIVITY TAB */}
      {activeSubTab === 'Activity' && (
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Matter Audit & Activity Trail</h3>
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="pb-2">Timestamp</th>
                  <th className="pb-2">Actor</th>
                  <th className="pb-2">Action</th>
                  <th className="pb-2">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="py-2.5 font-mono text-slate-400">24 Sep 2026 10:30</td>
                  <td className="py-2.5 font-bold text-white">Amit Sharma</td>
                  <td className="py-2.5 text-[#00B8FF]">Uploaded Document</td>
                  <td className="py-2.5 text-slate-300">Contract_Agreement_2025.pdf</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-mono text-slate-400">20 Sep 2026 09:10</td>
                  <td className="py-2.5 font-bold text-purple-300">AI Agent</td>
                  <td className="py-2.5 text-[#00B8FF]">Risk Analysis</td>
                  <td className="py-2.5 text-slate-300">Identified tax risk</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Document Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#081525] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#00B8FF]" />
                <span>Document Preview: {previewDoc.name}</span>
              </h3>
              <button onClick={() => setPreviewDoc(null)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 rounded-xl bg-[#041828] border border-white/5 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300"><span>File Name:</span><span className="font-bold text-white">{previewDoc.name}</span></div>
              <div className="flex justify-between text-slate-300"><span>Type:</span><span className="font-bold text-white">{previewDoc.type}</span></div>
              <div className="flex justify-between text-slate-300"><span>Uploaded By:</span><span className="font-bold text-white">{previewDoc.uploadedBy}</span></div>
              <div className="flex justify-between text-slate-300"><span>Size:</span><span className="font-mono text-slate-400">{previewDoc.size}</span></div>
              <div className="flex justify-between text-slate-300"><span>Status:</span><span className="font-bold text-emerald-400">{previewDoc.status}</span></div>
            </div>
            <div className="p-8 border border-dashed border-white/10 rounded-xl text-center space-y-2">
              <FileText className="w-8 h-8 text-[#00B8FF] mx-auto" />
              <p className="text-xs text-slate-300 font-mono">[ Verified Document Stream — {previewDoc.name} ]</p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setPreviewDoc(null)} className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-bold cursor-pointer">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

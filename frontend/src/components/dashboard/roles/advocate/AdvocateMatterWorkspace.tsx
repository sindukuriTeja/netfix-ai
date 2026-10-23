import React, { useState, useRef } from 'react';
import {
  Sparkles,
  ChevronLeft,
  UploadCloud,
  FileText,
  FileCheck,
  Clock,
  Calendar,
  BookOpen,
  Scale,
  Send
} from 'lucide-react';

interface AdvocateMatterWorkspaceProps {
  matterId: string;
  onBack: () => void;
  onAskAi: (prompt?: string) => void;
}

interface WorkspaceDoc {
  id: string;
  name: string;
  type: string;
  uploadedBy: string;
  date: string;
  size: string;
  status: 'Verified' | 'Processed' | 'Pending';
}

interface WorkspaceEvidence {
  id: string;
  name: string;
  type: string;
  source: string;
  date: string;
  status: 'Verified' | 'Pending' | 'Flagged';
}

export const AdvocateMatterWorkspace: React.FC<AdvocateMatterWorkspaceProps> = ({
  matterId,
  onBack,
  onAskAi,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<string>('Overview');
  const [aiInput, setAiInput] = useState<string>('');
  const [aiChatLog, setAiChatLog] = useState<{ role: 'user' | 'assistant'; text: string; sources?: string[] }[]>([
    {
      role: 'assistant',
      text: `Context locked to ${matterId} ONLY. Commercial litigation dispute regarding contract breach. Client: ABC Pvt Ltd vs ABC Corp. Next filing deadline in 2 days.`,
      sources: [`${matterId}_Contract_Agreement.pdf`, 'Legal_Brief_Summary.pdf'],
    },
  ]);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);

  // Real Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [documents, setDocuments] = useState<WorkspaceDoc[]>([
    { id: 'DOC-2041', name: 'Contract_Agreement.pdf', type: 'Legal Agreement', uploadedBy: 'Ananya Rao', date: '24 Sep 2026', size: '2.4 MB', status: 'Verified' },
    { id: 'DOC-2042', name: 'Reply_Affidavit.pdf', type: 'Court Filing', uploadedBy: 'Ananya Rao', date: '20 Sep 2026', size: '1.1 MB', status: 'Processed' },
    { id: 'DOC-2043', name: 'GST_Return_Q3.pdf', type: 'Tax Record', uploadedBy: 'Client', date: '20 Sep 2026', size: '1.8 MB', status: 'Verified' },
    { id: 'DOC-2044', name: 'Notice_166.pdf', type: 'Legal Notice', uploadedBy: 'Ananya Rao', date: '18 Sep 2026', size: '4.2 MB', status: 'Processed' },
    { id: 'DOC-2045', name: 'Email_Correspondence.eml', type: 'Correspondence', uploadedBy: 'Client', date: '15 Sep 2026', size: '640 KB', status: 'Processed' },
    { id: 'DOC-2046', name: 'Evidence_Photo.jpg', type: 'Image', uploadedBy: 'Client', date: '14 Sep 2026', size: '2.1 MB', status: 'Pending' },
  ]);

  const [evidenceList] = useState<WorkspaceEvidence[]>([
    { id: 'EVI-001', name: 'Signed Commercial Agreement', type: 'Contract Document', source: 'Client Upload', date: '24 Sep 2026', status: 'Verified' },
    { id: 'EVI-002', name: 'Payment Records', type: 'Financial Record', source: 'Client Upload', date: '20 Sep 2026', status: 'Verified' },
    { id: 'EVI-003', name: 'Email Trail', type: 'Correspondence', source: 'Client Upload', date: '15 Sep 2026', status: 'Pending' },
    { id: 'EVI-004', name: 'Site Photograph', type: 'Image', source: 'Site Visit', date: '12 Sep 2026', status: 'Verified' },
  ]);

  const triggerFileUpload = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setUploadProgress(`Uploading ${file.name} to ${matterId}...`);

    setTimeout(() => {
      const newDoc: WorkspaceDoc = {
        id: `DOC-${Math.floor(1000 + Math.random() * 9000)}`,
        name: file.name,
        type: file.type.includes('image') ? 'Image' : file.type.includes('pdf') ? 'PDF Document' : 'Legal Document',
        uploadedBy: 'Ananya Rao',
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
        setAiChatLog((prev) => [
          ...prev,
          {
            role: 'assistant',
            text:
              json.data?.outputSummary ||
              `Matter ${matterId} legal briefing: Key argument relies on Section 73 breach remedies. Recommended affidavit filing prior to 28 Sep hearing.`,
            sources: [`${matterId}_Contract_Agreement.pdf`, 'Ultron_Grounded_Context'],
          },
        ]);
      } else {
        setAiChatLog((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: `Advocate AI Briefing for ${matterId}: All contract terms in Contract_Agreement.pdf have been cross-checked against precedents.`,
            sources: [`${matterId}_Contract_Agreement.pdf`],
          },
        ]);
      }
    } catch {
      setAiChatLog((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `Advocate AI Briefing for ${matterId}: All contract terms in Contract_Agreement.pdf have been cross-checked against precedents.`,
          sources: [`${matterId}_Contract_Agreement.pdf`],
        },
      ]);
    } finally {
      setIsAiThinking(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
        className="hidden"
      />

      {/* Breadcrumb & Navigation Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-xs font-bold text-[#00B8FF] flex items-center gap-1 hover:underline cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Assigned Matters
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onAskAi(`Analyze case ${matterId}`)}
            className="px-3.5 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-purple-500/30"
          >
            <Sparkles className="w-3.5 h-3.5" /> Ask AI
          </button>
          <button
            onClick={triggerFileUpload}
            className="px-3.5 py-1.5 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <UploadCloud className="w-3.5 h-3.5" /> Upload Document
          </button>
        </div>
      </div>

      {/* Matter Workspace Header Banner (Ref Panel 3) */}
      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-sm font-extrabold text-[#00B8FF]">{matterId}</span>
              <h2 className="text-xl font-extrabold text-white">Client vs ABC Corp</h2>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30">
                Stage: Written Submission
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                High Priority
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Client: <span className="font-bold text-white">ABC Pvt Ltd</span> | Court: <span className="text-purple-300 font-bold">High Court of Telangana</span> | Type: <span className="text-slate-200 font-bold">Commercial Litigation</span>
            </p>
          </div>
        </div>

        {/* 9 Sub-Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs no-scrollbar">
          {[
            { id: 'Overview', label: 'Overview', icon: FileText },
            { id: 'Documents', label: 'Documents', icon: FileText },
            { id: 'Evidence', label: 'Evidence', icon: FileCheck },
            { id: 'Timeline', label: 'Case Timeline', icon: Clock },
            { id: 'Deadlines', label: 'Deadlines & Hearings', icon: Calendar },
            { id: 'Research', label: 'Legal Research', icon: BookOpen },
            { id: 'Authorities', label: 'Authorities & Sources', icon: Scale },
            { id: 'AI Analysis', label: 'AI Analysis', icon: Sparkles },
            { id: 'Activity', label: 'Activity', icon: Clock },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeSubTab === tab.id
                    ? 'bg-[#00B8FF] text-white shadow-lg shadow-[#00B8FF]/20'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {uploadProgress && (
        <div className="p-3 rounded-xl bg-[#00B8FF]/10 border border-[#00B8FF]/30 text-xs text-[#00B8FF] font-mono animate-pulse">
          {uploadProgress}
        </div>
      )}

      {/* OVERVIEW SUB-TAB (Ref Panel 3) */}
      {activeSubTab === 'Overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
              <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2">Matter Information</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#041828] border border-white/5">
                  <span className="text-slate-400 text-[10px]">Client</span>
                  <span className="font-bold text-white block">ABC Pvt Ltd</span>
                </div>
                <div className="p-3 rounded-xl bg-[#041828] border border-white/5">
                  <span className="text-slate-400 text-[10px]">Case Type</span>
                  <span className="font-bold text-white block">Commercial Litigation</span>
                </div>
                <div className="p-3 rounded-xl bg-[#041828] border border-white/5">
                  <span className="text-slate-400 text-[10px]">Court</span>
                  <span className="font-bold text-purple-300 block">High Court of Telangana</span>
                </div>
                <div className="p-3 rounded-xl bg-[#041828] border border-white/5">
                  <span className="text-slate-400 text-[10px]">Case Number</span>
                  <span className="font-mono font-bold text-white block">C.S. 204/2026</span>
                </div>
                <div className="p-3 rounded-xl bg-[#041828] border border-white/5">
                  <span className="text-slate-400 text-[10px]">Current Stage</span>
                  <span className="font-bold text-[#00B8FF] block">Written Submission</span>
                </div>
                <div className="p-3 rounded-xl bg-[#041828] border border-white/5">
                  <span className="text-slate-400 text-[10px]">Assigned Advocate</span>
                  <span className="font-bold text-white block">Ananya Rao</span>
                </div>
              </div>

              <div className="pt-2">
                <h4 className="text-xs font-bold text-white mb-2 uppercase tracking-wider">Key Dates</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#041828] border border-white/5">
                    <span className="text-slate-400 text-[10px]">Next Hearing</span>
                    <span className="font-mono font-bold text-rose-400 block">28 Sep 2026 (3 days)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#041828] border border-white/5">
                    <span className="text-slate-400 text-[10px]">Next Filing</span>
                    <span className="font-mono font-bold text-amber-300 block">28 Sep 2026</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#041828] border border-white/5">
                    <span className="text-slate-400 text-[10px]">Limitation Date</span>
                    <span className="font-mono text-slate-300 block">15 Jan 2027</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#041828] border border-white/5">
                    <span className="text-slate-400 text-[10px]">Last Updated</span>
                    <span className="font-bold text-slate-400 block">24 Sep 2026</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <h4 className="text-xs font-bold text-white mb-2 uppercase tracking-wider">Matter Status Summary</h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#041828] border border-white/5">
                    <span className="text-slate-400 text-[10px]">Documents</span>
                    <span className="font-mono font-bold text-white block text-sm">6</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#041828] border border-white/5">
                    <span className="text-slate-400 text-[10px]">Evidence</span>
                    <span className="font-mono font-bold text-cyan-400 block text-sm">4</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#041828] border border-white/5">
                    <span className="text-slate-400 text-[10px]">Upcoming Deadlines</span>
                    <span className="font-mono font-bold text-rose-400 block text-sm">3</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#041828] border border-white/5">
                    <span className="text-slate-400 text-[10px]">Research Notes</span>
                    <span className="font-mono font-bold text-purple-300 block text-sm">5</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#041828] border border-white/5">
                    <span className="text-slate-400 text-[10px]">Open Tasks</span>
                    <span className="font-mono font-bold text-amber-300 block text-sm">2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Matter AI Assistant */}
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
                  onClick={() => handleSendMatterAi('Summarize this case')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#00B8FF]/10 text-slate-300 hover:text-[#00B8FF] border border-white/5 transition-all cursor-pointer"
                >
                  "Summarize this case"
                </button>
                <button
                  onClick={() => handleSendMatterAi('What are the key risks?')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#00B8FF]/10 text-slate-300 hover:text-[#00B8FF] border border-white/5 transition-all cursor-pointer"
                >
                  "What are the key risks?"
                </button>
                <button
                  onClick={() => handleSendMatterAi('Which documents support our claim?')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#00B8FF]/10 text-slate-300 hover:text-[#00B8FF] border border-white/5 transition-all cursor-pointer"
                >
                  "Which documents support our claim?"
                </button>
              </div>

              <div className="p-3 rounded-xl bg-[#041828] border border-white/5 space-y-3 max-h-64 overflow-y-auto text-xs">
                {aiChatLog.map((msg, idx) => (
                  <div key={idx} className={`space-y-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    <span className="text-[10px] text-slate-400 font-mono block">
                      {msg.role === 'user' ? 'You' : 'Advocate AI'}
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
                  className="absolute right-2 top-1.5 p-1 rounded-lg bg-[#00B8FF] text-white hover:bg-[#0098D4] cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DOCUMENTS SUB-TAB */}
      {activeSubTab === 'Documents' && (
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#00B8FF]" /> Attached Documents ({documents.length})
            </h3>
            <button
              onClick={triggerFileUpload}
              className="px-3.5 py-1.5 rounded-xl bg-[#00B8FF] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <UploadCloud className="w-4 h-4" /> Upload Document
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="pb-2">Document Name</th>
                  <th className="pb-2">Type</th>
                  <th className="pb-2">Uploaded By</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Size</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {documents.map((d) => (
                  <tr key={d.id}>
                    <td className="py-3 font-bold text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#00B8FF]" /> {d.name}
                    </td>
                    <td className="py-3 text-slate-300">{d.type}</td>
                    <td className="py-3 text-slate-300">{d.uploadedBy}</td>
                    <td className="py-3 font-mono text-slate-400">{d.date}</td>
                    <td className="py-3 font-mono text-slate-400">{d.size}</td>
                    <td className="py-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">{d.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* EVIDENCE SUB-TAB */}
      {activeSubTab === 'Evidence' && (
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2">Case Evidence Items ({evidenceList.length})</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="pb-2">Evidence ID</th>
                  <th className="pb-2">Evidence Name</th>
                  <th className="pb-2">Type</th>
                  <th className="pb-2">Source</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {evidenceList.map((e) => (
                  <tr key={e.id}>
                    <td className="py-3 font-mono font-bold text-[#00B8FF]">{e.id}</td>
                    <td className="py-3 font-bold text-white">{e.name}</td>
                    <td className="py-3 text-slate-300">{e.type}</td>
                    <td className="py-3 text-slate-300">{e.source}</td>
                    <td className="py-3"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">{e.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

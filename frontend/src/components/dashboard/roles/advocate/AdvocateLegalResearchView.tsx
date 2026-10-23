import React, { useState } from 'react';
import { BookOpen, Search, Sparkles, Send, Lock, X } from 'lucide-react';

export const AdvocateLegalResearchView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Accessible' | 'Pending'>('Accessible');
  const [showRequestModal, setShowRequestModal] = useState<boolean>(false);
  const [requestCaseName, setRequestCaseName] = useState<string>('');
  const [requestReason, setRequestReason] = useState<string>('');
  const [requestSubmittedMessage, setRequestSubmittedMessage] = useState<string | null>(null);

  const [aiInput, setAiInput] = useState<string>('');
  const [aiChatLog, setAiChatLog] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    {
      role: 'assistant',
      text: 'Context locked to MAT-204 ONLY. Precedent analysis: Arnesh Kumar vs State of Bihar (2014) restricts custodial interrogation in financial compliance disputes.',
    },
  ]);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);

  const [accessibleDocs] = useState([
    { id: 'RES-001', title: 'Arnesh Kumar vs State of Bihar (2014)', court: 'Supreme Court', citation: 'AIR 2014 SC 2756', status: 'Approved' },
    { id: 'RES-002', title: 'ABC Pvt Ltd vs State of Telangana', court: 'High Court of Telangana', citation: '(2025) XYZ 123', status: 'Approved' },
    { id: 'RES-003', title: 'Tata Cellular vs Union of India', court: 'Supreme Court', citation: '(1994) 6 SCC 651', status: 'Approved' },
    { id: 'RES-004', title: 'Vodafone International Holdings vs UOI', court: 'Supreme Court', citation: '(2012) 6 SCC 613', status: 'Approved' },
  ]);

  const [pendingRequests, setPendingRequests] = useState([
    { id: 'REQ-001', title: 'Anvesh Kumar vs State.pdf', court: 'Supreme Court', date: '24 Sep 2026', status: 'Pending Admin Approval' },
    { id: 'REQ-002', title: 'ABC Ltd vs Telangana.pdf', court: 'High Court', date: '22 Sep 2026', status: 'Pending Admin Approval' },
  ]);

  const handleSendResearchAi = async (promptText?: string) => {
    const text = promptText || aiInput;
    if (!text.trim()) return;

    setAiChatLog((prev) => [...prev, { role: 'user', text }]);
    if (!promptText) setAiInput('');
    setIsAiThinking(true);

    setTimeout(() => {
      setAiChatLog((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `Legal Research AI Briefing for MAT-204: Reviewed 8 accessible precedent cases. Section 73 contract damages require proof of actual loss as per Tata Cellular principles.`,
        },
      ]);
      setIsAiThinking(false);
    }, 800);
  };

  const handleCreateAccessRequest = async () => {
    if (!requestCaseName.trim() || !requestReason.trim()) return;

    try {
      await fetch('/api/v1/access-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestedResource: requestCaseName,
          reason: requestReason,
        }),
      });

      const newReq = {
        id: `REQ-${Math.floor(100 + Math.random() * 900)}`,
        title: requestCaseName,
        court: 'High Court of Telangana',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: 'Pending Admin Approval',
      };

      setPendingRequests((prev) => [newReq, ...prev]);
      setRequestSubmittedMessage(`Access request for "${requestCaseName}" submitted for Administrator review.`);
      setShowRequestModal(false);
      setRequestCaseName('');
      setRequestReason('');
    } catch {
      setRequestSubmittedMessage('Access request submitted for Administrator review.');
      setShowRequestModal(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#00B8FF]" />
            <span>Legal Research & Case Library</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Search authorized case law, judgments, legal documents and precedent research materials.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('Accessible')}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs cursor-pointer ${
              activeTab === 'Accessible' ? 'bg-[#00B8FF] text-white' : 'bg-white/5 text-slate-400'
            }`}
          >
            Accessible Documents ({accessibleDocs.length})
          </button>
          <button
            onClick={() => setActiveTab('Pending')}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs cursor-pointer ${
              activeTab === 'Pending' ? 'bg-amber-500 text-white' : 'bg-white/5 text-slate-400'
            }`}
          >
            Waiting for Approval ({pendingRequests.length})
          </button>
          <button
            onClick={() => setShowRequestModal(true)}
            className="px-3.5 py-1.5 rounded-xl bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-lg shadow-purple-500/20"
          >
            <Lock className="w-3.5 h-3.5" /> Request Access
          </button>
        </div>
      </div>

      {requestSubmittedMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-bold flex items-center justify-between">
          <span>{requestSubmittedMessage}</span>
          <button onClick={() => setRequestSubmittedMessage(null)} className="text-slate-400 hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Top Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 space-y-3 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          <div className="relative sm:col-span-2">
            <input
              type="text"
              placeholder="Search case name, citation..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          </div>
          <select className="p-2 rounded-xl bg-[#041828] border border-white/10 text-slate-300">
            <option>Court — Supreme Court</option>
          </select>
          <select className="p-2 rounded-xl bg-[#041828] border border-white/10 text-slate-300">
            <option>Year — 2026</option>
          </select>
          <select className="p-2 rounded-xl bg-[#041828] border border-white/10 text-slate-300">
            <option>Document Type — Judgment</option>
          </select>
        </div>
      </div>

      {/* CHARTS + CASE AI ASSISTANT GRID (Ref Panel 10) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Charts Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Overall Risk Score Gauge */}
            <div className="p-5 rounded-2xl bg-[#081525] border border-white/10 space-y-3 text-center">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Overall Risk Score</h4>
              <div className="w-28 h-28 rounded-full border-8 border-amber-400 border-t-rose-500 border-l-emerald-400 mx-auto flex items-center justify-center relative">
                <div>
                  <span className="text-2xl font-mono font-extrabold text-white block">68</span>
                  <span className="text-[9px] text-amber-300 font-bold uppercase">Medium Risk</span>
                </div>
              </div>
              <div className="flex justify-center gap-4 text-[10px] text-slate-300 pt-1">
                <span className="text-rose-400">High Risk: 2</span>
                <span className="text-amber-300">Medium Risk: 3</span>
                <span className="text-emerald-400">Low Risk: 1</span>
              </div>
            </div>

            {/* Evidence Analysis Chart */}
            <div className="p-5 rounded-2xl bg-[#081525] border border-white/10 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider text-center">Evidence Analysis</h4>
              <div className="w-24 h-24 rounded-full border-8 border-cyan-400 border-b-amber-300 mx-auto flex items-center justify-center">
                <div className="text-center">
                  <span className="text-lg font-mono font-bold text-white block">4</span>
                  <span className="text-[9px] text-slate-400">Items</span>
                </div>
              </div>
              <div className="space-y-1 text-[10px] text-slate-300 pt-1">
                <div className="flex justify-between"><span>Verified</span><span className="font-mono text-emerald-400 font-bold">3</span></div>
                <div className="flex justify-between"><span>Pending</span><span className="font-mono text-amber-300 font-bold">1</span></div>
              </div>
            </div>
          </div>

          {/* Accessible Documents Table / Pending Requests Table */}
          {activeTab === 'Accessible' ? (
            <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4 text-xs">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
                Accessible Legal Documents ({accessibleDocs.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400">
                      <th className="pb-2">Case Title</th>
                      <th className="pb-2">Court</th>
                      <th className="pb-2">Citation</th>
                      <th className="pb-2">Access Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {accessibleDocs.map((doc) => (
                      <tr key={doc.id}>
                        <td className="py-3 font-bold text-white flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-[#00B8FF]" /> {doc.title}
                        </td>
                        <td className="py-3 text-slate-300">{doc.court}</td>
                        <td className="py-3 font-mono text-purple-300">{doc.citation}</td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {doc.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4 text-xs">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
                Pending Document Access Requests ({pendingRequests.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400">
                      <th className="pb-2">Request ID</th>
                      <th className="pb-2">Requested Case / Document</th>
                      <th className="pb-2">Court</th>
                      <th className="pb-2">Date</th>
                      <th className="pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {pendingRequests.map((req) => (
                      <tr key={req.id}>
                        <td className="py-3 font-mono font-bold text-amber-300">{req.id}</td>
                        <td className="py-3 font-bold text-white">{req.title}</td>
                        <td className="py-3 text-slate-300">{req.court}</td>
                        <td className="py-3 font-mono text-slate-400">{req.date}</td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {req.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Case AI Assistant (Ref Panel 10) */}
        <div className="p-6 rounded-2xl bg-[#081525] border border-[#00B8FF]/30 space-y-4 flex flex-col justify-between shadow-xl">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-extrabold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#00B8FF]" /> Case AI Assistant
              </span>
              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30">
                Context: MAT-204 ONLY
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <button
                onClick={() => handleSendResearchAi('What are the key risks?')}
                className="w-full text-left px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#00B8FF]/10 text-slate-300 hover:text-[#00B8FF] border border-white/5 transition-all cursor-pointer"
              >
                "What are the key risks?"
              </button>
              <button
                onClick={() => handleSendResearchAi('Summarize evidence?')}
                className="w-full text-left px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#00B8FF]/10 text-slate-300 hover:text-[#00B8FF] border border-white/5 transition-all cursor-pointer"
              >
                "Summarize evidence?"
              </button>
              <button
                onClick={() => handleSendResearchAi('What are upcoming deadlines?')}
                className="w-full text-left px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#00B8FF]/10 text-slate-300 hover:text-[#00B8FF] border border-white/5 transition-all cursor-pointer"
              >
                "What are upcoming deadlines?"
              </button>
            </div>

            <div className="p-3 rounded-xl bg-[#041828] border border-white/5 space-y-3 max-h-64 overflow-y-auto text-xs">
              {aiChatLog.map((msg, idx) => (
                <div key={idx} className={`space-y-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    {msg.role === 'user' ? 'You' : 'Research AI'}
                  </span>
                  <div className={`p-2.5 rounded-xl inline-block text-slate-200 leading-relaxed max-w-[90%] ${msg.role === 'user' ? 'bg-[#00B8FF] text-white font-semibold' : 'bg-white/5 border border-white/5'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isAiThinking && <div className="text-xs text-[#00B8FF] font-mono animate-pulse">Researching precedents...</div>}
            </div>
          </div>

          <div className="pt-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Ask anything about MAT-204..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendResearchAi()}
                className="w-full pl-3 pr-10 py-2 rounded-xl bg-[#041828] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00B8FF]"
              />
              <button
                onClick={() => handleSendResearchAi()}
                disabled={isAiThinking || !aiInput.trim()}
                className="absolute right-2 top-1.5 p-1 rounded-lg bg-[#00B8FF] text-white hover:bg-[#0098D4] cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Request Access Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#081525] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-purple-400" /> Request Document Access
              </h3>
              <button onClick={() => setShowRequestModal(false)} className="text-slate-400 hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Case / Document Name</label>
                <input
                  type="text"
                  placeholder="e.g. State of Telangana vs ABC Ltd.pdf"
                  value={requestCaseName}
                  onChange={(e) => setRequestCaseName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#041828] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Reason for Request</label>
                <textarea
                  rows={3}
                  placeholder="Explain why access is required for your assigned matter..."
                  value={requestReason}
                  onChange={(e) => setRequestReason(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#041828] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowRequestModal(false)} className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-bold cursor-pointer">Cancel</button>
              <button
                onClick={handleCreateAccessRequest}
                disabled={!requestCaseName.trim() || !requestReason.trim()}
                className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold cursor-pointer disabled:opacity-50"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

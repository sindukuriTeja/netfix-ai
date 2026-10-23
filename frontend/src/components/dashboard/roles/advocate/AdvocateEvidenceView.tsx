import React, { useState } from 'react';
import {
  FileCheck,
  Search,
  Plus,
  Eye,
  Download,
  Sparkles,
  ChevronLeft,
  Send
} from 'lucide-react';

interface EvidenceItem {
  id: string;
  name: string;
  type: string;
  source: string;
  date: string;
  status: 'Verified' | 'Pending' | 'Flagged';
  matterId: string;
}

export const AdvocateEvidenceView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(null);

  const [aiInput, setAiInput] = useState<string>('');
  const [aiChatLog, setAiChatLog] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    {
      role: 'assistant',
      text: 'Context locked to EVI-001 ONLY. Verified commercial agreement containing termination indemnity clause 8.1.',
    },
  ]);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);

  const [evidenceList] = useState<EvidenceItem[]>([
    { id: 'EVI-001', name: 'Signed Commercial Agreement', type: 'Contract Document', source: 'Client Upload', date: '24 Sep 2026', status: 'Verified', matterId: 'MAT-204' },
    { id: 'EVI-002', name: 'Payment Records', type: 'Financial Record', source: 'Client Upload', date: '20 Sep 2026', status: 'Verified', matterId: 'MAT-204' },
    { id: 'EVI-003', name: 'Email Trail', type: 'Correspondence', source: 'Client Upload', date: '15 Sep 2026', status: 'Pending', matterId: 'MAT-204' },
    { id: 'EVI-004', name: 'Site Photograph', type: 'Image', source: 'Site Visit', date: '12 Sep 2026', status: 'Verified', matterId: 'MAT-204' },
  ]);

  const filteredList = evidenceList.filter((e) => {
    const matchesSearch =
      e.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeFilter === 'All') return matchesSearch;
    return matchesSearch && e.status === activeFilter;
  });

  const handleSendEvidenceAi = async (promptText?: string) => {
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
          text: `Evidence AI Briefing for ${selectedEvidence?.id}: Document authenticity verified with 98% OCR confidence score. Key clause 8.1 governs termination.`,
        },
      ]);
      setIsAiThinking(false);
    }, 800);
  };

  // IF EVIDENCE DETAIL VIEW IS OPEN (Ref Panel 6)
  if (selectedEvidence) {
    return (
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedEvidence(null)}
            className="text-xs font-bold text-[#00B8FF] flex items-center gap-1 hover:underline cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Evidence Dossier
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const blob = new Blob([`Evidence Details: ${selectedEvidence.name}`], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${selectedEvidence.id}_Evidence.txt`;
                a.click();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Download
            </button>
          </div>
        </div>

        {/* Evidence Detail Banner (Ref Panel 6) */}
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-extrabold text-[#00B8FF]">{selectedEvidence.id}</span>
                <h2 className="text-xl font-extrabold text-white">{selectedEvidence.name}</h2>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {selectedEvidence.status}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Associated Matter: <span className="font-bold text-[#00B8FF]">{selectedEvidence.matterId}</span> | Source: <span className="text-white font-bold">{selectedEvidence.source}</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
            {/* Left Column: Visual Document Preview + Extracted Facts */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-2xl bg-[#041828] border border-white/10 space-y-4 text-center">
                <div className="p-8 border border-dashed border-white/10 rounded-xl space-y-2">
                  <FileCheck className="w-12 h-12 text-[#00B8FF] mx-auto" />
                  <h4 className="font-bold text-white text-sm">COMMERCIAL AGREEMENT</h4>
                  <p className="text-xs text-slate-400 font-mono">[ Verified Digital Evidence Stream — {selectedEvidence.name} ]</p>
                </div>
              </div>

              {/* Extracted Facts */}
              <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4 text-xs">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
                  Extracted Facts & Verification
                </h3>
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400">
                      <th className="pb-2">Field</th>
                      <th className="pb-2">Extracted Value</th>
                      <th className="pb-2 text-right">Confidence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="py-2.5 font-bold text-slate-300">Agreement Date</td>
                      <td className="py-2.5 font-mono text-white">12 Jan 2025</td>
                      <td className="py-2.5 text-right font-mono text-emerald-400 font-bold">98%</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-slate-300">Parties</td>
                      <td className="py-2.5 font-bold text-white">ABC Pvt Ltd, XYZ Corp</td>
                      <td className="py-2.5 text-right font-mono text-emerald-400 font-bold">99%</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-slate-300">Contract Value</td>
                      <td className="py-2.5 font-mono text-emerald-400 font-bold">₹12.5 Cr</td>
                      <td className="py-2.5 text-right font-mono text-emerald-400 font-bold">95%</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-slate-300">Termination Clause</td>
                      <td className="py-2.5 text-slate-200">Clause 8.1</td>
                      <td className="py-2.5 text-right font-mono text-emerald-400 font-bold">92%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column: Evidence AI Assistant (Scoped to Evidence Item) */}
            <div className="p-6 rounded-2xl bg-[#081525] border border-[#00B8FF]/30 space-y-4 flex flex-col justify-between shadow-xl">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs font-extrabold text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#00B8FF]" /> Evidence AI Assistant
                  </span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30">
                    Context: {selectedEvidence.id} ONLY
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <button
                    onClick={() => handleSendEvidenceAi('Summarize this document')}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#00B8FF]/10 text-slate-300 hover:text-[#00B8FF] border border-white/5 transition-all cursor-pointer"
                  >
                    "Summarize this document"
                  </button>
                  <button
                    onClick={() => handleSendEvidenceAi('What are key clauses?')}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#00B8FF]/10 text-slate-300 hover:text-[#00B8FF] border border-white/5 transition-all cursor-pointer"
                  >
                    "What are key clauses?"
                  </button>
                  <button
                    onClick={() => handleSendEvidenceAi('Are there contradictions with other documents?')}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#00B8FF]/10 text-slate-300 hover:text-[#00B8FF] border border-white/5 transition-all cursor-pointer"
                  >
                    "Any contradictions detected?"
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-[#041828] border border-white/5 space-y-3 max-h-64 overflow-y-auto text-xs">
                  {aiChatLog.map((msg, idx) => (
                    <div key={idx} className={`space-y-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                      <span className="text-[10px] text-slate-400 font-mono block">
                        {msg.role === 'user' ? 'You' : 'Evidence AI'}
                      </span>
                      <div className={`p-2.5 rounded-xl inline-block text-slate-200 leading-relaxed max-w-[90%] ${msg.role === 'user' ? 'bg-[#00B8FF] text-white font-semibold' : 'bg-white/5 border border-white/5'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isAiThinking && <div className="text-xs text-[#00B8FF] font-mono animate-pulse">Analyzing {selectedEvidence.id}...</div>}
                </div>
              </div>

              <div className="pt-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ask about this evidence..."
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendEvidenceAi()}
                    className="w-full pl-3 pr-10 py-2 rounded-xl bg-[#041828] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00B8FF]"
                  />
                  <button
                    onClick={() => handleSendEvidenceAi()}
                    disabled={isAiThinking || !aiInput.trim()}
                    className="absolute right-2 top-1.5 p-1 rounded-lg bg-[#00B8FF] text-white hover:bg-[#0098D4] cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // MAIN EVIDENCE MANAGEMENT LIST VIEW (Ref Panel 5)
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-purple-400" />
            <span>MAT-204 &gt; Evidence Management</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Dossier of verified and pending evidence items for authorized case matters.
          </p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#00B8FF]/20">
          <Plus className="w-4 h-4" />
          <span>+ Add Evidence</span>
        </button>
      </div>

      <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          {[
            { id: 'All', label: `All Evidence (${evidenceList.length})` },
            { id: 'Verified', label: 'Verified (3)' },
            { id: 'Pending', label: 'Pending (1)' },
            { id: 'Flagged', label: 'Flagged (0)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-[#00B8FF] text-white shadow-lg shadow-[#00B8FF]/20'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search evidence..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00B8FF]"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="pb-3 font-semibold">Evidence ID</th>
                <th className="pb-3 font-semibold">Evidence Name</th>
                <th className="pb-3 font-semibold">Type</th>
                <th className="pb-3 font-semibold">Source</th>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredList.map((e) => (
                <tr key={e.id} className="hover:bg-white/[0.02]">
                  <td className="py-3.5 font-mono font-extrabold text-[#00B8FF]">{e.id}</td>
                  <td className="py-3.5 font-bold text-white">{e.name}</td>
                  <td className="py-3.5 text-slate-300">{e.type}</td>
                  <td className="py-3.5 text-slate-300">{e.source}</td>
                  <td className="py-3.5 font-mono text-slate-400">{e.date}</td>
                  <td className="py-3.5">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                      e.status === 'Verified' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => setSelectedEvidence(e)}
                      className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
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

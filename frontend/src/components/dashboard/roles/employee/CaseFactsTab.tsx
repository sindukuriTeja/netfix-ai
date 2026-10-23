import React, { useState } from 'react';
import { Plus, Trash2, FileText, Sparkles } from 'lucide-react';

interface CaseFact {
  id: string;
  category: string;
  factText: string;
  sourceDoc: string;
  confidence: number;
  date?: string;
}

interface CaseFactsTabProps {
  caseId: string;
}

export const CaseFactsTab: React.FC<CaseFactsTabProps> = ({ caseId }) => {
  const [facts, setFacts] = useState<CaseFact[]>([
    {
      id: 'FACT-101',
      category: 'Notice Issue',
      factText: 'Demand notice issued alleging ITC mismatch of ₹ 2,45,000 for Q3 FY2025.',
      sourceDoc: 'GST_Notice_2026.pdf',
      confidence: 98,
      date: '18 Sep 2026',
    },
    {
      id: 'FACT-102',
      category: 'Payment Record',
      factText: 'Recipient company ABC Pvt Ltd paid full invoice amount including GST to supplier XYZ Traders via bank transfer.',
      sourceDoc: 'Bank_Statement_Q3.pdf',
      confidence: 96,
      date: '12 May 2026',
    },
    {
      id: 'FACT-103',
      category: 'Filing Discrepancy',
      factText: 'Supplier XYZ Traders filed GSTR-1 late on 25 Aug 2026 causing temporary GSTR-2B reflection delay.',
      sourceDoc: 'GSTR_2B_Reconciled.xlsx',
      confidence: 95,
      date: '25 Aug 2026',
    },
  ]);

  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [newFact, setNewFact] = useState<{ category: string; factText: string; sourceDoc: string }>({
    category: 'General Fact',
    factText: '',
    sourceDoc: 'Client_Statement.pdf',
  });
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const handleAddFact = () => {
    if (!newFact.factText.trim()) return;
    const added: CaseFact = {
      id: `FACT-${Date.now().toString().slice(-3)}`,
      category: newFact.category,
      factText: newFact.factText,
      sourceDoc: newFact.sourceDoc,
      confidence: 100,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    };
    setFacts([...facts, added]);
    setNewFact({ category: 'General Fact', factText: '', sourceDoc: 'Client_Statement.pdf' });
    setIsAdding(false);
  };

  const handleRunCaseAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/agent/case-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId, taskDescription: `Extract and categorize facts for ${caseId}` }),
      });
      if (res.ok) {
        setTimeout(() => {
          setFacts((prev) => [
            ...prev,
            {
              id: `FACT-AI-${Math.floor(Math.random() * 100)}`,
              category: 'AI Identified Fact',
              factText: 'GSTR-3B return filed within prescribed due date under Section 39.',
              sourceDoc: 'GSTR3B_Receipt.pdf',
              confidence: 97,
              date: '20 Sep 2026',
            },
          ]);
          setIsAnalyzing(false);
        }, 1000);
      } else {
        setIsAnalyzing(false);
      }
    } catch {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>Case Facts Engine (Module 12) — {caseId}</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30">
              {facts.length} Verified Facts
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Structured facts extracted from case documents with source attribution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunCaseAnalysis}
            disabled={isAnalyzing}
            className="px-3.5 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>Run Case AI Extraction</span>
          </button>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-3.5 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Fact</span>
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="p-5 rounded-2xl bg-[#081525] border border-[#00B8FF]/40 space-y-4 text-xs">
          <h4 className="font-bold text-white text-sm">Add New Case Fact</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Category</label>
              <input
                type="text"
                value={newFact.category}
                onChange={(e) => setNewFact({ ...newFact, category: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#041828] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Source Document</label>
              <input
                type="text"
                value={newFact.sourceDoc}
                onChange={(e) => setNewFact({ ...newFact, sourceDoc: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#041828] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
              />
            </div>
          </div>
          <div>
            <label className="text-slate-400 block mb-1 font-semibold">Fact Description</label>
            <textarea
              value={newFact.factText}
              onChange={(e) => setNewFact({ ...newFact, factText: e.target.value })}
              rows={2}
              placeholder="Enter verified fact text..."
              className="w-full p-2.5 rounded-xl bg-[#041828] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF] resize-none"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleAddFact}
              className="px-4 py-1.5 rounded-lg bg-[#00B8FF] hover:bg-[#0098D4] text-white font-bold"
            >
              Save Fact
            </button>
          </div>
        </div>
      )}

      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="pb-3 font-semibold">Fact ID</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold">Fact Description</th>
                <th className="pb-3 font-semibold">Source Document</th>
                <th className="pb-3 font-semibold text-center">Confidence</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {facts.map((fact) => (
                <tr key={fact.id} className="hover:bg-white/[0.02]">
                  <td className="py-3 font-mono font-bold text-[#00B8FF]">{fact.id}</td>
                  <td className="py-3 font-semibold text-purple-300">{fact.category}</td>
                  <td className="py-3 text-slate-200 max-w-md">{fact.factText}</td>
                  <td className="py-3">
                    <span className="flex items-center gap-1 font-mono text-slate-400">
                      <FileText className="w-3.5 h-3.5 text-[#00B8FF]" />
                      {fact.sourceDoc}
                    </span>
                  </td>
                  <td className="py-3 text-center font-mono font-bold text-emerald-400">
                    {fact.confidence}%
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => setFacts(facts.filter((f) => f.id !== fact.id))}
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-all cursor-pointer"
                      title="Archive Fact"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
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

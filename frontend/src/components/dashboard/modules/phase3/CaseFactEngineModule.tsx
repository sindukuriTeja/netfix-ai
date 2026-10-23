import React, { useState } from 'react';
import { FileText, CheckCircle, Clock, Sparkles } from 'lucide-react';

interface CaseFact {
  id: string;
  factText: string;
  factType: 'date' | 'amount' | 'party' | 'obligation' | 'event';
  sourceDocument: string;
  page?: string;
  confidenceScore: number;
  verified: boolean;
  verifiedBy?: string;
  verifiedAt?: string;
}

export const CaseFactEngineModule: React.FC = () => {
  const [facts, setFacts] = useState<CaseFact[]>([
    {
      id: 'F-001',
      factText: 'Contract signed on 12 Jun 2025 between MARG and ABC Corp',
      factType: 'date',
      sourceDocument: 'Contract_Agmt_2025.pdf',
      page: 'Page 3',
      confidenceScore: 95,
      verified: true,
      verifiedBy: 'Teja Reddy (Advocate)',
      verifiedAt: '15 Jun 2025',
    },
    {
      id: 'F-002',
      factText: 'Payment of ₹5,00,000 due on 30 Jul 2025',
      factType: 'amount',
      sourceDocument: 'Invoice_001.pdf',
      page: 'Page 1',
      confidenceScore: 88,
      verified: false,
    },
    {
      id: 'F-003',
      factText: 'Legal notice issued by ABC Corp on 15 Aug 2025',
      factType: 'event',
      sourceDocument: 'LegalNotice_Aug.pdf',
      page: 'Page 2',
      confidenceScore: 92,
      verified: true,
      verifiedBy: 'Teja Reddy (Advocate)',
      verifiedAt: '18 Aug 2025',
    },
    {
      id: 'F-004',
      factText: 'Party A: MARG Technologies Pvt Ltd',
      factType: 'party',
      sourceDocument: 'Agreement_Final.pdf',
      page: 'Page 1',
      confidenceScore: 90,
      verified: false,
    },
  ]);

  const [isExtracting, setIsExtracting] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('all');

  const handleVerify = (id: string) => {
    setFacts((prev) =>
      prev.map((f) =>
        f.id === id
          ? { ...f, verified: true, verifiedBy: 'Teja Reddy (Advocate)', verifiedAt: 'Just now' }
          : f
      )
    );
  };

  const handleExtract = () => {
    setIsExtracting(true);
    setTimeout(() => {
      const newFact: CaseFact = {
        id: `F-00${facts.length + 1}`,
        factText: 'Termination clause applicable with 30-day notice period',
        factType: 'obligation',
        sourceDocument: 'Contract_Agmt_2025.pdf',
        page: 'Page 14',
        confidenceScore: 91,
        verified: false,
      };
      setFacts((prev) => [newFact, ...prev]);
      setIsExtracting(false);
    }, 1200);
  };

  const filteredFacts = selectedType === 'all'
    ? facts
    : facts.filter((f) => f.factType === selectedType);

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'date':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'amount':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'party':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/30';
      case 'obligation':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      default:
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
    }
  };

  return (
    <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-pink-500/20 text-pink-400 font-extrabold text-xs flex items-center justify-center border border-pink-500/30">
              20
            </span>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-pink-400" />
                <span>Case Fact Engine</span>
              </h3>
              <p className="text-[11px] text-slate-400">Extract. Structure. Verify.</p>
            </div>
          </div>
          <button
            onClick={handleExtract}
            disabled={isExtracting}
            className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/40 transition flex items-center gap-1"
          >
            <Sparkles className={`w-3 h-3 ${isExtracting ? 'animate-spin' : ''}`} />
            <span>{isExtracting ? 'Extracting...' : 'Extract Facts'}</span>
          </button>
        </div>

        {/* Filter bar */}
        <div className="flex items-center justify-between mt-3 text-[11px] text-slate-400 bg-white/[0.03] p-2 rounded-xl border border-white/5">
          <span className="font-semibold text-slate-300">Extracted Facts ({facts.length})</span>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-[#030712] text-slate-300 border border-white/10 rounded-lg px-2 py-0.5 text-[11px] focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="date">Date</option>
            <option value="amount">Amount</option>
            <option value="party">Party</option>
            <option value="event">Event</option>
            <option value="obligation">Obligation</option>
          </select>
        </div>
      </div>

      {/* Facts List */}
      <div className="space-y-2.5 max-h-[230px] overflow-y-auto pr-1">
        {filteredFacts.map((fact) => (
          <div
            key={fact.id}
            className="bg-[#030712]/80 border border-white/10 rounded-xl p-3 space-y-1.5 hover:border-pink-500/30 transition group"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-semibold text-slate-200 leading-snug">{fact.factText}</p>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border capitalize shrink-0 ${getTypeBadge(
                  fact.factType
                )}`}
              >
                {fact.factType}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-white/5">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-mono truncate max-w-[140px]">
                  📄 {fact.sourceDocument} {fact.page ? `• ${fact.page}` : ''}
                </span>
                <span className="text-emerald-400 font-semibold">{fact.confidenceScore}%</span>
              </div>

              <div className="flex items-center gap-1.5">
                {fact.verified ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </span>
                ) : (
                  <button
                    onClick={() => handleVerify(fact.id)}
                    className="px-2 py-0.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold flex items-center gap-1 transition"
                  >
                    <Clock className="w-3 h-3" />
                    Verify
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <span>Module 20 • Fact Extraction & Traceability</span>
        <span className="text-pink-400 hover:underline cursor-pointer">View Details &rarr;</span>
      </div>
    </div>
  );
};

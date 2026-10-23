import React, { useState } from 'react';
import { Shield, Plus, FileText, Link as LinkIcon } from 'lucide-react';

interface EvidenceItem {
  id: string;
  documentTitle: string;
  evidenceType: string;
  linkedFactId: string;
  custodyStatus: 'In Custody' | 'Verified' | 'In Review' | 'Transferred';
  addedBy: string;
  addedAt: string;
}

export const EvidenceManagementModule: React.FC = () => {
  const [evidenceItems, setEvidenceItems] = useState<EvidenceItem[]>([
    {
      id: 'E-001',
      documentTitle: 'Signed Contract_2025.pdf',
      evidenceType: 'Agreement',
      linkedFactId: 'F-001',
      custodyStatus: 'In Custody',
      addedBy: 'Teja Reddy',
      addedAt: '12 Jun 2025',
    },
    {
      id: 'E-002',
      documentTitle: 'Payment Invoice_001.pdf',
      evidenceType: 'Financial',
      linkedFactId: 'F-002',
      custodyStatus: 'Verified',
      addedBy: 'Teja Reddy',
      addedAt: '30 Jul 2025',
    },
    {
      id: 'E-003',
      documentTitle: 'Legal Notice_Aug.pdf',
      evidenceType: 'Correspondence',
      linkedFactId: 'F-003',
      custodyStatus: 'In Review',
      addedBy: 'Senior Advocate',
      addedAt: '15 Aug 2025',
    },
    {
      id: 'E-004',
      documentTitle: 'Email Communication_abc.pdf',
      evidenceType: 'Digital',
      linkedFactId: 'F-004',
      custodyStatus: 'Verified',
      addedBy: 'Teja Reddy',
      addedAt: '20 Aug 2025',
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);

  const handleAddEvidence = () => {
    setIsAdding(true);
    setTimeout(() => {
      const newItem: EvidenceItem = {
        id: `E-00${evidenceItems.length + 1}`,
        documentTitle: 'Bank_Statement_Q3.pdf',
        evidenceType: 'Financial',
        linkedFactId: 'F-005',
        custodyStatus: 'In Custody',
        addedBy: 'Teja Reddy',
        addedAt: 'Just now',
      };
      setEvidenceItems((prev) => [newItem, ...prev]);
      setIsAdding(false);
    }, 1000);
  };

  const getCustodyBadge = (status: string) => {
    switch (status) {
      case 'In Custody':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Verified':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'In Review':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/30';
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
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 font-extrabold text-xs flex items-center justify-center border border-teal-500/30">
              22
            </span>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-teal-400" />
                <span>Evidence Management</span>
              </h3>
              <p className="text-[11px] text-slate-400">Organize. Link. Maintain Integrity.</p>
            </div>
          </div>
          <button
            onClick={handleAddEvidence}
            disabled={isAdding}
            className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 transition flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            <span>{isAdding ? 'Adding...' : 'Add Evidence'}</span>
          </button>
        </div>

        <div className="flex items-center justify-between mt-3 text-[11px] text-slate-400 bg-white/[0.03] p-2 rounded-xl border border-white/5">
          <span className="font-semibold text-slate-300">Evidence Items ({evidenceItems.length})</span>
          <span className="text-emerald-400 font-mono text-[10px] font-bold">100% Chain-of-Custody Audited</span>
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-2.5 max-h-[230px] overflow-y-auto pr-1">
        {evidenceItems.map((item) => (
          <div
            key={item.id}
            className="bg-[#030712]/80 border border-white/10 rounded-xl p-3 space-y-1.5 hover:border-teal-500/30 transition"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-400 shrink-0" />
                <p className="text-xs font-semibold text-slate-200">{item.documentTitle}</p>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border capitalize shrink-0 ${getCustodyBadge(
                  item.custodyStatus
                )}`}
              >
                {item.custodyStatus}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-white/5 font-mono">
              <span className="text-slate-400">Type: {item.evidenceType}</span>
              <span className="text-teal-300 flex items-center gap-1 font-bold">
                <LinkIcon className="w-3 h-3" /> Linked Fact: {item.linkedFactId}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <span>Module 22 • Litigation Evidence Layer</span>
        <span className="text-teal-400 hover:underline cursor-pointer">View Details &rarr;</span>
      </div>
    </div>
  );
};

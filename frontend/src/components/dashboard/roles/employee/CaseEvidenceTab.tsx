import React, { useState } from 'react';
import { UploadCloud, ShieldCheck, FileText } from 'lucide-react';

interface EvidenceItem {
  id: string;
  name: string;
  source: string;
  dateUploaded: string;
  chainOfCustody: string;
  relevance: string;
  status: string;
}

interface CaseEvidenceTabProps {
  caseId: string;
}

export const CaseEvidenceTab: React.FC<CaseEvidenceTabProps> = ({ caseId }) => {
  const [evidenceList] = useState<EvidenceItem[]>([
    {
      id: 'EVID-001',
      name: 'Tax_Invoice_8821.pdf',
      source: 'Client ERP Direct Export',
      dateUploaded: '24 Sep 2026',
      chainOfCustody: 'Verified by Amit Sharma (Emp #001)',
      relevance: 'Proves bona fide transaction date and GST charging',
      status: 'Admissible Evidence',
    },
    {
      id: 'EVID-002',
      name: 'Bank_Statement_Q3.pdf',
      source: 'HDFC Bank Electronic Statement',
      dateUploaded: '24 Sep 2026',
      chainOfCustody: 'Verified by Amit Sharma (Emp #001)',
      relevance: 'Proves full payment disbursed to supplier',
      status: 'Admissible Evidence',
    },
    {
      id: 'EVID-003',
      name: 'E_Way_Bill_99210.pdf',
      source: 'E-Way Bill Portal',
      dateUploaded: '24 Sep 2026',
      chainOfCustody: 'Verified by Amit Sharma (Emp #001)',
      relevance: 'Proves physical movement and receipt of goods',
      status: 'Admissible Evidence',
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>Evidence Management (Module 14) — {caseId}</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30">
              {evidenceList.length} Verified Evidence Items
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Tamper-evident evidentiary materials with chain-of-custody tracking.
          </p>
        </div>

        <button className="px-3.5 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer">
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Upload New Evidence</span>
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="pb-3 font-semibold">Evidence ID</th>
                <th className="pb-3 font-semibold">Document / File</th>
                <th className="pb-3 font-semibold">Source</th>
                <th className="pb-3 font-semibold">Chain of Custody</th>
                <th className="pb-3 font-semibold">Legal Relevance</th>
                <th className="pb-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {evidenceList.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02]">
                  <td className="py-3 font-mono font-bold text-[#00B8FF]">{item.id}</td>
                  <td className="py-3 font-bold text-white flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#00B8FF]" />
                    {item.name}
                  </td>
                  <td className="py-3 text-slate-300">{item.source}</td>
                  <td className="py-3 font-mono text-emerald-400 text-[11px] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {item.chainOfCustody}
                  </td>
                  <td className="py-3 text-slate-300 max-w-xs">{item.relevance}</td>
                  <td className="py-3 text-right">
                    <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 text-[10px]">
                      {item.status}
                    </span>
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

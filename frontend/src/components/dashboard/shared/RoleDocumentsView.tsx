import React from 'react';
import { FileText, Download, ShieldCheck } from 'lucide-react';

interface DocumentItem {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
  status: string;
}

interface RoleDocumentsViewProps {
  documents?: DocumentItem[];
  roleTitle?: string;
}

export const RoleDocumentsView: React.FC<RoleDocumentsViewProps> = ({ documents, roleTitle }) => {
  const defaultDocs: DocumentItem[] = [
    { id: 'DOC-101', name: 'Contract_Agreement_2025.pdf', type: 'Legal Contract', date: '2 hours ago', size: '2.4 MB', status: 'Verified' },
    { id: 'DOC-102', name: 'GST_Return_Filing_Q3.pdf', type: 'Tax Record', date: '1 day ago', size: '1.1 MB', status: 'Completed' },
    { id: 'DOC-103', name: 'Compliance_Audit_Dossier.pdf', type: 'Audit Document', date: '3 days ago', size: '4.8 MB', status: 'In Review' },
  ];

  const list = documents && documents.length > 0 ? documents : defaultDocs;

  return (
    <div className="space-y-5 max-w-5xl mx-auto">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#00B8FF]" />
            <span>Permitted Documents ({roleTitle || 'Your Workspace'})</span>
          </h2>
          <p className="text-xs text-slate-400">Documents strictly authorized and accessible for your user role.</p>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="border-b border-white/10 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              <tr>
                <th className="py-3 px-4">Document Name</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {list.map((doc) => (
                <tr key={doc.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 font-semibold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#00B8FF] shrink-0" />
                    <span>{doc.name}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{doc.type}</td>
                  <td className="py-3 px-4 font-mono text-slate-400">{doc.size}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{doc.date}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 w-fit">
                      <ShieldCheck className="w-3 h-3" />
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="px-3 py-1 rounded-lg bg-[#00B8FF]/10 hover:bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30 font-semibold text-xs flex items-center gap-1 ml-auto transition-all cursor-pointer">
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
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

export default RoleDocumentsView;

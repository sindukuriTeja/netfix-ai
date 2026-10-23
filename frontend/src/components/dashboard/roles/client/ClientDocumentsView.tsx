import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Search,
  RotateCcw,
  Eye,
  Download
} from 'lucide-react';

interface ClientDocumentsViewProps {
  onOpenDocument: (documentId: string) => void;
  onOpenUpload: () => void;
}

export const ClientDocumentsView: React.FC<ClientDocumentsViewProps> = ({
  onOpenDocument,
  onOpenUpload,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [matterFilter, setMatterFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const documents = [
    { id: 'DOC-101', name: 'Contract_Agreement_2025.pdf', matterId: 'MAT-301', type: 'Legal Contract', uploadedBy: 'Legal Team', date: '25 Sep 2026', status: 'Verified' },
    { id: 'DOC-102', name: 'GST_Return_Filing_Q3.pdf', matterId: 'MAT-299', type: 'Tax Record', uploadedBy: 'Legal Team', date: '20 Sep 2026', status: 'Completed' },
    { id: 'DOC-103', name: 'Compliance_Audit_Dossier.pdf', matterId: 'MAT-301', type: 'Audit Document', uploadedBy: 'Legal Team', date: '18 Sep 2026', status: 'In Review' },
    { id: 'DOC-104', name: 'Evidence_Set_1.pdf', matterId: 'MAT-178', type: 'Evidence', uploadedBy: 'Legal Team', date: '15 Sep 2026', status: 'Verified' },
    { id: 'DOC-105', name: 'Tax_Advisory_Note.docx', matterId: 'MAT-301', type: 'Advisory', uploadedBy: 'Amit Sharma', date: '10 Sep 2026', status: 'Completed' },
  ];

  const filteredDocs = documents.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.matterId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMatter = matterFilter === 'All' || d.matterId === matterFilter;
    const matchesType = typeFilter === 'All' || d.type === typeFilter;
    return matchesSearch && matchesMatter && matchesType;
  });

  const handleDownloadBlob = (docName: string) => {
    const element = document.createElement('a');
    const file = new Blob([`NETFIX AI MARG GROUP - Document Download File: ${docName}\nDownloaded at: ${new Date().toISOString()}`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = docName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#00B8FF]" />
            <span>Documents ({documents.length})</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            View, preview, download and manage documents shared with you.
          </p>
        </div>
        <button
          onClick={onOpenUpload}
          className="px-4 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-sky-500/20"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Filter Bar (Ref Panel 5) */}
      <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex-1 min-w-[240px] relative">
          <input
            type="text"
            placeholder="Search documents by name or matter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#041828] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={matterFilter}
            onChange={(e) => setMatterFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-xs text-slate-300 font-medium focus:outline-none focus:border-[#00B8FF]"
          >
            <option value="All">All Matters</option>
            <option value="MAT-301">MAT-301</option>
            <option value="MAT-299">MAT-299</option>
            <option value="MAT-178">MAT-178</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-xs text-slate-300 font-medium focus:outline-none focus:border-[#00B8FF]"
          >
            <option value="All">All Types</option>
            <option value="Legal Contract">Legal Contract</option>
            <option value="Tax Record">Tax Record</option>
            <option value="Audit Document">Audit Document</option>
          </select>

          <button
            onClick={() => {
              setSearchQuery('');
              setMatterFilter('All');
              setTypeFilter('All');
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-all cursor-pointer"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Document Table (Ref Panel 5) */}
      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#041828] text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-3.5 rounded-l-lg">Document Name</th>
                <th className="p-3.5">Matter</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Uploaded By</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-white/[0.02] transition-all">
                  <td className="p-3.5">
                    <button
                      onClick={() => onOpenDocument(doc.id)}
                      className="font-bold text-[#00B8FF] hover:underline flex items-center gap-2 cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-[#00B8FF] shrink-0" />
                      <span>{doc.name}</span>
                    </button>
                  </td>
                  <td className="p-3.5 font-mono text-slate-300">{doc.matterId}</td>
                  <td className="p-3.5 text-slate-300 font-medium">{doc.type}</td>
                  <td className="p-3.5 text-slate-400">{doc.uploadedBy}</td>
                  <td className="p-3.5 font-mono text-slate-400">{doc.date}</td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold border ${
                      doc.status === 'Verified' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-sky-500/20 text-sky-300 border-sky-500/30'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onOpenDocument(doc.id)}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => handleDownloadBlob(doc.name)}
                        className="px-2.5 py-1 rounded-lg bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </div>
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

export default ClientDocumentsView;

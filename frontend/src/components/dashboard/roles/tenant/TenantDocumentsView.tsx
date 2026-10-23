import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Search,
  RotateCcw,
  Eye,
  Download
} from 'lucide-react';

interface TenantDocumentsViewProps {
  onOpenDocument: (docId: string) => void;
  onOpenUpload: () => void;
  onOpenRequestAccess: () => void;
}

export const TenantDocumentsView: React.FC<TenantDocumentsViewProps> = ({
  onOpenDocument,
  onOpenUpload,
  onOpenRequestAccess,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const documents = [
    { id: 'DOC-204', name: 'Contract_Agreement_2025.pdf', type: 'Legal', property: 'Riverside Tower', uploadedBy: 'Legal Team', date: '20 Sep 2025', status: 'Verified' },
    { id: 'DOC-205', name: 'GST_Return_Q3.pdf', type: 'Tax Record', property: 'Maple Business Park', uploadedBy: 'Finance Team', date: '18 Sep 2025', status: 'Completed' },
    { id: 'DOC-206', name: 'Compliance_Certificate.pdf', type: 'Compliance', property: 'Skyline Plaza', uploadedBy: 'Express Team', date: '15 Sep 2025', status: 'In Review' },
  ];

  const filteredDocs = documents.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.property.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All' || d.type === typeFilter;
    const matchesStatus = statusFilter === 'All' || d.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleDownloadBlob = (docName: string) => {
    const element = document.createElement('a');
    const file = new Blob([`NETFIX AI MARG GROUP - Document: ${docName}\nDownloaded: ${new Date().toISOString()}`], { type: 'text/plain' });
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
            <span>Authorized Documents ({documents.length})</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            View, download and manage documents shared with you.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenRequestAccess}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-bold text-xs cursor-pointer"
          >
            Request Access
          </button>
          <button
            onClick={onOpenUpload}
            className="px-4 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-sky-500/20"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* Filter Bar (Ref Panel 5) */}
      <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex-1 min-w-[240px] relative">
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#041828] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-xs text-slate-300 font-medium focus:outline-none focus:border-[#00B8FF]"
          >
            <option value="All">All Types</option>
            <option value="Legal">Legal</option>
            <option value="Tax Record">Tax Record</option>
            <option value="Compliance">Compliance</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-xs text-slate-300 font-medium focus:outline-none focus:border-[#00B8FF]"
          >
            <option value="All">All Status</option>
            <option value="Verified">Verified</option>
            <option value="Completed">Completed</option>
            <option value="In Review">In Review</option>
          </select>

          <button
            onClick={() => {
              setSearchQuery('');
              setTypeFilter('All');
              setStatusFilter('All');
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
                <th className="p-3.5 rounded-l-lg">Name</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Property</th>
                <th className="p-3.5">Uploaded By</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-white/[0.02]">
                  <td className="p-3.5">
                    <button
                      onClick={() => onOpenDocument(doc.id)}
                      className="font-bold text-[#00B8FF] hover:underline flex items-center gap-2 cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-[#00B8FF] shrink-0" />
                      <span>{doc.name}</span>
                    </button>
                  </td>
                  <td className="p-3.5 text-slate-300 font-medium">{doc.type}</td>
                  <td className="p-3.5 font-mono text-slate-300">{doc.property}</td>
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

export default TenantDocumentsView;

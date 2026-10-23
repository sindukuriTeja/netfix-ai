import React, { useState, useRef } from 'react';
import { FileText, Search, Download, UploadCloud, Eye, X } from 'lucide-react';

interface ExecutiveDoc {
  id: string;
  name: string;
  matterId: string;
  type: string;
  size: string;
  date: string;
  status: 'Verified' | 'Flagged';
}

export const ManagementDocumentsView: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [documents, setDocuments] = useState<ExecutiveDoc[]>([
    { id: 'DOC-8821', name: 'Contract_Agreement_2025.pdf', matterId: 'CASE-102', type: 'Legal Contract', size: '2.4 MB', date: '2 hours ago', status: 'Verified' },
    { id: 'DOC-9042', name: 'GST_Return_Q3.pdf', matterId: 'CASE-087', type: 'Tax Return', size: '1.8 MB', date: '1 day ago', status: 'Flagged' },
    { id: 'DOC-0873', name: 'Auditor_Compliance_Report.pdf', matterId: 'CASE-091', type: 'Compliance', size: '4.1 MB', date: '2 days ago', status: 'Verified' },
    { id: 'DOC-0914', name: 'Financial_Statement_FY25.pdf', matterId: 'CASE-105', type: 'Financial', size: '5.2 MB', date: '3 days ago', status: 'Verified' },
    { id: 'DOC-0915', name: 'Evidence_Photo.png', matterId: 'CASE-102', type: 'Image', size: '1.6 MB', date: '4 days ago', status: 'Verified' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [previewDoc, setPreviewDoc] = useState<ExecutiveDoc | null>(null);

  const triggerFileUpload = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setUploadProgress(`Uploading ${file.name}...`);

    setTimeout(() => {
      const newDoc: ExecutiveDoc = {
        id: `DOC-${Math.floor(1000 + Math.random() * 9000)}`,
        name: file.name,
        matterId: 'CASE-102',
        type: file.type.includes('image') ? 'Image' : file.type.includes('pdf') ? 'PDF Document' : 'Corporate Doc',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        date: 'Just now',
        status: 'Verified',
      };
      setDocuments((prev) => [newDoc, ...prev]);
      setUploadProgress(null);
      if (e.target) e.target.value = '';
    }, 1200);
  };

  const filteredDocs = documents.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.matterId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#00B8FF]" />
            <span>Documents (Firm-wide / Executive Access)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Role-scoped document repository across all corporate entities and matters.
          </p>
        </div>

        <button
          onClick={triggerFileUpload}
          className="px-4 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {uploadProgress && (
        <div className="p-3 rounded-xl bg-[#00B8FF]/10 border border-[#00B8FF]/30 text-xs text-[#00B8FF] font-mono animate-pulse">
          {uploadProgress}
        </div>
      )}

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search documents, matters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
        </div>
      </div>

      {/* Document Table */}
      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="pb-3 font-semibold">Document Name</th>
                <th className="pb-3 font-semibold">Matter</th>
                <th className="pb-3 font-semibold">Type</th>
                <th className="pb-3 font-semibold">Size</th>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredDocs.map((d) => (
                <tr key={d.id} className="hover:bg-white/[0.02]">
                  <td className="py-3.5 font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#00B8FF]" />
                    {d.name}
                  </td>
                  <td className="py-3.5 font-mono text-[#00B8FF] font-bold">{d.matterId}</td>
                  <td className="py-3.5 text-slate-300">{d.type}</td>
                  <td className="py-3.5 font-mono text-slate-400">{d.size}</td>
                  <td className="py-3.5 font-mono text-slate-400">{d.date}</td>
                  <td className="py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        d.status === 'Verified'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {d.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setPreviewDoc(d)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer"
                        title="Preview Document"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          const blob = new Blob([`Content of ${d.name}`], { type: 'text/plain' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = d.name;
                          a.click();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" /> Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#081525] border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#00B8FF]" /> Document Preview: {previewDoc.name}
              </h3>
              <button onClick={() => setPreviewDoc(null)} className="text-slate-400 hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-4 rounded-xl bg-[#041828] border border-white/5 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300"><span>File Name:</span><span className="font-bold text-white">{previewDoc.name}</span></div>
              <div className="flex justify-between text-slate-300"><span>Matter ID:</span><span className="font-mono text-[#00B8FF] font-bold">{previewDoc.matterId}</span></div>
              <div className="flex justify-between text-slate-300"><span>Type:</span><span className="font-bold text-white">{previewDoc.type}</span></div>
              <div className="flex justify-between text-slate-300"><span>Status:</span><span className="font-bold text-emerald-400">{previewDoc.status}</span></div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setPreviewDoc(null)} className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-bold cursor-pointer">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useRef } from 'react';
import { FileText, Search, Download, UploadCloud, Eye, X } from 'lucide-react';

interface AdvocateDoc {
  id: string;
  name: string;
  type: string;
  uploadedBy: string;
  date: string;
  size: string;
  status: 'Verified' | 'Processed' | 'Pending';
}

export const AdvocateDocumentsView: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [documents, setDocuments] = useState<AdvocateDoc[]>([
    { id: 'DOC-2041', name: 'Contract_Agreement.pdf', type: 'Legal Agreement', uploadedBy: 'Ananya Rao', date: '24 Sep 2026', size: '2.4 MB', status: 'Verified' },
    { id: 'DOC-2042', name: 'Reply_Affidavit.pdf', type: 'Court Filing', uploadedBy: 'Ananya Rao', date: '20 Sep 2026', size: '1.1 MB', status: 'Processed' },
    { id: 'DOC-2043', name: 'GST_Return_Q3.pdf', type: 'Tax Record', uploadedBy: 'Client', date: '20 Sep 2026', size: '1.8 MB', status: 'Verified' },
    { id: 'DOC-2044', name: 'Notice_166.pdf', type: 'Legal Notice', uploadedBy: 'Ananya Rao', date: '18 Sep 2026', size: '4.2 MB', status: 'Processed' },
    { id: 'DOC-2045', name: 'Email_Correspondence.eml', type: 'Correspondence', uploadedBy: 'Client', date: '15 Sep 2026', size: '640 KB', status: 'Processed' },
    { id: 'DOC-2046', name: 'Evidence_Photo.jpg', type: 'Image', uploadedBy: 'Client', date: '14 Sep 2026', size: '2.1 MB', status: 'Pending' },
  ]);

  const [previewDoc, setPreviewDoc] = useState<AdvocateDoc | null>(null);

  const triggerFileUpload = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setUploadProgress(`Uploading ${file.name}...`);

    setTimeout(() => {
      const newDoc: AdvocateDoc = {
        id: `DOC-${Math.floor(1000 + Math.random() * 9000)}`,
        name: file.name,
        type: file.type.includes('image') ? 'Image' : file.type.includes('pdf') ? 'PDF Document' : 'Legal Document',
        uploadedBy: 'Ananya Rao',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        status: 'Verified',
      };
      setDocuments((prev) => [newDoc, ...prev]);
      setUploadProgress(null);
      if (e.target) e.target.value = '';
    }, 1200);
  };

  const filteredDocs = documents.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.type.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeFilter === 'All') return matchesSearch;
    return matchesSearch && d.status === activeFilter;
  });

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

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#00B8FF]" />
            <span>MAT-204 &gt; Documents</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real file upload and document management repository for authorized case files.
          </p>
        </div>

        <button
          onClick={triggerFileUpload}
          className="px-4 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#00B8FF]/20"
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

      {/* Filter Bar & Controls */}
      <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          {[
            { id: 'All', label: `All Documents (${documents.length})` },
            { id: 'Processed', label: 'Processed (5)' },
            { id: 'Pending', label: 'Pending (1)' },
            { id: 'Verified', label: 'Verified (4)' },
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

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
          <div className="relative sm:col-span-2">
            <input
              type="text"
              placeholder="Search case name, citation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          </div>
          <select className="p-2 rounded-xl bg-[#041828] border border-white/10 text-slate-300">
            <option>Court — High Court</option>
          </select>
          <select className="p-2 rounded-xl bg-[#041828] border border-white/10 text-slate-300">
            <option>Year — 2026</option>
          </select>
          <select className="p-2 rounded-xl bg-[#041828] border border-white/10 text-slate-300">
            <option>Document Type — All</option>
          </select>
        </div>
      </div>

      {/* Document Table */}
      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="pb-3 font-semibold">Document Name</th>
                <th className="pb-3 font-semibold">Type</th>
                <th className="pb-3 font-semibold">Uploaded By</th>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Size</th>
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
                  <td className="py-3.5 text-slate-300">{d.type}</td>
                  <td className="py-3.5 text-slate-300">{d.uploadedBy}</td>
                  <td className="py-3.5 font-mono text-slate-400">{d.date}</td>
                  <td className="py-3.5 font-mono text-slate-400">{d.size}</td>
                  <td className="py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        d.status === 'Verified'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : d.status === 'Processed'
                          ? 'bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30'
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
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#00B8FF] cursor-pointer"
                        title="Download Document"
                      >
                        <Download className="w-3.5 h-3.5" />
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
                <FileText className="w-4 h-4 text-[#00B8FF]" /> Preview: {previewDoc.name}
              </h3>
              <button onClick={() => setPreviewDoc(null)} className="text-slate-400 hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-4 rounded-xl bg-[#041828] border border-white/5 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300"><span>Document Name:</span><span className="font-bold text-white">{previewDoc.name}</span></div>
              <div className="flex justify-between text-slate-300"><span>Type:</span><span className="font-bold text-white">{previewDoc.type}</span></div>
              <div className="flex justify-between text-slate-300"><span>Uploaded By:</span><span className="font-bold text-white">{previewDoc.uploadedBy}</span></div>
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

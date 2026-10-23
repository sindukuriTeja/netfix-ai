import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Search,
  CheckCircle2,
  Eye,
  Download
} from 'lucide-react';

interface AuditorDocumentsViewProps {
  onOpenUploadModal: () => void;
  onOpenReview: (reviewId: string) => void;
}

export const AuditorDocumentsView: React.FC<AuditorDocumentsViewProps> = ({
  onOpenUploadModal,
  onOpenReview,
}) => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadFeedback, setDownloadFeedback] = useState<string | null>(null);

  const documents = [
    { id: 'DOC-204', name: 'Contract_Agreement_2025.pdf', type: 'Legal Contract', reviewId: 'AUD-103', uploadedBy: 'Admin', date: '12 Sep 2025', status: 'Verified' },
    { id: 'DOC-198', name: 'GST_Return_Filing.pdf', type: 'Tax Record', reviewId: 'AUD-103', uploadedBy: 'Finance', date: '10 Sep 2025', status: 'Verified' },
    { id: 'DOC-182', name: 'Compliance_Certificate.pdf', type: 'Policy', reviewId: 'AUD-101', uploadedBy: 'Legal', date: '08 Sep 2025', status: 'Pending' },
    { id: 'DOC-174', name: 'Board_Resolution.pdf', type: 'Governance', reviewId: 'AUD-101', uploadedBy: 'Admin', date: '06 Sep 2025', status: 'Restricted' },
    { id: 'DOC-160', name: 'Audit_Certificate.pdf', type: 'Statutory', reviewId: 'AUD-095', uploadedBy: 'Auditor', date: '05 Sep 2025', status: 'Verified' },
  ];

  const handleDownload = (docName: string) => {
    const dummyContent = `NETFIX AI — AUTHORIZED DOCUMENT ACCESS\nDocument: ${docName}\nDownloaded By: Priya Nair (Auditor Scope AUD-001)\nTimestamp: ${new Date().toISOString()}\n`;
    const blob = new Blob([dummyContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = docName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadFeedback(`Downloaded ${docName}`);
    setTimeout(() => setDownloadFeedback(null), 3000);
  };

  const filtered = documents.filter((d) => {
    if (statusFilter !== 'All' && d.status !== statusFilter) return false;
    if (
      searchQuery &&
      !d.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !d.type.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Toast feedback */}
      {downloadFeedback && (
        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold font-mono animate-bounce flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{downloadFeedback}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-[#00B8FF]" />
            <span>Authorized Documents</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage documents accessible for your auditor scope.
          </p>
        </div>

        <button
          onClick={onOpenUploadModal}
          className="px-4 py-2 rounded-xl bg-[#00B8FF] text-black font-bold text-xs hover:bg-[#0096d6] transition-colors flex items-center gap-2 shadow-lg shadow-[#00B8FF]/20"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* 6 KPI Badges (Matching Panel 9) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Total Documents</span>
          <div className="text-2xl font-extrabold text-[#00B8FF] font-mono">68</div>
          <span className="text-[10px] text-slate-500">Authorized scope</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Verified</span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">52</div>
          <span className="text-[10px] text-emerald-400/80 font-bold">Passed integrity</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Pending Review</span>
          <div className="text-2xl font-extrabold text-amber-400 font-mono">8</div>
          <span className="text-[10px] text-amber-400/80 font-bold">Awaiting check</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Restricted</span>
          <div className="text-2xl font-extrabold text-rose-400 font-mono">4</div>
          <span className="text-[10px] text-rose-400/80 font-bold">High security</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Expired</span>
          <div className="text-2xl font-extrabold text-slate-400 font-mono">2</div>
          <span className="text-[10px] text-slate-500">Requires renewal</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Recently Accessed</span>
          <div className="text-2xl font-extrabold text-sky-400 font-mono">10</div>
          <span className="text-[10px] text-slate-500">Last 7 days</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#081525] border border-white/10 text-xs font-medium text-slate-400">
          {['All', 'Verified', 'Pending', 'Restricted'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                statusFilter === st ? 'bg-[#00B8FF] text-black font-bold shadow-md' : 'hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative flex-1 md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-[#081525] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF]"
          />
        </div>
      </div>

      {/* Documents Table (Matching Panel 9) */}
      <div className="rounded-2xl bg-[#081525]/90 border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-[#040e1a] text-slate-400 font-mono">
                <th className="p-3.5 pl-4">Document Name</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Review ID</th>
                <th className="p-3.5">Uploaded By</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 pr-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {filtered.map((doc) => (
                <tr key={doc.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3.5 pl-4 font-bold text-white font-mono flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#00B8FF] shrink-0" />
                    <span>{doc.name}</span>
                  </td>
                  <td className="p-3.5 font-mono text-slate-300">{doc.type}</td>
                  <td
                    onClick={() => onOpenReview(doc.reviewId)}
                    className="p-3.5 font-mono text-[#00B8FF] hover:underline cursor-pointer"
                  >
                    {doc.reviewId}
                  </td>
                  <td className="p-3.5 text-slate-300">{doc.uploadedBy}</td>
                  <td className="p-3.5 font-mono text-slate-400">{doc.date}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold font-mono ${
                        doc.status === 'Verified'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : doc.status === 'Pending'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td className="p-3.5 pr-4 text-right space-x-1">
                    <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white">
                      <Eye className="w-3.5 h-3.5 text-[#00B8FF]" />
                    </button>
                    <button
                      onClick={() => handleDownload(doc.name)}
                      className="p-1.5 rounded-lg bg-[#00B8FF]/10 hover:bg-[#00B8FF]/20 text-[#00B8FF]"
                      title="Download Document"
                    >
                      <Download className="w-3.5 h-3.5" />
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

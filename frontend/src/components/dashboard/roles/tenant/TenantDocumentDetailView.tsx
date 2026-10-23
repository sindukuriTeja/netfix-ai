import React, { useState } from 'react';
import {
  ArrowLeft,
  Download,
  Upload,
  CheckCircle2,
  FileText,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface TenantDocumentDetailViewProps {
  documentId?: string;
  onBack: () => void;
  onOpenUpload: () => void;
}

export const TenantDocumentDetailView: React.FC<TenantDocumentDetailViewProps> = ({
  onBack,
  onOpenUpload,
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [feedback, setFeedback] = useState<string | null>(null);

  const docData = {
    id: 'DOC-204',
    name: 'Contract_Agreement_2025.pdf',
    type: 'Legal Contract',
    property: 'Riverside Tower - Unit 501',
    agreement: 'AGR-001',
    uploadedBy: 'Legal Team',
    uploadedOn: '20 Sep 2025',
    size: '2.4 MB',
    version: 'v2.0',
    status: 'Verified',
  };

  const handleDownloadBlob = () => {
    const element = document.createElement('a');
    const file = new Blob([`NETFIX AI MARG GROUP - Document: ${docData.name}\nVersion: ${docData.version}\nProperty: ${docData.property}`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = docData.name;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setFeedback('Document downloaded successfully.');
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Breadcrumb Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#00B8FF] transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Documents</span>
        </button>

        <button
          onClick={handleDownloadBlob}
          className="px-4 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-sky-500/20"
        >
          <Download className="w-4 h-4" />
          <span>Download</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Split Viewer & Details (Ref Panel 11) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Pane: PDF Document Viewer */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4 flex flex-col justify-between min-h-[560px]">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs text-slate-400 font-mono">
            <span>Document Preview ({docData.name})</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel((z) => Math.max(75, z - 10))}
                className="p-1 rounded bg-white/5 hover:bg-white/10"
              >
                <ZoomOut className="w-3.5 h-3.5 text-slate-300" />
              </button>
              <span className="text-white font-bold">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
                className="p-1 rounded bg-white/5 hover:bg-white/10"
              >
                <ZoomIn className="w-3.5 h-3.5 text-slate-300" />
              </button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center p-6 bg-[#04121F] rounded-xl border border-white/5">
            <div
              className="bg-white text-slate-900 p-8 rounded-lg shadow-2xl max-w-md w-full space-y-4 transition-all"
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center center' }}
            >
              <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                <div className="w-8 h-8 rounded bg-[#04121F] text-[#00B8FF] flex items-center justify-center font-bold text-xs">
                  M
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">MARG Commercial Group</h4>
                  <span className="text-[9px] text-slate-500 uppercase tracking-wider block">Commercial Lease Agreement</span>
                </div>
              </div>

              <div className="space-y-2 text-[11px] text-slate-700">
                <h3 className="font-extrabold text-slate-900 text-sm">Commercial Lease Agreement</h3>
                <p className="leading-relaxed text-[10px]">
                  Property: Riverside Tower Unit 501, Mumbai. Executed by Arjun Patel.
                </p>
                <div className="p-3 bg-slate-100 rounded border border-slate-200 space-y-1 text-[9px]">
                  <div><strong>Clause 1:</strong> Lease Duration: 01 Jan 2025 to 31 Dec 2026</div>
                  <div><strong>Clause 2:</strong> Monthly Rent & Escrow Terms</div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-[9px] text-slate-500 font-mono">
                <span>Ref: AGR-001/v2.0</span>
                <span>Page {pageNumber} / 12</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs">
            <button
              onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
              disabled={pageNumber === 1}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 font-bold disabled:opacity-40 cursor-pointer flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous Page</span>
            </button>

            <span className="font-mono text-slate-400">Page <strong className="text-white">{pageNumber}</strong> of 12</span>

            <button
              onClick={() => setPageNumber((p) => Math.min(12, p + 1))}
              disabled={pageNumber === 12}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 font-bold disabled:opacity-40 cursor-pointer flex items-center gap-1"
            >
              <span>Next Page</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Pane: Metadata & Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <FileText className="w-4 h-4 text-[#00B8FF]" />
              <span>Document Details</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Document ID</span>
                <span className="font-mono text-[#00B8FF] font-bold block">{docData.id}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Type</span>
                <span className="text-white font-bold">{docData.type}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Property</span>
                <span className="text-slate-200 font-semibold">{docData.property}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Agreement</span>
                <span className="font-mono text-slate-200">{docData.agreement}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Uploaded By</span>
                <span className="text-slate-200 font-semibold">{docData.uploadedBy}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Uploaded On</span>
                <span className="font-mono text-slate-300">{docData.uploadedOn}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Size</span>
                <span className="font-mono text-slate-300">{docData.size}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Version</span>
                <span className="font-mono text-white font-bold">{docData.version}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Status</span>
                <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {docData.status}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-3">
            <button
              onClick={handleDownloadBlob}
              className="w-full py-3 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-sky-500/20"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={onOpenUpload}
              className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border border-white/10"
            >
              <Upload className="w-4 h-4 text-[#00B8FF]" />
              <span>Upload New Version</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantDocumentDetailView;

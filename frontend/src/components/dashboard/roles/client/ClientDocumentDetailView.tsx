import React, { useState } from 'react';
import {
  ArrowLeft,
  Download,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface ClientDocumentDetailViewProps {
  documentId?: string;
  onBack: () => void;
}

export const ClientDocumentDetailView: React.FC<ClientDocumentDetailViewProps> = ({
  onBack,
}) => {
  const [docStatus, setDocStatus] = useState('Verified');
  const [pageNumber, setPageNumber] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const docData = {
    name: 'Contract_Agreement_2025.pdf',
    matter: 'MAT-301 - Corporate Structuring',
    type: 'Legal Contract',
    uploadedBy: 'Legal Team',
    uploadedOn: '25 Sep 2026, 10:30 AM',
    version: '2.0',
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([`NETFIX AI MARG GROUP - Document File: ${docData.name}\nVersion: ${docData.version}\nMatter: ${docData.matter}`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = docData.name;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setActionFeedback('Document downloaded successfully.');
    setTimeout(() => setActionFeedback(null), 3000);
  };

  const handleApprove = () => {
    setDocStatus('Approved by Client');
    setActionFeedback('Document approved successfully.');
    setTimeout(() => setActionFeedback(null), 3000);
  };

  const handleRequestChanges = () => {
    const reason = prompt('Enter details of requested changes:');
    if (reason) {
      setDocStatus('Changes Requested');
      setActionFeedback(`Changes requested: "${reason}"`);
      setTimeout(() => setActionFeedback(null), 4000);
    }
  };

  const handleReject = () => {
    if (confirm('Are you sure you want to reject this document?')) {
      setDocStatus('Rejected');
      setActionFeedback('Document rejected.');
      setTimeout(() => setActionFeedback(null), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#00B8FF] transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Documents</span>
          <span className="text-slate-600">/</span>
          <span className="text-[#00B8FF] font-mono">{docData.name}</span>
        </button>

        <button
          onClick={handleDownload}
          className="px-4 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-sky-500/20"
        >
          <Download className="w-4 h-4" />
          <span>Download</span>
        </button>
      </div>

      {actionFeedback && (
        <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4" />
          <span>{actionFeedback}</span>
        </div>
      )}

      {/* Main 2-Column Split View (Ref Panel 6) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Pane: Interactive Document Preview (Ref Panel 6) */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4 flex flex-col justify-between min-h-[560px]">
          {/* Document Content Simulation Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs text-slate-400 font-mono">
            <span>Document Preview (Page {pageNumber} of 12)</span>
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

          {/* Document Paper Preview Layout (Ref Panel 6) */}
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
                  <h4 className="font-bold text-slate-900 text-xs">MARG Legal Associates</h4>
                  <span className="text-[9px] text-slate-500 uppercase tracking-wider block">Commercial Agreement</span>
                </div>
              </div>

              <div className="space-y-2 text-[11px] text-slate-700">
                <h3 className="font-extrabold text-slate-900 text-sm">Commercial Agreement — Restructuring</h3>
                <p className="leading-relaxed text-[10px]">
                  This agreement is entered into as of 25th September 2026 by and between MARG Group and Reddy Enterprises Pvt Ltd regarding Tax Advisory & Corporate Structure Optimization.
                </p>
                <div className="p-3 bg-slate-100 rounded border border-slate-200 space-y-1 text-[9px]">
                  <div><strong>Clause 1.1:</strong> Scope of Tax Restructuring under Section 73</div>
                  <div><strong>Clause 2.3:</strong> Intellectual Property and Client Confidentiality</div>
                  <div><strong>Clause 4.0:</strong> Dispute Resolution & Arbitration Terms</div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-[9px] text-slate-500 font-mono">
                <span>Ref: MAT-301/v2.0</span>
                <span>Page {pageNumber} / 12</span>
              </div>
            </div>
          </div>

          {/* Viewer Page Navigation Footer */}
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

        {/* Right Pane: Document Information & Action Buttons (Ref Panel 6) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Document Info Card */}
          <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <FileText className="w-4 h-4 text-[#00B8FF]" />
              <span>Document Information</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Name</span>
                <span className="font-bold text-white block truncate">{docData.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Matter</span>
                <span className="font-mono text-[#00B8FF] font-bold block">{docData.matter}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Type</span>
                <span className="text-slate-200 font-semibold">{docData.type}</span>
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
                <span className="text-slate-400 block mb-0.5">Version</span>
                <span className="font-mono text-slate-200 font-bold">{docData.version}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Status</span>
                <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {docStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons Box (Ref Panel 6) */}
          <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Actions</h3>

            <button
              onClick={handleDownload}
              className="w-full py-3 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-sky-500/20"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={handleApprove}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Approve Document</span>
            </button>

            <button
              onClick={handleRequestChanges}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Request Changes</span>
            </button>

            <button
              onClick={handleReject}
              className="w-full py-3 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/30 font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <XCircle className="w-4 h-4" />
              <span>Reject Document</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDocumentDetailView;

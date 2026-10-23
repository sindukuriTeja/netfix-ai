import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Download,
  Eye,
  FileText
} from 'lucide-react';

interface AuditorEvidenceDetailViewProps {
  evidenceId: string;
  onBack: () => void;
  onOpenRequirementDetail?: (reqId: string) => void;
}

export const AuditorEvidenceDetailView: React.FC<AuditorEvidenceDetailViewProps> = ({
  evidenceId,
  onBack,
  onOpenRequirementDetail,
}) => {
  const [subTab, setSubTab] = useState<'overview' | 'verification' | 'requirements' | 'controls' | 'findings' | 'versions' | 'audit-trail'>('overview');

  const ev = {
    id: evidenceId || 'EVD-038',
    fileName: 'GST_Return_Q3.pdf',
    type: 'GST Return',
    fileSize: '1.2 MB',
    source: 'Accounting Software (Finance)',
    uploadedBy: 'Priya Sharma (Finance)',
    uploadedOn: '12 Sep 2025, 10:22 AM',
    version: '1.0',
    hash: 'SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    status: 'Verified',
    verifiedBy: 'Priya Nair',
    verifiedOn: '12 Sep 2025',
    method: 'Document review + data validation',
    validity: '12 Sep 2025 – 12 Mar 2026',
    qualityScore: '98%',
    supportedReqs: [
      { id: 'REQ-GST-014', name: 'GST Return Filing', regulation: 'GST Act' },
    ],
    supportedControls: [
      { id: 'CTL-021', name: 'GST Return Reconciliation', status: 'Effective' },
    ]
  };

  const handleDownload = () => {
    const dummyContent = `NETFIX AI — AUDIT EVIDENCE VERIFIED COPY\nEvidence ID: ${ev.id}\nDocument: ${ev.fileName}\nSHA256: ${ev.hash}\nStatus: ${ev.status}\nVerified By: ${ev.verifiedBy}\nDate: ${ev.verifiedOn}\n`;
    const blob = new Blob([dummyContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = ev.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-2 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 text-[#00B8FF] group-hover:-translate-x-1 transition-transform" />
          <span>Back to Evidence Register</span>
        </button>

        <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
          <span>Evidence Register</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-[#00B8FF] font-bold">{ev.id}</span>
        </span>
      </div>

      {/* Header Banner (Panel 7) */}
      <div className="p-6 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-extrabold text-white tracking-tight font-mono">
                {ev.id} <span className="text-slate-400 font-sans">—</span> {ev.fileName}
              </h1>
              <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {ev.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-semibold">{ev.type} • Uploaded on {ev.uploadedOn}</p>
          </div>

          <button
            onClick={handleDownload}
            className="px-4 py-2 rounded-xl bg-[#00B8FF] text-black font-bold text-xs hover:bg-[#0096d6] transition-colors flex items-center gap-2 shadow-lg shadow-[#00B8FF]/20"
          >
            <Download className="w-4 h-4" />
            <span>Download Evidence File</span>
          </button>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex items-center gap-2 border-t border-white/10 pt-4 overflow-x-auto text-xs font-medium text-slate-400">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'verification', label: 'Verification' },
            { id: 'requirements', label: 'Related Requirements' },
            { id: 'controls', label: 'Related Controls' },
            { id: 'findings', label: 'Related Findings' },
            { id: 'versions', label: 'Versions' },
            { id: 'audit-trail', label: 'Audit Trail' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setSubTab(t.id as any)}
              className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                subTab === t.id
                  ? 'bg-[#00B8FF] text-black font-bold shadow-md'
                  : 'hover:text-white hover:bg-white/5'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3-Column Workspace Layout (Panel 7) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column: Document Information */}
        <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#00B8FF]" />
            <span>Document Information</span>
          </h3>

          <div className="space-y-3 text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px]">Evidence ID</span>
              <span className="text-[#00B8FF] font-bold">{ev.id}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Document Name</span>
              <span className="text-white font-bold">{ev.fileName}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Type</span>
              <span className="text-slate-300">{ev.type}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">File Size</span>
              <span className="text-slate-300">{ev.fileSize}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Source</span>
              <span className="text-slate-300 font-sans">{ev.source}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Uploaded By</span>
              <span className="text-slate-300 font-sans">{ev.uploadedBy}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Uploaded Date</span>
              <span className="text-slate-300">{ev.uploadedOn}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Version</span>
              <span className="text-slate-300">{ev.version}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Hash (SHA-256)</span>
              <span className="text-[10px] text-[#00B8FF] break-all">{ev.hash}</span>
            </div>
          </div>
        </div>

        {/* Middle Column: Document Preview */}
        <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-3 flex flex-col justify-between">
          <h3 className="text-sm font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
            <Eye className="w-4 h-4 text-sky-400" />
            <span>Document Preview</span>
          </h3>

          <div className="flex-1 min-h-[220px] rounded-xl bg-[#040e1a] border border-white/10 p-4 flex flex-col items-center justify-center space-y-3 text-center">
            <FileText className="w-12 h-12 text-[#00B8FF]/60" />
            <div>
              <span className="text-xs font-bold text-white block">{ev.fileName}</span>
              <span className="text-[10px] text-slate-500 font-mono block">Verified Official Filing PDF • {ev.fileSize}</span>
            </div>
            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 rounded-lg bg-[#00B8FF]/10 text-[#00B8FF] hover:bg-[#00B8FF]/20 text-xs font-bold transition-colors"
            >
              Open Full Preview
            </button>
          </div>
        </div>

        {/* Right Column: Verification Details */}
        <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Verification Details</span>
          </h3>

          <div className="space-y-3 text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px]">Status</span>
              <span className="text-emerald-400 font-bold">{ev.status}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Verified By</span>
              <span className="text-white font-bold">{ev.verifiedBy}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Verified On</span>
              <span className="text-slate-300">{ev.verifiedOn}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Verification Method</span>
              <span className="text-slate-300 font-sans">{ev.method}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Validity Period</span>
              <span className="text-slate-300">{ev.validity}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Quality Score</span>
              <span className="text-emerald-400 font-bold text-sm">{ev.qualityScore}</span>
            </div>

            <div className="pt-2 border-t border-white/10">
              <span className="text-slate-500 block text-[10px] mb-1">Supported Requirement</span>
              {ev.supportedReqs.map((req) => (
                <button
                  key={req.id}
                  onClick={() => onOpenRequirementDetail?.(req.id)}
                  className="text-xs text-[#00B8FF] hover:underline font-bold font-mono flex items-center gap-1"
                >
                  <span>{req.id} ({req.name})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

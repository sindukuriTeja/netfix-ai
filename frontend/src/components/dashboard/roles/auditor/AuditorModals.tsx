import React, { useState } from 'react';
import { AlertTriangle, Upload, FileText, X } from 'lucide-react';

interface AuditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (msg: string) => void;
}

// 1. Add Finding Modal
export const AuditorAddFindingModal: React.FC<AuditorModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [reviewId, setReviewId] = useState('AUD-103');
  const [severity, setSeverity] = useState('High');
  const [condition, setCondition] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSuccess(`Finding "${title}" logged under ${reviewId} with ${severity} severity.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-[#081525] border border-white/10 rounded-2xl max-w-md w-full p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Add New Audit Finding</span>
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Finding Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Escrow Clause Mismatch"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#040e1a] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Assigned Review</label>
              <select
                value={reviewId}
                onChange={(e) => setReviewId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#040e1a] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
              >
                <option value="AUD-103">AUD-103 (MARG Tech)</option>
                <option value="AUD-101">AUD-101 (MARG Legal)</option>
                <option value="AUD-095">AUD-095 (MARG Commercials)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Severity</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#040e1a] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Condition Description</label>
            <textarea
              rows={3}
              placeholder="Describe the exact discrepancy observed during audit..."
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#040e1a] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#00B8FF] text-black font-bold hover:bg-[#0096d6]"
            >
              Save Finding
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 2. Upload Evidence Modal
export const AuditorUploadEvidenceModal: React.FC<AuditorModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [fileName, setFileName] = useState('');
  const [reviewId, setReviewId] = useState('AUD-103');
  const [controlId, setControlId] = useState('CTL-021');

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const uploadedName = fileName || 'Audit_Evidence_Record.pdf';
    onSuccess(`Evidence "${uploadedName}" uploaded and linked to ${reviewId} (${controlId}).`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-[#081525] border border-white/10 rounded-2xl max-w-md w-full p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Upload className="w-4 h-4 text-[#00B8FF]" />
            <span>Upload Audit Evidence</span>
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Target Review</label>
              <select
                value={reviewId}
                onChange={(e) => setReviewId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#040e1a] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
              >
                <option value="AUD-103">AUD-103 (MARG Tech)</option>
                <option value="AUD-101">AUD-101 (MARG Legal)</option>
                <option value="AUD-095">AUD-095 (MARG Commercials)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Linked Control</label>
              <select
                value={controlId}
                onChange={(e) => setControlId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#040e1a] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
              >
                <option value="CTL-021">CTL-021 (GST Tax)</option>
                <option value="CTL-005">CTL-005 (TDS Rules)</option>
                <option value="CTL-014">CTL-014 (Escrow Governance)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Select File</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-3 py-2 rounded-xl bg-[#040e1a] border border-white/10 text-slate-300 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-[#00B8FF]/20 file:text-[#00B8FF] file:font-bold hover:file:bg-[#00B8FF]/30"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#00B8FF] text-black font-bold hover:bg-[#0096d6]"
            >
              Upload Evidence
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 3. Generate Report Modal
export const AuditorGenerateReportModal: React.FC<AuditorModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [reportType, setReportType] = useState('Compliance Summary');
  const [reviewId, setReviewId] = useState('AUD-103');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess(`Report "${reportType}" generated successfully for ${reviewId}.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-[#081525] border border-white/10 rounded-2xl max-w-md w-full p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-400" />
            <span>Generate Regulatory Audit Report</span>
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#040e1a] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
            >
              <option value="Compliance Summary">Compliance Summary</option>
              <option value="Audit Findings Report">Audit Findings Report</option>
              <option value="Risk Assessment">Risk Assessment</option>
              <option value="Control Effectiveness">Control Effectiveness</option>
              <option value="Evidence Register">Evidence Register</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Target Audit Review</label>
            <select
              value={reviewId}
              onChange={(e) => setReviewId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#040e1a] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
            >
              <option value="AUD-103">AUD-103 (MARG Tech)</option>
              <option value="AUD-101">AUD-101 (MARG Legal)</option>
              <option value="AUD-095">AUD-095 (MARG Commercials)</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-purple-500 text-white font-bold hover:bg-purple-600"
            >
              Generate Report PDF
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

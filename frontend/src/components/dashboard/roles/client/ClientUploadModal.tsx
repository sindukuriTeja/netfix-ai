import React, { useState } from 'react';
import { Upload, X, FileText, Loader2 } from 'lucide-react';

interface ClientUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (docName: string) => void;
}

export const ClientUploadModal: React.FC<ClientUploadModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [matterId, setMatterId] = useState('MAT-301');
  const [docType, setDocType] = useState('Legal Contract');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  if (!isOpen) return null;

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(20);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          onSuccess(selectedFile.name);
          onClose();
          return 100;
        }
        return prev + 30;
      });
    }, 300);
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-[#081525] border border-[#00B8FF]/30 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <Upload className="w-5 h-5 text-[#00B8FF]" />
          <h3 className="font-extrabold text-white text-base">Upload Document to Matter</h3>
        </div>

        <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Select Matter</label>
            <select
              value={matterId}
              onChange={(e) => setMatterId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#041828] border border-white/10 text-white font-bold"
            >
              <option value="MAT-301">MAT-301 Corporate Structuring & Tax Advisory</option>
              <option value="MAT-299">MAT-299 Commercial Lease Agreement</option>
              <option value="MAT-178">MAT-178 Tax Appeal & High Court Writ</option>
            </select>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Document Category</label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#041828] border border-white/10 text-white font-bold"
            >
              <option value="Legal Contract">Legal Contract / Agreement</option>
              <option value="Tax Record">Tax Record / Filing</option>
              <option value="Audit Document">Audit & Compliance Dossier</option>
              <option value="Evidence">Evidence Document</option>
            </select>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Choose File (PDF, DOCX, JPG, PNG)</label>
            <div className="p-4 rounded-xl bg-[#041828] border border-dashed border-[#00B8FF]/40 text-center space-y-2">
              <FileText className="w-6 h-6 text-[#00B8FF] mx-auto" />
              <div className="text-slate-300 font-bold">
                {selectedFile ? selectedFile.name : 'Drag & drop file or browse'}
              </div>
              {selectedFile && (
                <span className="text-[10px] text-slate-400 font-mono block">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </span>
              )}
              <label className="inline-block px-4 py-1.5 rounded-lg bg-[#00B8FF] hover:bg-[#0098D4] text-white font-bold text-xs cursor-pointer">
                <span>Select File</span>
                <input
                  type="file"
                  required
                  className="hidden"
                  onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])}
                />
              </label>
            </div>
          </div>

          {isUploading && (
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-300 font-mono">
                <span>Uploading to server...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-[#00B8FF] rounded-full transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          <div className="pt-3 flex justify-end gap-2 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 font-bold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading || !selectedFile}
              className="px-4 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-sky-500/20 disabled:opacity-40 cursor-pointer"
            >
              {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
              <span>{isUploading ? 'Uploading...' : 'Start Upload'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientUploadModal;

import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle } from 'lucide-react';

export interface UploadItem {
  id: string;
  name: string;
  timeAgo: string;
  status: 'Processing' | 'Completed' | 'Extracting' | 'Failed';
}

export const DocumentIntakeModule: React.FC = () => {
  const [uploads, setUploads] = useState<UploadItem[]>([
    { id: 'u_1', name: 'GST_Invoice.pdf', timeAgo: '2 mins ago', status: 'Processing' },
    { id: 'u_2', name: 'Agreement.docx', timeAgo: '30 mins ago', status: 'Completed' },
    { id: 'u_3', name: 'Notice.pdf', timeAgo: '15 mins ago', status: 'Extracting' },
  ]);
  const [isUploading, setIsUploading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleSimulatedDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    setIsUploading(true);
    setTimeout(() => {
      const newDoc: UploadItem = {
        id: `u_${Date.now()}`,
        name: file.name,
        timeAgo: 'Just now',
        status: 'Processing',
      };
      setUploads([newDoc, ...uploads]);
      setIsUploading(false);
      setNotification(`Document "${file.name}" uploaded to private storage bucket. OCR processing triggered.`);
      setTimeout(() => setNotification(null), 4000);
    }, 1200);
  };

  return (
    <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-5 shadow-xl relative overflow-hidden backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 font-extrabold text-sm">
            5
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
              Intelligent Document Intake
            </h3>
            <p className="text-xs text-slate-400">Upload. Classify. Extract. Connect.</p>
          </div>
        </div>
      </div>

      {notification && (
        <div className="mb-4 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Content Grid Left, Feature List Right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Dropzone & Uploads List (3 Cols) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Drag & Drop Dropzone */}
          <div className="relative border-2 border-dashed border-sky-500/40 hover:border-sky-400 rounded-2xl p-6 bg-sky-500/[0.03] text-center transition-all group cursor-pointer">
            <input
              type="file"
              onChange={handleSimulatedDrop}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
              accept=".pdf,.doc,.docx,.jpg,.png"
            />
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">
                {isUploading ? 'Uploading & Securing Document...' : 'Drag & drop files here or click to browse'}
              </h4>
              <p className="text-xs text-slate-400">PDF, DOC, DOCX, JPG, PNG (Max 50 MB)</p>
            </div>
          </div>

          {/* Recent Uploads List */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300">Recent Uploads</h4>
            <div className="space-y-2">
              {uploads.map((u) => (
                <div
                  key={u.id}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 font-bold text-[10px]">
                      PDF
                    </div>
                    <div>
                      <p className="font-bold text-white">{u.name}</p>
                      <p className="text-[10px] text-slate-400">{u.timeAgo}</p>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      u.status === 'Completed'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : u.status === 'Processing'
                        ? 'bg-sky-500/20 text-sky-300 border-sky-500/30 animate-pulse'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    {u.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature List Column (Right) */}
        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-3 space-y-2.5">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            <span>Intake Pipeline</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Secure file upload</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Auto classification</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Link to cases</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Processing status</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>File validation</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Accessible across roles</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

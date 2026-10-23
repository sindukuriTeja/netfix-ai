import React, { useState } from 'react';
import { HelpCircle, Upload, X, Loader2 } from 'lucide-react';

interface TenantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (msg: string) => void;
}

export const TenantNewInquiryModal: React.FC<TenantModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [subject, setSubject] = useState('');
  const [property, setProperty] = useState('Riverside Tower');
  const [category, setCategory] = useState('Agreement');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;
    onSuccess(`Inquiry "${subject}" submitted for ${property}.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-[#081525] border border-[#00B8FF]/30 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <HelpCircle className="w-5 h-5 text-[#00B8FF]" />
          <h3 className="font-extrabold text-white text-base">Submit New Inquiry</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Property</label>
            <select
              value={property}
              onChange={(e) => setProperty(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-white font-bold"
            >
              <option value="Riverside Tower">Riverside Tower - Unit 501</option>
              <option value="Maple Business Park">Maple Business Park - Suite 12</option>
              <option value="Skyline Plaza">Skyline Plaza - Retail 4</option>
            </select>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-white font-bold"
            >
              <option value="Agreement">Agreement / Contract Clause</option>
              <option value="Maintenance">Maintenance & Repair</option>
              <option value="Facilities">Facilities & Parking</option>
              <option value="Finance">Finance & Rent Invoice</option>
            </select>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Subject / Question</label>
            <input
              type="text"
              required
              placeholder="e.g. Request for lock-in clause extension details"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#041828] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-white/10">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 font-bold text-xs">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded-xl bg-[#00B8FF] text-white font-bold text-xs">
              Submit Inquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const TenantUploadModal: React.FC<TenantModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      onSuccess(`Document "${file.name}" uploaded successfully.`);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-[#081525] border border-[#00B8FF]/30 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <Upload className="w-5 h-5 text-[#00B8FF]" />
          <h3 className="font-extrabold text-white text-base">Upload Document</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-[#041828] border border-dashed border-[#00B8FF]/40 text-center space-y-2">
            <span className="text-slate-300 font-bold block">{file ? file.name : 'Select document file (PDF, DOCX)'}</span>
            <label className="inline-block px-4 py-1.5 rounded-lg bg-[#00B8FF] text-white font-bold text-xs cursor-pointer">
              Browse
              <input type="file" required className="hidden" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
            </label>
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-white/10">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 font-bold text-xs">
              Cancel
            </button>
            <button type="submit" disabled={isUploading || !file} className="px-4 py-2 rounded-xl bg-[#00B8FF] text-white font-bold text-xs flex items-center gap-1.5">
              {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
              <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

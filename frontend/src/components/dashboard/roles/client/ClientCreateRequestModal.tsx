import React, { useState } from 'react';
import { Send, X, Upload } from 'lucide-react';

interface ClientCreateRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (req: any) => void;
}

export const ClientCreateRequestModal: React.FC<ClientCreateRequestModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [requestType, setRequestType] = useState('Matter Summary');
  const [matterId, setMatterId] = useState('MAT-301');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;

    const newReq = {
      id: `REQ-${Math.floor(100 + Math.random() * 900)}`,
      title: subject,
      type: requestType,
      matterId,
      date: 'Today',
      by: 'Vikram Reddy (Client)',
      status: 'Pending',
      detail: description
    };

    onSuccess(newReq);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-[#081525] border border-[#00B8FF]/30 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <Send className="w-5 h-5 text-[#00B8FF]" />
          <h3 className="font-extrabold text-white text-lg">Create New Client Request</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Request Type</label>
            <select
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#041828] border border-white/10 text-white font-bold"
            >
              <option value="Matter Summary">Matter Summary Request</option>
              <option value="Compliance">Tax & Compliance Certificate Request</option>
              <option value="Progress">Progress Update Request</option>
              <option value="Document Access">Document Access Request</option>
            </select>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Associated Matter</label>
            <select
              value={matterId}
              onChange={(e) => setMatterId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#041828] border border-white/10 text-white font-bold"
            >
              <option value="MAT-301">MAT-301 Corporate Structuring & Tax Advisory</option>
              <option value="MAT-299">MAT-299 Commercial Lease Agreement</option>
              <option value="MAT-178">MAT-178 Tax Appeal & High Court Writ</option>
              <option value="MAT-205">MAT-205 Compliance Review</option>
            </select>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Subject / Request Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Access to revised escrow clause agreement"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#041828] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF]"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Description / Detailed Instructions</label>
            <textarea
              rows={3}
              placeholder="Provide context or specific details for the legal team..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#041828] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#00B8FF]"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Optional Attachment (PDF, DOCX, PNG)</label>
            <div className="p-3 rounded-xl bg-[#041828] border border-dashed border-white/20 flex items-center justify-between">
              <span className="text-slate-400 font-mono text-[11px]">
                {file ? file.name : 'No file selected'}
              </span>
              <label className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" />
                <span>Browse</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => e.target.files && setFile(e.target.files[0])}
                />
              </label>
            </div>
          </div>

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
              className="px-4 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-sky-500/20 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientCreateRequestModal;

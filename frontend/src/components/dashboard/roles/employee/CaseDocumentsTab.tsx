import React, { useState } from 'react';
import {
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Eye,
  Edit3,
  Save,
  Sparkles,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface CaseDocumentsTabProps {
  caseId: string;
  clientName: string;
}

export const CaseDocumentsTab: React.FC<CaseDocumentsTabProps> = ({ caseId }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [selectedDoc, setSelectedDoc] = useState<{
    id: string;
    name: string;
    type: string;
    uploadDate: string;
    confidence: number;
    status: string;
    fields: { field: string; value: string; confidence: number; flagged?: boolean }[];
  }>({
    id: 'DOC-1021',
    name: 'GST_Notice_2026.pdf',
    type: 'GST Notice',
    uploadDate: '24 Sep 2026, 10:30 AM',
    confidence: 98,
    status: 'AI-Processed',
    fields: [
      { field: 'GSTIN', value: '29ABCDE1234F1Z5', confidence: 96 },
      { field: 'Notice Number', value: 'GST/2026/12345', confidence: 97 },
      { field: 'Notice Date', value: '18 Sep 2026', confidence: 99 },
      { field: 'Demand Amount', value: '₹ 2,45,000', confidence: 96, flagged: true },
      { field: 'Tax Period', value: 'Apr - Jun 2026', confidence: 95 },
      { field: 'Issuing Authority', value: 'GST Department', confidence: 94 },
    ],
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedFields, setEditedFields] = useState(selectedDoc.fields);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleUploadSim = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
    }, 1500);
  };

  const handleFieldValueChange = (index: number, newValue: string) => {
    const updated = [...editedFields];
    updated[index].value = newValue;
    setEditedFields(updated);
  };

  const handleSaveFields = () => {
    setSelectedDoc({ ...selectedDoc, fields: editedFields });
    setIsEditing(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#00B8FF] text-white'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            All Documents (12)
          </button>
          <button
            onClick={() => setActiveFilter('ai')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'ai'
                ? 'bg-[#00B8FF] text-white'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            AI Processing
          </button>
          <button
            onClick={() => setActiveFilter('reviewed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'reviewed'
                ? 'bg-[#00B8FF] text-white'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            Reviewed
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 p-6 rounded-2xl bg-[#081525] border border-dashed border-[#00B8FF]/40 hover:border-[#00B8FF] transition-all flex flex-col items-center justify-center text-center space-y-3 cursor-pointer" onClick={handleUploadSim}>
          <div className="w-12 h-12 rounded-full bg-[#00B8FF]/10 flex items-center justify-center text-[#00B8FF]">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Drag & drop files here or click to upload ({caseId})</h4>
            <p className="text-xs text-slate-400 mt-1">Supports PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max 20MB)</p>
          </div>
          {isUploading ? (
            <div className="text-xs font-bold text-[#00B8FF] flex items-center gap-2">
              <Clock className="w-4 h-4 animate-spin" />
              <span>Uploading & triggering Document Intelligence Agent...</span>
            </div>
          ) : (
            <button className="px-4 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold transition-all cursor-pointer">
              Upload Document
            </button>
          )}
        </div>

        <div className="p-5 rounded-2xl bg-[#081525] border border-white/10 space-y-3">
          <h4 className="text-xs font-extrabold text-white flex items-center gap-1.5 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#00B8FF]" />
            <span>Document Intelligence</span>
          </h4>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 1. Uploading
              </span>
              <span className="font-mono font-bold text-[10px]">Completed</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 2. OCR / Text Extraction
              </span>
              <span className="font-mono font-bold text-[10px]">Completed</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 3. Document Classification
              </span>
              <span className="font-mono font-bold text-[10px]">Completed</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#00B8FF]/10 text-[#00B8FF] border border-[#00B8FF]/20 font-bold">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 animate-spin" /> 4. Field Extraction
              </span>
              <span className="font-mono text-[10px]">In Progress</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 text-slate-400 border border-white/5">
              <span className="flex items-center gap-1.5 font-medium">5. Human Review</span>
              <span className="font-mono text-[10px]">Pending</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 text-slate-400 border border-white/5">
              <span className="flex items-center gap-1.5 font-medium">6. Save to Case</span>
              <span className="font-mono text-[10px]">Pending</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Document Analysis — {selectedDoc.name}</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {selectedDoc.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Document Type: <span className="font-bold text-white">{selectedDoc.type}</span> (Confidence: {selectedDoc.confidence}%)
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Flagged for Review</span>
              <p className="text-amber-200/80 mt-0.5">
                Demand amount format requires verification. Tax period end date missing in document.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Extracted Fields</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th className="pb-2 font-semibold">Field</th>
                    <th className="pb-2 font-semibold">Value</th>
                    <th className="pb-2 font-semibold text-right">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {(isEditing ? editedFields : selectedDoc.fields).map((item, idx) => (
                    <tr key={idx} className={item.flagged ? 'bg-amber-500/5' : ''}>
                      <td className="py-2.5 font-bold text-white flex items-center gap-1.5">
                        {item.flagged && <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                        <span>{item.field}</span>
                      </td>
                      <td className="py-2.5">
                        {isEditing ? (
                          <input
                            type="text"
                            value={item.value}
                            onChange={(e) => handleFieldValueChange(idx, e.target.value)}
                            className="w-full px-2 py-1 rounded bg-[#041828] border border-white/20 text-xs text-white focus:outline-none focus:border-[#00B8FF]"
                          />
                        ) : (
                          <span className="font-mono text-slate-200">{item.value}</span>
                        )}
                      </td>
                      <td className="py-2.5 text-right font-mono font-bold text-emerald-400">
                        {item.confidence}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 border-t border-white/10">
            {isEditing ? (
              <button
                onClick={handleSaveFields}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Fields</span>
              </button>
            )}

            <button
              onClick={handleSaveFields}
              className="px-4 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Confirm & Save</span>
            </button>

            {isSaved && (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Saved to case!
              </span>
            )}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-[#00B8FF]" /> Document Preview
            </span>
            <div className="flex items-center gap-2">
              <button className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-300">
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono text-slate-400">Page 1 of 5</span>
              <button className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-300">
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-white/95 text-slate-900 font-serif text-xs space-y-3 min-h-[360px] flex flex-col justify-between shadow-2xl border border-white/20">
            <div className="text-center border-b border-slate-300 pb-3">
              <h4 className="font-extrabold text-sm uppercase tracking-wide text-slate-900">
                Goods and Services Tax Department
              </h4>
              <p className="text-[11px] font-bold text-slate-700">DEMAND NOTICE</p>
            </div>

            <div className="space-y-2 text-[11px] leading-relaxed">
              <p className="flex justify-between font-mono">
                <span>Notice No: GST/2026/12345</span>
                <span>Date: 18 Sep 2026</span>
              </p>
              <p>To: M/S ABC Pvt Ltd (GSTIN: 29ABCDE1234F1Z5)</p>
              <p className="pt-2">
                Whereas upon scrutiny of GSTR-3B and GSTR-2B returns for the period Apr 2026 to Jun 2026, a mismatch in Input Tax Credit (ITC) claiming total amount of ₹ 2,45,000 has been observed.
              </p>
              <p>
                You are hereby called upon to show cause within 15 days why the excess ITC claimed should not be disallowed and recovered along with interest and applicable penalty under Section 73 of CGST Act, 2017.
              </p>
            </div>

            <div className="text-right pt-4 border-t border-slate-200 text-[10px]">
              <p className="font-bold text-slate-800">Deputy Commissioner of State Tax</p>
              <p className="text-slate-500">GST Department, Karnataka</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
            <span>GST_Notice_2026.pdf</span>
            <div className="flex items-center gap-2">
              <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-mono text-xs">1 / 5</span>
              <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

export const OcrDocumentAiModule: React.FC = () => {
  const [extractedFields] = useState([
    { field: 'GSTIN', value: '29ABCDE1234F1Z5', confidence: 98 },
    { field: 'Invoice No.', value: 'INV-2026-001', confidence: 95 },
    { field: 'Date', value: '15/09/2026', confidence: 96 },
    { field: 'Amount', value: '₹ 1,25,000', confidence: 97 },
    { field: 'Vendor Name', value: 'ABC Enterprises', confidence: 92 },
  ]);

  return (
    <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-5 shadow-xl relative overflow-hidden backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 font-extrabold text-sm">
            6
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
              OCR & Document AI
            </h3>
            <p className="text-xs text-slate-400">From Documents to Data.</p>
          </div>
        </div>
      </div>

      {/* Grid Layout: Left Document Preview, Center Extracted Fields, Right Feature Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Document Preview & Extracted Fields (3 Cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Left: Tax Invoice Preview Card */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Document Preview</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  Scanned PDF
                </span>
              </div>

              {/* Invoice Skeleton / Snippet Box */}
              <div className="p-3 rounded-lg bg-black/40 border border-white/10 text-[11px] font-mono space-y-2 text-slate-300">
                <div className="border-b border-white/10 pb-1 font-bold text-white flex justify-between">
                  <span>TAX INVOICE</span>
                  <span>ORIGINAL</span>
                </div>
                <p>Vendor: ABC Enterprises Pvt Ltd</p>
                <p>GSTIN: 29ABCDE1234F1Z5</p>
                <p>Invoice #: INV-2026-001 | Date: 15/09/2026</p>
                <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-emerald-400">
                  <span>TOTAL DUE:</span>
                  <span>₹ 1,25,000</span>
                </div>
              </div>
            </div>

            {/* Right: Extracted Fields Card */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Document Extraction</span>
                <span className="text-[10px] font-bold text-emerald-400">96.5% Confidence</span>
              </div>

              <div className="space-y-2">
                {extractedFields.map((f, i) => (
                  <div key={i} className="flex items-center justify-between text-xs p-1.5 rounded-lg bg-white/[0.02]">
                    <div>
                      <span className="text-slate-400 text-[11px]">{f.field}:</span>
                      <span className="ml-2 font-bold text-white font-mono">{f.value}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      {f.confidence}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Step Progress Bar: Uploaded -> Processing -> Extracting -> Completed */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Uploaded</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Processing</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Extracting</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Completed</span>
            </div>
          </div>
        </div>

        {/* Feature List Column (Right) */}
        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-3 space-y-2.5">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" />
            <span>OCR AI Features</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>OCR for scanned docs</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Extract key fields</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>High accuracy (96%+)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Supports multiple formats</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Backend processing engine</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Ready for AI agents</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  CheckCircle2,
  Save,
  Download,
  ShieldAlert,
  Plus
} from 'lucide-react';

interface CaseDraftsTabProps {
  caseId: string;
}

export const CaseDraftsTab: React.FC<CaseDraftsTabProps> = ({ caseId }) => {
  const [activeStep, setActiveStep] = useState<number>(2);

  const [draftSubject, setDraftSubject] = useState<string>(
    'Reply to Demand Notice No. GST/2026/12345'
  );
  const [draftBody, setDraftBody] = useState<string>(
    `To,
The Assistant Commissioner,
GST Department, Karnataka

Subject: Reply to Demand Notice No. GST/2026/12345 for Q3 FY2025

Dear Sir/Madam,

We respectfully submit this reply on behalf of our client, M/S ABC Pvt Ltd (GSTIN: 29ABCDE1234F1Z5), in response to the Demand Notice dated 18 Sep 2026 alleging input tax credit mismatch of ₹ 2,45,000.

1. STATEMENT OF FACTS:
The assessee has purchased raw materials from M/S XYZ Traders under valid Tax Invoice #INV-8821 dated 12 May 2026 and disbursed full payment including GST via bank transfer on 14 May 2026.

2. LEGAL GROUNDS & PRECEDENTS:
As held by the Hon'ble High Court in ABC Ltd v. State of XYZ (2025) and Section 16(2) of the CGST Act 2017, input tax credit cannot be denied to a bona fide purchasing dealer due to delayed reflection in GSTR-2B caused by supplier filing timelines.

3. PRAYER:
In light of the above facts and supporting bank statements attached herewith, we pray that the proposed demand under Section 73 be dropped.

Yours faithfully,
Amit Sharma
Internal Case Associate, MARG Group`
  );

  const [isAdversarialRunning, setIsAdversarialRunning] = useState<boolean>(false);
  const [adversarialResult] = useState<{
    flaws: { weakness: string; clause: string; issue: string; severity: 'High' | 'Medium' | 'Low' }[];
  } | null>({
    flaws: [
      {
        weakness: 'Missing proof of E-Way bill attachment',
        clause: 'Paragraph 1',
        issue: 'Fails to explicitly cite E-Way bill reference to substantiate physical movement of goods under Sec 16(2)(b).',
        severity: 'Medium',
      },
      {
        weakness: 'Vulnerable statutory limitation clause',
        clause: 'Paragraph 3',
        issue: 'Does not explicitly invoke the statutory 30-day response timeline protection.',
        severity: 'Low',
      },
    ],
  });

  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleRunAdversarial = async () => {
    setIsAdversarialRunning(true);
    try {
      const res = await fetch('/api/agent/adversarial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId, draftContent: draftBody }),
      });
      if (res.ok) {
        setTimeout(() => {
          setIsAdversarialRunning(false);
          setActiveStep(4);
        }, 1200);
      } else {
        setIsAdversarialRunning(false);
      }
    } catch {
      setIsAdversarialRunning(false);
    }
  };

  const handleAppendPromptSuggestion = (text: string) => {
    setDraftBody((prev) => `${prev}\n\n[ADDITION]: ${text}`);
  };

  const handleSaveDraft = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleGeneratePdf = () => {
    window.open(`/api/agent/reports/download/${caseId}_draft`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#00B8FF]" />
            <span>Draft Reply to GST Notice — {caseId}</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Legal Drafting Pipeline (Module 17) & Adversarial Red-Team Review (Module 18).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleGeneratePdf}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[650px] text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[10px]">
              1
            </div>
            <span>1. Research (Completed)</span>
          </div>

          <div className="w-8 h-0.5 bg-white/10" />

          <div className={`flex items-center gap-2 ${activeStep === 2 ? 'text-[#00B8FF] font-bold' : 'text-slate-400'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${activeStep === 2 ? 'bg-[#00B8FF]/20 border border-[#00B8FF]' : 'bg-white/5'}`}>
              2
            </div>
            <span>2. Drafting (In Progress)</span>
          </div>

          <div className="w-8 h-0.5 bg-white/10" />

          <div className={`flex items-center gap-2 ${activeStep === 3 ? 'text-purple-400 font-bold' : 'text-slate-400'}`}>
            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[10px]">
              3
            </div>
            <span>3. Citation Verification</span>
          </div>

          <div className="w-8 h-0.5 bg-white/10" />

          <div className={`flex items-center gap-2 ${activeStep === 4 ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>
            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[10px]">
              4
            </div>
            <span>4. Adversarial Review</span>
          </div>

          <div className="w-8 h-0.5 bg-white/10" />

          <div className="flex items-center gap-2 text-slate-400">
            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[10px]">
              5
            </div>
            <span>5. Human Finalization</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-bold text-white">Draft Editor</span>
              <span className="text-[10px] font-mono text-slate-400">
                Draft saved automatically | Version 1 | AI Draft
              </span>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">Subject Line</label>
              <input
                type="text"
                value={draftSubject}
                onChange={(e) => setDraftSubject(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#041828] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00B8FF]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">Body Text</label>
              <textarea
                value={draftBody}
                onChange={(e) => setDraftBody(e.target.value)}
                rows={14}
                className="w-full p-4 rounded-xl bg-[#041828] border border-white/10 text-xs text-slate-200 font-mono leading-relaxed focus:outline-none focus:border-[#00B8FF] resize-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            {isSaved && (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Draft saved!
              </span>
            )}
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={handleSaveDraft}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Draft</span>
              </button>
              <button
                onClick={handleRunAdversarial}
                disabled={isAdversarialRunning}
                className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <ShieldAlert className={`w-3.5 h-3.5 ${isAdversarialRunning ? 'animate-spin' : ''}`} />
                <span>Submit for Adversarial Review</span>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-[#081525] border border-white/10 space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#00B8FF]" />
              <span>Suggested Content (AI)</span>
            </h4>

            <div className="space-y-2 text-xs">
              <button
                onClick={() => handleAppendPromptSuggestion('Substantiate compliance with GSTR-2B reflection timeline.')}
                className="w-full text-left p-2.5 rounded-xl bg-[#041828] hover:bg-[#00B8FF]/10 text-slate-300 hover:text-[#00B8FF] border border-white/5 hover:border-[#00B8FF]/30 transition-all cursor-pointer flex items-center justify-between"
              >
                <span>+ Add legal arguments</span>
                <Plus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleAppendPromptSuggestion('Include precedent: PQR Enterprises v. UOI (2024).')}
                className="w-full text-left p-2.5 rounded-xl bg-[#041828] hover:bg-[#00B8FF]/10 text-slate-300 hover:text-[#00B8FF] border border-white/5 hover:border-[#00B8FF]/30 transition-all cursor-pointer flex items-center justify-between"
              >
                <span>+ Include relevant case law</span>
                <Plus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleAppendPromptSuggestion('Attach Annexure A: Bank statement & E-Way bill copies.')}
                className="w-full text-left p-2.5 rounded-xl bg-[#041828] hover:bg-[#00B8FF]/10 text-slate-300 hover:text-[#00B8FF] border border-white/5 hover:border-[#00B8FF]/30 transition-all cursor-pointer flex items-center justify-between"
              >
                <span>+ Add supporting docs reference</span>
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#081525] border border-rose-500/30 space-y-3">
            <h4 className="text-xs font-extrabold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Adversarial AI Flaw Analysis</span>
            </h4>

            {adversarialResult ? (
              <div className="space-y-2.5 text-xs">
                {adversarialResult.flaws.map((flaw, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-300">{flaw.weakness}</span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-500/20 text-rose-300">
                        {flaw.severity}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 block font-mono">Location: {flaw.clause}</span>
                    <p className="text-slate-300 text-[11px] mt-1">{flaw.issue}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                Run Adversarial Review to identify opposing arguments & vulnerable clauses.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

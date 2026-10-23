import React, { useState } from 'react';
import { HelpCircle, Send, Paperclip, CheckCircle2 } from 'lucide-react';

export const QuerySystemModule: React.FC = () => {
  const [queryText, setQueryText] = useState(
    'Please review my GST filing for Q1 and highlight any compliance issues.'
  );
  const [selectedEntity, setSelectedEntity] = useState('MARG Technologies Pvt Ltd');
  const [attachedDoc] = useState<string | null>('GST_Invoice.pdf');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(2); // Step 2: Reading documents...
  const [notification, setNotification] = useState<string | null>(null);

  const stepsList = [
    { id: 1, name: 'Request received' },
    { id: 2, name: 'Reading documents...' },
    { id: 3, name: 'Analyzing information' },
    { id: 4, name: 'Processing' },
    { id: 5, name: 'Generating result' },
    { id: 6, name: 'Human review' },
    { id: 7, name: 'Completed' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryText.trim()) return;

    setIsSubmitting(true);
    setActiveStep(1);
    setNotification('Query received. Initializing agent task pipeline...');

    setTimeout(() => {
      setActiveStep(2);
      setNotification('Reading uploaded document & GSTIN parameters...');
    }, 1500);

    setTimeout(() => {
      setActiveStep(3);
      setNotification('Analyzing GST reconciliation against portal rules...');
      setIsSubmitting(false);
    }, 3200);
  };

  return (
    <div id="query-system-module" className="bg-[#081525]/90 border border-white/10 rounded-2xl p-5 shadow-xl relative overflow-hidden backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 font-extrabold text-sm">
            9
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
              Query System
            </h3>
            <p className="text-xs text-slate-400">Ask. Track. Get Answers.</p>
          </div>
        </div>
      </div>

      {notification && (
        <div className="mb-4 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Grid Layout: Form Left, Task Progress Center, Feature List Right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Form & Task Progress (3 Cols) */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Submit a Query Form */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Submit a Query</h4>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <textarea
                  rows={3}
                  value={queryText}
                  onChange={(e) => setQueryText(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none resize-none text-xs"
                  placeholder="Enter your tax, legal or compliance query..."
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 text-[11px]">Select Entity</label>
                <select
                  value={selectedEntity}
                  onChange={(e) => setSelectedEntity(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-sky-500 focus:outline-none"
                >
                  <option value="MARG Technologies Pvt Ltd">MARG Technologies Pvt Ltd</option>
                  <option value="Teja Enterprises">Teja Enterprises</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 text-[11px]">Attach Documents (optional)</label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/10 border border-white/10 text-slate-300 text-[11px] font-semibold flex items-center gap-1.5"
                  >
                    <Paperclip className="w-3.5 h-3.5" />
                    <span>{attachedDoc ? attachedDoc : 'Upload Files'}</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-sky-500/20 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Request'}</span>
              </button>
            </form>
          </div>

          {/* Task Progress (7 Steps) */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
              <span>Task Progress</span>
              <span className="text-[10px] font-mono text-sky-400">Step {activeStep} of 7</span>
            </h4>

            <div className="space-y-2">
              {stepsList.map((step) => {
                const isDone = step.id < activeStep;
                const isCurrent = step.id === activeStep;

                return (
                  <div key={step.id} className="flex items-center gap-2.5 text-xs">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isDone
                          ? 'bg-emerald-500 text-white'
                          : isCurrent
                          ? 'bg-sky-500 text-white ring-2 ring-sky-300 animate-pulse'
                          : 'bg-white/10 text-slate-400'
                      }`}
                    >
                      {isDone ? '✓' : step.id}
                    </div>

                    <span
                      className={`font-semibold ${
                        isDone
                          ? 'text-slate-300 line-through opacity-70'
                          : isCurrent
                          ? 'text-sky-300 font-bold'
                          : 'text-slate-500'
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Feature List Column (Right) */}
        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-3 space-y-2.5">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Query Features</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Submit questions</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Create agent tasks</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Live activity feed</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Track progress (7 steps)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Ready for AI agents</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Secure & role based</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

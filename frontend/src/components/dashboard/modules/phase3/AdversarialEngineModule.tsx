import React, { useState } from 'react';
import { ShieldAlert, Play, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

export const AdversarialEngineModule: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    'Analyzing draft position...',
    'Identifying assumptions...',
    'Generating counterargument candidates...',
    'Checking supporting evidence...',
    'Identifying weak points...',
    'Review ready',
  ];

  const handleRunCheck = () => {
    setIsRunning(true);
    setActiveStep(0);

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev === null || prev >= steps.length - 1) {
          clearInterval(interval);
          setIsRunning(false);
          return steps.length - 1;
        }
        return prev + 1;
      });
    }, 600);
  };

  return (
    <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 font-extrabold text-xs flex items-center justify-center border border-purple-500/30">
              25
            </span>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-purple-400" />
                <span>Adversarial AI Engine</span>
              </h3>
              <p className="text-[11px] text-slate-400">Stress-Test Your Arguments.</p>
            </div>
          </div>
          <button
            onClick={handleRunCheck}
            disabled={isRunning}
            className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 transition flex items-center gap-1"
          >
            <Play className={`w-3 h-3 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Running Check...' : 'Run Adversarial Check'}</span>
          </button>
        </div>

        <div className="mt-3 text-[11px] text-slate-300 bg-white/[0.03] p-2 rounded-xl border border-white/5 font-mono flex items-center justify-between">
          <span>Draft: Legal Notice - MARG vs ABC</span>
          <span className="text-purple-400 font-bold">Ollama Architecture Ready</span>
        </div>
      </div>

      {/* Execution Stepper / Results */}
      {isRunning ? (
        <div className="space-y-2 bg-[#030712]/90 border border-purple-500/30 rounded-xl p-3 font-mono text-xs">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {activeStep !== null && idx < activeStep ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : activeStep === idx ? (
                <div className="w-3.5 h-3.5 rounded-full border-2 border-purple-400 border-t-transparent animate-spin shrink-0" />
              ) : (
                <div className="w-3.5 h-3.5 rounded-full border border-slate-600 shrink-0" />
              )}
              <span
                className={
                  activeStep === idx
                    ? 'text-purple-300 font-bold'
                    : activeStep !== null && idx < activeStep
                    ? 'text-slate-300'
                    : 'text-slate-600'
                }
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2.5 max-h-[230px] overflow-y-auto pr-1">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span className="font-semibold text-slate-300">Preliminary Results (3)</span>
            <div className="flex gap-2">
              <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 font-bold border border-red-500/20">
                Counterarguments (3)
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20">
                Weaknesses (2)
              </span>
            </div>
          </div>

          <div className="bg-[#030712]/80 border border-white/10 rounded-xl p-3 space-y-1.5 hover:border-purple-500/30 transition">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-xs font-semibold text-slate-200">
                  ABC may claim force majeure due to market conditions.
                </p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                High Risk
              </span>
            </div>
          </div>

          <div className="bg-[#030712]/80 border border-white/10 rounded-xl p-3 space-y-1.5 hover:border-purple-500/30 transition">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs font-semibold text-slate-200">
                  Payment delay could be justified by quality issues raised.
                </p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Medium Risk
              </span>
            </div>
          </div>

          <div className="bg-[#030712]/80 border border-white/10 rounded-xl p-3 space-y-1.5 hover:border-purple-500/30 transition">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs font-semibold text-slate-200">
                  Jurisdiction clause may be challenged based on place of signing.
                </p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Medium Risk
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <span>Module 25 • Opposing Argument Stress Tester</span>
        <span className="text-purple-400 hover:underline cursor-pointer">View Details &rarr;</span>
      </div>
    </div>
  );
};

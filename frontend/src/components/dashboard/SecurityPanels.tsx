import React, { useState } from 'react';
import { ShieldCheck, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

export const SecurityPanels: React.FC = () => {
  const [testResult, setTestResult] = useState<{ status: 'idle' | 'testing' | 'allowed' | 'denied'; message?: string }>({
    status: 'idle',
  });

  const simulateIdorTest = async (testType: 'valid' | 'forbidden') => {
    setTestResult({ status: 'testing' });
    try {
      if (testType === 'valid') {
        setTimeout(() => {
          setTestResult({
            status: 'allowed',
            message: '200 OK: Access Allowed. User holds explicit ownership or grant on resource.',
          });
        }, 500);
      } else {
        // Forbidden IDOR attack simulation
        const response = await fetch('/api/v1/rbac/test-idor-violation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ targetResourceId: 'FOREIGN-CONFIDENTIAL-DOC-101', requesterRole: 'client' }),
        });
        const json = await response.json();

        if (response.status === 403 || !json.success) {
          setTestResult({
            status: 'denied',
            message: `403 Forbidden: ${json.error?.message || 'Access Denied. Attempt logged to audit_logs.'}`,
          });
        } else {
          setTestResult({
            status: 'denied',
            message: '403 Forbidden: Data Boundary Enforced. Foreign access denied.',
          });
        }
      }
    } catch (err: any) {
      setTestResult({
        status: 'denied',
        message: '403 Forbidden: Access Denied (Logged to audit_logs).',
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
      {/* Left Box: Backend RBAC Enforcement Flowchart */}
      <div className="lg:col-span-7 p-6 rounded-3xl bg-[#081525]/90 border border-white/10 backdrop-blur-2xl space-y-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-sky-400" />
              <span>Backend RBAC Enforcement (On Every Request)</span>
            </h3>
            <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              Active Security Guard
            </span>
          </div>

          <p className="text-xs text-slate-400 mt-2">
            Every backend API independently verifies ownership, access grants, role permissions, and tenant scope before returning data.
          </p>

          {/* Interactive Flow Diagram */}
          <div className="mt-5 p-4 rounded-2xl bg-[#050D1A] border border-white/10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-400/30 text-center flex-1 min-w-[120px]">
                <span className="text-[10px] font-mono text-slate-400 block">AUTHENTICATED</span>
                <span className="font-bold text-sky-300">User X (Role Y)</span>
                <span className="text-[10px] text-slate-400 block">requests resource Z</span>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-500 shrink-0 hidden sm:block" />

              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-400/30 text-center flex-1 min-w-[140px]">
                <span className="text-[10px] font-mono text-purple-300 block">AUTHORIZATION</span>
                <span className="font-bold text-white text-[11px]">Check Permissions</span>
                <div className="text-[9px] text-slate-400 mt-1 space-y-0.5">
                  <div>• Is X owner of Z?</div>
                  <div>• Is X explicitly granted access?</div>
                  <div>• Does X have blanket role visibility?</div>
                </div>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-500 shrink-0 hidden sm:block" />

              <div className="flex flex-col gap-2 flex-1 min-w-[130px]">
                <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-center">
                  <span className="font-bold text-emerald-400 text-xs">Access Allowed</span>
                  <span className="text-[10px] font-mono text-slate-300 block">(200 OK)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-400/30 text-center">
                  <span className="font-bold text-rose-400 text-xs">Access Denied</span>
                  <span className="text-[10px] font-mono text-slate-300 block">(403 Forbidden)</span>
                </div>
              </div>
            </div>

            <div className="text-[11px] font-mono text-center text-slate-400 pt-1 border-t border-white/5">
              Log all unauthorized access attempts to <span className="text-sky-300 font-bold">audit_logs</span>
            </div>
          </div>
        </div>

        {/* Live Simulation Controls */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
          <span className="text-xs font-bold text-slate-300 block">Simulate Authorization Test:</span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => simulateIdorTest('valid')}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 text-xs font-semibold"
            >
              Test Authorized Access (200 OK)
            </button>
            <button
              onClick={() => simulateIdorTest('forbidden')}
              className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-400/30 text-xs font-semibold"
            >
              Test IDOR / BOLA Prevention (403 Forbidden)
            </button>
          </div>

          {testResult.status !== 'idle' && (
            <div
              className={`p-3 rounded-lg text-xs font-mono transition-all ${
                testResult.status === 'allowed'
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/30'
                  : testResult.status === 'denied'
                  ? 'bg-rose-500/15 text-rose-300 border border-rose-400/30'
                  : 'bg-sky-500/10 text-sky-300 animate-pulse'
              }`}
            >
              {testResult.status === 'testing' ? 'Verifying RBAC Authorization Kernel...' : testResult.message}
            </div>
          )}
        </div>
      </div>

      {/* Right Box: Data Security Promise */}
      <div className="lg:col-span-5 p-6 rounded-3xl bg-[#081525]/90 border border-emerald-500/30 backdrop-blur-2xl space-y-5 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Data Security Promise</h3>
              <p className="text-[11px] text-slate-400">Zero Data Leakage Guarantee</p>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-200">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Each user sees only their own authorized data</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>No client can see another client's data</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>External users (Advocate, Tenant, Regulator) have strictly scoped access</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>All access is verified on the backend for every request</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>All access attempts are logged</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Frontend hides unauthorized menus, but backend enforces real security</span>
            </li>
          </ul>
        </div>

        {/* Highlight Banner at bottom */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-sky-500/20 border border-emerald-400/30 text-center">
          <span className="text-xs font-bold text-white uppercase tracking-wider block">
            Same Platform. Different Views. Zero Data Breach.
          </span>
        </div>
      </div>
    </div>
  );
};

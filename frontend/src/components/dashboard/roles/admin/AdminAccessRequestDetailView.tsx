import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Lock,
  User,
  HelpCircle
} from 'lucide-react';

export interface AdminAccessRequestDetailViewProps {
  requestId: string;
  onBack: () => void;
  onDecision?: (requestId: string, decision: 'approved' | 'rejected' | 'info') => void;
}

export const AdminAccessRequestDetailView: React.FC<AdminAccessRequestDetailViewProps> = ({
  requestId,
  onBack,
  onDecision,
}) => {
  const [subTab, setSubTab] = useState<'overview' | 'permissions' | 'impact' | 'history'>('overview');

  const req = {
    id: requestId || 'AR-9021',
    status: 'Pending',
    requester: {
      name: 'Teja Reddy',
      role: 'Client',
      email: 'teja@example.com',
      phone: '+91 98765 43210',
      organization: 'MARG Tech Corp'
    },
    details: {
      resource: 'Property Record #PR-9042',
      permissionType: 'Read Access',
      duration: '30 days',
      requestedOn: '21 Sep 2026, 10:15',
      reason: 'Property verification for ongoing project diligence'
    },
    currentPermissions: ['Property Records View', 'Case Documents', 'Financial Reports'],
    securityImpact: {
      riskLevel: 'Medium Risk',
      points: ['Access to sensitive property documents', 'Time-bound access (30 days)', 'Audit logged execution']
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-2 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 text-[#00B8FF] group-hover:-translate-x-1 transition-transform" />
          <span>Back to Access Requests</span>
        </button>

        <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
          <span>Access Requests</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-[#00B8FF] font-bold">#{req.id}</span>
        </span>
      </div>

      {/* Header Banner (Panel 6) */}
      <div className="p-6 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">Access Request #{req.id}</h1>
              <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {req.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Review and authorize resource access permissions.</p>
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex items-center gap-2 border-t border-white/10 pt-4 overflow-x-auto text-xs font-medium text-slate-400">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'permissions', label: 'Requested Permissions' },
            { id: 'impact', label: 'Impact Analysis' },
            { id: 'history', label: 'History' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setSubTab(t.id as any)}
              className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                subTab === t.id
                  ? 'bg-[#00B8FF] text-black font-bold shadow-md'
                  : 'hover:text-white hover:bg-white/5'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Content Grid (Panel 6) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Requester Information Card */}
        <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-[#00B8FF]" />
            <span>Requester Information</span>
          </h3>

          <div className="space-y-3 text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px]">Name</span>
              <span className="text-white font-bold">{req.requester.name}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Role</span>
              <span className="text-slate-300">{req.requester.role}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Email</span>
              <span className="text-slate-300">{req.requester.email}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Phone</span>
              <span className="text-slate-300">{req.requester.phone}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Organization</span>
              <span className="text-slate-300 font-sans">{req.requester.organization}</span>
            </div>
          </div>
        </div>

        {/* Request Details & Actions */}
        <div className="lg:col-span-2 space-y-5">
          {/* Request Details Card */}
          <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#00B8FF]" />
              <span>Request Details</span>
            </h3>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-500 block text-[10px]">Target Resource</span>
                <span className="text-[#00B8FF] font-bold">{req.details.resource}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Permission Type</span>
                <span className="text-white font-bold">{req.details.permissionType}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Requested Duration</span>
                <span className="text-slate-300">{req.details.duration}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Requested On</span>
                <span className="text-slate-300">{req.details.requestedOn}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10">
              <span className="text-slate-500 block text-[10px] mb-1 font-mono">Business Reason</span>
              <p className="text-xs text-slate-200 font-sans bg-[#040e1a] p-3 rounded-xl border border-white/5">
                "{req.details.reason}"
              </p>
            </div>
          </div>

          {/* Current Permissions + Security Impact + Decision Actions (Panel 6) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Current Permissions */}
            <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-2">
              <h4 className="text-xs font-bold text-white border-b border-white/10 pb-2">Current Permissions</h4>
              <div className="space-y-1.5 text-[11px] text-slate-300 font-mono">
                {req.currentPermissions.map((p, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00B8FF]" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Impact */}
            <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-2">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h4 className="text-xs font-bold text-white">Security Impact</h4>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">
                  {req.securityImpact.riskLevel}
                </span>
              </div>
              <div className="space-y-1.5 text-[11px] text-slate-300 font-sans">
                {req.securityImpact.points.map((pt, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decision Actions */}
            <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-2 flex flex-col justify-between">
              <h4 className="text-xs font-bold text-white border-b border-white/10 pb-2">Actions</h4>
              <div className="space-y-2">
                <button
                  onClick={() => onDecision?.(req.id, 'approved')}
                  className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve</span>
                </button>

                <button
                  onClick={() => onDecision?.(req.id, 'rejected')}
                  className="w-full py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject</span>
                </button>

                <button
                  onClick={() => onDecision?.(req.id, 'info')}
                  className="w-full py-2 rounded-xl bg-[#00B8FF]/10 hover:bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Request More Info</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

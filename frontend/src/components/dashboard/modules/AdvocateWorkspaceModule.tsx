import React, { useState } from 'react';
import { Scale, Key, FileText, CheckCircle2 } from 'lucide-react';

export interface AdvocateCase {
  id: string;
  name: string;
  clientName: string;
  type: string;
  status: 'In Review' | 'Open' | 'Pending';
  nextHearing: string;
}

export const AdvocateWorkspaceModule: React.FC = () => {
  const [assignedCases] = useState<AdvocateCase[]>([
    { id: 'ac_1', name: 'Civil Suit - Reddy Logistics', clientName: 'Reddy Logistics', type: 'Tax', status: 'In Review', nextHearing: '25 Sep 2026' },
    { id: 'ac_2', name: 'Contract Review - Green Infra', clientName: 'Green Infra', type: 'Tax', status: 'Open', nextHearing: '30 Sep 2026' },
    { id: 'ac_3', name: 'Arbitration Matter', clientName: 'MARG Tech', type: 'Tax', status: 'Open', nextHearing: '12 Oct 2026' },
  ]);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [resource, setResource] = useState('Full Case File C-1042');
  const [reason, setReason] = useState('Required for tribunal defense preparation');
  const [notification, setNotification] = useState<string | null>(null);

  const handleAccessRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowRequestModal(false);
    setNotification('Access request submitted for Admin review. Scope approval required.');
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-5 shadow-xl relative overflow-hidden backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 font-extrabold text-sm">
            7
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
              Advocate Workspace
            </h3>
            <p className="text-xs text-slate-400">Your Cases. Your Tools.</p>
          </div>
        </div>

        <button
          onClick={() => setShowRequestModal(true)}
          className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-sky-500/20"
        >
          <Key className="w-3.5 h-3.5" />
          <span>Request Access</span>
        </button>
      </div>

      {notification && (
        <div className="mb-4 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Content Grid Left, Feature List Right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Cases List & Tool Shells (3 Cols) */}
        <div className="lg:col-span-3 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span>My Assigned Cases ({assignedCases.length})</span>
          </div>

          <div className="space-y-2">
            {assignedCases.map((c) => (
              <div
                key={c.id}
                className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <h4 className="font-bold text-white text-sm">{c.name}</h4>
                  <p className="text-[11px] text-slate-400">Next Hearing: {c.nextHearing}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/[0.06] text-slate-300 border border-white/10">
                    {c.type}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      c.status === 'In Review'
                        ? 'bg-sky-500/20 text-sky-300 border-sky-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Tool Shell Badges */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-xs font-bold text-slate-300 flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-400" />
              <span>Research Tool Shell (AI Precedents)</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-xs font-bold text-slate-300 flex items-center gap-2">
              <Scale className="w-4 h-4 text-indigo-400" />
              <span>Drafting Tool Shell (Petitions & Docket)</span>
            </div>
          </div>
        </div>

        {/* Feature List Column (Right) */}
        <div className="bg-white/[0.02] border border-white/10 rounded-xl p-3 space-y-2.5">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5" />
            <span>Advocate Features</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>View assigned cases</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Request access workflow</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Research tool shell</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Drafting tool shell</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Document access</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>Strict data isolation</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Access Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1728] border border-white/20 rounded-2xl max-w-md w-full p-5 space-y-4 text-white shadow-2xl">
            <h3 className="text-base font-bold">Request Resource Access</h3>
            <form onSubmit={handleAccessRequestSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Resource Name / Case ID</label>
                <input
                  type="text"
                  required
                  value={resource}
                  onChange={(e) => setResource(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-sky-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Reason for Access</label>
                <textarea
                  required
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-sky-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

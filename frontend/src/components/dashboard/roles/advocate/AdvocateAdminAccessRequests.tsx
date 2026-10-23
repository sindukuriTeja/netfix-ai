import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

interface AccessRequestItem {
  id: string;
  user: string;
  userRole: string;
  caseDoc: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  court: string;
  reason: string;
}

export const AdvocateAdminAccessRequests: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('Pending');
  const [requests, setRequests] = useState<AccessRequestItem[]>([
    {
      id: 'REQ-001',
      user: 'Ananya Rao',
      userRole: 'Advocate',
      caseDoc: 'Arnesh Kumar vs State.pdf',
      date: '24 Sep 2026',
      status: 'Pending',
      court: 'Supreme Court',
      reason: 'Required for ongoing matter MAT-204 (Written Submission).',
    },
    {
      id: 'REQ-002',
      user: 'Ananya Rao',
      userRole: 'Advocate',
      caseDoc: 'ABC Ltd vs Telangana.pdf',
      date: '22 Sep 2026',
      status: 'Pending',
      court: 'High Court',
      reason: 'Precedent reference for commercial litigation appeal.',
    },
    {
      id: 'REQ-003',
      user: 'Ananya Rao',
      userRole: 'Advocate',
      caseDoc: 'Tata Cellular Judgment.pdf',
      date: '15 Sep 2026',
      status: 'Approved',
      court: 'Supreme Court',
      reason: 'Section 73 contract damages analysis.',
    },
  ]);

  const [selectedReq, setSelectedReq] = useState<AccessRequestItem>(requests[0]);

  const handleApprove = (reqId: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: 'Approved' } : r))
    );
    if (selectedReq.id === reqId) {
      setSelectedReq((prev) => ({ ...prev, status: 'Approved' }));
    }
  };

  const handleReject = (reqId: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: 'Rejected' } : r))
    );
    if (selectedReq.id === reqId) {
      setSelectedReq((prev) => ({ ...prev, status: 'Rejected' }));
    }
  };

  const filtered = requests.filter((r) => {
    if (activeFilter === 'Pending') return r.status === 'Pending';
    if (activeFilter === 'Approved') return r.status === 'Approved';
    if (activeFilter === 'Rejected') return r.status === 'Rejected';
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#00B8FF]" />
            <span>Document Access Requests (Admin Approval Flow)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Administrator portal for reviewing and approving document access requests submitted by Advocates.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="p-4 rounded-2xl bg-[#081525] border border-white/10 flex items-center gap-2 text-xs">
        {[
          { id: 'Pending', label: `Pending (${requests.filter((r) => r.status === 'Pending').length})` },
          { id: 'Approved', label: `Approved (${requests.filter((r) => r.status === 'Approved').length})` },
          { id: 'Rejected', label: `Rejected (${requests.filter((r) => r.status === 'Rejected').length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === tab.id
                ? 'bg-[#00B8FF] text-white shadow-lg shadow-[#00B8FF]/20'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Request List (Left) + Details Inspector (Right) (Ref Panel 12) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Request List (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4 text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="pb-3 font-semibold">Request ID</th>
                  <th className="pb-3 font-semibold">User</th>
                  <th className="pb-3 font-semibold">Role</th>
                  <th className="pb-3 font-semibold">Case / Document</th>
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((req) => (
                  <tr
                    key={req.id}
                    onClick={() => setSelectedReq(req)}
                    className={`hover:bg-white/[0.02] cursor-pointer ${
                      selectedReq.id === req.id ? 'bg-white/5' : ''
                    }`}
                  >
                    <td className="py-3 font-mono font-bold text-[#00B8FF]">{req.id}</td>
                    <td className="py-3 font-bold text-white">{req.user}</td>
                    <td className="py-3 text-slate-300">{req.userRole}</td>
                    <td className="py-3 font-bold text-slate-200">{req.caseDoc}</td>
                    <td className="py-3 font-mono text-slate-400">{req.date}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          req.status === 'Approved'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : req.status === 'Rejected'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      {req.status === 'Pending' ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleApprove(req.id);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[10px] cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReject(req.id);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-bold text-[10px] cursor-pointer"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-mono">Action Complete</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Request Details Inspector (Ref Panel 12) */}
        {selectedReq && (
          <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4 text-xs">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              Request Details — {selectedReq.id}
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">User:</span>
                <span className="font-bold text-white">{selectedReq.user} (ADV-001)</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">Role:</span>
                <span className="font-bold text-purple-300">{selectedReq.userRole}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">Requested Document:</span>
                <span className="font-bold text-[#00B8FF]">{selectedReq.caseDoc}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">Court Jurisdiction:</span>
                <span className="font-bold text-slate-200">{selectedReq.court}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">Request Date:</span>
                <span className="font-mono text-slate-400">{selectedReq.date}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">Reason Provided:</span>
                <p className="p-3 rounded-xl bg-[#041828] border border-white/5 text-slate-200 leading-relaxed">
                  {selectedReq.reason}
                </p>
              </div>

              {selectedReq.status === 'Pending' && (
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => handleApprove(selectedReq.id)}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold cursor-pointer transition-all text-center shadow-lg shadow-emerald-500/20"
                  >
                    Approve Request
                  </button>
                  <button
                    onClick={() => handleReject(selectedReq.id)}
                    className="flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold cursor-pointer transition-all text-center shadow-lg shadow-rose-500/20"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

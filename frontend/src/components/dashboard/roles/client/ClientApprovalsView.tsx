import React, { useState } from 'react';
import {
  CheckSquare,
  CheckCircle2,
  Clock,
  ChevronRight
} from 'lucide-react';

interface ClientApprovalsViewProps {
  onOpenMatter: (matterId: string) => void;
  onOpenDocument: (documentId: string) => void;
}

export const ClientApprovalsView: React.FC<ClientApprovalsViewProps> = ({
  onOpenMatter,
  onOpenDocument,
}) => {
  const [selectedApproval, setSelectedApproval] = useState<any | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const pendingApprovals = [
    { id: 'APR-022', matterId: 'MAT-301', item: 'Settlement Draft v2', requestedBy: 'Legal Team', deadline: '28 Sep 2026', status: 'Awaiting Approval', docId: 'DOC-101' },
    { id: 'APR-021', matterId: 'MAT-299', item: 'Final Agreement', requestedBy: 'Legal Team', deadline: '05 Oct 2026', status: 'Awaiting Approval', docId: 'DOC-102' },
  ];

  const systemAlerts = [
    { title: 'Matter status updated', detail: 'MAT-178 moved to Hearing Scheduled', time: '1 day ago', matterId: 'MAT-178' },
    { title: 'Deadline approaching', detail: 'File Written Submission for MAT-301 (2 days left)', time: '2 days ago', matterId: 'MAT-301' },
  ];

  const handleAction = (actionType: 'approve' | 'request_changes' | 'reject') => {
    if (!selectedApproval) return;
    if (actionType === 'approve') {
      setActionFeedback(`Approval ${selectedApproval.id} confirmed.`);
    } else if (actionType === 'request_changes') {
      const reason = prompt('Enter change request notes:');
      if (!reason) return;
      setActionFeedback(`Change request recorded for ${selectedApproval.id}.`);
    } else {
      setActionFeedback(`Approval ${selectedApproval.id} rejected.`);
    }

    setSelectedApproval(null);
    setTimeout(() => setActionFeedback(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-amber-400" />
            <span>Pending Approvals ({pendingApprovals.length})</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review and take action on items requiring your approval.
          </p>
        </div>
        <button
          onClick={() => alert('All notifications marked as read.')}
          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs border border-white/10 cursor-pointer"
        >
          Mark All Read
        </button>
      </div>

      {actionFeedback && (
        <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{actionFeedback}</span>
        </div>
      )}

      {/* Approvals Table (Ref Panel 8) */}
      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#041828] text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-3.5 rounded-l-lg">Approval ID</th>
                <th className="p-3.5">Matter</th>
                <th className="p-3.5">Item</th>
                <th className="p-3.5">Requested By</th>
                <th className="p-3.5">Deadline</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {pendingApprovals.map((apr) => (
                <tr key={apr.id} className="hover:bg-white/[0.02]">
                  <td className="p-3.5 font-mono font-bold text-[#00B8FF]">{apr.id}</td>
                  <td className="p-3.5">
                    <button
                      onClick={() => onOpenMatter(apr.matterId)}
                      className="font-mono text-xs font-bold text-slate-300 hover:text-[#00B8FF] hover:underline cursor-pointer"
                    >
                      {apr.matterId}
                    </button>
                  </td>
                  <td className="p-3.5 font-bold text-white">{apr.item}</td>
                  <td className="p-3.5 text-slate-400">{apr.requestedBy}</td>
                  <td className="p-3.5 font-mono text-rose-400 font-semibold">{apr.deadline}</td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {apr.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setSelectedApproval(apr)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#00B8FF] hover:bg-[#0098D4] text-white font-bold text-xs ml-auto cursor-pointer shadow-sm"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Items / Alerts Section (Ref Panel 8 Bottom) */}
      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
          <Clock className="w-4 h-4 text-[#00B8FF]" />
          <span>System Alerts & Milestone Updates</span>
        </h3>

        <div className="space-y-3">
          {systemAlerts.map((alert) => (
            <div key={alert.title + alert.time} className="p-4 rounded-xl bg-[#041828] border border-white/5 flex items-center justify-between gap-4 text-xs">
              <div className="space-y-0.5">
                <h4 className="font-bold text-white">{alert.title}</h4>
                <p className="text-slate-400 font-mono text-[11px]">{alert.detail}</p>
                <span className="text-[10px] text-slate-500 font-mono block">{alert.time}</span>
              </div>
              <button
                onClick={() => onOpenMatter(alert.matterId)}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#00B8FF] font-bold text-xs flex items-center gap-1 cursor-pointer"
              >
                <span>View</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {selectedApproval && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-[#081525] border border-[#00B8FF]/30 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="font-extrabold text-white text-base">{selectedApproval.item}</h3>
                <span className="font-mono text-xs text-[#00B8FF] font-bold">{selectedApproval.id} • {selectedApproval.matterId}</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">
                Deadline: {selectedApproval.deadline}
              </span>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <p>Legal counsel has requested your signoff on this document draft before proceeding to court filing.</p>
              <div className="p-3 rounded-xl bg-[#041828] border border-white/5 flex items-center justify-between">
                <span className="font-bold text-white">Associated File: {selectedApproval.item}.pdf</span>
                <button
                  onClick={() => onOpenDocument(selectedApproval.docId)}
                  className="px-2.5 py-1 rounded bg-[#00B8FF]/20 text-[#00B8FF] font-bold"
                >
                  Preview Document
                </button>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap gap-2 justify-end">
              <button
                onClick={() => handleAction('approve')}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs cursor-pointer"
              >
                Approve
              </button>
              <button
                onClick={() => handleAction('request_changes')}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs cursor-pointer"
              >
                Request Changes
              </button>
              <button
                onClick={() => handleAction('reject')}
                className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 font-bold text-xs cursor-pointer"
              >
                Reject
              </button>
              <button
                onClick={() => setSelectedApproval(null)}
                className="px-4 py-2 rounded-xl bg-white/5 text-slate-400 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientApprovalsView;

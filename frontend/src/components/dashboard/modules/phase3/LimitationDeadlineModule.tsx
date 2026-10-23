import React, { useState } from 'react';
import { Calendar, Plus } from 'lucide-react';

interface DeadlineItem {
  id: string;
  deadlineType: string;
  dueDate: string;
  daysRemaining: number;
  status: 'upcoming' | 'overdue' | 'met';
  caseRef?: string;
}

export const LimitationDeadlineModule: React.FC = () => {
  const [deadlines, setDeadlines] = useState<DeadlineItem[]>([
    {
      id: 'D-001',
      deadlineType: 'GST GSTR-1 Filing',
      dueDate: '20 Oct 2025',
      daysRemaining: 12,
      status: 'upcoming',
      caseRef: 'Tax Matter #2025',
    },
    {
      id: 'D-002',
      deadlineType: 'Income Tax Filing (AY 24-25)',
      dueDate: '31 Oct 2025',
      daysRemaining: 23,
      status: 'upcoming',
      caseRef: 'ITR Assessment #104',
    },
    {
      id: 'D-003',
      deadlineType: 'Reply to Legal Notice',
      dueDate: '05 Sep 2025',
      daysRemaining: -2,
      status: 'overdue',
      caseRef: 'ABC Corp vs MARG',
    },
    {
      id: 'D-004',
      deadlineType: 'Court Hearing - Civil Suit',
      dueDate: '15 Sep 2025',
      daysRemaining: 8,
      status: 'upcoming',
      caseRef: 'Civil Suit #492',
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);

  const handleAddDeadline = () => {
    setIsAdding(true);
    setTimeout(() => {
      const newD: DeadlineItem = {
        id: `D-00${deadlines.length + 1}`,
        deadlineType: 'ROC Annual Return Filing',
        dueDate: '30 Nov 2025',
        daysRemaining: 45,
        status: 'upcoming',
        caseRef: 'MARG Corporate Compliance',
      };
      setDeadlines((prev) => [newD, ...prev]);
      setIsAdding(false);
    }, 1000);
  };

  const getStatusBadge = (status: string) => {
    if (status === 'overdue') {
      return 'bg-red-500/20 text-red-300 border-red-500/40';
    }
    if (status === 'met') {
      return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    }
    return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
  };

  return (
    <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-red-500/20 text-red-400 font-extrabold text-xs flex items-center justify-center border border-red-500/30">
              24
            </span>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-red-400" />
                <span>Limitation & Deadline Engine</span>
              </h3>
              <p className="text-[11px] text-slate-400">Track. Alert. Stay Compliant.</p>
            </div>
          </div>
          <button
            onClick={handleAddDeadline}
            disabled={isAdding}
            className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 transition flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            <span>{isAdding ? 'Adding...' : '+ Add Deadline'}</span>
          </button>
        </div>

        <div className="flex items-center justify-between mt-3 text-[11px] text-slate-400 bg-white/[0.03] p-2 rounded-xl border border-white/5">
          <span className="font-semibold text-slate-300">Upcoming Deadlines ({deadlines.length})</span>
          <select className="bg-[#030712] text-slate-300 border border-white/10 rounded-lg px-2 py-0.5 text-[11px] focus:outline-none">
            <option>All Types</option>
            <option>Filing</option>
            <option>Limitation</option>
            <option>Hearing</option>
          </select>
        </div>
      </div>

      {/* Deadlines List */}
      <div className="space-y-2.5 max-h-[230px] overflow-y-auto pr-1">
        {deadlines.map((item) => (
          <div
            key={item.id}
            className="bg-[#030712]/80 border border-white/10 rounded-xl p-3 space-y-1.5 hover:border-red-500/30 transition"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold text-slate-200 truncate">{item.deadlineType}</p>
              <span className="font-mono text-xs font-extrabold text-white shrink-0">{item.dueDate}</span>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-white/5 font-mono">
              <span className="truncate max-w-[150px]">{item.caseRef || 'General Case'}</span>

              <div className="flex items-center gap-2">
                <span
                  className={`font-bold ${
                    item.daysRemaining < 0 ? 'text-red-400' : 'text-emerald-400'
                  }`}
                >
                  {item.daysRemaining < 0
                    ? `${Math.abs(item.daysRemaining)} days ago`
                    : `${item.daysRemaining} days remaining`}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getStatusBadge(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <span>Module 24 • Statutory Limitation Monitoring</span>
        <span className="text-red-400 hover:underline cursor-pointer">View Details &rarr;</span>
      </div>
    </div>
  );
};

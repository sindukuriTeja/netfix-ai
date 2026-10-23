import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Plus, CheckCircle2 } from 'lucide-react';

interface DeadlineItem {
  id: string;
  caseId: string;
  title: string;
  dueDate: string;
  daysRemaining: number;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Completed' | 'In Review';
  type: string;
}

interface CaseDeadlinesTabProps {
  caseId?: string;
}

export const CaseDeadlinesTab: React.FC<CaseDeadlinesTabProps> = ({ caseId }) => {
  const [deadlines, setDeadlines] = useState<DeadlineItem[]>([
    {
      id: 'DL-101',
      caseId: 'CASE-102',
      title: 'GST Demand Notice Response Filing',
      dueDate: '28 Sep 2026',
      daysRemaining: 3,
      priority: 'High',
      status: 'Pending',
      type: 'Statutory Notice Reply',
    },
    {
      id: 'DL-102',
      caseId: 'CASE-102',
      title: 'File Tally GSTR-2B Reconciliation Report',
      dueDate: '30 Sep 2026',
      daysRemaining: 5,
      priority: 'High',
      status: 'Pending',
      type: 'Internal Audit',
    },
    {
      id: 'DL-103',
      caseId: 'CASE-087',
      title: 'Submit Additional Invoices & E-Way Bills',
      dueDate: '05 Oct 2026',
      daysRemaining: 10,
      priority: 'Medium',
      status: 'Pending',
      type: 'Document Submission',
    },
    {
      id: 'DL-104',
      caseId: 'CASE-091',
      title: 'Compliance Audit Final Report Sign-off',
      dueDate: '12 Oct 2026',
      daysRemaining: 17,
      priority: 'Low',
      status: 'Pending',
      type: 'Executive Review',
    },
  ]);

  const [activeView, setActiveView] = useState<'Upcoming' | 'This Week' | 'Calendar'>('Upcoming');
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');

  const filteredDeadlines = deadlines.filter((d) => {
    if (caseId && d.caseId !== caseId) return false;
    if (activeView === 'This Week') return d.daysRemaining <= 7;
    return true;
  });

  const handleAddDeadline = () => {
    if (!newTitle || !newDate) return;
    setDeadlines([
      ...deadlines,
      {
        id: `DL-${Date.now().toString().slice(-3)}`,
        caseId: caseId || 'CASE-102',
        title: newTitle,
        dueDate: newDate,
        daysRemaining: 7,
        priority: 'Medium',
        status: 'Pending',
        type: 'Internal Deadline',
      },
    ]);
    setNewTitle('');
    setNewDate('');
    setIsAdding(false);
  };

  const handleToggleComplete = (id: string) => {
    setDeadlines(
      deadlines.map((d) =>
        d.id === id ? { ...d, status: d.status === 'Completed' ? 'Pending' : 'Completed' } : d
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-rose-400" />
            <span>Deadline Engine (Module 16)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time compliance deadlines, statutory notice countdowns & alert settings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-[#041828] p-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setActiveView('Upcoming')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                activeView === 'Upcoming' ? 'bg-[#00B8FF] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveView('This Week')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                activeView === 'This Week' ? 'bg-[#00B8FF] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              This Week
            </button>
          </div>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-3.5 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Deadline</span>
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="p-5 rounded-2xl bg-[#081525] border border-[#00B8FF]/40 space-y-3 text-xs">
          <h4 className="font-bold text-white text-sm">Add New Deadline</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Title</label>
              <input
                type="text"
                placeholder="Deadline title..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#041828] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Due Date</label>
              <input
                type="text"
                placeholder="e.g. 02 Oct 2026"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#041828] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setIsAdding(false)} className="px-3 py-1.5 rounded-lg bg-white/5 text-slate-300 font-semibold">
              Cancel
            </button>
            <button onClick={handleAddDeadline} className="px-4 py-1.5 rounded-lg bg-[#00B8FF] text-white font-bold">
              Save Deadline
            </button>
          </div>
        </div>
      )}

      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-3">
        {filteredDeadlines.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
              item.status === 'Completed'
                ? 'bg-emerald-500/5 border-emerald-500/20 opacity-75'
                : item.daysRemaining <= 3
                ? 'bg-rose-500/10 border-rose-500/30'
                : 'bg-[#041828] border-white/5'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#00B8FF]">{item.caseId}</span>
                <span className="text-xs font-semibold text-purple-300">({item.type})</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    item.priority === 'High'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {item.priority} Priority
                </span>
              </div>
              <h4 className={`text-sm font-bold ${item.status === 'Completed' ? 'line-through text-slate-400' : 'text-white'}`}>
                {item.title}
              </h4>
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-rose-400" />
                <span>Due Date: {item.dueDate}</span>
              </p>
            </div>

            <div className="flex items-center gap-3 sm:self-center">
              <span
                className={`px-3 py-1 rounded-xl text-xs font-bold font-mono border ${
                  item.daysRemaining <= 3
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/30 animate-pulse'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                }`}
              >
                {item.daysRemaining} days left
              </span>

              <button
                onClick={() => handleToggleComplete(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  item.status === 'Completed'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{item.status === 'Completed' ? 'Completed' : 'Mark Complete'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Bell, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface DeadlineItem {
  id: string;
  matterId: string;
  title: string;
  type: string;
  court: string;
  date: string;
  daysLeft: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Completed';
  notes: string;
}

export const AdvocateDeadlinesView: React.FC = () => {
  const [viewMode, setViewMode] = useState<'Calendar' | 'List'>('Calendar');
  const [selectedDate, setSelectedDate] = useState<number>(28);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newMatter, setNewMatter] = useState<string>('MAT-204');
  const [reminderToast, setReminderToast] = useState<string | null>(null);

  const [deadlines] = useState<DeadlineItem[]>([
    { id: 'DEAD-01', matterId: 'MAT-204', title: 'File Written Submission', type: 'Filing', court: 'High Court', date: '28 Sep 2026', daysLeft: '2 days', priority: 'High', status: 'Pending', notes: 'Reply affidavit must be filed prior to 28 Sep hearing.' },
    { id: 'DEAD-02', matterId: 'MAT-178', title: 'Court Hearing (Tax Appeal)', type: 'Hearing', court: 'High Court Bench', date: '30 Sep 2026', daysLeft: '5 days', priority: 'High', status: 'Pending', notes: 'Senior advocate presentation scheduled.' },
    { id: 'DEAD-03', matterId: 'MAT-166', title: 'Evidence Disclosure', type: 'Disclosure', court: 'District Court', date: '12 Oct 2026', daysLeft: '12 days', priority: 'Medium', status: 'Pending', notes: 'Submit original agreement copy to court clerk.' },
  ]);

  const handleSetReminder = (title: string) => {
    setReminderToast(`Reminder set for "${title}". Notification scheduled 24 hours prior.`);
    setTimeout(() => setReminderToast(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-amber-400" />
            <span>Deadlines & Hearings — Calendar & List</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage statutory filing deadlines, limitation periods, and court hearing schedules.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-1 rounded-xl bg-white/5 border border-white/10 flex items-center gap-1 text-xs">
            <button
              onClick={() => setViewMode('Calendar')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                viewMode === 'Calendar' ? 'bg-[#00B8FF] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Calendar
            </button>
            <button
              onClick={() => setViewMode('List')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                viewMode === 'List' ? 'bg-[#00B8FF] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              List view
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#00B8FF]/20"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Deadline / Hearing</span>
          </button>
        </div>
      </div>

      {reminderToast && (
        <div className="p-3.5 rounded-xl bg-purple-500/20 border border-purple-500/30 text-xs text-purple-300 font-bold flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-purple-400" />
            <span>{reminderToast}</span>
          </div>
          <button onClick={() => setReminderToast(null)} className="text-slate-400 hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Main Content Grid: Calendar + Selected Date Event Details (Ref Panel 9) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Span 2): Interactive Calendar Grid */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ChevronLeft className="w-4 h-4 text-slate-400 cursor-pointer" />
              <span>September 2026</span>
              <ChevronRight className="w-4 h-4 text-slate-400 cursor-pointer" />
            </h3>
            <span className="text-xs font-mono text-[#00B8FF] font-bold">3 Events Scheduled</span>
          </div>

          {/* Month Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="py-1 text-[10px] font-bold text-slate-400 uppercase">
                {day}
              </div>
            ))}

            {Array.from({ length: 30 }).map((_, i) => {
              const dayNum = i + 1;
              const hasEvent = dayNum === 28 || dayNum === 30 || dayNum === 12;
              const isSelected = selectedDate === dayNum;

              return (
                <div
                  key={dayNum}
                  onClick={() => setSelectedDate(dayNum)}
                  className={`p-3 rounded-xl min-h-[50px] flex flex-col items-center justify-between transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#00B8FF]/20 border-[#00B8FF] text-white font-bold shadow-lg shadow-[#00B8FF]/20'
                      : hasEvent
                      ? 'bg-white/5 border-rose-500/40 text-white'
                      : 'bg-[#041828]/50 border-white/5 text-slate-400 hover:bg-white/5'
                  }`}
                >
                  <span className="font-mono text-xs">{dayNum}</span>
                  {hasEvent && (
                    <span className="w-2 h-2 rounded-full bg-rose-500 shadow-sm shadow-rose-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Date Event Details (Ref Panel 9) */}
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4 text-xs">
          <div className="border-b border-white/10 pb-3">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Selected Date</span>
            <h3 className="text-base font-extrabold text-white">{selectedDate} Sep 2026</h3>
          </div>

          {selectedDate === 28 ? (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono font-extrabold text-[#00B8FF]">MAT-204</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Due in 2 days
                </span>
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">File Written Submission</h4>
                <p className="text-slate-300 text-[11px] mt-0.5">Court: High Court | Client vs ABC Corp</p>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Reply affidavit must be filed before hearing on 28 Sep.
              </p>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => handleSetReminder('File Written Submission')}
                  className="flex-1 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 font-bold border border-purple-500/30 flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Bell className="w-3.5 h-3.5" /> Set Reminder
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-[#041828] border border-white/5 text-center text-slate-400 font-mono">
              No hearings or deadlines scheduled for {selectedDate} Sep 2026.
            </div>
          )}

          {/* Upcoming Events List */}
          <div className="pt-2 space-y-2">
            <h4 className="font-bold text-white uppercase text-[10px] tracking-wider">Upcoming Events</h4>
            {deadlines.map((d) => (
              <div key={d.id} className="p-3 rounded-xl bg-[#041828] border border-white/5 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="font-mono font-bold text-[#00B8FF]">{d.matterId}</span>
                  <h5 className="font-bold text-white">{d.title}</h5>
                  <span className="text-[10px] font-mono text-slate-400">{d.date}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {d.daysLeft}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Deadline Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#081525] border border-white/10 rounded-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#00B8FF]" /> Add Deadline / Hearing
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Title / Description</label>
                <input
                  type="text"
                  placeholder="e.g. File Reply Affidavit"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#041828] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Matter</label>
                <select
                  value={newMatter}
                  onChange={(e) => setNewMatter(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#041828] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
                >
                  <option value="MAT-204">MAT-204 - Client vs ABC Corp</option>
                  <option value="MAT-178">MAT-178 - Tax Appeal</option>
                  <option value="MAT-166">MAT-166 - Property Partition</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 font-bold cursor-pointer">Cancel</button>
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-xl bg-[#00B8FF] text-white font-bold cursor-pointer">Save Deadline</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

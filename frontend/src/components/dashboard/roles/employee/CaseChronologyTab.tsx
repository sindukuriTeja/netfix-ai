import React, { useState } from 'react';
import { Plus, Calendar, Download, Link2 } from 'lucide-react';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  linkedDoc: string;
  source: string;
}

interface CaseChronologyTabProps {
  caseId: string;
}

export const CaseChronologyTab: React.FC<CaseChronologyTabProps> = ({ caseId }) => {
  const [events, setEvents] = useState<TimelineEvent[]>([
    {
      id: 'EV-01',
      date: '12 May 2026',
      title: 'Tax Invoice Received',
      description: 'Tax Invoice #INV-8821 received from XYZ Traders for supply of raw materials.',
      linkedDoc: 'Tax_Invoice_8821.pdf',
      source: 'Client Record',
    },
    {
      id: 'EV-02',
      date: '14 May 2026',
      title: 'Bank Payment Dispatched',
      description: 'Full payment of ₹ 2,45,000 processed via NEFT transaction #TXN992810.',
      linkedDoc: 'Bank_Statement_Q3.pdf',
      source: 'Financial Statement',
    },
    {
      id: 'EV-03',
      date: '25 Aug 2026',
      title: 'Supplier Delayed Return Filing',
      description: 'Supplier XYZ Traders filed GSTR-1 for May 2026 on 25 Aug 2026.',
      linkedDoc: 'GST_Portal_Filing_Log.pdf',
      source: 'GST Portal Data',
    },
    {
      id: 'EV-04',
      date: '18 Sep 2026',
      title: 'Demand Notice Issued',
      description: 'GST Department issued demand notice alleging ITC mismatch under Sec 73.',
      linkedDoc: 'GST_Notice_2026.pdf',
      source: 'Official Notice',
    },
  ]);

  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [newEvent, setNewEvent] = useState({
    date: '',
    title: '',
    description: '',
    linkedDoc: 'GST_Notice_2026.pdf',
  });

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) return;
    setEvents([
      ...events,
      {
        id: `EV-0${events.length + 1}`,
        date: newEvent.date,
        title: newEvent.title,
        description: newEvent.description,
        linkedDoc: newEvent.linkedDoc,
        source: 'Manual Employee Entry',
      },
    ]);
    setNewEvent({ date: '', title: '', description: '', linkedDoc: 'GST_Notice_2026.pdf' });
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>Chronology Engine — Case Timeline (Module 13) — {caseId}</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Chronological event stream linked to case evidence and document sources.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer">
            <Download className="w-3.5 h-3.5" />
            <span>Export Timeline</span>
          </button>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-3.5 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Event</span>
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="p-5 rounded-2xl bg-[#081525] border border-[#00B8FF]/40 space-y-3 text-xs">
          <h4 className="font-bold text-white text-sm">Add Timeline Event</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Event Date</label>
              <input
                type="text"
                placeholder="e.g. 20 Sep 2026"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#041828] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1 font-semibold">Event Title</label>
              <input
                type="text"
                placeholder="Event summary..."
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-[#041828] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF]"
              />
            </div>
          </div>
          <div>
            <label className="text-slate-400 block mb-1 font-semibold">Event Details</label>
            <textarea
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              rows={2}
              className="w-full p-2.5 rounded-xl bg-[#041828] border border-white/10 text-white focus:outline-none focus:border-[#00B8FF] resize-none"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 rounded-lg bg-white/5 text-slate-300 font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleAddEvent}
              className="px-4 py-1.5 rounded-lg bg-[#00B8FF] text-white font-bold"
            >
              Save Event
            </button>
          </div>
        </div>
      )}

      <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-6">
        <div className="relative border-l-2 border-[#00B8FF]/30 ml-4 space-y-6">
          {events.map((ev) => (
            <div key={ev.id} className="relative pl-6 group">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#041828] border-2 border-[#00B8FF] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00B8FF]" />
              </div>

              <div className="p-4 rounded-xl bg-[#041828] border border-white/5 hover:border-[#00B8FF]/30 transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-rose-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {ev.date}
                    </span>
                    <span className="text-xs font-bold text-white">{ev.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                    {ev.source}
                  </span>
                </div>

                <p className="text-xs text-slate-300">{ev.description}</p>

                <div className="pt-2 flex items-center gap-2 border-t border-white/5 text-xs text-slate-400">
                  <Link2 className="w-3.5 h-3.5 text-[#00B8FF]" />
                  <span>Linked Document:</span>
                  <span className="font-mono text-xs text-[#00B8FF] font-semibold">{ev.linkedDoc}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Building, BarChart3 } from 'lucide-react';

export const ProjectManagementModule: React.FC = () => {
  const milestones = [
    { name: 'Foundation Work', status: 'Completed', date: '15 Mar 2024', color: 'emerald' },
    { name: 'Structural Work', status: 'In Progress', date: '30 Aug 2024', color: 'amber' },
    { name: 'Exterior Construction', status: 'Pending', date: '15 Dec 2024', color: 'slate' },
    { name: 'Interior Work', status: 'Pending', date: '28 Feb 2025', color: 'slate' },
    { name: 'Final Inspection', status: 'Pending', date: '31 Dec 2026', color: 'slate' },
  ];

  return (
    <div className="bg-[#081525]/90 border border-white/10 rounded-2xl p-5 backdrop-blur-xl flex flex-col justify-between space-y-4 shadow-xl hover:border-emerald-500/30 transition-all duration-300">
      {/* Module Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs border border-emerald-500/30">
            19
          </div>
          <div>
            <h3 className="text-sm font-black text-white tracking-tight flex items-center gap-2">
              Project Management
            </h3>
            <p className="text-[11px] text-slate-400">Plan. Execute. Deliver.</p>
          </div>
        </div>
        <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
          PROJECTS
        </span>
      </div>

      {/* Project Card Overview */}
      <div className="bg-[#030712]/80 border border-white/10 rounded-xl p-3 space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-emerald-400" />
              <span>Skyline Commercial Complex</span>
            </h4>
            <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-0.5">
              <span>Start: 01 Jan 2024</span>
              <span>Expected: 31 Dec 2026</span>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
            On Track
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-bold">
            <span className="text-slate-400">Project Progress</span>
            <span className="text-emerald-400 font-mono">62%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-[62%] rounded-full transition-all duration-500"></div>
          </div>
        </div>
      </div>

      {/* Milestones List */}
      <div className="space-y-1.5 text-xs">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Key Milestones</span>
        {milestones.slice(0, 3).map((m, idx) => (
          <div
            key={idx}
            className="bg-[#030712]/60 border border-white/5 rounded-lg p-2 flex items-center justify-between text-[11px]"
          >
            <span className="font-semibold text-slate-200">{m.name}</span>
            <div className="flex items-center gap-2">
              <span
                className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                  m.color === 'emerald'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : m.color === 'amber'
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {m.status}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">{m.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-white/10">
        <button className="w-full bg-emerald-600/80 hover:bg-emerald-600 text-white font-bold text-xs py-2 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>View Project Dashboard</span>
        </button>
      </div>
    </div>
  );
};

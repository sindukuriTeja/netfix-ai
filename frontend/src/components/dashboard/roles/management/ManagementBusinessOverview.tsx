import React, { useState } from 'react';
import { TrendingUp, BarChart2, PieChart, Sparkles } from 'lucide-react';

interface ManagementBusinessOverviewProps {
  onAskAi: (prompt?: string) => void;
}

export const ManagementBusinessOverview: React.FC<ManagementBusinessOverviewProps> = ({ onAskAi }) => {
  const [timeRange, setTimeRange] = useState('Last 6 Months');

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#00B8FF]" />
            <span>Business Overview (Organization Analytics)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Firm-wide operational health, department workload & portfolio distribution trends.
          </p>
        </div>

        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-xs text-slate-200 font-bold focus:outline-none focus:border-[#00B8FF]"
        >
          <option>Last 30 Days</option>
          <option>Last 6 Months</option>
          <option>Last 12 Months</option>
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#081525] border border-white/10 space-y-1">
          <span className="text-xs text-slate-400 font-semibold block">Total Portfolio Value</span>
          <span className="text-2xl font-extrabold text-emerald-400 font-mono block">₹42.5 Cr</span>
          <span className="text-[10px] font-bold text-emerald-400">+8.5% this quarter</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#081525] border border-white/10 space-y-1">
          <span className="text-xs text-slate-400 font-semibold block">Total Matters</span>
          <span className="text-2xl font-extrabold text-white font-mono block">148</span>
          <span className="text-[10px] text-slate-400">Across 6 departments</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#081525] border border-white/10 space-y-1">
          <span className="text-xs text-slate-400 font-semibold block">New Matters</span>
          <span className="text-2xl font-extrabold text-[#00B8FF] font-mono block">32</span>
          <span className="text-[10px] font-bold text-[#00B8FF]">+12% vs last period</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#081525] border border-white/10 space-y-1">
          <span className="text-xs text-slate-400 font-semibold block">Resolved Matters</span>
          <span className="text-2xl font-extrabold text-purple-400 font-mono block">28</span>
          <span className="text-[10px] text-slate-400">86% SLA compliance</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-[#00B8FF]" /> Matters Trend
          </h3>

          <div className="h-40 flex items-end justify-between gap-2 pt-4 px-2">
            {[20, 28, 35, 42, 38, 48].map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div
                  style={{ height: `${val * 2}px` }}
                  className="w-full rounded-t-lg bg-gradient-to-t from-[#00B8FF]/20 to-[#00B8FF]"
                />
                <span className="text-[9px] font-mono text-slate-400">
                  {['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'][idx]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <BarChart2 className="w-4 h-4 text-purple-400" /> Matters by Department
          </h3>

          <div className="space-y-2.5 text-xs">
            {[
              { name: 'Legal', count: 42, color: 'bg-purple-500' },
              { name: 'Finance', count: 32, color: 'bg-[#00B8FF]' },
              { name: 'Compliance', count: 28, color: 'bg-emerald-500' },
              { name: 'Corporate', count: 18, color: 'bg-amber-500' },
              { name: 'Tax', count: 16, color: 'bg-rose-500' },
              { name: 'Property', count: 12, color: 'bg-indigo-500' },
            ].map((d) => (
              <div key={d.name} className="space-y-1">
                <div className="flex justify-between text-slate-300 font-semibold text-[11px]">
                  <span>{d.name}</span>
                  <span className="font-mono text-white">{d.count}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                  <div style={{ width: `${(d.count / 42) * 100}%` }} className={`h-full ${d.color}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4 flex flex-col justify-between">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <PieChart className="w-4 h-4 text-emerald-400" /> Matter Types Distribution
          </h3>

          <div className="flex items-center justify-around py-4">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path strokeDasharray="35, 100" strokeWidth="4" stroke="#00B8FF" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path strokeDasharray="25, 100" strokeDashoffset="-35" strokeWidth="4" stroke="#A855F7" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path strokeDasharray="18, 100" strokeDashoffset="-60" strokeWidth="4" stroke="#10B981" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute text-center">
                <span className="text-xl font-bold font-mono text-white">148</span>
                <span className="text-[9px] text-slate-400 block">Matters</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00B8FF]" />
                <span>Litigation 35%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <span>Tax 25%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Compliance 18%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#081525] border border-[#00B8FF]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00B8FF]" /> AI Business Analyst Insight
          </h3>
          <p className="text-xs text-slate-200 leading-relaxed">
            Revenue from active matters has increased by 18% this quarter. Tax and compliance matters show the highest growth. 3 high-value matters require executive attention.
          </p>
        </div>

        <button
          onClick={() => onAskAi('Summarize organization-level business trends and high-growth areas')}
          className="px-4 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold transition-all cursor-pointer whitespace-nowrap self-start md:self-auto"
        >
          Ask AI for Insights
        </button>
      </div>
    </div>
  );
};

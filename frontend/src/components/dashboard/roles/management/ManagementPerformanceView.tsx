import React, { useState } from 'react';
import { BarChart3, Sparkles, Users, TrendingUp } from 'lucide-react';

interface ManagementPerformanceViewProps {
  onAskAi: (prompt?: string) => void;
}

export const ManagementPerformanceView: React.FC<ManagementPerformanceViewProps> = ({ onAskAi }) => {
  const [timeRange, setTimeRange] = useState('Last 6 Months');

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#00B8FF]" />
            <span>Performance (Operations & Teams Analytics)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Operational SLAs, resolution rates, team workload distribution & turnaround metrics.
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

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-5 rounded-2xl bg-[#081525] border border-white/10 space-y-1">
          <span className="text-slate-400 font-semibold block">Resolution Rate</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-emerald-400 font-mono">78%</span>
            <span className="text-[10px] font-bold text-emerald-400">+12%</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#081525] border border-white/10 space-y-1">
          <span className="text-slate-400 font-semibold block">Avg. Resolution Time</span>
          <span className="text-2xl font-extrabold text-white font-mono block">42 days</span>
          <span className="text-[10px] text-slate-400">-5 days vs SLA target</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#081525] border border-white/10 space-y-1">
          <span className="text-slate-400 font-semibold block">SLA Compliance</span>
          <span className="text-2xl font-extrabold text-emerald-400 font-mono block">86%</span>
          <span className="text-[10px] text-slate-400">Target: 85%</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#081525] border border-white/10 space-y-1">
          <span className="text-slate-400 font-semibold block">Approval Turnaround</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-[#00B8FF] font-mono">2.4 days</span>
            <span className="text-[10px] font-bold text-[#00B8FF]">-15% faster</span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matter Resolution Trend */}
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-[#00B8FF]" /> Matter Resolution Trend
          </h3>

          <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2">
            {[18, 22, 28, 24, 32, 38].map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div
                  style={{ height: `${val * 3}px` }}
                  className="w-full rounded-t-lg bg-[#00B8FF] hover:bg-[#0098D4] transition-all"
                />
                <span className="text-[9px] font-mono text-slate-400">
                  {['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'][idx]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Team Workload */}
        <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Users className="w-4 h-4 text-purple-400" /> Team Workload Distribution
          </h3>

          <div className="space-y-3 text-xs">
            {[
              { team: 'Legal Team', active: 48, pct: '100%' },
              { team: 'Finance Team', active: 32, pct: '66%' },
              { team: 'Compliance Team', active: 24, pct: '50%' },
              { team: 'Corporate Team', active: 16, pct: '33%' },
              { team: 'Tax Team', active: 12, pct: '25%' },
            ].map((t) => (
              <div key={t.team} className="space-y-1">
                <div className="flex justify-between text-slate-300 font-semibold text-[11px]">
                  <span>{t.team}</span>
                  <span className="font-mono text-white">{t.active} matters</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                  <div style={{ width: t.pct }} className="h-full bg-[#00B8FF]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance AI Analyst Banner */}
      <div className="p-6 rounded-2xl bg-[#081525] border border-[#00B8FF]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00B8FF]" /> Performance Insights (AI)
          </h3>
          <p className="text-xs text-slate-200 leading-relaxed">
            Resolution rate has improved by 12%. Finance and Tax teams have increased workload. Approval turnaround time improved by 22% this quarter.
          </p>
        </div>

        <button
          onClick={() => onAskAi('Analyze team workload distribution and operational SLA bottlenecks')}
          className="px-4 py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold transition-all cursor-pointer whitespace-nowrap self-start md:self-auto"
        >
          Ask AI for Analysis
        </button>
      </div>
    </div>
  );
};

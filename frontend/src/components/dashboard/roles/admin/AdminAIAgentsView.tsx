import React, { useState } from 'react';
import {
  Brain,
  Plus
} from 'lucide-react';

export interface AdminAIAgentsViewProps {
  onOpenConfigureAgentModal?: () => void;
  onOpenConfigureAgent?: () => void;
}

export const AdminAIAgentsView: React.FC<AdminAIAgentsViewProps> = ({
  onOpenConfigureAgentModal,
  onOpenConfigureAgent,
}) => {
  const [selectedAgentId, setSelectedAgentId] = useState('ultron');

  const agents = [
    { id: 'ultron', name: 'Ultron AI Orchestrator', status: 'Active', desc: 'Coordinates specialized domain agents and manages multi-agent workflows.', tasksToday: 210, successRate: '98.1%', avgTime: '1.9s', failures: 4 },
    { id: 'legal-research', name: 'Legal Research Agent', status: 'Active', desc: 'Retrieves relevant precedents, acts, and statutory case laws.', tasksToday: 142, successRate: '99.2%', avgTime: '1.4s', failures: 1 },
    { id: 'tax-intelligence', name: 'Tax Intelligence Agent', status: 'Active', desc: 'Analyzes GST, Income Tax, and Form 26AS reconciliations.', tasksToday: 98, successRate: '96.5%', avgTime: '2.1s', failures: 3 },
    { id: 'doc-intake', name: 'Document Intake Agent', status: 'Active', desc: 'OCR parsing, document classification, and metadata extraction.', tasksToday: 310, successRate: '99.5%', avgTime: '0.8s', failures: 2 },
    { id: 'drafting', name: 'Drafting Agent', status: 'Idle', desc: 'Generates legal notices, petitions, contracts, and addendums.', tasksToday: 45, successRate: '97.8%', avgTime: '2.8s', failures: 1 },
    { id: 'case-analysis', name: 'Case Analysis Agent', status: 'Error', desc: 'Risk scoring, timeline extraction, and precedent mapping.', tasksToday: 12, successRate: '82.0%', avgTime: '3.4s', failures: 5 },
  ];

  const currentAgent = agents.find(a => a.id === selectedAgentId) || agents[0];

  const recentExecutions = [
    { time: '14:25', task: 'Document analysis #PR-9042', status: 'Success', duration: '2.1s' },
    { time: '14:18', task: 'Compliance check #CS-4012', status: 'Success', duration: '1.8s' },
    { time: '14:10', task: 'Risk assessment #FR-9042', status: 'Failed', duration: '3.4s' },
    { time: '14:02', task: 'Legal research #CS-4112', status: 'Success', duration: '2.0s' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Brain className="w-6 h-6 text-[#00B8FF]" />
            <span>AI Agents & Orchestrator</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Monitor AI agents, performance, tasks, and execution history.
          </p>
        </div>

        <button
          onClick={() => {
            if (onOpenConfigureAgent) onOpenConfigureAgent();
            if (onOpenConfigureAgentModal) onOpenConfigureAgentModal();
          }}
          className="px-4 py-2 rounded-xl bg-[#00B8FF] text-black font-bold text-xs hover:bg-[#0096d6] transition-colors flex items-center gap-2 shadow-lg shadow-[#00B8FF]/20"
        >
          <Plus className="w-4 h-4" />
          <span>Configure Agent</span>
        </button>
      </div>

      {/* 4 KPI Badges (Matching Panel 4) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Total Agents</span>
          <div className="text-2xl font-extrabold text-[#00B8FF] font-mono">26</div>
          <span className="text-[10px] text-slate-500">Domain specialized</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Active</span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">20</div>
          <span className="text-[10px] text-emerald-400/80 font-bold font-mono">76.9% running</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Idle</span>
          <div className="text-2xl font-extrabold text-amber-400 font-mono">4</div>
          <span className="text-[10px] text-amber-400/80 font-bold font-mono">15.4% ready</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Errors</span>
          <div className="text-2xl font-extrabold text-rose-400 font-mono">2</div>
          <span className="text-[10px] text-rose-400/80 font-bold font-mono">7.7% attention</span>
        </div>
      </div>

      {/* 2-Column Split Panel (Panel 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Panel: Agent List */}
        <div className="p-4 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
            Domain Agents ({agents.length})
          </h3>
          <div className="space-y-1 text-xs">
            {agents.map((a) => (
              <button
                key={a.id}
                onClick={() => setSelectedAgentId(a.id)}
                className={`w-full p-3 rounded-xl text-left transition-all flex items-center justify-between gap-3 ${
                  selectedAgentId === a.id
                    ? 'bg-[#00B8FF]/10 border border-[#00B8FF]/30 text-white font-bold'
                    : 'bg-[#040e1a] border border-white/5 text-slate-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Brain className={`w-4 h-4 shrink-0 ${selectedAgentId === a.id ? 'text-[#00B8FF]' : 'text-slate-500'}`} />
                  <span className="truncate">{a.name}</span>
                </div>

                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono shrink-0 ${
                    a.status === 'Active'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : a.status === 'Idle'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-rose-500/20 text-rose-300'
                  }`}
                >
                  {a.status}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel: Selected Agent Operational Detail */}
        <div className="lg:col-span-2 space-y-5">
          {/* Agent Header Card */}
          <div className="p-6 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-extrabold text-white">{currentAgent.name}</h2>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${
                      currentAgent.status === 'Active'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {currentAgent.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium">{currentAgent.desc}</p>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#040e1a] border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-400 block">Tasks Today</span>
                <span className="text-lg font-bold text-white block">{currentAgent.tasksToday}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#040e1a] border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-400 block">Success Rate</span>
                <span className="text-lg font-bold text-emerald-400 block">{currentAgent.successRate}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#040e1a] border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-400 block">Avg Response Time</span>
                <span className="text-lg font-bold text-[#00B8FF] block">{currentAgent.avgTime}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#040e1a] border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-400 block">Failures</span>
                <span className="text-lg font-bold text-rose-400 block">{currentAgent.failures}</span>
              </div>
            </div>
          </div>

          {/* Recent Executions Table */}
          <div className="p-5 rounded-2xl bg-[#081525]/90 border border-white/10 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Recent Executions</h3>
              <span className="text-xs font-mono text-slate-500">Real-time log</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-[#040e1a] text-slate-400 font-mono">
                    <th className="p-3 pl-4">TIME</th>
                    <th className="p-3">TASK</th>
                    <th className="p-3">STATUS</th>
                    <th className="p-3 pr-4 text-right">DURATION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-sans">
                  {recentExecutions.map((ex, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="p-3 pl-4 font-mono text-slate-400">{ex.time}</td>
                      <td className="p-3 font-mono font-bold text-white">{ex.task}</td>
                      <td className="p-3 font-mono">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            ex.status === 'Success'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-rose-500/20 text-rose-300'
                          }`}
                        >
                          {ex.status}
                        </span>
                      </td>
                      <td className="p-3 pr-4 text-right font-mono text-slate-300">{ex.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

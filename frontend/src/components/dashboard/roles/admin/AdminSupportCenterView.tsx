import React, { useState } from 'react';
import { 
  HelpCircle, Search, Plus, Clock, CheckCircle2, 
  User, RefreshCw, Send
} from 'lucide-react';

interface SupportTicket {
  id: string;
  ticketNumber: string;
  title: string;
  requester: {
    name: string;
    email: string;
    role: string;
  };
  category: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  commentsCount: number;
}

const MOCK_TICKETS: SupportTicket[] = [
  {
    id: 't-101',
    ticketNumber: 'TKT-9041',
    title: 'MFA Authentication Failure on Admin Login',
    requester: { name: 'Teja Reddy', email: 'teja@example.com', role: 'Client' },
    category: 'Security / Auth',
    priority: 'critical',
    status: 'open',
    assignedTo: 'Admin Support',
    createdAt: '21 Sep 2026 14:10',
    updatedAt: '21 Sep 2026 14:15',
    description: 'User reported repeated OTP timeout during MFA challenge. Authentication token invalidated after 2 attempts.',
    commentsCount: 3,
  },
  {
    id: 't-102',
    ticketNumber: 'TKT-9038',
    title: 'Ultron AI Agent execution latency in Document Analysis',
    requester: { name: 'Priya Sharma', email: 'priya@example.com', role: 'Advocate' },
    category: 'AI Infrastructure',
    priority: 'high',
    status: 'in-progress',
    assignedTo: 'AI Operations',
    createdAt: '21 Sep 2026 11:45',
    updatedAt: '21 Sep 2026 13:20',
    description: 'Document extraction workflow timeout on PDFs exceeding 50MB. Vector store lookup response time elevated to >5.2s.',
    commentsCount: 5,
  },
  {
    id: 't-103',
    ticketNumber: 'TKT-9025',
    title: 'Access permission request stuck in pending approval',
    requester: { name: 'Aman Verma', email: 'aman@example.com', role: 'Employee' },
    category: 'Access Governance',
    priority: 'medium',
    status: 'open',
    assignedTo: 'Access Governance Team',
    createdAt: '20 Sep 2026 16:30',
    updatedAt: '20 Sep 2026 16:30',
    description: 'Property record #PR-9042 read request submitted yesterday has not received secondary approval from compliance officer.',
    commentsCount: 1,
  },
  {
    id: 't-104',
    ticketNumber: 'TKT-9012',
    title: 'Audit Trail log export timeout on multi-month range',
    requester: { name: 'Rohan Mehta', email: 'rohan@example.com', role: 'Regulator / Auditor' },
    category: 'Audit & Compliance',
    priority: 'medium',
    status: 'resolved',
    assignedTo: 'Platform DevSecOps',
    createdAt: '19 Sep 2026 09:15',
    updatedAt: '20 Sep 2026 10:00',
    description: 'CSV export fails for date ranges spanning >90 days. Resolved by implementing asynchronous streaming background worker.',
    commentsCount: 4,
  },
  {
    id: 't-105',
    ticketNumber: 'TKT-8990',
    title: 'Tenant Maintenance record sync failure',
    requester: { name: 'Sneha Iyer', email: 'sneha@example.com', role: 'Tenant / Vendor' },
    category: 'Platform Bug',
    priority: 'low',
    status: 'closed',
    assignedTo: 'Tier 1 Support',
    createdAt: '18 Sep 2026 12:00',
    updatedAt: '19 Sep 2026 14:30',
    description: 'Work order attachment upload dropped due to legacy MIME validation rule.',
    commentsCount: 2,
  },
];

interface AdminSupportCenterViewProps {
  onSelectTicket?: (ticketId: string) => void;
  onOpenCreateTicket?: () => void;
}

export const AdminSupportCenterView: React.FC<AdminSupportCenterViewProps> = ({
  onSelectTicket,
  onOpenCreateTicket,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(MOCK_TICKETS[0]);
  const [replyText, setReplyText] = useState('');

  const filteredTickets = MOCK_TICKETS.filter((t) => {
    const matchesSearch = 
      t.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.requester.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <span className="px-2 py-0.5 rounded text-xs bg-red-500/20 text-red-400 border border-red-500/30 font-semibold">Critical</span>;
      case 'high':
        return <span className="px-2 py-0.5 rounded text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 font-semibold">High</span>;
      case 'medium':
        return <span className="px-2 py-0.5 rounded text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 font-semibold">Medium</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 font-semibold">Low</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <span className="px-2 py-0.5 rounded-full text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">Open</span>;
      case 'in-progress':
        return <span className="px-2 py-0.5 rounded-full text-xs bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">In Progress</span>;
      case 'resolved':
        return <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Resolved</span>;
      case 'closed':
        return <span className="px-2 py-0.5 rounded-full text-xs bg-slate-500/20 text-slate-400 border border-slate-500/30">Closed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-cyan-400" />
            Support & Issue Management
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Enterprise support ticket routing, SLA monitoring, and operational incident response workflows.
          </p>
        </div>

        <button
          onClick={onOpenCreateTicket}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium text-sm rounded-lg transition-all duration-200 shadow-lg shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4" />
          Create Support Ticket
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-xl p-4">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>Total Tickets</span>
            <HelpCircle className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white mt-2">128</div>
          <div className="text-xs text-slate-400 mt-1">Across all enterprise modules</div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-xl p-4">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>Open & In-Progress</span>
            <Clock className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="text-2xl font-bold text-yellow-400 mt-2">25</div>
          <div className="text-xs text-yellow-400/80 mt-1">5 Critical priority requiring action</div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-xl p-4">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>Resolved (30d)</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 mt-2">98</div>
          <div className="text-xs text-emerald-400/80 mt-1">98.4% SLA Compliance</div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-xl p-4">
          <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
            <span>Avg Resolution Time</span>
            <RefreshCw className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-purple-400 mt-2">1.8 hrs</div>
          <div className="text-xs text-purple-400/80 mt-1">24m faster than baseline target</div>
        </div>
      </div>

      {/* Main Grid: Ticket List + Detail Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Ticket List Pane (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-xl p-5 space-y-4">
          {/* Filters */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search ticket #, title, requester..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950/60 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-1/2 px-3 py-1.5 bg-slate-950/60 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
              >
                <option value="all">All Statuses</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-1/2 px-3 py-1.5 bg-slate-950/60 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
              >
                <option value="all">All Priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          {/* Ticket Items */}
          <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
            {filteredTickets.map((t) => {
              const isSelected = selectedTicket?.id === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => {
                    setSelectedTicket(t);
                    if (onSelectTicket) onSelectTicket(t.id);
                  }}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-800/80 border-cyan-500/50 shadow-md'
                      : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/30'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-mono text-xs text-cyan-400 font-bold">{t.ticketNumber}</span>
                    <div className="flex items-center gap-1.5">
                      {getPriorityBadge(t.priority)}
                      {getStatusBadge(t.status)}
                    </div>
                  </div>

                  <h3 className="text-sm font-semibold text-slate-100 line-clamp-1 mb-2">{t.title}</h3>

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-500" />
                      <span>{t.requester.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{t.createdAt}</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredTickets.length === 0 && (
              <div className="p-8 text-center text-slate-500 text-sm">
                No tickets match search filters.
              </div>
            )}
          </div>
        </div>

        {/* Ticket Detail & Communication Workspace (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-xl p-6 space-y-6">
          {selectedTicket ? (
            <>
              {/* Header */}
              <div className="border-b border-slate-800 pb-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2 py-1 bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 rounded font-bold">
                      {selectedTicket.ticketNumber}
                    </span>
                    {getStatusBadge(selectedTicket.status)}
                    {getPriorityBadge(selectedTicket.priority)}
                  </div>
                  <span className="text-xs text-slate-400">Category: <strong className="text-slate-200">{selectedTicket.category}</strong></span>
                </div>

                <h2 className="text-lg font-bold text-white">{selectedTicket.title}</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                  <div>
                    <span className="text-slate-500 block">Requester</span>
                    <span className="text-slate-200 font-medium">{selectedTicket.requester.name}</span>
                    <span className="text-slate-400 text-[10px] block">{selectedTicket.requester.role}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block">Assigned Unit</span>
                    <span className="text-slate-200 font-medium">{selectedTicket.assignedTo}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block">Created Timestamp</span>
                    <span className="text-slate-200 font-medium">{selectedTicket.createdAt}</span>
                  </div>
                </div>
              </div>

              {/* Description Body */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Issue Description</h4>
                <div className="p-4 bg-slate-950/40 border border-slate-800 rounded-lg text-sm text-slate-300 leading-relaxed">
                  {selectedTicket.description}
                </div>
              </div>

              {/* Activity Timeline / Audit Trail */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Ticket Lifecycle & Updates</span>
                  <span className="text-slate-500 font-normal">{selectedTicket.commentsCount} entries</span>
                </h4>

                <div className="space-y-3 pl-2 border-l-2 border-slate-800">
                  <div className="relative pl-4 space-y-1">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-4 ring-slate-900"></div>
                    <div className="text-xs text-slate-400 flex items-center justify-between">
                      <span className="font-medium text-slate-200">System Support Bot</span>
                      <span>{selectedTicket.createdAt}</span>
                    </div>
                    <p className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded border border-slate-800">
                      Ticket opened via Admin Support Portal. Priority categorized as <strong>{selectedTicket.priority.toUpperCase()}</strong>. Assigned to {selectedTicket.assignedTo}.
                    </p>
                  </div>

                  <div className="relative pl-4 space-y-1">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-purple-400 ring-4 ring-slate-900"></div>
                    <div className="text-xs text-slate-400 flex items-center justify-between">
                      <span className="font-medium text-slate-200">DevSecOps Specialist</span>
                      <span>{selectedTicket.updatedAt}</span>
                    </div>
                    <p className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded border border-slate-800">
                      Investigating telemetry logs and session telemetry for event session ID <code className="text-cyan-400 font-mono">sess_9042a</code>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Resolution / Internal Note Action */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Add Administrative Response / Internal Note</h4>
                <div className="flex gap-2">
                  <textarea
                    rows={2}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type official support resolution or internal team update..."
                    className="flex-1 p-3 bg-slate-950/80 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={() => {
                      if (replyText.trim()) {
                        alert('Support response added and audited!');
                        setReplyText('');
                      }
                    }}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-sm rounded-lg flex items-center gap-1.5 self-end transition-all"
                  >
                    <Send className="w-4 h-4" />
                    Send
                  </button>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 text-xs rounded-lg font-medium transition-all">
                      Mark Resolved
                    </button>
                    <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs rounded-lg font-medium transition-all">
                      Escalate to DevSecOps
                    </button>
                  </div>
                  <button className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs rounded-lg font-medium transition-all">
                    Close Ticket
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-slate-500">
              <HelpCircle className="w-10 h-10 mb-2 stroke-[1.5]" />
              <p className="text-sm">Select a support ticket to inspect resolution details and audit history.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

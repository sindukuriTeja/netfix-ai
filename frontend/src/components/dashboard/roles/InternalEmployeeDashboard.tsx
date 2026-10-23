import React, { useState } from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  Briefcase,
  FileText,
  Cpu,
  Activity,
  Bell,
  User,
  Settings,
  Clock,
  ChevronRight,
  Sparkles,
  Search,
  FileBarChart
} from 'lucide-react';
import { RoleDashboardShell } from '../RoleDashboardShell';
import type { NavMenuItem } from '../RoleDashboardShell';
import { RoleProfileView } from '../shared/RoleProfileView';
import { RoleNotificationsView } from '../shared/RoleNotificationsView';
import { RoleDocumentsView } from '../shared/RoleDocumentsView';
import { RoleSettingsView } from '../shared/RoleSettingsView';

// Internal Employee Workspace Sub-components
import { CaseOverviewTab } from './employee/CaseOverviewTab';
import { CaseDocumentsTab } from './employee/CaseDocumentsTab';
import { CaseFactsTab } from './employee/CaseFactsTab';
import { CaseChronologyTab } from './employee/CaseChronologyTab';
import { CaseEvidenceTab } from './employee/CaseEvidenceTab';
import { CaseDeadlinesTab } from './employee/CaseDeadlinesTab';
import { CaseResearchTab } from './employee/CaseResearchTab';
import { CaseContradictionsTab } from './employee/CaseContradictionsTab';
import { CaseRiskTab } from './employee/CaseRiskTab';
import { CaseDraftsTab } from './employee/CaseDraftsTab';
import { CaseCitationsTab } from './employee/CaseCitationsTab';
import { EmployeeAskAiModal } from './employee/EmployeeAskAiModal';
import { EmployeeReportsView } from './employee/EmployeeReportsView';

interface InternalEmployeeDashboardProps {
  userContact?: string;
  onLogout: () => void;
}

export const InternalEmployeeDashboard: React.FC<InternalEmployeeDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<string>('Dashboard');
  const [activeCaseId, setActiveCaseId] = useState<string>('CASE-102');
  const [activeWorkspaceSubTab, setActiveWorkspaceSubTab] = useState<string>('Overview');
  const [isAskAiOpen, setIsAskAiOpen] = useState<boolean>(false);
  const [askAiQuery, setAskAiQuery] = useState<string>('');

  const navItems: NavMenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'My Tasks', icon: CheckSquare, badge: '7' },
    { id: 'cases', label: 'Assigned Cases', icon: Briefcase, badge: '4' },
    { id: 'workspace', label: 'Case Workspace', icon: FileText },
    { id: 'documents', label: 'Documents', icon: FileText, badge: '3' },
    { id: 'workflows', label: 'AI Workflows', icon: Cpu },
    { id: 'reports', label: 'Reports', icon: FileBarChart },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: '1' },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const profileData = {
    name: 'Amit Sharma',
    email: 'demo.employee@netfixai.test',
    role: 'Internal Employee',
    roleTitle: 'Internal Employee',
    avatarInitials: 'AS',
    department: 'Operations',
    employeeId: 'EMP-001',
    organization: 'MARG Group',
    location: 'Hyderabad',
    phone: '+91 9000000001',
  };

  const tasks = [
    { id: 'CASE-102', title: 'Review Financial statement', client: 'ABC Pvt Ltd', priority: 'High', status: 'Due Today', dueDate: 'Today' },
    { id: 'CASE-087', title: 'Extract key details from agreement', client: 'Sharma Enterprises', priority: 'Medium', status: 'In Review', dueDate: 'Today' },
    { id: 'CASE-091', title: 'Prepare summary report', client: 'Mehta Foundation', priority: 'Low', status: 'Open', dueDate: 'Tomorrow' },
    { id: 'CASE-105', title: 'Review GST Filing draft', client: 'Verma Traders', priority: 'High', status: 'In Progress', dueDate: '12 Sep' },
  ];

  const cases = [
    { id: 'CASE-102', client: 'ABC Pvt Ltd', type: 'Tax Review', priority: 'High', status: 'In Progress', dueDate: '28 Sep 2026' },
    { id: 'CASE-087', client: 'Sharma Enterprises', type: 'Legal Contract', priority: 'Medium', status: 'In Review', dueDate: '30 Sep 2026' },
    { id: 'CASE-091', client: 'Mehta Foundation', type: 'Compliance Audit', priority: 'Low', status: 'Pending', dueDate: '05 Oct 2026' },
    { id: 'CASE-105', client: 'Verma Traders', type: 'GST Audit', priority: 'High', status: 'Open', dueDate: '12 Oct 2026' },
  ];

  const selectedCaseData = cases.find((c) => c.id === activeCaseId) || cases[0];

  const handleOpenAskAi = (promptQuery?: string) => {
    if (promptQuery) setAskAiQuery(promptQuery);
    setIsAskAiOpen(true);
  };

  const handleOpenCase = (caseId: string, targetSubTab: string = 'Overview') => {
    setActiveCaseId(caseId);
    setActiveWorkspaceSubTab(targetSubTab);
    setActiveTab('Case Workspace');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile':
      case 'profile':
        return <RoleProfileView userProfile={profileData} />;
      case 'Notifications':
      case 'notifications':
        return <RoleNotificationsView roleTitle="Internal Employee" />;
      case 'Documents':
      case 'documents':
        return <RoleDocumentsView roleTitle="Internal Employee" />;
      case 'Settings':
      case 'settings':
        return <RoleSettingsView roleTitle="Internal Employee" />;
      case 'Reports':
      case 'reports':
        return <EmployeeReportsView />;

      case 'My Tasks':
      case 'tasks':
        return (
          <div className="space-y-5 max-w-5xl mx-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-[#00B8FF]" />
                <span>My Tasks (7 Pending)</span>
              </h2>
            </div>
            <div className="p-5 rounded-2xl bg-[#081525] border border-white/10 space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="p-4 rounded-xl bg-[#041828] border border-white/5 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#00B8FF]">{task.id}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          task.priority === 'High'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {task.priority} Priority
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white">{task.title}</h3>
                    <p className="text-xs text-slate-400">Client: {task.client}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <span className="text-xs font-mono text-amber-400 font-semibold block">{task.status}</span>
                    <button
                      onClick={() => handleOpenCase(task.id, 'Overview')}
                      className="px-3.5 py-1.5 rounded-lg bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      Action Task
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Assigned Cases':
      case 'cases':
        return (
          <div className="space-y-5 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#00B8FF]" />
                <span>Assigned Cases ({cases.length} Active)</span>
              </h2>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by client, case ID, type..."
                    className="pl-8 pr-3 py-1.5 rounded-xl bg-[#041828] border border-white/10 text-xs text-white focus:outline-none focus:border-[#00B8FF]"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
                <select className="px-3 py-1.5 rounded-xl bg-[#041828] border border-white/10 text-xs text-slate-300">
                  <option>All Types</option>
                  <option>Tax Review</option>
                  <option>Legal Contract</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cases.map((c) => (
                <div key={c.id} className="p-5 rounded-2xl bg-[#081525] border border-white/10 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#00B8FF]">{c.id}</span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            c.priority === 'High' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {c.priority}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30">
                          {c.status}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-white">{c.client}</h3>
                    <p className="text-xs text-slate-400">
                      Type: <span className="text-slate-200 font-semibold">{c.type}</span> | Due: <span className="font-mono text-rose-400">{c.dueDate}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => handleOpenCase(c.id, 'Overview')}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-[#00B8FF]/10 text-xs font-semibold text-slate-200 border border-white/10 hover:border-[#00B8FF]/30 transition-all cursor-pointer flex items-center justify-center gap-1.5 mt-2"
                  >
                    <span>Open Case Workspace</span>
                    <ChevronRight className="w-4 h-4 text-[#00B8FF]" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Case Workspace':
      case 'workspace':
        return (
          <div className="space-y-5 max-w-6xl mx-auto">
            {/* Case Header & Switcher */}
            <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-extrabold text-[#00B8FF]">{selectedCaseData.id}</span>
                    <h2 className="text-xl font-extrabold text-white">{selectedCaseData.client}</h2>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30">
                      Status: {selectedCaseData.status}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        selectedCaseData.priority === 'High' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      Priority: {selectedCaseData.priority}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Type: <span className="font-bold text-white">{selectedCaseData.type}</span> | Assigned Employee: <span className="text-[#00B8FF] font-bold">Amit Sharma</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={activeCaseId}
                    onChange={(e) => setActiveCaseId(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-[#041828] border border-white/10 text-xs text-slate-200 font-bold focus:outline-none focus:border-[#00B8FF]"
                  >
                    {cases.map((c) => (
                      <option key={c.id} value={c.id}>
                        Switch Case: {c.id} ({c.client})
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => handleOpenAskAi(`Summary details for ${selectedCaseData.id}`)}
                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-bold transition-all cursor-pointer"
                  >
                    Client Details
                  </button>
                </div>
              </div>

              {/* 13 Workspace Navigation Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs no-scrollbar">
                {[
                  { id: 'Overview', label: 'Overview' },
                  { id: 'Documents', label: 'Documents' },
                  { id: 'Case Facts', label: 'Case Facts' },
                  { id: 'Chronology', label: 'Chronology' },
                  { id: 'Evidence', label: 'Evidence' },
                  { id: 'Deadlines', label: 'Deadlines' },
                  { id: 'Research', label: 'Research' },
                  { id: 'AI Analysis', label: 'AI Analysis' },
                  { id: 'Contradictions', label: 'Contradictions' },
                  { id: 'Risk', label: 'Risk' },
                  { id: 'Drafts', label: 'Drafts' },
                  { id: 'Citations', label: 'Citations' },
                  { id: 'Activity', label: 'Activity' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveWorkspaceSubTab(tab.id)}
                    className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer ${
                      activeWorkspaceSubTab === tab.id
                        ? 'bg-[#00B8FF] text-white shadow-lg shadow-[#00B8FF]/20'
                        : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Workspace Sub-Tab Render */}
            <div className="pt-2">
              {activeWorkspaceSubTab === 'Overview' && (
                <CaseOverviewTab
                  caseData={{
                    id: selectedCaseData.id,
                    client: selectedCaseData.client,
                    type: selectedCaseData.type,
                    status: selectedCaseData.status,
                    priority: selectedCaseData.priority,
                    dueDate: selectedCaseData.dueDate,
                  }}
                  onSelectTab={(tabId) => setActiveWorkspaceSubTab(tabId)}
                  onAskAi={handleOpenAskAi}
                />
              )}

              {activeWorkspaceSubTab === 'Documents' && (
                <CaseDocumentsTab caseId={selectedCaseData.id} clientName={selectedCaseData.client} />
              )}

              {activeWorkspaceSubTab === 'Case Facts' && <CaseFactsTab caseId={selectedCaseData.id} />}

              {activeWorkspaceSubTab === 'Chronology' && <CaseChronologyTab caseId={selectedCaseData.id} />}

              {activeWorkspaceSubTab === 'Evidence' && <CaseEvidenceTab caseId={selectedCaseData.id} />}

              {activeWorkspaceSubTab === 'Deadlines' && <CaseDeadlinesTab caseId={selectedCaseData.id} />}

              {activeWorkspaceSubTab === 'Research' && (
                <CaseResearchTab caseId={selectedCaseData.id} clientName={selectedCaseData.client} />
              )}

              {activeWorkspaceSubTab === 'AI Analysis' && (
                <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-sm font-bold text-white">AI Workflows Detail for {selectedCaseData.id}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      COMPLETED
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
                    {/* Log Timestamps */}
                    <div className="p-4 rounded-xl bg-[#041828] border border-white/5 space-y-2">
                      <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">Execution Timeline</h4>
                      <div className="space-y-1.5 text-slate-300">
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span>✓ Request received</span>
                          <span className="font-mono text-slate-400">10:30:12 AM</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span>✓ RBAC context built</span>
                          <span className="font-mono text-slate-400">10:30:14 AM</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span>✓ Assigned to Tax Intelligence Agent</span>
                          <span className="font-mono text-slate-400">10:30:15 AM</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span>✓ Extracting tax facts</span>
                          <span className="font-mono text-slate-400">10:30:20 AM</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span>✓ Verifying with Tally data</span>
                          <span className="font-mono text-slate-400">10:30:35 AM</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span>✓ Ultron verification</span>
                          <span className="font-mono text-slate-400">10:30:40 AM</span>
                        </div>
                        <div className="flex justify-between py-1 text-emerald-400 font-bold">
                          <span>✓ Result ready</span>
                          <span className="font-mono">10:30:42 AM</span>
                        </div>
                      </div>
                    </div>

                    {/* Result Summary */}
                    <div className="p-4 rounded-xl bg-[#041828] border border-white/5 space-y-3">
                      <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">Result Summary</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-400">AI Source:</span>
                          <span className="font-bold text-[#00B8FF]">Gemini</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Agent:</span>
                          <span className="font-bold text-white">Tax Intelligence Agent</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Case:</span>
                          <span className="font-bold font-mono text-white">{selectedCaseData.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Documents Processed:</span>
                          <span className="font-bold text-white">3</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Confidence Score:</span>
                          <span className="font-bold font-mono text-emerald-400">98%</span>
                        </div>
                      </div>

                      <div className="pt-2 flex gap-2">
                        <button
                          onClick={() => window.open(`/api/agent/reports/download/${selectedCaseData.id}_analysis`, '_blank')}
                          className="w-full py-2 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white font-bold cursor-pointer"
                        >
                          Download PDF Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeWorkspaceSubTab === 'Contradictions' && <CaseContradictionsTab caseId={selectedCaseData.id} />}

              {activeWorkspaceSubTab === 'Risk' && <CaseRiskTab caseId={selectedCaseData.id} />}

              {activeWorkspaceSubTab === 'Drafts' && <CaseDraftsTab caseId={selectedCaseData.id} />}

              {activeWorkspaceSubTab === 'Citations' && <CaseCitationsTab caseId={selectedCaseData.id} />}

              {activeWorkspaceSubTab === 'Activity' && (
                <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-3 text-xs">
                  <h4 className="font-bold text-white text-sm">Case Audit Trail for {selectedCaseData.id}</h4>
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-slate-300">Case summary generated for {selectedCaseData.client}</span>
                    <span className="font-mono text-slate-500">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-slate-300">Uploaded document GST_Notice_2026.pdf</span>
                    <span className="font-mono text-slate-500">5 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-slate-300">Submitted draft reply for review</span>
                    <span className="font-mono text-slate-500">1 day ago</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'AI Workflows':
      case 'workflows':
        return (
          <div className="space-y-5 max-w-5xl mx-auto">
            <div className="pb-3 border-b border-white/10">
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#00B8FF]" />
                <span>AI Agent Workflows & Task Execution</span>
              </h2>
              <p className="text-xs text-slate-400">Assigned automated AI analysis jobs for verified cases.</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4 text-xs">
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#041828] border border-[#00B8FF]/30">
                <div className="space-y-1">
                  <span className="font-bold text-white text-sm block">Job #JOB-882: Tax Fact Extraction & Verification</span>
                  <span className="text-slate-400 block">Assigned to: Amit Sharma | Case: CASE-102</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[10px] border border-emerald-500/30">
                    COMPLETED (98% Confidence)
                  </span>
                  <button
                    onClick={() => handleOpenCase('CASE-102', 'AI Analysis')}
                    className="px-3 py-1.5 rounded-lg bg-[#00B8FF] text-white font-bold hover:bg-[#0098D4] cursor-pointer"
                  >
                    View Detail
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Activity':
      case 'activity':
        return (
          <div className="space-y-5 max-w-5xl mx-auto">
            <div className="pb-3 border-b border-white/10">
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#00B8FF]" />
                <span>Recent Activity Log</span>
              </h2>
            </div>
            <div className="p-5 rounded-2xl bg-[#081525] border border-white/10 space-y-3 text-xs">
              <div className="flex items-center justify-between py-2.5 border-b border-white/5">
                <span className="text-slate-300">Reviewed financial statement for CASE-102</span>
                <span className="font-mono text-slate-500">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between py-2.5 border-b border-white/5">
                <span className="text-slate-300">Uploaded tax invoice document for Sharma Enterprises</span>
                <span className="font-mono text-slate-500">5 hours ago</span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-slate-300">Submitted AI workflow request for CASE-087</span>
                <span className="font-mono text-slate-500">1 day ago</span>
              </div>
            </div>
          </div>
        );

      default:
        // Main Enhanced Dashboard (Ref Panel 1)
        return (
          <div className="space-y-6 max-w-6xl mx-auto">
            {/* Top Welcome Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#081525] via-[#0b1d35] to-[#041828] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-xl font-extrabold text-white">Welcome, Amit Sharma</h2>
                <p className="text-xs text-slate-300">Here's your work summary for today. Wed, 24 Sep 2026</p>
              </div>

              <button
                onClick={() => handleOpenAskAi()}
                className="px-4 py-2.5 rounded-xl bg-[#00B8FF] hover:bg-[#0098D4] text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#00B8FF]/20 self-start md:self-auto"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ask AI</span>
              </button>
            </div>

            {/* Top 6 Metric Cards Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {/* Card 1 */}
              <div
                onClick={() => setActiveTab('Assigned Cases')}
                className="p-4 rounded-2xl bg-[#081525] border border-white/10 space-y-1 hover:border-[#00B8FF]/40 transition-all cursor-pointer"
              >
                <span className="text-[11px] text-slate-400 font-semibold block">Assigned Cases</span>
                <span className="text-2xl font-extrabold text-white font-mono block">4</span>
              </div>

              {/* Card 2 */}
              <div
                onClick={() => setActiveTab('My Tasks')}
                className="p-4 rounded-2xl bg-[#081525] border border-white/10 space-y-1 hover:border-[#00B8FF]/40 transition-all cursor-pointer"
              >
                <span className="text-[11px] text-slate-400 font-semibold block">Pending Tasks</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-white font-mono">7</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-500/20 text-rose-300">
                    Due Today: 2
                  </span>
                </div>
              </div>

              {/* Card 3 */}
              <div
                onClick={() => handleOpenCase('CASE-102', 'Documents')}
                className="p-4 rounded-2xl bg-[#081525] border border-white/10 space-y-1 hover:border-[#00B8FF]/40 transition-all cursor-pointer"
              >
                <span className="text-[11px] text-slate-400 font-semibold block">Docs to Review</span>
                <span className="text-2xl font-extrabold text-amber-400 font-mono block">3</span>
              </div>

              {/* Card 4 */}
              <div
                onClick={() => handleOpenCase('CASE-102', 'Contradictions')}
                className="p-4 rounded-2xl bg-[#081525] border border-white/10 space-y-1 hover:border-[#00B8FF]/40 transition-all cursor-pointer"
              >
                <span className="text-[11px] text-slate-400 font-semibold block">AI Reviews</span>
                <span className="text-2xl font-extrabold text-purple-400 font-mono block">2</span>
              </div>

              {/* Card 5 */}
              <div
                onClick={() => handleOpenCase('CASE-102', 'Deadlines')}
                className="p-4 rounded-2xl bg-[#081525] border border-white/10 space-y-1 hover:border-[#00B8FF]/40 transition-all cursor-pointer"
              >
                <span className="text-[11px] text-slate-400 font-semibold block">Upcoming Deadlines</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-rose-400 font-mono">4</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-500/20 text-rose-300">
                    This Week
                  </span>
                </div>
              </div>

              {/* Card 6 */}
              <div
                onClick={() => handleOpenCase('CASE-102', 'Risk')}
                className="p-4 rounded-2xl bg-[#081525] border border-white/10 space-y-1 hover:border-[#00B8FF]/40 transition-all cursor-pointer"
              >
                <span className="text-[11px] text-slate-400 font-semibold block">Risk Alerts</span>
                <span className="text-2xl font-extrabold text-rose-400 font-mono block">1</span>
              </div>
            </div>

            {/* Main 2-Column Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column (Span 2): My Tasks & Upcoming Deadlines */}
              <div className="lg:col-span-2 space-y-6">
                {/* My Tasks Panel */}
                <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <CheckSquare className="w-4 h-4 text-[#00B8FF]" />
                      <span>My Tasks</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('My Tasks')}
                      className="text-xs text-[#00B8FF] font-semibold hover:underline cursor-pointer"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className="p-3.5 rounded-xl bg-[#041828] border border-white/5 flex items-center justify-between gap-4 text-xs hover:border-[#00B8FF]/30 transition-all"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] font-bold text-[#00B8FF]">{task.id}</span>
                            <h4 className="font-bold text-white text-xs">{task.title}</h4>
                          </div>
                          <span className="text-[11px] text-slate-400">CASE-102 • ABC Pvt Ltd</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              task.status === 'Due Today'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}
                          >
                            {task.status}
                          </span>

                          <button
                            onClick={() => handleOpenCase(task.id, 'Overview')}
                            className="px-3 py-1 rounded-lg bg-white/5 hover:bg-[#00B8FF]/10 text-slate-200 border border-white/10 text-xs font-semibold cursor-pointer"
                          >
                            Action
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Deadlines Panel */}
                <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Clock className="w-4 h-4 text-rose-400" />
                      <span>Upcoming Deadlines</span>
                    </h3>
                    <button
                      onClick={() => handleOpenCase('CASE-102', 'Deadlines')}
                      className="text-xs text-[#00B8FF] font-semibold hover:underline cursor-pointer"
                    >
                      View Calendar
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#041828] border border-white/5 flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="font-mono text-rose-400 font-bold block">28 Sep 2026</span>
                        <h4 className="font-bold text-white">GST Notice Response</h4>
                        <span className="text-slate-400 text-[11px]">CASE-102 • ABC Pvt Ltd</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold font-mono">
                        3 days
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#041828] border border-white/5 flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="font-mono text-rose-400 font-bold block">30 Sep 2026</span>
                        <h4 className="font-bold text-white">Compliance Filing</h4>
                        <span className="text-slate-400 text-[11px]">CASE-087 • Sharma Enterprises</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold font-mono">
                        5 days
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#041828] border border-white/5 flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="font-mono text-rose-400 font-bold block">02 Oct 2026</span>
                        <h4 className="font-bold text-white">Document Submission</h4>
                        <span className="text-slate-400 text-[11px]">CASE-091 • Mehta Foundation</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold font-mono">
                        7 days
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Recent AI Results Panel */}
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-[#081525] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#00B8FF]" />
                      <span>Recent AI Results</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('AI Workflows')}
                      className="text-xs text-[#00B8FF] font-semibold hover:underline cursor-pointer"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div
                      onClick={() => handleOpenCase('CASE-102', 'Documents')}
                      className="p-3.5 rounded-xl bg-[#041828] border border-white/5 hover:border-[#00B8FF]/30 transition-all cursor-pointer space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white">Document Analysis</h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Completed
                        </span>
                      </div>
                      <p className="text-slate-400 text-[11px]">GST_Return_Q3.pdf</p>
                    </div>

                    <div
                      onClick={() => handleOpenCase('CASE-102', 'Research')}
                      className="p-3.5 rounded-xl bg-[#041828] border border-white/5 hover:border-[#00B8FF]/30 transition-all cursor-pointer space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white">Research Result</h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Awaiting Review
                        </span>
                      </div>
                      <p className="text-slate-400 text-[11px]">GST ITC Case Law</p>
                    </div>

                    <div
                      onClick={() => handleOpenCase('CASE-102', 'Risk')}
                      className="p-3.5 rounded-xl bg-[#041828] border border-white/5 hover:border-[#00B8FF]/30 transition-all cursor-pointer space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white">Risk Analysis</h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Completed
                        </span>
                      </div>
                      <p className="text-slate-400 text-[11px]">CASE-102 High Risk Score</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <RoleDashboardShell
        roleId="internal_employee"
        roleTitle="Internal Employee"
        userProfile={{
          name: profileData.name,
          roleTitle: profileData.roleTitle,
          avatarInitials: profileData.avatarInitials,
          organization: profileData.organization,
          email: profileData.email,
        }}
        onLogout={onLogout}
        navItems={navItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        {renderContent()}
      </RoleDashboardShell>

      {/* Global Natural-Language Query Modal */}
      <EmployeeAskAiModal
        isOpen={isAskAiOpen}
        onClose={() => setIsAskAiOpen(false)}
        initialQuery={askAiQuery}
        onNavigateToCase={(caseId) => handleOpenCase(caseId, 'Overview')}
      />
    </>
  );
};

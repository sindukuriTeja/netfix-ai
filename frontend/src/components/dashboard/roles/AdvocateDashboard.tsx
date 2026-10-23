import React, { useState } from 'react';
import {
  LayoutDashboard,
  Briefcase,
  FolderOpen,
  FileCheck,
  FileText,
  BookOpen,
  Calendar,
  Sparkles,
  Bell,
  User,
  Settings,
  ShieldCheck
} from 'lucide-react';
import { RoleDashboardShell } from '../RoleDashboardShell';
import type { NavMenuItem } from '../RoleDashboardShell';
import { RoleProfileView } from '../shared/RoleProfileView';
import { RoleNotificationsView } from '../shared/RoleNotificationsView';
import { RoleSettingsView } from '../shared/RoleSettingsView';

import { AdvocateDashboardView } from './advocate/AdvocateDashboardView';
import { AdvocateAssignedMatters } from './advocate/AdvocateAssignedMatters';
import { AdvocateMatterWorkspace } from './advocate/AdvocateMatterWorkspace';
import { AdvocateDocumentsView } from './advocate/AdvocateDocumentsView';
import { AdvocateEvidenceView } from './advocate/AdvocateEvidenceView';
import { AdvocateLegalResearchView } from './advocate/AdvocateLegalResearchView';
import { AdvocateDeadlinesView } from './advocate/AdvocateDeadlinesView';
import { AdvocateAiAnalysisView } from './advocate/AdvocateAiAnalysisView';
import { AdvocateReportsView } from './advocate/AdvocateReportsView';
import { AdvocateAdminAccessRequests } from './advocate/AdvocateAdminAccessRequests';
import { AdvocateAskAiModal } from './advocate/AdvocateAskAiModal';

interface AdvocateDashboardProps {
  userContact?: string;
  onLogout: () => void;
}

export const AdvocateDashboard: React.FC<AdvocateDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedMatterId, setSelectedMatterId] = useState<string>('MAT-204');
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [aiModalPrompt, setAiModalPrompt] = useState<string>('');

  const navItems: NavMenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'matters', label: 'Assigned Matters', icon: Briefcase, badge: '5' },
    { id: 'workspace', label: 'Case Workspace', icon: FolderOpen },
    { id: 'evidence', label: 'Evidence', icon: FileCheck, badge: '4' },
    { id: 'documents', label: 'Legal Documents', icon: FileText },
    { id: 'research', label: 'Legal Research', icon: BookOpen, badge: '8' },
    { id: 'deadlines', label: 'Deadlines & Hearings', icon: Calendar, badge: '3' },
    { id: 'analysis', label: 'AI Legal Analysis', icon: Sparkles },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'admin_access', label: 'Admin Access Requests', icon: ShieldCheck, badge: '2' },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const userProfile = {
    name: 'Ananya Rao',
    email: 'ananya.rao@marggroup.com',
    role: 'advocate' as const,
    roleTitle: 'Senior Legal Counsel',
    organization: 'MARG Legal Associates',
    avatarInitials: 'AR',
  };

  const handleOpenMatter = (matterId: string) => {
    setSelectedMatterId(matterId);
    setActiveTab('workspace');
  };

  const handleOpenAskAi = (prompt?: string) => {
    if (prompt) setAiModalPrompt(prompt);
    setIsAiModalOpen(true);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
      case 'Dashboard':
        return (
          <AdvocateDashboardView
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenMatter={handleOpenMatter}
          />
        );

      case 'matters':
      case 'Assigned Matters':
      case 'My Matters':
        return <AdvocateAssignedMatters onOpenMatter={handleOpenMatter} />;

      case 'workspace':
      case 'Case Workspace':
        return (
          <AdvocateMatterWorkspace
            matterId={selectedMatterId}
            onBack={() => setActiveTab('matters')}
            onAskAi={handleOpenAskAi}
          />
        );

      case 'evidence':
      case 'Evidence':
        return <AdvocateEvidenceView />;

      case 'documents':
      case 'Legal Documents':
      case 'Documents':
        return <AdvocateDocumentsView />;

      case 'research':
      case 'Legal Research':
        return <AdvocateLegalResearchView />;

      case 'deadlines':
      case 'Deadlines & Hearings':
      case 'Deadlines':
        return <AdvocateDeadlinesView />;

      case 'analysis':
      case 'AI Legal Analysis':
      case 'Analysis':
        return (
          <AdvocateAiAnalysisView
            matterId={selectedMatterId}
            onAskAi={handleOpenAskAi}
          />
        );

      case 'reports':
      case 'Reports':
        return <AdvocateReportsView />;

      case 'admin_access':
      case 'Admin Access Requests':
        return <AdvocateAdminAccessRequests />;

      case 'notifications':
      case 'Notifications':
        return <RoleNotificationsView roleTitle="Advocate / External Counsel" />;

      case 'profile':
      case 'Profile':
        return <RoleProfileView userProfile={userProfile} />;

      case 'settings':
      case 'Settings':
        return <RoleSettingsView roleTitle="Advocate / External Counsel" />;

      default:
        return (
          <AdvocateDashboardView
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenMatter={handleOpenMatter}
          />
        );
    }
  };

  return (
    <>
      <RoleDashboardShell
        roleId="advocate"
        roleTitle="Advocate / External Counsel Workspace"
        userProfile={userProfile}
        navItems={navItems}
        activeTab={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId)}
        onLogout={onLogout}
      >
        {renderTabContent()}
      </RoleDashboardShell>

      <AdvocateAskAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        initialPrompt={aiModalPrompt}
      />
    </>
  );
};

export default AdvocateDashboard;

import React, { useState } from 'react';
import {
  LayoutDashboard,
  Briefcase,
  TrendingUp,
  ShieldAlert,
  BarChart3,
  FileCheck2,
  FileText,
  Bell,
  User,
  Settings
} from 'lucide-react';
import { RoleDashboardShell } from '../RoleDashboardShell';
import type { NavMenuItem } from '../RoleDashboardShell';
import { RoleProfileView } from '../shared/RoleProfileView';
import { RoleSettingsView } from '../shared/RoleSettingsView';

// Management Executive Sub-components
import { ManagementDashboardView } from './management/ManagementDashboardView';
import { ManagementPortfolioList } from './management/ManagementPortfolioList';
import { ManagementMatterDetail } from './management/ManagementMatterDetail';
import { ManagementBusinessOverview } from './management/ManagementBusinessOverview';
import { ManagementRiskOverview } from './management/ManagementRiskOverview';
import { ManagementPerformanceView } from './management/ManagementPerformanceView';
import { ManagementReportsView } from './management/ManagementReportsView';
import { ManagementApprovalsList } from './management/ManagementApprovalsList';
import { ManagementApprovalDetail } from './management/ManagementApprovalDetail';
import { ManagementDocumentsView } from './management/ManagementDocumentsView';
import { ManagementNotificationsView } from './management/ManagementNotificationsView';
import { ManagementAskAiModal } from './management/ManagementAskAiModal';

interface ManagementExecutiveDashboardProps {
  userContact?: string;
  onLogout: () => void;
}

export const ManagementExecutiveDashboard: React.FC<ManagementExecutiveDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<string>('Dashboard');
  const [selectedMatterId, setSelectedMatterId] = useState<string | null>(null);
  const [selectedApprovalId, setSelectedApprovalId] = useState<string | null>(null);
  const [isAskAiOpen, setIsAskAiOpen] = useState<boolean>(false);
  const [askAiQuery, setAskAiQuery] = useState<string>('');

  const navItems: NavMenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'portfolio', label: 'Portfolio / Matters', icon: Briefcase, badge: '24' },
    { id: 'business', label: 'Business Overview', icon: TrendingUp },
    { id: 'risk', label: 'Risk Overview', icon: ShieldAlert, badge: '5' },
    { id: 'performance', label: 'Performance', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'approvals', label: 'Approvals', icon: FileCheck2, badge: '8' },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: '12' },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const profileData = {
    name: 'Rohan Mehta',
    email: 'demo.management@netfixai.test',
    role: 'Management / Executive',
    roleTitle: 'Executive Director',
    avatarInitials: 'RM',
    department: 'Executive Management',
    employeeId: 'EXEC-001',
    organization: 'MARG Group',
    location: 'Hyderabad',
    phone: '+91 9000000002',
  };

  const handleOpenMatter = (matterId: string) => {
    setSelectedMatterId(matterId);
    setActiveTab('Portfolio / Matters');
  };

  const handleOpenApproval = (approvalId: string) => {
    setSelectedApprovalId(approvalId);
    setActiveTab('Approvals');
  };

  const handleOpenAskAi = (prompt?: string) => {
    if (prompt) setAskAiQuery(prompt);
    setIsAskAiOpen(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile':
      case 'profile':
        return <RoleProfileView userProfile={profileData} />;

      case 'Settings':
      case 'settings':
        return <RoleSettingsView roleTitle="Management / Executive" />;

      case 'Documents':
      case 'documents':
        return <ManagementDocumentsView />;

      case 'Notifications':
      case 'notifications':
        return <ManagementNotificationsView />;

      case 'Reports':
      case 'reports':
        return <ManagementReportsView onAskAi={handleOpenAskAi} />;

      case 'Business Overview':
      case 'business':
        return <ManagementBusinessOverview onAskAi={handleOpenAskAi} />;

      case 'Risk Overview':
      case 'risk':
        return <ManagementRiskOverview onAskAi={handleOpenAskAi} onOpenMatter={handleOpenMatter} />;

      case 'Performance':
      case 'performance':
        return <ManagementPerformanceView onAskAi={handleOpenAskAi} />;

      case 'Portfolio / Matters':
      case 'portfolio':
        if (selectedMatterId) {
          return (
            <ManagementMatterDetail
              matterId={selectedMatterId}
              onBack={() => setSelectedMatterId(null)}
            />
          );
        }
        return <ManagementPortfolioList onSelectMatter={handleOpenMatter} />;

      case 'Approvals':
      case 'approvals':
        if (selectedApprovalId) {
          return (
            <ManagementApprovalDetail
              approvalId={selectedApprovalId}
              onBack={() => setSelectedApprovalId(null)}
            />
          );
        }
        return <ManagementApprovalsList onSelectApproval={handleOpenApproval} />;

      case 'Dashboard':
      case 'dashboard':
      default:
        // Main Executive Dashboard (Ref Panel 1)
        return (
          <ManagementDashboardView
            onNavigateTab={(tab) => {
              setSelectedMatterId(null);
              setSelectedApprovalId(null);
              setActiveTab(tab);
            }}
            onOpenMatter={handleOpenMatter}
            onOpenApproval={handleOpenApproval}
            onAskAi={handleOpenAskAi}
          />
        );
    }
  };

  return (
    <>
      <RoleDashboardShell
        roleId="management_executive"
        roleTitle="Executive Director"
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
        onTabChange={(tab) => {
          setSelectedMatterId(null);
          setSelectedApprovalId(null);
          setActiveTab(tab);
        }}
      >
        {renderContent()}
      </RoleDashboardShell>

      {/* Global Executive Natural-Language Query Modal */}
      <ManagementAskAiModal
        isOpen={isAskAiOpen}
        onClose={() => setIsAskAiOpen(false)}
        initialQuery={askAiQuery}
      />
    </>
  );
};

import React, { useState } from 'react';
import {
  LayoutDashboard,
  Briefcase,
  Activity,
  FileText,
  Send,
  CheckSquare,
  MessageSquare,
  Bell,
  User,
  Settings
} from 'lucide-react';
import { RoleDashboardShell } from '../RoleDashboardShell';
import type { NavMenuItem } from '../RoleDashboardShell';

// Client Sub-components
import { ClientDashboardView } from './client/ClientDashboardView';
import { ClientMyMattersView } from './client/ClientMyMattersView';
import { ClientMatterDetailView } from './client/ClientMatterDetailView';
import { ClientCaseStatusView } from './client/ClientCaseStatusView';
import { ClientDocumentsView } from './client/ClientDocumentsView';
import { ClientDocumentDetailView } from './client/ClientDocumentDetailView';
import { ClientRequestsView } from './client/ClientRequestsView';
import { ClientApprovalsView } from './client/ClientApprovalsView';
import { ClientMessagesView } from './client/ClientMessagesView';
import { ClientReportsView } from './client/ClientReportsView';
import { ClientNotificationsView } from './client/ClientNotificationsView';
import { ClientProfileSettingsView } from './client/ClientProfileSettingsView';
import { ClientCreateRequestModal } from './client/ClientCreateRequestModal';
import { ClientUploadModal } from './client/ClientUploadModal';
import { ClientAskAiModal } from './client/ClientAskAiModal';

interface ClientDashboardProps {
  userContact?: string;
  onLogout: () => void;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedMatterId, setSelectedMatterId] = useState<string | null>(null);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);

  const [isCreateRequestOpen, setIsCreateRequestOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const navItems: NavMenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'matters', label: 'My Matters', icon: Briefcase, badge: '5' },
    { id: 'case-status', label: 'Case Status', icon: Activity },
    { id: 'documents', label: 'Documents', icon: FileText, badge: '18' },
    { id: 'requests', label: 'Requests', icon: Send, badge: '3' },
    { id: 'approvals', label: 'Approvals', icon: CheckSquare, badge: '2' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: '6' },
    { id: 'reports', label: 'Reports', icon: FileText, badge: '6' },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const profileData = {
    name: 'Vikram Reddy',
    email: 'vikram.reddy@client.com',
    roleTitle: 'Client Account',
    organization: 'Reddy Enterprises Pvt Ltd',
    avatarInitials: 'VR',
    phone: '+91 98765 43210',
  };

  const handleOpenMatter = (matterId: string) => {
    setSelectedMatterId(matterId);
    setActiveTab('matters');
  };

  const handleOpenDocument = (docId: string) => {
    setSelectedDocumentId(docId);
    setActiveTab('documents');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
      case 'Dashboard':
        return (
          <ClientDashboardView
            onNavigateTab={(tab) => {
              setSelectedMatterId(null);
              setSelectedDocumentId(null);
              setActiveTab(tab);
            }}
            onOpenMatter={handleOpenMatter}
          />
        );

      case 'matters':
      case 'My Matters':
        if (selectedMatterId) {
          return (
            <ClientMatterDetailView
              matterId={selectedMatterId}
              onBack={() => setSelectedMatterId(null)}
              onAskAi={() => setIsAiModalOpen(true)}
            />
          );
        }
        return (
          <ClientMyMattersView
            onOpenMatter={handleOpenMatter}
            onOpenNewRequest={() => setIsCreateRequestOpen(true)}
          />
        );

      case 'case-status':
      case 'Case Status':
      case 'status':
        return (
          <ClientCaseStatusView
            onOpenMatter={handleOpenMatter}
            onOpenCreateRequest={() => setIsCreateRequestOpen(true)}
          />
        );

      case 'documents':
      case 'Documents':
        if (selectedDocumentId) {
          return (
            <ClientDocumentDetailView
              documentId={selectedDocumentId}
              onBack={() => setSelectedDocumentId(null)}
            />
          );
        }
        return (
          <ClientDocumentsView
            onOpenDocument={handleOpenDocument}
            onOpenUpload={() => setIsUploadOpen(true)}
          />
        );

      case 'requests':
      case 'Requests':
      case 'My Requests':
        return (
          <ClientRequestsView
            onOpenCreateRequest={() => setIsCreateRequestOpen(true)}
            onOpenMatter={handleOpenMatter}
          />
        );

      case 'approvals':
      case 'Approvals':
      case 'Pending Approvals':
        return (
          <ClientApprovalsView
            onOpenMatter={handleOpenMatter}
            onOpenDocument={handleOpenDocument}
          />
        );

      case 'messages':
      case 'Messages':
        return <ClientMessagesView />;

      case 'reports':
      case 'Reports':
        return <ClientReportsView onOpenMatter={handleOpenMatter} />;

      case 'notifications':
      case 'Notifications':
        return (
          <ClientNotificationsView
            onOpenMatter={handleOpenMatter}
            onOpenDocument={handleOpenDocument}
            onNavigateTab={(tab) => {
              setSelectedMatterId(null);
              setSelectedDocumentId(null);
              setActiveTab(tab);
            }}
          />
        );

      case 'profile':
      case 'Profile':
      case 'settings':
      case 'Settings':
        return <ClientProfileSettingsView userProfile={profileData} />;

      default:
        return (
          <ClientDashboardView
            onNavigateTab={(tab) => {
              setSelectedMatterId(null);
              setSelectedDocumentId(null);
              setActiveTab(tab);
            }}
            onOpenMatter={handleOpenMatter}
          />
        );
    }
  };

  return (
    <>
      <RoleDashboardShell
        roleId="client"
        roleTitle="Client Portal"
        userProfile={profileData}
        navItems={navItems}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setSelectedMatterId(null);
          setSelectedDocumentId(null);
          setActiveTab(tab);
        }}
        onLogout={onLogout}
      >
        {renderContent()}
      </RoleDashboardShell>

      {/* Modals */}
      <ClientCreateRequestModal
        isOpen={isCreateRequestOpen}
        onClose={() => setIsCreateRequestOpen(false)}
        onSuccess={() => {
          alert('Client Request submitted to legal team.');
        }}
      />

      <ClientUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSuccess={(docName) => {
          alert(`Document "${docName}" uploaded successfully.`);
        }}
      />

      <ClientAskAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
    </>
  );
};

export default ClientDashboard;

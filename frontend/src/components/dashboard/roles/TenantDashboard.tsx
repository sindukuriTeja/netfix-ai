import React, { useState } from 'react';
import {
  LayoutDashboard,
  Home,
  HelpCircle,
  FileText,
  FileCheck2,
  CreditCard,
  Send,
  MessageSquare,
  Bell,
  User,
  Settings
} from 'lucide-react';
import { RoleDashboardShell } from '../RoleDashboardShell';
import type { NavMenuItem } from '../RoleDashboardShell';

// Tenant Sub-components
import { TenantDashboardView } from './tenant/TenantDashboardView';
import { TenantPropertiesView } from './tenant/TenantPropertiesView';
import { TenantPropertyDetailView } from './tenant/TenantPropertyDetailView';
import { TenantInquiriesView } from './tenant/TenantInquiriesView';
import { TenantDocumentsView } from './tenant/TenantDocumentsView';
import { TenantAgreementsView } from './tenant/TenantAgreementsView';
import { TenantPaymentsView } from './tenant/TenantPaymentsView';
import { TenantRequestsView } from './tenant/TenantRequestsView';
import { TenantMessagesView } from './tenant/TenantMessagesView';
import { TenantNotificationsView } from './tenant/TenantNotificationsView';
import { TenantDocumentDetailView } from './tenant/TenantDocumentDetailView';
import { TenantProfileSettingsView } from './tenant/TenantProfileSettingsView';
import { TenantNewInquiryModal, TenantUploadModal } from './tenant/TenantModals';

interface TenantDashboardProps {
  userContact?: string;
  onLogout: () => void;
}

export const TenantDashboard: React.FC<TenantDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);

  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const navItems: NavMenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'properties', label: 'Properties / Assets', icon: Home, badge: '3' },
    { id: 'inquiries', label: 'Inquiries', icon: HelpCircle, badge: '4' },
    { id: 'documents', label: 'Documents', icon: FileText, badge: '3' },
    { id: 'agreements', label: 'Agreements', icon: FileCheck2, badge: '3' },
    { id: 'payments', label: 'Payments', icon: CreditCard, badge: '3' },
    { id: 'requests', label: 'Requests', icon: Send, badge: '3' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: '4' },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: '4' },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const profileData = {
    name: 'Arjun Patel',
    email: 'arjun.patel@marggroup.com',
    role: 'Tenant / Buyer / Vendor' as const,
    roleTitle: 'Buyer / Account Owner',
    avatarInitials: 'AP',
    organization: 'MARG Commercial Ventures',
    phone: '+91 90000 00005',
  };

  const handleOpenProperty = (propId: string) => {
    setSelectedPropertyId(propId);
    setActiveTab('properties');
  };

  const handleOpenDocument = (docId: string) => {
    setSelectedDocumentId(docId);
    setActiveTab('documents');
  };

  const handleModalSuccess = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
      case 'Dashboard':
        return (
          <TenantDashboardView
            onNavigateTab={(tab) => {
              setSelectedPropertyId(null);
              setSelectedDocumentId(null);
              setActiveTab(tab);
            }}
            onOpenProperty={handleOpenProperty}
          />
        );

      case 'properties':
      case 'Properties / Assets':
      case 'Properties':
        if (selectedPropertyId) {
          return (
            <TenantPropertyDetailView
              propertyId={selectedPropertyId}
              onBack={() => setSelectedPropertyId(null)}
            />
          );
        }
        return (
          <TenantPropertiesView
            onOpenProperty={handleOpenProperty}
            onOpenAddPropertyRequest={() => setIsInquiryModalOpen(true)}
          />
        );

      case 'inquiries':
      case 'Inquiries':
        return (
          <TenantInquiriesView
            onOpenNewInquiry={() => setIsInquiryModalOpen(true)}
            onOpenProperty={handleOpenProperty}
          />
        );

      case 'documents':
      case 'Documents':
        if (selectedDocumentId) {
          return (
            <TenantDocumentDetailView
              documentId={selectedDocumentId}
              onBack={() => setSelectedDocumentId(null)}
              onOpenUpload={() => setIsUploadModalOpen(true)}
            />
          );
        }
        return (
          <TenantDocumentsView
            onOpenDocument={handleOpenDocument}
            onOpenUpload={() => setIsUploadModalOpen(true)}
            onOpenRequestAccess={() => setIsInquiryModalOpen(true)}
          />
        );

      case 'agreements':
      case 'Agreements':
        return <TenantAgreementsView onOpenProperty={handleOpenProperty} />;

      case 'payments':
      case 'Payments':
        return <TenantPaymentsView onOpenProperty={handleOpenProperty} />;

      case 'requests':
      case 'Requests':
        return <TenantRequestsView onOpenNewRequest={() => setIsInquiryModalOpen(true)} />;

      case 'messages':
      case 'Messages':
        return <TenantMessagesView />;

      case 'notifications':
      case 'Notifications':
        return (
          <TenantNotificationsView
            onNavigateTab={(tab) => {
              setSelectedPropertyId(null);
              setSelectedDocumentId(null);
              setActiveTab(tab);
            }}
          />
        );

      case 'profile':
      case 'Profile':
      case 'settings':
      case 'Settings':
        return <TenantProfileSettingsView userProfile={profileData} />;

      default:
        return (
          <TenantDashboardView
            onNavigateTab={(tab) => {
              setSelectedPropertyId(null);
              setSelectedDocumentId(null);
              setActiveTab(tab);
            }}
            onOpenProperty={handleOpenProperty}
          />
        );
    }
  };

  return (
    <>
      {notificationMsg && (
        <div className="fixed top-4 right-4 z-50 p-4 rounded-xl bg-emerald-500/90 text-slate-950 font-extrabold text-xs shadow-2xl animate-fadeIn">
          {notificationMsg}
        </div>
      )}

      <RoleDashboardShell
        roleId="tenant"
        roleTitle="Tenant / Buyer / Vendor Workspace"
        userProfile={profileData}
        navItems={navItems}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setSelectedPropertyId(null);
          setSelectedDocumentId(null);
          setActiveTab(tab);
        }}
        onLogout={onLogout}
      >
        {renderContent()}
      </RoleDashboardShell>

      {/* Modals */}
      <TenantNewInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        onSuccess={handleModalSuccess}
      />

      <TenantUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={handleModalSuccess}
      />
    </>
  );
};

export default TenantDashboard;

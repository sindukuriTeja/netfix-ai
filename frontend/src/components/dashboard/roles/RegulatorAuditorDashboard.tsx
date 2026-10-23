import React, { useState } from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  ShieldCheck,
  FileCheck,
  History,
  FileText,
  AlertTriangle,
  Lock,
  Bell,
  User,
  Settings,
  CheckCircle2
} from 'lucide-react';
import { RoleDashboardShell } from '../RoleDashboardShell';
import type { NavMenuItem } from '../RoleDashboardShell';

// Auditor Sub Components
import { AuditorDashboardView } from './auditor/AuditorDashboardView';
import { AuditorAssignedReviewsView } from './auditor/AuditorAssignedReviewsView';
import { AuditorReviewDetailView } from './auditor/AuditorReviewDetailView';
import { AuditorComplianceView } from './auditor/AuditorComplianceView';
import { AuditorRequirementDetailView } from './auditor/AuditorRequirementDetailView';
import { AuditorEvidenceView } from './auditor/AuditorEvidenceView';
import { AuditorEvidenceDetailView } from './auditor/AuditorEvidenceDetailView';
import { AuditorFindingsView } from './auditor/AuditorFindingsView';
import { AuditorFindingDetailView } from './auditor/AuditorFindingDetailView';
import { AuditorRiskControlsView } from './auditor/AuditorRiskControlsView';
import { AuditorReportsView } from './auditor/AuditorReportsView';
import { AuditorDocumentsView } from './auditor/AuditorDocumentsView';
import { AuditorAuditTrailView } from './auditor/AuditorAuditTrailView';
import { AuditorNotificationsView } from './auditor/AuditorNotificationsView';
import { AuditorProfileSettingsView } from './auditor/AuditorProfileSettingsView';

// Modals
import {
  AuditorAddFindingModal,
  AuditorUploadEvidenceModal,
  AuditorGenerateReportModal
} from './auditor/AuditorModals';

interface RegulatorAuditorDashboardProps {
  userContact?: string;
  onLogout: () => void;
}

export const RegulatorAuditorDashboard: React.FC<RegulatorAuditorDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<string>('audit-overview');

  // Selected Entity Detail IDs
  const [selectedReviewId, setSelectedReviewId] = useState<string>('AUD-103');
  const [selectedReqId, setSelectedReqId] = useState<string>('REQ-GST-014');
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string>('EVD-038');
  const [selectedFindingId, setSelectedFindingId] = useState<string>('FND-021');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [isFindingModalOpen, setIsFindingModalOpen] = useState(false);
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Professional Terminology Navigation Items matching Prompt Specification
  const navItems: NavMenuItem[] = [
    { id: 'audit-overview', label: 'Audit Overview', icon: LayoutDashboard },
    { id: 'assigned-reviews', label: 'Assigned Audit Reviews', icon: ClipboardList, badge: '4' },
    { id: 'compliance-assessment', label: 'Compliance Assessment', icon: ShieldCheck },
    { id: 'evidence-register', label: 'Evidence Register', icon: FileCheck },
    { id: 'risk-control-assessment', label: 'Risk & Control Assessment', icon: Lock },
    { id: 'audit-activity-log', label: 'Audit Activity Log', icon: History },
    { id: 'audit-findings', label: 'Audit Findings', icon: AlertTriangle, badge: '8' },
    { id: 'regulatory-reports', label: 'Regulatory Reports', icon: FileText, badge: '3' },
    { id: 'authorized-documents', label: 'Authorized Documents', icon: FileText },
    { id: 'alerts-notifications', label: 'Alerts & Notifications', icon: Bell, badge: '5' },
    { id: 'user-profile', label: 'User Profile', icon: User },
    { id: 'workspace-settings', label: 'Workspace Settings', icon: Settings },
  ];

  const profileData = {
    name: 'Priya Nair',
    email: 'demo.regulator@netfixai.test',
    role: 'Regulator / Auditor',
    roleTitle: 'Compliance Auditor',
    avatarInitials: 'PN',
    auditorId: 'AUD-001',
    organization: 'MARG Compliance Division',
    location: 'Hyderabad',
    phone: '+91 9000000006',
  };

  const handleOpenReview = (id: string) => {
    setSelectedReviewId(id);
    setActiveTab('review-detail');
  };

  const handleOpenRequirementDetail = (id: string) => {
    setSelectedReqId(id);
    setActiveTab('requirement-detail');
  };

  const handleOpenEvidenceDetail = (id: string) => {
    setSelectedEvidenceId(id);
    setActiveTab('evidence-detail');
  };

  const handleOpenFindingDetail = (id: string) => {
    setSelectedFindingId(id);
    setActiveTab('finding-detail');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const renderContent = () => {
    const tabKey = activeTab.toLowerCase();

    // Detail Routes
    if (tabKey === 'review-detail') {
      return (
        <AuditorReviewDetailView
          reviewId={selectedReviewId}
          onBack={() => setActiveTab('assigned-reviews')}
          onOpenFindingModal={() => setIsFindingModalOpen(true)}
          onOpenReportModal={() => setIsReportModalOpen(true)}
        />
      );
    }

    if (tabKey === 'requirement-detail') {
      return (
        <AuditorRequirementDetailView
          reqId={selectedReqId}
          onBack={() => setActiveTab('compliance-assessment')}
          onOpenEvidenceDetail={handleOpenEvidenceDetail}
        />
      );
    }

    if (tabKey === 'evidence-detail') {
      return (
        <AuditorEvidenceDetailView
          evidenceId={selectedEvidenceId}
          onBack={() => setActiveTab('evidence-register')}
          onOpenRequirementDetail={handleOpenRequirementDetail}
        />
      );
    }

    if (tabKey === 'finding-detail') {
      return (
        <AuditorFindingDetailView
          findingId={selectedFindingId}
          onBack={() => setActiveTab('audit-findings')}
          onOpenEvidenceDetail={handleOpenEvidenceDetail}
        />
      );
    }

    // Standard Module Routes
    switch (tabKey) {
      case 'audit-overview':
      case 'dashboard':
        return (
          <AuditorDashboardView
            onNavigateTab={setActiveTab}
            onOpenReview={handleOpenReview}
          />
        );

      case 'assigned-reviews':
      case 'reviews':
      case 'assigned audit reviews':
        return <AuditorAssignedReviewsView onOpenReview={handleOpenReview} />;

      case 'compliance-assessment':
      case 'compliance':
        return (
          <AuditorComplianceView
            onOpenRequirementDetail={handleOpenRequirementDetail}
          />
        );

      case 'evidence-register':
      case 'evidence':
        return (
          <AuditorEvidenceView
            onOpenUploadModal={() => setIsEvidenceModalOpen(true)}
            onOpenEvidenceDetail={handleOpenEvidenceDetail}
          />
        );

      case 'audit-findings':
      case 'findings':
        return (
          <AuditorFindingsView
            onOpenNewFindingModal={() => setIsFindingModalOpen(true)}
            onOpenFindingDetail={handleOpenFindingDetail}
            onOpenReview={handleOpenReview}
          />
        );

      case 'risk-control-assessment':
      case 'risk-controls':
      case 'risk & control assessment':
        return (
          <AuditorRiskControlsView
            onOpenAddRiskModal={() => setIsFindingModalOpen(true)}
          />
        );

      case 'regulatory-reports':
      case 'reports':
        return (
          <AuditorReportsView
            onOpenGenerateModal={() => setIsReportModalOpen(true)}
            onOpenReview={handleOpenReview}
          />
        );

      case 'authorized-documents':
      case 'documents':
        return (
          <AuditorDocumentsView
            onOpenUploadModal={() => setIsEvidenceModalOpen(true)}
            onOpenReview={handleOpenReview}
          />
        );

      case 'audit-activity-log':
      case 'audit-trail':
      case 'audit activity log':
        return <AuditorAuditTrailView />;

      case 'alerts-notifications':
      case 'notifications':
        return <AuditorNotificationsView onNavigateTab={setActiveTab} />;

      case 'user-profile':
      case 'workspace-settings':
      case 'profile':
      case 'settings':
        return <AuditorProfileSettingsView />;

      default:
        return (
          <AuditorDashboardView
            onNavigateTab={setActiveTab}
            onOpenReview={handleOpenReview}
          />
        );
    }
  };

  return (
    <RoleDashboardShell
      roleId="regulator"
      roleTitle="Regulator / Auditor"
      userProfile={profileData}
      navItems={navItems}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={onLogout}
    >
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-gradient-to-r from-[#00B8FF] to-blue-600 text-black font-bold text-xs shadow-2xl flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-black" />
          <span>{toastMessage}</span>
        </div>
      )}

      {renderContent()}

      {/* Shared Auditor Modals */}
      <AuditorAddFindingModal
        isOpen={isFindingModalOpen}
        onClose={() => setIsFindingModalOpen(false)}
        onSuccess={showToast}
      />

      <AuditorUploadEvidenceModal
        isOpen={isEvidenceModalOpen}
        onClose={() => setIsEvidenceModalOpen(false)}
        onSuccess={showToast}
      />

      <AuditorGenerateReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSuccess={showToast}
      />
    </RoleDashboardShell>
  );
};

export default RegulatorAuditorDashboard;

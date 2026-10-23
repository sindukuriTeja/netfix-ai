import React from 'react';
import type { RoleItem } from '../../types';
import { RoleGuard } from './RoleGuard';

import { InternalEmployeeDashboard } from './roles/InternalEmployeeDashboard';
import { ManagementExecutiveDashboard } from './roles/ManagementExecutiveDashboard';
import { AdvocateDashboard } from './roles/AdvocateDashboard';
import { ClientDashboard } from './roles/ClientDashboard';
import { TenantDashboard } from './roles/TenantDashboard';
import { RegulatorAuditorDashboard } from './roles/RegulatorAuditorDashboard';
import { AdminDashboard } from './roles/AdminDashboard';

interface RoleDashboardContainerProps {
  role: RoleItem;
  authenticatedUserRole?: string | null;
  userContact?: string;
  onLogout: () => void;
  onNavigateRoleWorkspace?: (targetRole: string) => void;
}

export const RoleDashboardContainer: React.FC<RoleDashboardContainerProps> = ({
  role,
  authenticatedUserRole,
  userContact,
  onLogout,
  onNavigateRoleWorkspace,
}) => {
  // Target role requested by route
  const targetRoleId = role.id || 'client';
  const effectiveAuthRole = authenticatedUserRole || role.id;

  return (
    <RoleGuard
      authenticatedUserRole={effectiveAuthRole}
      targetRole={targetRoleId}
      onNavigateWorkspace={(userRole) => {
        if (onNavigateRoleWorkspace) {
          onNavigateRoleWorkspace(userRole);
        }
      }}
      onLogout={onLogout}
    >
      {targetRoleId === 'employee' && (
        <InternalEmployeeDashboard userContact={userContact} onLogout={onLogout} />
      )}
      {targetRoleId === 'management' && (
        <ManagementExecutiveDashboard userContact={userContact} onLogout={onLogout} />
      )}
      {targetRoleId === 'advocate' && (
        <AdvocateDashboard userContact={userContact} onLogout={onLogout} />
      )}
      {targetRoleId === 'client' && (
        <ClientDashboard userContact={userContact} onLogout={onLogout} />
      )}
      {(targetRoleId === 'tenant' || targetRoleId === 'tenant-vendor') && (
        <TenantDashboard userContact={userContact} onLogout={onLogout} />
      )}
      {targetRoleId === 'regulator' && (
        <RegulatorAuditorDashboard userContact={userContact} onLogout={onLogout} />
      )}
      {(targetRoleId === 'admin' || targetRoleId === 'super-admin') && (
        <AdminDashboard userContact={userContact} onLogout={onLogout} />
      )}
    </RoleGuard>
  );
};

export default RoleDashboardContainer;

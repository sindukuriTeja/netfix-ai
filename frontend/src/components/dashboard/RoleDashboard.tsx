import React from 'react';
import type { RoleItem } from '../../types';
import { RoleDashboardContainer } from './RoleDashboardContainer';

interface RoleDashboardProps {
  role: RoleItem;
  authenticatedUserRole?: string | null;
  userContact?: string;
  onLogout: () => void;
  onNavigateRoleWorkspace?: (targetRole: string) => void;
}

export const RoleDashboard: React.FC<RoleDashboardProps> = ({
  role,
  authenticatedUserRole,
  userContact,
  onLogout,
  onNavigateRoleWorkspace,
}) => {
  return (
    <RoleDashboardContainer
      role={role}
      authenticatedUserRole={authenticatedUserRole}
      userContact={userContact}
      onLogout={onLogout}
      onNavigateRoleWorkspace={onNavigateRoleWorkspace}
    />
  );
};

export default RoleDashboard;

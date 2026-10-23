import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Roles } from './components/Roles';
import { HowItWorks } from './components/HowItWorks';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { VideoBackground } from './components/VideoBackground';

// Phase 2 Auth Components
import { AuthBackground } from './components/auth/AuthBackground';
import { AuthHeader } from './components/auth/AuthHeader';
import { RoleSelection } from './components/auth/RoleSelection';
import { LoginForm } from './components/auth/LoginForm';
import { RegistrationForm } from './components/auth/RegistrationForm';
import { OTPVerification } from './components/auth/OTPVerification';
import { RoleDashboard } from './components/dashboard/RoleDashboard';

import { USER_ROLES } from './data/landingData';
import type { RoleItem } from './types';

const resolveRoleFromPath = (path: string): RoleItem | null => {
  if (path.startsWith('/employee')) return USER_ROLES.find((r) => r.id === 'employee') || null;
  if (path.startsWith('/management')) return USER_ROLES.find((r) => r.id === 'management') || null;
  if (path.startsWith('/advocate')) return USER_ROLES.find((r) => r.id === 'advocate') || null;
  if (path.startsWith('/client')) return USER_ROLES.find((r) => r.id === 'client') || null;
  if (path.startsWith('/tenant')) return USER_ROLES.find((r) => r.id === 'tenant-vendor') || null;
  if (path.startsWith('/regulator')) return USER_ROLES.find((r) => r.id === 'regulator') || null;
  if (path.startsWith('/admin')) return USER_ROLES.find((r) => r.id === 'admin') || null;

  if (path.startsWith('/dashboard/employee')) return USER_ROLES.find((r) => r.id === 'employee') || null;
  if (path.startsWith('/dashboard/management')) return USER_ROLES.find((r) => r.id === 'management') || null;
  if (path.startsWith('/dashboard/advocate')) return USER_ROLES.find((r) => r.id === 'advocate') || null;
  if (path.startsWith('/dashboard/client')) return USER_ROLES.find((r) => r.id === 'client') || null;
  if (path.startsWith('/dashboard/tenant')) return USER_ROLES.find((r) => r.id === 'tenant-vendor') || null;
  if (path.startsWith('/dashboard/regulator')) return USER_ROLES.find((r) => r.id === 'regulator') || null;
  if (path.startsWith('/dashboard/admin')) return USER_ROLES.find((r) => r.id === 'admin') || null;

  return null;
};

export function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);
  const [selectedRole, setSelectedRole] = useState<RoleItem | null>(null);
  const [maskedContact, setMaskedContact] = useState<string>('t***@example.com');
  const [authenticatedRole, setAuthenticatedRole] = useState<RoleItem | null>(() => {
    const saved = localStorage.getItem('netfix_auth_role');
    if (saved) {
      return USER_ROLES.find((r) => r.id === saved) || null;
    }
    return null;
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthenticatedSuccess = (role: RoleItem, userEmail?: string) => {
    setAuthenticatedRole(role);
    localStorage.setItem('netfix_auth_role', role.id);
    if (userEmail) setMaskedContact(userEmail);
    navigate(role.dashboardRoute);
  };

  const handleLogout = () => {
    setAuthenticatedRole(null);
    localStorage.removeItem('netfix_auth_role');
    navigate('/');
  };

  // Check Dashboard & Role Routes (`/employee/*`, `/management/*`, `/advocate/*`, `/client/*`, `/tenant/*`, `/regulator/*`, `/dashboard/*`)
  const matchedRoleFromRoute = resolveRoleFromPath(currentPath);
  const isDashboardOrRoleRoute = currentPath.startsWith('/dashboard') || matchedRoleFromRoute !== null;

  if (isDashboardOrRoleRoute) {
    const targetRole = matchedRoleFromRoute || authenticatedRole || selectedRole || USER_ROLES.find((r) => r.id === 'client')!;

    return (
      <RoleDashboard
        role={targetRole}
        authenticatedUserRole={authenticatedRole?.id || null}
        userContact={maskedContact.includes('@') ? maskedContact.split('@')[0] : 'Enterprise User'}
        onLogout={handleLogout}
        onNavigateRoleWorkspace={(targetRoleId) => {
          const foundRole = USER_ROLES.find((r) => r.id === targetRoleId || r.id.startsWith(targetRoleId));
          if (foundRole) {
            navigate(foundRole.dashboardRoute);
          }
        }}
      />
    );
  }

  // Phase 2 Auth Flow Routes (`/role-selection`, `/login`, `/register`, `/login/otp`, `/register/otp`)
  const isAuthRoute =
    currentPath === '/role-selection' ||
    currentPath === '/login' ||
    currentPath === '/register' ||
    currentPath === '/login/otp' ||
    currentPath === '/register/otp';

  if (isAuthRoute) {
    return (
      <div className="min-h-screen bg-[#050B14] text-slate-100 flex flex-col font-sans relative selection:bg-sky-500/30 selection:text-sky-200 overflow-x-hidden">
        {/* Ambient Dark Luxury Background */}
        <AuthBackground />

        {/* Auth Brand Header */}
        <AuthHeader onNavigateHome={() => navigate('/')} />

        {/* Auth Route Content */}
        <main className="relative z-10 flex-1 flex flex-col justify-center py-6 sm:py-10">
          {currentPath === '/role-selection' && (
            <RoleSelection
              selectedRole={selectedRole}
              onSelectRole={(role) => setSelectedRole(role)}
              onContinue={(_flow) => navigate('/login')}
            />
          )}

          {currentPath === '/login' && (
            selectedRole ? (
              <LoginForm
                selectedRole={selectedRole}
                onChangeRole={() => navigate('/role-selection')}
                onNavigateRegister={() => navigate('/register')}
                onSuccessLogin={(contact) => {
                  setMaskedContact(contact);
                  navigate('/login/otp');
                }}
                onSuccessDemoLogin={(user) => {
                  handleAuthenticatedSuccess(selectedRole, user?.email);
                }}
              />
            ) : (
              // Prompt role selection if route accessed directly
              <RoleSelection
                selectedRole={null}
                onSelectRole={(role) => setSelectedRole(role)}
                onContinue={() => navigate('/login')}
              />
            )
          )}

          {currentPath === '/register' && (
            selectedRole ? (
              <RegistrationForm
                selectedRole={selectedRole}
                onChangeRole={() => navigate('/role-selection')}
                onNavigateLogin={() => navigate('/login')}
                onSuccessRegister={(contact) => {
                  setMaskedContact(contact);
                  navigate('/register/otp');
                }}
              />
            ) : (
              <RoleSelection
                selectedRole={null}
                onSelectRole={(role) => setSelectedRole(role)}
                onContinue={() => navigate('/register')}
              />
            )
          )}

          {currentPath === '/login/otp' && (
            selectedRole ? (
              <OTPVerification
                mode="login"
                selectedRole={selectedRole}
                maskedContact={maskedContact}
                onBack={() => navigate('/login')}
                onSuccessVerify={() => {
                  handleAuthenticatedSuccess(selectedRole);
                }}
              />
            ) : (
              <RoleSelection
                selectedRole={null}
                onSelectRole={(role) => setSelectedRole(role)}
                onContinue={() => navigate('/login')}
              />
            )
          )}

          {currentPath === '/register/otp' && (
            selectedRole ? (
              <OTPVerification
                mode="registration"
                selectedRole={selectedRole}
                maskedContact={maskedContact}
                onBack={() => navigate('/register')}
                onSuccessVerify={() => {
                  handleAuthenticatedSuccess(selectedRole);
                }}
              />
            ) : (
              <RoleSelection
                selectedRole={null}
                onSelectRole={(role) => setSelectedRole(role)}
                onContinue={() => navigate('/register')}
              />
            )
          )}
        </main>
      </div>
    );
  }

  // Phase 1 Public Landing Page (`/`)
  return (
    <div className="min-h-screen bg-[#050B14] text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-200 relative">
      {/* Full Landing Page Video Background */}
      <VideoBackground />

      {/* Top Sticky Navigation */}
      <Navbar onNavigate={navigate} />

      {/* Main Landing Sections */}
      <main className="flex-1 w-full relative z-10 pt-20">
        {/* Hero Section */}
        <Hero onNavigate={navigate} />

        {/* About NETFIX AI Intelligence Layer */}
        <About />

        {/* User Roles Section ("Built for Every Stakeholder") */}
        <Roles onNavigate={navigate} onSelectRole={(role) => setSelectedRole(role)} />

        {/* How It Works Section ("From Request to Decision") */}
        <HowItWorks />

        {/* FAQ Accordion Section */}
        <FAQ />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;

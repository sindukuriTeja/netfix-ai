export interface RoleItem {
  id: string;
  title: string;
  description: string;
  iconName: 'users' | 'trending-up' | 'scale' | 'building' | 'home' | 'shield-check';
  badge?: string;
  dashboardRoute: string;
}

export interface WorkflowStep {
  step: string;
  title: string;
  description: string;
  iconName: 'user-check' | 'file-text' | 'cpu' | 'user-round-check' | 'check-circle';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactInfo {
  type: 'phone' | 'email' | 'whatsapp';
  label: string;
  value: string;
  actionText?: string;
  href?: string;
}

// Phase 2 Authentication Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegistrationFormData {
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  email: string;
  phoneCountryCode: string;
  phone: string;
  permanentAddress: string;
  temporaryAddress: string;
  sameAsPermanent: boolean;
  password: string;
  confirmPassword: string;
  role?: string;
}

export interface AuthState {
  selectedRoleId: string | null;
  emailOrPhone: string;
  authFlow: 'login' | 'register' | null;
  otpVerified: boolean;
}

export interface AuthError {
  field?: string;
  message: string;
}

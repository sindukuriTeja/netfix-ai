# NETFIX AI — Frontend Architecture & Role Workspace Specifications

This document details the layout architecture, component hierarchy, role guard authorization flow, and AI agent modal integration in the **NETFIX AI Frontend**.

---

## 🏛️ Component Architecture & Layout Tree

```mermaid
flowchart TD
    App["App.tsx (Root Router & State)"]
    
    subgraph PublicRoutes ["Public Landing Page Route (/)"]
        Navbar["Navbar"]
        Hero["Hero"]
        About["About"]
        RolesGrid["Roles Grid"]
        HowItWorks["HowItWorks"]
        FAQ["FAQ Accordion"]
        Contact["Contact"]
        Footer["Footer"]
    end

    subgraph AuthRoutes ["Authentication Routes (/role-selection, /login, /register, /otp)"]
        AuthHeader["AuthHeader"]
        RoleSelection["RoleSelection"]
        LoginForm["LoginForm"]
        RegistrationForm["RegistrationForm"]
        OTPVerification["OTPVerification"]
    end

    subgraph DashboardRoutes ["Role Dashboard Workspace Routes"]
        RoleDashboardShell["RoleDashboard Shell"]
        RoleGuard["RoleGuard (Security Boundary)"]
        
        subgraph RoleWorkspaces ["Role Workspace Components"]
            EmpDash["InternalEmployeeDashboard"]
            MgmtDash["ManagementExecutiveDashboard"]
            AdvDash["AdvocateDashboard"]
            CliDash["ClientDashboard"]
            TenDash["TenantDashboard"]
            RegDash["RegulatorAuditorDashboard"]
            AdminDash["AdminDashboard Overview"]
        end
    end

    App --> PublicRoutes
    App --> AuthRoutes
    App --> DashboardRoutes
    RoleDashboardShell --> RoleGuard
    RoleGuard --> RoleWorkspaces
```

---

## 🛡️ RoleGuard Security Decision Flow

```mermaid
stateDiagram-v2
    [*] --> CheckRoute: User navigates to /dashboard/:role
    CheckRoute --> CheckAuth: Check authenticatedUserRole in state / localStorage

    state CheckAuth {
        [*] --> CompareRoles: normUser === normTarget OR normUser === 'admin'?
        CompareRoles --> Authorized: True
        CompareRoles --> Unauthorized: False
    }

    Authorized --> MountWorkspace: Render Role Dashboard View
    Unauthorized --> Render403: Block mount & display 403 Restricted Screen

    Render403 --> RedirectWorkspace: User clicks 'Return to Your Workspace'
    RedirectWorkspace --> MountWorkspace: Navigate to user's authorized role route
```

---

## 🤖 Interactive Ask-AI Modal Data Flow

```mermaid
sequenceDiagram
    autonumber
    actor User as Stakeholder (e.g. Client / Advocate)
    participant UI as Role Dashboard Ask-AI Modal
    participant API as authService / agent API
    participant Backend as Ultron Orchestrator API
    participant LiveUI as LiveAgentActivity Telemetry

    User->>UI: Select Agent & Submit Task Query
    UI->>LiveUI: Set task status = 'RUNNING' & step = 'Initializing...'
    UI->>API: POST /api/agent/:agentKey (with query & parameters)
    API->>Backend: Forward request to backend
    
    loop Task Telemetry Polling (every 2 seconds)
        LiveUI->>Backend: GET /api/agent/tasks/:id
        Backend-->>LiveUI: Return status, step, and progress %
    end

    Backend-->>API: Task Completed (OrchestrateResult + PDF download URL)
    API-->>UI: Return result payload
    UI->>LiveUI: Update status = 'COMPLETED'
    UI->>User: Display AI result summary & PDF download button
```

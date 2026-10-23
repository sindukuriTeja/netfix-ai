# NETFIX AI — Monorepo

The **NETFIX AI** platform (developed in association with MARG GROUP) — a legal & tax AI platform for the Indian market, consolidated into a single monorepo.

> This repository merges the previously separate `backend`, `frontend`, and `admin` repositories.

## 📁 Repository Structure

```
netfix-ai/
├── backend/    # Express + TypeScript API server, RBAC layer, Ultron AI orchestration engine (Gemini 1.5)
├── frontend/   # React 19 + Vite user application — 6 role-based dashboards (employee, management, advocate, client, tenant, regulator)
└── admin/      # React 19 + Vite admin portal — 3-step auth (password → TOTP → Cloudflare Turnstile)
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18+
- **npm** v9+
- A Supabase project, Gemini API key, and Brevo API key (see each app's `.env.example`)

### 1. Backend (port 5000)
```bash
cd backend
cp .env.example .env   # fill in secrets
npm install
npm run dev
```
Health check: `curl http://localhost:5000/api/v1/health`

### 2. Frontend (port 3000)
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

### 3. Admin Portal (port 3001)
```bash
cd admin
cp .env.example .env
npm install
npm run dev
```

## 🤖 AI Engine

The backend's **Ultron Orchestrator** (`backend/src/services/ultronOrchestrator.ts`) coordinates 13 specialized agents (document intake, case analysis, tax intelligence, legal research, drafting, adversarial red-teaming, risk/compliance, citation checking, portal automation, and more) with:

- Task classification & routing (Gemini, with rule-based fallback)
- RBAC-scoped context bundles
- Verification pass with up to 3 retry attempts + corrective feedback
- Human-in-the-loop review gates for high-risk agents
- Role-based output filtering
- PDF report generation
- Immutable audit logging at every step

See `backend/README.md` and `backend/docs/architecture.md` for full API routes, database schema, and architecture diagrams.

## 🔐 Security Notes

- JWTs are stored in `HttpOnly` / `SameSite` cookies (`user_session` / `admin_session`)
- 6 application roles + admin, with tenant isolation enforced by `rbacService`
- Admin portal enforces a 3-step protocol: password → TOTP MFA → Cloudflare Turnstile
- All denied access attempts are recorded in the immutable audit log

> **CAUTION:** Never commit production secrets, private keys, or API keys to this repository.
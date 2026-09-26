# JobPilot AI Frontend

React 19 + TypeScript + Vite frontend for JobPilot AI.

## Local development

Requirements: Node.js 20+, npm, and the JobPilot AI backend on port 8000.

Commands:

    npm ci
    cp .env.example .env.local
    npm run dev

Set VITE_API_BASE_URL=http://localhost:8000/api in .env.local.

Open http://localhost:5173.

## Production build

    npm run build
    npm run preview

GitHub Actions runs npm ci and npm run build on pushes and pull requests.

## Routes

Public: /login, /register, /account-pending

User: /dashboard, /resume, /preferences, /jobs, /applications, /action-required, /agent, /settings

Admin: /admin, /admin/users, /admin/approvals, /admin/applications, /admin/agents, /admin/audit-logs, /admin/settings

## Backend

Set VITE_API_BASE_URL=https://YOUR-BACKEND-DOMAIN/api in the production frontend environment.

Never put backend secrets, database credentials, or LLM API keys in the frontend.

## Vercel

This is a Vite static application. Build command: npm run build. Output directory: dist. The included vercel.json rewrites application routes to index.html for React Router.

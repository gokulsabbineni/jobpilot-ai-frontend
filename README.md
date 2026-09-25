# JobPilot AI Frontend

A runnable React + TypeScript + Vite frontend for the JobPilot AI job-search/application assistant.

## Requirements

- Node.js 18+ (LTS recommended)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, normally:

http://localhost:5173/welcome

## Build

```bash
npm run build
npm run preview
```

## Backend integration

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Set:

```text
VITE_API_BASE_URL=http://localhost:8080
```

The API layer is in `src/api/client.ts`. The UI currently uses mock data so it works without a backend.

## Main routes

- `/welcome`
- `/dashboard`
- `/resume`
- `/preferences`
- `/jobs`
- `/jobs/job-1`
- `/applications`
- `/applications/APP-127`
- `/applications/new?job=job-1`
- `/agent`
- `/settings`

## Git

```bash
git init
git add .
git commit -m "Initial JobPilot AI frontend"
```

Then create a private GitHub repository and push the project.

## Next step

Build the Go API separately and replace the mock data/services with calls to endpoints such as:

- `POST /api/resume/upload`
- `GET /api/resume`
- `GET /api/preferences`
- `PUT /api/preferences`
- `GET /api/jobs`
- `POST /api/agent/start`
- `POST /api/agent/stop`
- `GET /api/agent/status`
- `GET /api/agent/activity`
- `GET /api/applications`
- `GET /api/applications/:id`
- `POST /api/applications/prepare`
- `POST /api/applications/:id/approve`
- `POST /api/applications/:id/submit`

## New product workflows
- New registrations start as `PENDING_APPROVAL` and require an admin approval before the user can use the AI agent.
- Added an Action Required inbox for applications that need additional candidate data, employer portal account creation, or human verification.
- Applications can pause in `WAITING_FOR_USER` and resume after the user responds.
- Portal credentials should never be stored as plain text in PostgreSQL; use encrypted secrets/password-vault infrastructure in the backend.
- CAPTCHA/human verification is a deliberate pause point for the user.
- Admin approval and application actions should be audited by the backend.

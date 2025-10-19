# Lex Moscua Platform Architecture

## Overview
Lex Moscua is an end-to-end learning platform inspired by Duolingo that focuses on legal education. The solution is organised as a modular, cloud-ready web application comprised of a Next.js frontend, a Node.js/Express (or Next.js API routes) backend, and a PostgreSQL database. Auxiliary services, such as authentication, file storage, and analytics, integrate via well-defined interfaces so the system can grow without large-scale refactors.

## High-level system diagram
```
┌────────────────────────────────────────────────────────────────────┐
│                            Client layer                            │
│ ┌────────────────────────┐    ┌──────────────────────────────────┐ │
│ │  Next.js Web Frontend  │<-->|  Authentication Provider (SSO)   │ │
│ │  (SSR + SPA hybrid)    │    └──────────────────────────────────┘ │
│ │  Tailwind UI, i18n     │                                         │
│ │  Service workers (PWA) │                                         │
│ └────────────┬───────────┘                                         │
└──────────────┼───────────▲──────────────────────────────────────────┘
               │           │HTTPS (REST/GraphQL)
               ▼           │
┌──────────────┴───────────┴──────────────────────────────────────────┐
│                         Application layer                            │
│ ┌──────────────────────────────────────────────────────────────────┐ │
│ │ Next.js API routes / Express services                             │ │
│ │ • Course delivery (lessons, theory, practice)                     │ │
│ │ • Progress tracking & gamification                                │ │
│ │ • Leaderboards & challenges                                       │ │
│ │ • Admin content management                                        │ │
│ │ • Notification & task scheduler integrations                      │ │
│ └───────┬──────────────────────────────────────────────────────────┘ │
│         │ Prisma ORM                                                 │
└─────────┼────────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────┴────────────────────────────────────────────────────────────┐
│                            Data layer                                │
│ ┌──────────────────────────────────────────────────────────────────┐ │
│ │ PostgreSQL                                                        │ │
│ │ • Normalised schema for users, courses, lessons, attempts, XP     │ │
│ │ • Row level security for admin vs learner access                  │ │
│ │ Redis/KeyDB cache (leaderboards, session throttling)              │ │
│ └──────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
```

## Deployment topology

| Environment | Hosting | Notes |
|-------------|---------|-------|
| Development | Docker Compose (Next.js, Node.js, PostgreSQL, Redis) | Hot reload, seeded demo data, MailHog for transactional email testing. |
| Staging | Vercel (frontend + API routes) + managed PostgreSQL/Redis | Mirror production, password protected, used for QA and UAT. |
| Production | Vercel or Kubernetes cluster | Auto-scaling stateless app layer; use managed database (RDS, Neon, Supabase). |

## Key architectural decisions

- **Hybrid rendering**: Critical marketing and authentication flows render with SSR/SSG for SEO and fast first load, while the course experience uses client-side routing and React Query/SWR for real-time progress.
- **API strategy**: REST endpoints for CRUD-like operations (courses, lessons, progress). GraphQL gateway can be introduced later for more flexible client queries; schema-first design keeps the option open.
- **Authentication**: NextAuth.js with email/password and optional OAuth providers (university SSO). Session tokens stored in HTTP-only cookies; JWT strategy used for stateless scaling.
- **Authorisation**: Role-based access control (RBAC) with `learner`, `admin`, and future `moderator` roles. Middleware guards protect admin routes and API handlers.
- **Data integrity**: PostgreSQL schema enforces referential integrity. Prisma handles migrations (`prisma migrate`) and seed scripts for base content.
- **Gamification services**: XP calculation, streak tracking, league assignment encapsulated in dedicated domain services with cron-like jobs (e.g., BullMQ workers) to reset weekly leaderboards and streak grace periods.
- **Content management**: Admin panel built as a protected Next.js route, relying on form builders (React Hook Form) and rich-text editing (TipTap) for theory content. Asset uploads go to S3-compatible storage with signed URLs.
- **Observability**: Structured logging (pino) forwarded to Logflare/ELK, metrics exported via OpenTelemetry, and error tracking handled by Sentry for both client and server.
- **Internationalisation**: next-intl (or next-i18next) manages locale dictionaries stored under `/locales`. Russian default, additional locales added by extending JSON resources.
- **Accessibility**: Component library adheres to WCAG 2.1 AA; automated audits via Lighthouse CI in pipeline.

## Scalability considerations

1. **Stateless services**: All runtime state persists in PostgreSQL or Redis, enabling horizontal scaling of API servers.
2. **Caching**: Leaderboards and frequently accessed read models cached in Redis with background jobs refreshing snapshots.
3. **Asynchronous jobs**: Message queue (BullMQ/Redis) handles email reminders, streak resets, and batch analytics exports without blocking HTTP requests.
4. **Feature flagging**: Integration with ConfigCat/LaunchDarkly (or open-source Unleash) to gradually release new gamification mechanics.
5. **Testing strategy**: Comprehensive automated tests—unit (Jest), integration (Playwright/Next API), and contract tests for APIs. CI enforces linting, type checks, and test suites before deploy.

## Security baseline

- HTTPS enforced with HSTS; TLS certificates managed via hosting provider.
- Passwords hashed using Argon2id with per-user salt and pepper stored in secret manager.
- Rate limiting on authentication and leaderboard endpoints (Upstash Redis or in-memory during development).
- Input validation with Zod schema to prevent injection and enforce business rules.
- Audit logs for admin actions stored in append-only table with tamper-evident hashing.

## Roadmap highlights

- MVP: multi-course learning path, XP/streak tracking, admin content editing, leaderboard basics.
- Phase 2: social features (friends, challenges), mobile push notifications, in-app purchases simulation.
- Phase 3: adaptive learning engine that tailors exercises based on mastery scores and adds AI-assisted tutoring.


# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A full-stack task/plan management application with JWT authentication. Monorepo with separate `backend/` (NestJS + GraphQL + Prisma + PostgreSQL) and `frontend/` (Next.js + Apollo Client + MUI) directories.

## Common Commands

### Backend (`backend/`)
```bash
npm run start:dev        # Dev server with watch mode (runs on port 3005)
npm run build            # Build (nest build)
npm run lint             # ESLint with auto-fix
npm run format           # Prettier formatting
npm run test             # Unit tests (Jest)
npm run test:watch       # Unit tests in watch mode
npm run test:e2e         # E2E tests (uses test/jest-e2e.json config)
npm run test:cov         # Test coverage
npx prisma migrate dev   # Run database migrations
npx prisma generate      # Regenerate Prisma client after schema changes
```

### Frontend (`frontend/`)
```bash
npm run dev              # Next.js dev server
npm run build            # Production build
npm run lint             # ESLint
npm run codegen          # GraphQL Code Generator (requires backend running)
```

### Database
```bash
# From backend/ directory
docker-compose up -d     # Start PostgreSQL (port 5434)
```

## Architecture

### Backend
- **NestJS** with code-first **GraphQL** (Apollo Driver) — schema auto-generated to `src/schema.gql`
- **Prisma** ORM with PostgreSQL (Docker, port 5434)
- **Modules**: `PlanModule`, `UserModule`, `AuthModule`, `PrismaModule` (all imported in `AppModule`)
- **Auth**: JWT-based via `@nestjs/passport` and `passport-jwt`
- Each module follows NestJS convention: `*.module.ts`, `*.service.ts`, `*.resolver.ts`, `dto/*.input.ts`, `models/*.model.ts`

### Frontend
- **Next.js** (App Router) with **Apollo Client** for GraphQL
- **MUI (Material-UI)** for components, Tailwind CSS also available
- Apollo Client configured in `src/app/providers/apolloProvider.tsx`, connects to `http://localhost:3005/graphql`
- GraphQL queries in `src/mutations/` and `src/query/`, types in `src/app/types/`
- GraphQL Code Generator config at `graphql/codegen.yml` — generates types from backend schema into `src/graphql/generated.ts`
- JWT token stored in localStorage, decoded with `jwt-decode`

### Database Schema (Prisma)
- **Plan**: id, title, status (NOT_STARTED/IN_PROGRESS/COMPLETED), content (optional), userId (FK to User), timestamps
- **User**: id, name, email (unique), password, daily_count, timestamps
- User has many Plans; deleting a User cascades to their Plans

## Code Style
- Backend: Prettier with single quotes, trailing commas, LF line endings
- TypeScript throughout both projects

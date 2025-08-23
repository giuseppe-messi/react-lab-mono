# Auth-Guarded Hub

A **full-stack playground** with a real backend and authentication flow. The app features a **React (Vite) frontend** talking to a **Netlify-hosted API** powered by **Prisma + Postgres**.

Users are authenticated with **server-side sessions**, backed by **secure HTTP-only cookies**, so protected routes can only be accessed when you’re truly logged in. On the backend, a **Prisma schema and migrations** keep the database in sync, and every deploy automatically applies changes.

Unlike mocked demos, this project runs against a **live API** with **real persistence**, so creating a user or logging in actually updates the database. It’s a hands-on way to explore what a modern auth-guarded app looks like, from **login → session → protected content**, all in one place.

---

## ✨ Features

- **Full-Stack Setup**  
  Built with a **React (Vite) frontend** and a **backend API** running on **Netlify Functions**. The API talks to a **Postgres database via Prisma**, giving you a real production-style stack with serverless deployment.

- **Database & Schema**  
  Database schema is defined in **Prisma**, with versioned **migrations** that apply automatically on deploy. This means every environment stays in sync and schema changes are tracked over time.

- **Routing & Guards**  
  Uses **React Router** with protected routes. Access to admin areas is locked behind **session + JWT guards**, so only authenticated users can reach sensitive pages.

- **Type Safety & Best Practices**  
  The whole codebase runs on **TypeScript**, covering both frontend and backend. Auth state is handled with a **context-based provider** and **reusable hooks**, ensuring clean separation of concerns and safer refactoring.

---

**Checkout the live demo**: [Auth-Guarded Hub](https://auth-guarded-hub.netlify.app/)

## 📁 Project Location

This app lives in the [`apps/auth-guarded-hub/`](https://github.com/giuseppe-messi/react-lab-mono/tree/main/apps/auth-guarded-hub) directory of the [`react-lab-mono`](https://github.com/giuseppe-messi/react-lab-mono) monorepo.

---

## 🛠️ Dev Documentation

### API guide/reference:

```bash
# Link the API folder to a Netlify site
npx netlify init

# Provision a Neon Postgres and save DB URLs to the site
npx netlify db init

# Verify env vars were saved
npx netlify env:list

# Add your own app secrets in a .env file
NETLIFY_DATABASE_URL=...
NETLIFY_DATABASE_URL_UNPOOLED=...

# Generate Prisma client & run local migrations (dev only)
pnpm prisma generate
pnpm prisma migrate dev --name <change>

# Applies existing migrations to the DB
pnpm prisma migrate deploy

# Run locally
npx netlify dev

# Build the site as Netlify would in production
npx netlify build

# Serve the built output locally
npx netlify serve
```

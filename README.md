See `README.dev.md` for a concise developer guide and setup instructions.

### What it is 💡


### Quick Setup ⚙️
1. Install dependencies:
```powershell
npm install
```
2. Configure `.env` (DB and auth vars):
```powershell
copy .env .env.local   # or manually update env values
```
3. Start dev server:
```powershell
# Standard port 3000:
npm run dev
# Or run on 3001 to match some env values:
$env:PORT=3001; npm run dev
```


### Important env variables 🔒


### Useful commands 📜


### Quick architecture overview 🏗️


### Tips for development 🔧


Want a more detailed developer guide (DB seed, .env.example, Postman collection)? I can create `README.dev.md` on request.
## Allstar POS — Short README for Developers ✅

Short and focused developer guide to get started with the Allstar POS project.

---

### What it is 💡
- POS web app using **Next.js 14**, **React 18**, and **TypeScript**.
- APIs located in `src/app/api/*`; auth via NextAuth credentials.

---

### Quick Setup ⚙️
1. Install dependencies:
```powershell
npm install
```
2. Configure `.env` (DB and auth vars):
```powershell
copy .env .env.local   # or manually update env values
```
3. Start dev server:
```powershell
# Standard port 3000:
npm run dev
# Or run on 3001 to match some env values:
$env:PORT=3001; npm run dev
```

---

### Important env variables 🔒
- `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_DATABASE` — database connection
- `NEXTAUTH_URL`, `AUTH_SECRET` — NextAuth requirements
- `NEXT_PUBLIC_APP_TIMEZONE` — app timezone

---

### Useful commands 📜
- `npm run dev` — dev server
- `npm run build / npm run start` — production
- `npm run lint` — linting

---

### Quick architecture overview 🏗️
- `src/app` — Next.js routes & pages
- `src/app/api/*` — API endpoints (products, sales, customers)
- `src/components` — UI components
- `src/auth.ts` / `src/auth.config.ts` — NextAuth setup & protected routes
- `src/middleware.ts` — role-based redirects
- `src/utils/db/db.ts` — MySQL pool (mysql2/promise)

---

### Tips for development 🔧
- Ensure the DB schema exists, and `pos_user` has at least one user for login.
- Use `AUTH_SECRET` and `NEXTAUTH_URL` in `.env` for authentication to work correctly.
- Quick port switch in PowerShell: `$env:PORT=3001; npm run dev`.

---

Want a more detailed developer guide (DB seed, .env.example, Postman collection)? I can create `README.dev.md` on request.
## Allstar POS — Short README for Developers ✅

Short and focused developer guide to get started with the Allstar POS project.

---

### What it is 💡
- A POS (Point-of-Sale) web application built with **Next.js 14**, **React 18**, and **TypeScript**.
- Server-side APIs implemented in `src/app/api/*` using Next.js route handlers.
- Authentication uses **NextAuth** (credentials provider) and role-based middleware.

---

### Requirements & Quick Setup ⚙️
- Node.js (recommend v18+)
- MySQL server (or compatible) and a database for local development
- Git for source control

1) Install dependencies:
```powershell
npm install
```

2) Copy `.env` and update values (DB credentials, AUTH_SECRET, NEXTAUTH_URL, etc.)
```powershell
cp .env.example .env  # or copy manually
```

3) Start development server:
```powershell
# Default Next dev port 3000:
npm run dev

# Use 3001 (if you prefer to match existing .env values):
$env:PORT=3001; npm run dev
```

---

### Important ENV variables 🔒
- DB_HOST, DB_USER, DB_PASS, DB_DATABASE — MySQL connection used by `src/utils/db/db.ts`
- AUTH_SECRET — NextAuth secret
- NEXTAUTH_URL — Must match the app URL (ex. http://localhost:3001)
- NEXT_PUBLIC_APP_TIMEZONE — App timezone (e.g. Asia/Bangkok)

---

### Key Scripts 📜
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — run ESLint

---

### Project structure (high level) 🗂️
- `src/app` — Next.js app routes & UI
  - `(dashboard)` — admin / cashier UI
  - `login` — auth pages
  - `self-cashier` — kiosk mode pages
  - `api/*` — server API endpoints: products, sales, customers, auth, etc.
- `src/components` — UI components (table, cashier modals, navbar)
- `src/lib` — enums, interfaces, constants
- `src/utils/db` — MySQL pool (using `mysql2`) and database helpers
- `src/auth.ts` — NextAuth credential provider and session callbacks
- `src/middleware.ts` — route guarding & roles
- `types` — custom typings (NextAuth types, etc.)

---

### Auth & Roles 🔐
- Uses NextAuth with a credentials provider; `pos_user` table is used for login.
- Passwords are hashed with `bcrypt`; JWT session strategy used.
- `src/middleware.ts` handles route-level redirects based on `roleEnum` (ADMIN, CASHIER, SELF_CASHIER).

---

### APIs & DB Notes 🧭
- APIs are in `src/app/api/*` and query MySQL directly using `mysql2/promise`.
- For local testing, ensure the DB schema exists and `pos_user` has at least one user.
- There's no explicit migration folder — seed/import SQL externally or by hand.

---

### Quick development tips 🔧
- Set `NEXTAUTH_URL` and `AUTH_SECRET` in `.env` for login and JWT to work.
- If you use `HOSTNAME` or a different port (e.g., 3001) set `PORT` before running `dev`.
- Use Postman or browser API calls to validate endpoints under `src/app/api`.

---

### Contributing & Workflow 🛠️
- Branch from `develop` for feature work.
- Follow existing code style (TypeScript + ESLint) and keep PRs small and focused.

---

If you'd like, I can also generate a `README.dev.md` with detailed local dev instructions (sample `.env.example`, starter SQL for `pos_user`, and a minimal Postman collection).

---

Author: Project Developers | Quick notes: Keep README compact for on-boarding.
## Allstar POS — Short README for Developers ✅

Short and focused developer guide to get started with the Allstar POS project.

---

### What it is 💡
- A POS (Point-of-Sale) web application built with **Next.js 14**, **React 18**, and **TypeScript**.
- Server-side APIs implemented in `src/app/api/*` using Next.js route handlers.
- Authentication uses **NextAuth** with a credentials provider (MySQL user table) and role-based middleware.

---

### Requirements & Quick Setup ⚙️
- Node.js (recommend v18+)
- MySQL server (or compatible) and a database for local development
- Git for source control

1) Install dependencies:
```powershell
npm install
```

2) Copy `.env` and update values (DB credentials, AUTH_SECRET, NEXTAUTH_URL, etc.)
```powershell
cp .env.example .env  # or copy manually
```

3) Start development server:
```powershell
# If using default Next port 3000:
npm run dev

# If you prefer 3001 like the existing .env values:
$env:PORT=3001; npm run dev
```

---

### Important ENV variables 🔒
- DB_HOST, DB_USER, DB_PASS, DB_DATABASE — MySQL connection used by `src/utils/db/db.ts`
- AUTH_SECRET — NextAuth secret
- NEXTAUTH_URL — Must match the app URL (ex. http://localhost:3001)
- NEXT_PUBLIC_APP_TIMEZONE — App timezone (e.g. Asia/Bangkok)

---

### Key Scripts 📜
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — run ESLint

---

### Project structure (high level) 🗂️
- `src/app` — Next.js app routes & UI
  - `(dashboard)` — admin / cashier UI
  - `login` — auth pages
  - `self-cashier` — kiosk mode pages
  - `api/*` — server API endpoints: products, sales, customers, auth, etc.
- `src/components` — UI components (table, cashier modals, navbar)
- `src/lib` — enums, interfaces, constants
- `src/utils/db` — MySQL pool (using `mysql2`) and database helpers
- `src/auth.ts` — NextAuth credential provider and session callbacks
- `src/middleware.ts` — route guarding & roles
- `types` — custom typings (NextAuth types, etc.)

---

### Auth & Roles 🔐
- Uses NextAuth with a credentials provider; `pos_user` table is used for login.
- Passwords are hashed with bcrypt; JWT session strategy used.
- `src/middleware.ts` handles route-level redirects based on `roleEnum`:
  - ADMIN | CASHIER | SELF_CASHIER

---

### APIs & DB Notes 🧭
- APIs are in `src/app/api/*` and query MySQL directly using `mysql2/promise`.
- For local testing, ensure the DB schema exists and `pos_user` has at least one user.
- There's no explicit migration folder — seed/import SQL externally or by hand.

---

### Quick development tips 🔧
- Set `NEXTAUTH_URL` and `AUTH_SECRET` in `.env` for login flow to work.
- If you use `HOSTNAME` or a different port (e.g., 3001) set `PORT` before running `dev`.
- Use Postman or browser API calls to validate endpoints under `src/app/api`.

---

### Contributing & Workflow 🛠️
- Branch from `develop` for feature work.
- Follow existing code style (TypeScript + ESLint) and keep PRs small and focused.

---

If you want, I can generate a `README.dev.md` with **setup steps for a local dev environment** including a sample `.env.example`, DB schema sample, and useful Postman colelctions. 💬

---

Author: Project Developers | Quick notes: Keep README compact for on-boarding.

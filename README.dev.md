## Allstar POS — Developer Guide (Detailed)

This file contains a concise developer-oriented guide for local setup and quick reference.

---

### Summary
- POS app built with Next.js 14, TypeScript, MySQL, and NextAuth (credential provider).

---

### Setup
1. Install dependencies:
```powershell
npm install
```
2. Configure environment (copy `.env` and set DB credentials, `AUTH_SECRET`, `NEXTAUTH_URL`):
```powershell
copy .env .env.local
```
3. Start development server:
```powershell
# Run on default port 3000:
npm run dev
# Or use 3001 to match existing .env values
$env:PORT=3001; npm run dev
```

---

### Environment variables (important)
- `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_DATABASE` — DB config
- `AUTH_SECRET`, `NEXTAUTH_URL` — NextAuth
- `NEXT_PUBLIC_APP_TIMEZONE` — timezone

---

### Project architecture quick pointers
- `src/app` — Next.js routes & pages
- `src/app/api/*` — API endpoints (get/add/edit for products, customers, sales)
- `src/auth.ts`, `src/auth.config.ts` — NextAuth config and authorized callbacks
- `src/middleware.ts` — route guarding based on role
- `src/utils/db/db.ts` — MySQL connection pool using `mysql2/promise`

---

### Notes for Devs
- APIs access the database directly (no ORM). Use sanitized inputs or prepared statements.
- Ensure the DB has all required tables and that `pos_user` contains at least one user with a bcrypt-hashed password for testing.
- Use a local DB copy for development to avoid data loss.

---

Want a one-click dev setup script, a `.env.example`, and a minimal SQL seed for `pos_user`? Say the word and I’ll add it.

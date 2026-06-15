@AGENTS.md

# topsy-front

Site public + compte client + admin de **Topsy Paris** (traiteur africain/camerounais, La Courneuve).
Next.js 16 + React 19 + Tailwind v4 + next-intl (FR primaire / EN). Déployé sur **Vercel**.

API associée : **topsy-api** (NestJS, Heroku) — base URL via `NEXT_PUBLIC_API_URL`
(défaut `http://localhost:3001/api/v1`). Endpoints consommés : `GET /menu`, `GET /menu/:slug`,
`POST /orders`, `GET /orders/me`, `GET /orders/:id`, `POST /payments/checkout/:orderId`,
`POST /contact`, `GET /reviews?published=true`. **Prix en centimes (Int), devise EUR.**

## Conventions
- Appels API via `src/lib/api/client.ts` (`apiFetch`, Bearer auto + refresh 401). Auth = `AuthContext`.
- Panier = Zustand `src/lib/cart/store.ts` (persist localStorage).
- Routes publiques sous `src/app/[locale]/(public)/` ; i18n dans `src/messages/{fr,en}.json`.
- Pages lisant l'API au runtime = `export const dynamic = 'force-dynamic'` (build sans API qui tourne).

## État
Fondation issue du scaffold Ziggla transformée (menu / panier / checkout SumUp / pages légales stub).
Dashboard client + admin = itérations à venir. Voir le plan de rebuild
(`~/.claude/plans/pour-ce-plan-topsy-agile-orbit.md`).

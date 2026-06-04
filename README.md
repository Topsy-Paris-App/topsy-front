# topsy-front

Site public + compte client + admin de **Topsy Paris** (traiteur africain/camerounais, La Courneuve).
Next.js 16 + React 19 + Tailwind v4 + next-intl (FR/EN).

Déployé sur **Vercel**. API associée : `topsy-api` (Heroku).

> Scaffold importé depuis le projet Ziggla. Les vues métier (menu, panier, checkout SumUp, dashboard,
> admin) sont en cours de réécriture. Voir le plan de rebuild.

## Démarrage local
```bash
yarn install
cp .env.example .env.local   # NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
yarn dev                     # http://localhost:3000
```

## Stack
Next.js 16 · React 19 · Tailwind v4 · next-intl (fr/en) · contexte d'auth custom · widget SumUp.

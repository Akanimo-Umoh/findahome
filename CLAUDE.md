# CLAUDE.md

FindAHome is the frontend of a Nigerian real-estate marketplace. Buyers find properties, pay an inspection fee, then buy. Agents list properties, schedule inspections and handovers, and get paid. Admins moderate listings and agents and control escrow. All money goes through escrow and is paid through Paystack. Amounts are in Naira (₦).

This repo is **frontend only**. The backend is a separate Express + Socket.IO API, reached through `VITE_API_BASE_URL`.

## Commands

Package manager: **pnpm**.

```bash
pnpm dev        # Vite dev server
pnpm build      # tsc -b && vite build (type errors fail the build)
pnpm lint       # eslint .
pnpm format     # prettier --write over src and root files
pnpm preview
```

- There is no test suite. To check a change, run `pnpm build` (for types) and `pnpm lint`.
- A Husky pre-commit hook runs `lint-staged`, which runs Prettier on staged files.

## Environment (`.env`)

- `VITE_API_BASE_URL`: the API base URL, which ends in `/api`.
- `VITE_GOOGLE_CLIENT_ID`: the client ID for Google OAuth (`@react-oauth/google`).

The socket connects to the origin of the API URL with `/api` removed, because Socket.IO reads a URL path as a namespace (see [src/services/socket.ts](src/services/socket.ts)).

## Stack

React 19, TypeScript (strict, with `noUnusedLocals` and `noUnusedParameters`), Vite 7, React Router 7 (`BrowserRouter` with JSX `<Routes>`), TanStack Query 5, axios, socket.io-client, Tailwind CSS v4 (configured in CSS through `@theme` in [src/index.css](src/index.css); there is no tailwind config file), shadcn/ui ("new-york" style, Radix primitives) in [src/components/ui/](src/components/ui/), react-hook-form with zod 4, sonner for toasts, framer-motion, and jspdf + html2canvas for receipts.

Deployed on Vercel as an SPA. [vercel.json](vercel.json) rewrites every path to `/index.html`.

## Code style

- Prettier settings: no semicolons, double quotes, `trailingComma: "es5"`, 80 columns, LF line endings. The Tailwind plugin sorts classes, including those inside `cn()` and `cva()`.
- Import alias: `@/` → `src/`. Prefer it over long relative paths.
- `verbatimModuleSyntax` is on, so type-only imports must use `import type` / `{ type X }`.
- Use `cn` from `@/lib/utils` (clsx + tailwind-merge). There is also a simpler `@/lib/cn`, used in one place; don't spread it.
- Code comments are plain-English explanations of _why_, often lowercase. Follow the same style.
- Commit messages use conventional commits with a scope, e.g. `feat(escrow): ...` or `feat(chats): ...`.
- Folders usually have an `index.ts` barrel that re-exports default components (`export { default as X } from "./X"`), and routes import from the barrel.

## Architecture

### Layers

```
pages/ & components/  →  hooks/ (React Query wrappers)  →  services/ (axios calls)  →  API
```

- **[src/services/](src/services/)**: one file per backend resource (`*.service.ts`). These are plain async functions on the shared `api` axios instance, and they unwrap the response envelope (`data.data`, `data.properties`, `data.disputes`, …; the shape differs per endpoint, so check the existing function). Response types usually live in the same file or in [src/types/](src/types/). Admin endpoints are in [src/services/admin/](src/services/admin/).
- **[src/services/api.ts](src/services/api.ts)**: adds `Authorization: Bearer <token>` (taken from `localStorage.token`) to every request. On a 401 from a non-`/auth/` URL it clears the stored auth and does a hard redirect to `/login`.
- **[src/hooks/](src/hooks/)**: `useX` hooks wrap `useQuery`/`useMutation`. The query client in [src/main.tsx](src/main.tsx) defaults to `staleTime` 5 min and `retry` 2. Detail pages that must stay fresh set `staleTime: 0, refetchOnMount: "always"`. A few hooks poll with `refetchInterval` (chat messages every 5s, agent listings and verification every 30s).
- **Errors**: use `requestError(err, fallback)` from [src/lib/requestError.ts](src/lib/requestError.ts) to turn an axios error into toast text. It reads the server's `message`.

### Auth & routing

- [src/context/AuthContext.tsx](src/context/AuthContext.tsx) keeps `user` and `token` in React state and mirrors them to `localStorage` (`token`, `user`). After changing the profile, call `updateUser` so both stay in step.
- There are three roles: `"user"` (buyer), `"agent"`, and `"admin"`. All routes are in [src/routes/AppRoutes.tsx](src/routes/AppRoutes.tsx), grouped by role:
  - `RoleBasedRoute allowedRoles=[…]`: requires login, a verified email, finished onboarding, and the right role. Otherwise it shows a toast and redirects after a short delay.
  - `BlockRoleRoute blockedRoles=[…]`: hides public pages from certain roles (agents can't see public pages; admins can't see `/`).
  - `PublicOnlyRoute`: login, signup and reset pages for logged-out users only.
  - `AgentOnboardingGate` (in `App.tsx`) wraps the whole app and forces agents and buyers who haven't onboarded (`user.isOnboarding === false`) into onboarding. The paths and the dashboard for each role are in [src/routes/onboarding.ts](src/routes/onboarding.ts).
- Layouts in [src/layouts/](src/layouts/): `MainLayout` (navbar + footer), `NormalLayout` (no footer), `AgentLayout` (agent sidebar), `AdminLayout`, `UserLayout`.
- URL prefixes: agent pages are under `/agent/*` and admin pages under `/admin/*`. Buyer pages have no prefix (`/dashboard`, `/transactions/:id`, `/saved-properties`, …). Shared pages are `/messages`, `/notifications`, and `/disputes`.

### Realtime: invalidate, don't render

[src/hooks/useRealtimeSync.ts](src/hooks/useRealtimeSync.ts) runs once from `App`. It connects the socket, emits `user_connected` on every (re)connect, and, for `notification` / `receive_message` events, **only invalidates React Query keys**. It never renders data from an event, because some events are broadcast to everyone. If you add a query that shows deal, listing or chat state, add its key to the right list (`DEAL_KEYS`, the listing invalidations, or `["chats"]` / `["messages", chatId]`) so it refreshes live.

### Core domain: the deal lifecycle

A deal between a buyer and an agent for one property is made of two separate backend records:

1. **Inspection**: the buyer pays an inspection fee (Paystack) → an admin approves the payment (`inspection_payment_review`) → the agent schedules → the buyer confirms or asks to reschedule → the inspection is completed.
2. **Purchase**: the buyer pays for the property (Paystack) → the agent schedules the handover → the buyer confirms → the handover is completed → escrow releases the funds.

Key files:

- [src/hooks/usePropertyDeal.ts](src/hooks/usePropertyDeal.ts): maps raw backend statuses to one `DealStage` per property (and, on the agent side, per buyer). The chat "mini actions" use this.
- [src/hooks/useInspectionStatus.ts](src/hooks/useInspectionStatus.ts): the buyer-side inspection stage for a property.
- [src/components/transaction-details/transactionConfig.ts](src/components/transaction-details/transactionConfig.ts): timeline steps and banner text for each status.
- [src/components/shared/chatNextStep.ts](src/components/shared/chatNextStep.ts): what each side should do next in a chat.
- Transaction detail pages pick inspection or purchase from the `?type=inspection|purchase` query param (see `useTransactionDetails`).
- Paystack returns to callback routes: `/inspection-payment/callback`, `/property-payment/callback`, and `/agent/fund-wallet/callback`. A "draft" in local state tells a fresh return apart from a revisit (see `useInspectionDraft`, `InspectionPaymentCallback`).
- The escrow fee rules are in [src/lib/escrowFee.ts](src/lib/escrowFee.ts) and include open TODOs about rates.

When you add a backend status, update **all** of these mappings: `usePropertyDeal`, `useInspectionStatus`, `transactionConfig`, `chatNextStep`, the agent and buyer activity mappings ([src/components/recent/activityMapping.ts](src/components/recent/activityMapping.ts), [src/pages/agent/my-transaction/transactionHelpers.ts](src/pages/agent/my-transaction/transactionHelpers.ts)), the admin escrow ([src/pages/admin/escrow/](src/pages/admin/escrow/), [src/types/adminEscrow.ts](src/types/adminEscrow.ts)), and the `DEAL_EVENTS` list in `useRealtimeSync`.

### Chats

- `/messages`, `/messages/new` and `/messages/:chatId` all render [src/components/shared/Chats.tsx](src/components/shared/Chats.tsx).
- A buyer who starts a chat from a property first sees a `DraftChat`. The real chat is created only when the first message is sent (`useCreateOrGetChat`), and the result is then written into the `["chats"]` / `["messages", id]` caches.

### Admin

- Admin pages are in [src/pages/admin/](src/pages/admin/). Each feature folder keeps its own page, `components/`, hooks (`useEscrow`, `useEscrowFilters`, …) and pure helpers (`buildEscrowRows.ts`, `format.ts`).
- Several admin endpoints don't paginate or return stats, so the dashboard works out its numbers on the client ([src/services/admin/dashboard.service.ts](src/services/admin/dashboard.service.ts), `pages/admin/dashboard/buildOverview.ts`).
- Resolving a dispute does not touch escrow. Money is released or refunded separately, from the escrow transactions page (`/admin/transactions`).

## Other folders

- [src/lib/](src/lib/): pure helpers (formatting, receipt and PDF generation, image compression, agent verification status, dispute labels).
- [src/validation/auth/rules.ts](src/validation/auth/rules.ts): zod schemas for the auth forms, used through `zodResolver`.
- [src/data/](src/data/): static data (Nigerian banks, mock activities). States are in `src/types/nigerianStates.ts`.
- [src/a/](src/a/) and [src/miscellaneous/](src/miscellaneous/): `Phase*.tsx` UI mockups and success overlays. `src/a` is mounted at `/agent/mis` as a scratch preview page. Don't build real features on these.
- [src/assets/](src/assets/): SVG and PNG icons imported as modules. Many UI icons are image files, not lucide icons.
- Several routes and imports in `AppRoutes.tsx` are commented out (the old wallet and transaction pages). Leave them unless you're cleaning up deliberately.

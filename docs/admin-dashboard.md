# Admin Dashboard: Backend Follow-ups

## Still Blocking

4. Public property listing and admin moderation listing. `GET /api/property` currently returns every status publicly, while the dashboard and Listings page need all statuses. Please make the public endpoint return approved listings only and add a protected admin list endpoint that returns pending, approved, and rejected listings. Keep the admin list response shape consistent with `{ success, properties }`.

5. Public property detail and view notifications. `GET /api/property/:id` is mounted without `protect`, but `getProperty` reads `req.user._id` and `req.user.role`. Please support anonymous detail requests safely (optional auth is appropriate), and only create a view notification for a viewer who is neither the property owner nor an admin.

6. Last-active tracking. `lastActive` and `trackActivity` exist, but the middleware is only attached to selected routes. Please update `lastActive` on authenticated user activity consistently, preferably through shared auth middleware or all relevant protected routes, so the dashboard's active-this-week count is reliable.

## Already Available And Connected

- Agent verification, user flag/suspend/ban, property flag/status, ad approval and dates, purchase/inspection platform fees, and account last-active fields are available to the dashboard. The frontend now derives these dashboard figures from the admin list endpoints.
- `changeTransactionStatus` no longer has the stray `s` typo.
- Escrow records use `on_hold`, `released`, or `refunded`; verified purchase/inspection payments create escrow with `on_hold`.

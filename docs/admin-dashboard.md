# Admin Dashboard: Backend Handoff

## [SEND TO BACKEND DEV] Follow-ups

4. Public and admin property listing separation. Please make public `GET /api/property` return only `approved` listings. Add a protected admin endpoint that returns `pending`, `approved`, and `rejected` listings for moderation; do not expose moderation statuses through the public list endpoint.

5. Public property detail. `GET /api/property/:id` is public, so its controller must work when `req.user` is absent. Only create a “Property Viewed” notification when the viewer is neither the property's owner nor an admin.

6. Last-active tracking. Please ensure `lastActive` is updated consistently for authenticated user activity, not only selected routes, so the dashboard's active-this-week figure is reliable.

7. Block public admin registration. Public `POST /api/auth/register` may accept `role: "user"` or `role: "agent"`, but must reject or safely downgrade `role: "admin"`. Admin accounts are created through trusted backend-side provisioning, not public signup.

## Confirmed Decisions And Completed Items

- Admin accounts have equal authority; there are no admin tiers or superior admin role to implement.
- Dashboard metrics for agent verification, user flag/suspend/ban, flagged listings, ad approval/expiry, and purchase/inspection platform fees now consume the available backend fields and endpoints.
- `changeTransactionStatus` no longer has the stray `s` typo.
- Purchase/inspection payment verification creates escrow with `on_hold`, matching the escrow schema.

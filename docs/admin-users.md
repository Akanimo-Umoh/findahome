# Admin Users: Backend Handoff

## [SEND TO BACKEND DEV] Follow-ups

17. Last-active tracking. Please update `lastActive` consistently for authenticated user activity, not just selected endpoints, so the admin dashboard and buyer profiles show a meaningful last-active time.

18. Block public admin registration. Public `POST /api/auth/register` may accept `role: "user"` or `role: "agent"`, but must reject or safely downgrade `role: "admin"`. Admin accounts are created through trusted backend-side provisioning.

## Implemented In Frontend / Confirmed In Backend

- `PATCH /api/user/users/:id/moderate` accepts `{ action: "flag" | "suspend" | "ban", value: boolean }`; buyer list and profile controls call it.
- `GET /api/user/users` returns account moderation flags and `lastActive` for admin views.
- Multiple admins are supported at one equal authority level; no admin hierarchy is requested.

# Admin Users: Backend Follow-ups

## Still Blocking

17. Last-active tracking. The user model has `lastActive`, and `trackActivity` updates it, but the middleware is attached to selected routes rather than consistently to authenticated activity. Please ensure meaningful authenticated user requests update the timestamp so the dashboard's active-this-week metric is accurate.

## Already Available And Connected

- `PATCH /api/user/users/:id/moderate` accepts `{ action: "flag" | "suspend" | "ban", value: boolean }`; the buyer table and profile now expose these controls.
- `GET /api/user/users` returns account moderation flags and last-active data for admin views.

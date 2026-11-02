# Admin Ads: Backend Follow-ups

No backend follow-up is currently blocking this page.

- Ads are created as `pending`, reviewed through `PATCH /api/ads/:id/review` with `{ status: "approved" | "rejected" }`, and become active after payment.
- Ad start and end dates are stored and returned. The frontend now displays them and counts pending reviews and ads ending within seven days.
- Pause/resume remains on `PATCH /api/ads/:id` with `active`/`paused` statuses.

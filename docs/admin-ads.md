# Admin Ads: Backend Handoff

## [SEND TO BACKEND DEV]

No additional backend work is currently blocking the Ads page.

## Implemented In Frontend / Confirmed In Backend

- Ads are created as `pending` and reviewed through `PATCH /api/ads/:id/review` with `{ status: "approved" | "rejected" }`; payment activates approved ads.
- Ad start/end dates are stored and returned. The frontend displays them and counts pending reviews and active ads ending within seven days.
- Pause/resume remains on `PATCH /api/ads/:id` with `active`/`paused` statuses.

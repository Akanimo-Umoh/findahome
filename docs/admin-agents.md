# Admin Agents: Backend Handoff

## [SEND TO BACKEND DEV] Follow-up

15. Separate email verification from agent approval. `updateAgentVerification` currently sets `isVerified = status === "approved"`, but `isVerified` is also the email-code verification field. Please stop changing `isVerified` during admin review and use `verificationStatus` only for agent approval.

## Implemented In Frontend / Confirmed In Backend

- The frontend sends `PATCH /api/user/agents/:id/verification` with `{ status: "approved" | "rejected" }` and reads the returned `agent`.
- `riskLevel` is included in `GET /api/user/agents/:id`.
- Public agent listings now display approved properties only.

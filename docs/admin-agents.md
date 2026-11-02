# Admin Agents: Backend Follow-ups

No backend follow-up is currently blocking this page.

## Backend Correction Needed

15. Keep email verification separate from agent approval. `updateAgentVerification` currently sets `isVerified = status === "approved"`, but `isVerified` also represents email-code verification. Please stop changing that field during admin review and use only `verificationStatus` for agent approval.

- Verification uses `PATCH /api/user/agents/:id/verification` with `{ status: "approved" | "rejected" }`. The frontend now sends the backend's `approved` value and reads the returned `agent`.
- Risk level is included in `GET /api/user/agents/:id`.
- The frontend keeps email verification (`isVerified`) separate from admin verification (`verificationStatus`).

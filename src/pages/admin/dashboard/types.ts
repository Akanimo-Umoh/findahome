// What the dashboard renders. Every metric is `number | null`:
//   number → computed from real data
//   null   → no data source yet (or the source failed to load); the UI shows "—"
// This keeps the screen honest while the backend catches up, and means each null flips to a real number by changing buildOverview.ts alone.

export type Metric = number | null

export type MoneyStat = { amount: Metric; count: Metric }

export type ActivityTone = "neutral" | "info" | "success" | "warning" | "danger"

export type ActivityKind =
  | "agent_joined"
  | "dispute_opened"
  | "dispute_resolved"
  | "listing_pending"
  | "payout_sent"
  | "transaction_failed"

export type ActivityEvent = {
  id: string
  kind: ActivityKind
  title: string
  detail: string
  at: string
  tone: ActivityTone
}

export type DashboardOverview = {
  users: {
    total: Metric
    newThisMonth: Metric
    agents: { total: Metric; pendingVerification: Metric; verified: Metric }
    houseHunters: {
      total: Metric
      newThisWeek: Metric
      activeThisWeek: Metric
    }
    risk: { flagged: Metric; suspended: Metric; banned: Metric }
  }
  listings: {
    active: Metric
    newThisWeek: Metric
    pendingApproval: Metric
    flagged: Metric
    rejectedThisWeek: Metric
  }
  escrow: {
    held: MoneyStat
    released: MoneyStat
    disputed: MoneyStat
  }
  transactions: {
    today: Metric
    failedThisWeek: Metric
    pendingPayouts: MoneyStat
  }
  disputes: {
    newToday: Metric
    open: Metric
    overdue: Metric
    resolvedThisWeek: Metric
  }
  ads: {
    active: Metric
    pendingApproval: Metric
    expiringSoon: Metric
    paidBudgetTotal: Metric
  }
  revenue: { platform: Metric }
  attention: {
    agentApplications: Metric
    pendingActions: Metric
    urgent: Metric
  }
  activity: ActivityEvent[]
}

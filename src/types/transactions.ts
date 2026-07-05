export type TransactionStatus =
  | "inspection_requested" // Phase 1 — user requested, agent hasn't scheduled yet
  | "inspection_scheduled" // Phase 2 — agent scheduled, user needs to confirm
  | "inspection_confirmed" // Phase 3 — user confirmed, visit upcoming
  | "inspection_completed" // Phase 4 — visit done, user can secure property
  | "property_payment_pending" // Phase 5 — user initiated property payment
  | "handover_requested" // Phase 6 — user requested handover
  | "handover_scheduled" // Phase 7 — agent scheduled, user needs to confirm
  | "handover_confirmed" // Phase 8 — user confirmed, handover upcoming
  | "handover_completed" // Phase 9 — handover done, funds releasing
  | "funds_released" // Phase 10 — funds released to agent, receipt available

export type ActivityStatus = TransactionStatus

export type Activity = {
  id: string
  type: string
  status: ActivityStatus
  statusLabel: string
  date: string
  agentName: string
  agentVerified: boolean
  propertyName: string
  propertyImg: string
  detailsRoute: string
}

export type TimelineStep = {
  label: string
  completedAt?: string
}

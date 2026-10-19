import { CATEGORY_LABEL } from "@/lib/disputeLabels"
import { formatNairaCompact } from "@/lib/adminFormat"
import type { DisputeCategory } from "@/services/dispute.service"
import type {
  AdminActivityRecord,
  AdminAdRecord,
  AdminDisputeEscrowRef,
  AdminDisputeRecord,
  AdminEscrowRecord,
  AdminListingRecord,
  AdminTransactionRecord,
  AdminUserRecord,
} from "@/types/admin"
import type {
  ActivityEvent,
  DashboardOverview,
  Metric,
  MoneyStat,
} from "./types"

// A source is `null` when its request failed — every metric derived from it
// then becomes null (shown as "—") instead of a misleading 0.
export type RawSources = {
  users: AdminUserRecord[] | null
  listings: AdminListingRecord[] | null
  disputes: AdminDisputeRecord[] | null
  ads: AdminAdRecord[] | null
  activities: AdminActivityRecord[] | null
}

const HOUR = 3_600_000
const DAY = 24 * HOUR
const OPEN_DISPUTE_STATUSES = ["opened", "under_review", "escalated"]
const OVERDUE_AFTER = 48 * HOUR
const ACTIVITY_LIMIT = 8

const NO_MONEY: MoneyStat = { amount: null, count: null }

const count = <T>(list: T[] | null, predicate: (item: T) => boolean): Metric =>
  list ? list.filter(predicate).length : null

const money = <T extends { amount: number }>(
  list: T[] | null,
  predicate: (item: T) => boolean
): MoneyStat => {
  if (!list) return NO_MONEY
  const matched = list.filter(predicate)
  return {
    amount: matched.reduce((sum, item) => sum + (item.amount || 0), 0),
    count: matched.length,
  }
}

const sum = (...parts: Metric[]): Metric => {
  const present = parts.filter((p): p is number => p !== null)
  return present.length ? present.reduce((a, b) => a + b, 0) : null
}

const personName = (ref: AdminTransactionRecord["to"]): string =>
  ref && typeof ref === "object" && ref.name ? ref.name : "an account"

export function buildOverview(
  src: RawSources,
  now: number = Date.now()
): DashboardOverview {
  const startOfToday = new Date(now).setHours(0, 0, 0, 0)

  const since = (iso: string | undefined, windowMs: number) =>
    !!iso && now - new Date(iso).getTime() <= windowMs
  const olderThan = (iso: string | undefined, windowMs: number) =>
    !!iso && now - new Date(iso).getTime() > windowMs
  const onOrAfter = (iso: string | undefined, ts: number) =>
    !!iso && new Date(iso).getTime() >= ts

  // ---- split the merged activities feed back into its two record types ----
  const transactions = src.activities
    ? src.activities.filter(
        (a): a is AdminTransactionRecord => a.recordType === "transaction"
      )
    : null
  const escrows = src.activities
    ? src.activities.filter(
        (a): a is AdminEscrowRecord => a.recordType === "escrow"
      )
    : null

  // ---- users ----
  const agents = src.users ? src.users.filter((u) => u.role === "agent") : null
  const houseHunters = src.users
    ? src.users.filter((u) => u.role === "user")
    : null

  // ---- listings ----
  const approved = (l: AdminListingRecord) => l.status === "approved"

  // ---- disputes ----
  const isOpen = (d: AdminDisputeRecord) =>
    OPEN_DISPUTE_STATUSES.includes(d.status)
  const openedAt = (d: AdminDisputeRecord) => d.openedAt ?? d.createdAt

  const disputesOpen = count(src.disputes, isOpen)
  const disputesOverdue = count(
    src.disputes,
    (d) => isOpen(d) && olderThan(openedAt(d), OVERDUE_AFTER)
  )

  // disputed escrow: money still held on a purchase/inspection with an open dispute
  const held = (link: AdminDisputeEscrowRef | string | null | undefined) =>
    link && typeof link === "object" && link.feePaid && !link.feeReleased
      ? link
      : null
  const disputedHolds = src.disputes
    ? [
        ...new Map(
          src.disputes
            .filter(isOpen)
            .flatMap((d) => [held(d.purchase), held(d.inspection)])
            .filter((l): l is AdminDisputeEscrowRef => l !== null)
            .map((l) => [l._id, l] as const)
        ).values(),
      ]
    : null

  // ---- money queues ----
  const pendingPayouts = money(
    transactions,
    (t) => t.type === "withdrawal" && t.status === "pending"
  )
  const listingsPending = count(src.listings, (l) => l.status === "pending")

  return {
    users: {
      total: src.users ? src.users.length : null,
      newThisMonth: count(src.users, (u) => since(u.createdAt, 30 * DAY)),
      agents: {
        total: agents ? agents.length : null,
        // No KYC approval state exists on User yet (isVerified is email-only)
        pendingVerification: null,
        verified: null,
      },
      houseHunters: {
        total: houseHunters ? houseHunters.length : null,
        newThisWeek: count(houseHunters, (u) => since(u.createdAt, 7 * DAY)),
        // No last-active timestamp on User yet
        activeThisWeek: null,
      },
      // No flag / suspend / ban fields or endpoints yet
      risk: { flagged: null, suspended: null, banned: null },
    },

    listings: {
      active: count(src.listings, approved),
      newThisWeek: count(
        src.listings,
        (l) => approved(l) && since(l.createdAt, 7 * DAY)
      ),
      pendingApproval: listingsPending,
      flagged: null, // no flag field yet
      rejectedThisWeek: count(
        src.listings,
        (l) => l.status === "rejected" && since(l.updatedAt, 7 * DAY)
      ),
    },

    escrow: {
      // anything not yet released is still held (pending, approved, on_hold)
      held: money(escrows, (e) => e.status !== "released"),
      released: money(escrows, (e) => e.status === "released"),
      disputed: disputedHolds
        ? {
            amount: disputedHolds.reduce(
              (t, l) => t + (l.price ?? l.fee ?? 0),
              0
            ),
            count: disputedHolds.length,
          }
        : NO_MONEY,
    },

    transactions: {
      today: count(transactions, (t) => onOrAfter(t.createdAt, startOfToday)),
      failedThisWeek: count(
        transactions,
        (t) => t.status === "failed" && since(t.createdAt, 7 * DAY)
      ),
      pendingPayouts,
    },

    disputes: {
      newToday: count(src.disputes, (d) => since(openedAt(d), DAY)),
      open: disputesOpen,
      overdue: disputesOverdue,
      resolvedThisWeek: count(
        src.disputes,
        (d) =>
          (d.status === "resolved" || d.status === "closed") &&
          since(d.resolvedAt ?? d.closedAt, 7 * DAY)
      ),
    },

    ads: {
      active: count(src.ads, (a) => a.status === "active"),
      // Paying an ad sets it live immediately, so there is no approval queue
      pendingApproval: null,
      expiringSoon: null, // ads have no start / end date yet
      paidBudgetTotal: src.ads
        ? src.ads
            .filter((a) => a.isPaid)
            .reduce((total, a) => total + (a.adBudget || 0), 0)
        : null,
    },

    revenue: { platform: null }, // no platform-fee ledger yet

    attention: {
      agentApplications: null, // see users.agents.pendingVerification
      pendingActions: sum(disputesOpen, listingsPending, pendingPayouts.count),
      urgent: disputesOverdue,
    },

    activity: buildActivity(src, now),
  }
}

// There is no audit log, so the feed is stitched together from what each record already says about itself. Admin names ("approved by …") need a log.
function buildActivity(src: RawSources, now: number): ActivityEvent[] {
  const events: ActivityEvent[] = []
  const valid = (iso?: string): iso is string =>
    !!iso && new Date(iso).getTime() <= now

  src.users
    ?.filter((u) => u.role === "agent")
    .forEach((u) => {
      if (!valid(u.createdAt)) return
      events.push({
        id: `agent-${u._id}`,
        kind: "agent_joined",
        title: "New agent joined",
        detail: u.name || "Unnamed agent",
        at: u.createdAt,
        tone: "info",
      })
    })

  src.disputes?.forEach((d) => {
    const label =
      CATEGORY_LABEL[d.category as DisputeCategory] ?? CATEGORY_LABEL.other
    const opened = d.openedAt ?? d.createdAt
    if (valid(opened)) {
      events.push({
        id: `dispute-open-${d._id}`,
        kind: "dispute_opened",
        title: `Dispute ${d.referenceId} opened`,
        detail: label,
        at: opened,
        tone: "warning",
      })
    }
    const resolved = d.resolvedAt ?? d.closedAt
    if ((d.status === "resolved" || d.status === "closed") && valid(resolved)) {
      events.push({
        id: `dispute-done-${d._id}`,
        kind: "dispute_resolved",
        title: `Dispute ${d.referenceId} resolved`,
        detail: label,
        at: resolved,
        tone: "success",
      })
    }
  })

  src.listings
    ?.filter((l) => l.status === "pending")
    .forEach((l) => {
      if (!valid(l.createdAt)) return
      events.push({
        id: `listing-${l._id}`,
        kind: "listing_pending",
        title: "Listing awaiting review",
        detail: l.title || "Untitled listing",
        at: l.createdAt,
        tone: "info",
      })
    })

  src.activities?.forEach((a) => {
    if (a.recordType !== "transaction") return
    if (a.status === "failed" && valid(a.createdAt)) {
      events.push({
        id: `tx-failed-${a._id}`,
        kind: "transaction_failed",
        title: "Transaction failed",
        detail: formatNairaCompact(a.amount),
        at: a.createdAt,
        tone: "danger",
      })
    }
    const isPayout = a.type === "agent_payment" || a.type === "withdrawal"
    const when = a.approvedAt ?? a.createdAt
    if (isPayout && a.status === "approved" && valid(when)) {
      const recipient = personName(a.type === "withdrawal" ? a.from : a.to)
      events.push({
        id: `tx-payout-${a._id}`,
        kind: "payout_sent",
        title: `Payout of ${formatNairaCompact(a.amount)} sent`,
        detail: `To ${recipient}`,
        at: when,
        tone: "success",
      })
    }
  })

  return events
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
    .slice(0, ACTIVITY_LIMIT)
}

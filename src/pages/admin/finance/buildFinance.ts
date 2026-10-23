import type { EscrowRow } from "@/pages/admin/escrow/types"
import type { AdminBank, FinanceParty, FinanceTx } from "@/types/adminFinance"
import type { AdminUser } from "@/types/adminUser"
import { KIND_LABEL, shortCode } from "./financeMeta"
import type {
  LedgerKind,
  LedgerParty,
  LedgerRow,
  LedgerStatus,
  PartyRole,
  PayoutRow,
  PayoutStatus,
} from "./types"

const TX_STATUS: Record<FinanceTx["status"], LedgerStatus> = {
  approved: "completed",
  pending: "pending",
  failed: "failed",
  declined: "declined",
}

const roleMap = (users: AdminUser[]) =>
  new Map<string, PartyRole>(users.map((u) => [u._id, u.role]))

function party(
  p: FinanceParty | null | undefined,
  roles: Map<string, PartyRole>
): LedgerParty {
  return {
    id: p?._id ?? null,
    name: p?.name ?? "Unknown user",
    email: p?.email ?? "",
    role: p ? (roles.get(p._id) ?? null) : null,
  }
}

const profileHref = (p: LedgerParty) => {
  if (!p.id) return null
  if (p.role === "agent") return `/admin/agents/${p.id}`
  if (p.role === "user") return `/admin/users/${p.id}`
  return null
}

// One chronological list of everything that moved money: wallet funding, agent payments, payouts (withdrawals) and escrow payments, releases and refunds.
export function buildLedger(input: {
  transactions: FinanceTx[]
  escrows: EscrowRow[]
  users: AdminUser[]
}): LedgerRow[] {
  const roles = roleMap(input.users)
  const rows: LedgerRow[] = []

  for (const t of input.transactions) {
    // the person the money belongs to: whoever funded, got paid, or withdrew
    const who = t.type === "agent_payment" ? t.to : t.from
    const p = party(who, roles)
    const kind: LedgerKind = t.type === "withdrawal" ? "payout" : t.type
    rows.push({
      id: t._id,
      code: shortCode("TXN", t._id),
      reference: t.reference,
      kind,
      title: KIND_LABEL[kind],
      party: p,
      amount: t.amount,
      status: TX_STATUS[t.status] ?? "pending",
      date: t.createdAt,
      href:
        kind === "payout" ? `/admin/payouts?payout=${t._id}` : profileHref(p),
    })
  }

  for (const e of input.escrows) {
    const kind: LedgerKind =
      e.status === "refunded"
        ? "refund"
        : e.status === "released"
          ? "escrow_release"
          : "escrow_payment"
    // a release goes to the agent; a payment or refund belongs to the buyer
    const who = kind === "escrow_release" ? e.agent : e.buyer
    rows.push({
      id: e.id,
      code: e.code,
      reference: e.reference,
      kind,
      title: e.propertyTitle,
      party: {
        id: who.id,
        name: who.name,
        email: who.email,
        role: who.id ? (roles.get(who.id) ?? null) : null,
      },
      amount: e.amount,
      // escrow states already use the same names as the ledger statuses
      status: e.status,
      date: e.createdAt,
      href: `/admin/transactions/${e.id}`,
    })
  }

  return rows.sort((a, b) => b.date.localeCompare(a.date))
}

const PAYOUT_STATUS: Record<FinanceTx["status"], PayoutStatus> = {
  approved: "completed",
  pending: "pending",
  failed: "failed",
  declined: "declined",
}

const bankOwner = (b: AdminBank) =>
  typeof b.user === "string" ? b.user : b.user?._id

// Withdrawals only, with the agent's saved bank account (default one first).
export function buildPayouts(input: {
  transactions: FinanceTx[]
  users: AdminUser[]
  banks?: AdminBank[]
}): PayoutRow[] {
  const roles = roleMap(input.users)
  const banksByUser = new Map<string, AdminBank[]>()
  for (const b of input.banks ?? []) {
    const id = bankOwner(b)
    if (!id) continue
    banksByUser.set(id, [...(banksByUser.get(id) ?? []), b])
  }

  return input.transactions
    .filter((t) => t.type === "withdrawal")
    .map((t) => {
      const agent = party(t.from, roles)
      const banks = agent.id ? (banksByUser.get(agent.id) ?? []) : []
      return {
        id: t._id,
        code: shortCode("PAY", t._id),
        agent,
        amount: t.amount,
        status: PAYOUT_STATUS[t.status] ?? "pending",
        rawStatus: t.status,
        date: t.createdAt,
        bank: banks.find((b) => b.isDefault) ?? banks[0] ?? null,
        bankCount: banks.length,
      }
    })
    .sort((a, b) => b.date.localeCompare(a.date))
}

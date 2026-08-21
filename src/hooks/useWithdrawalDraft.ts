import { useState } from "react"
import type { WithdrawalDraft } from "@/types/wallet"

const STORAGE_KEY = "withdrawal-draft"

const emptyDraft: WithdrawalDraft = {
  amount: 0,
  accountId: "",
}

function readDraft(): WithdrawalDraft {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? { ...emptyDraft, ...JSON.parse(raw) } : emptyDraft
  } catch {
    return emptyDraft
  }
}

export function useWithdrawalDraft() {
  const [draft, setDraftState] = useState<WithdrawalDraft>(readDraft)

  const updateDraft = (fields: Partial<WithdrawalDraft>) => {
    setDraftState((prev) => {
      const next = { ...prev, ...fields }
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  const clearDraft = () => {
    sessionStorage.removeItem(STORAGE_KEY)
    setDraftState(emptyDraft)
  }

  const isValid = draft.amount > 0 && !!draft.accountId

  return { draft, updateDraft, clearDraft, isValid }
}

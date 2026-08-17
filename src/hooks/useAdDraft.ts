import { useState } from "react"
import type { AdDraft } from "@/types/ad"

const STORAGE_KEY = "ad-draft"

const emptyDraft: AdDraft = {
  propertyId: "",
  propertyTitle: "",
  propertyImage: null,
  propertyPrice: 0,
  objective: null,
  dailyBudget: 3000,
  duration: 5,
}

function readDraft(): AdDraft {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? { ...emptyDraft, ...JSON.parse(raw) } : emptyDraft
  } catch {
    return emptyDraft
  }
}

export function useAdDraft() {
  const [draft, setDraftState] = useState<AdDraft>(readDraft)

  const updateDraft = (fields: Partial<AdDraft>) => {
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

  const hasPropertyAndObjective = !!draft.propertyId && !!draft.objective

  return { draft, updateDraft, clearDraft, hasPropertyAndObjective }
}

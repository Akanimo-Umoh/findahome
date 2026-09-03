import { useCallback } from "react"

const STORAGE_KEY = "pending-inspection-payment"

type InspectionDraft = {
  inspectionId: string
  reference: string
  propertyId: string
}

export function useInspectionDraft() {
  const saveDraft = useCallback((draft: InspectionDraft) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft))
  }, [])

  const getDraft = useCallback((): InspectionDraft | null => {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    try {
      return JSON.parse(raw) as InspectionDraft
    } catch {
      return null
    }
  }, [])

  const clearDraft = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY)
  }, [])

  return { saveDraft, getDraft, clearDraft }
}

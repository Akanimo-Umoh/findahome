import api from "@/services/api"

export type Purchase = {
  _id: string
  reference?: string
  property:
    | string
    | {
        _id: string
        title: string
        price: number
        address: string
        image?: string
        images?: string[]
      }
  buyer:
    | string
    | { _id: string; name?: string; email: string; phoneNumber?: string | null }
  owner:
    | string
    | { _id: string; name?: string; email: string; phoneNumber?: string | null }
  inspection: string
  price: number
  feePaid: boolean
  feeReleased: boolean
  escrowHeldBy?: string
  status:
    | "none"
    | "property_payment_made"
    | "handover_requested"
    | "handover_scheduled"
    | "handover_rescheduled"
    | "handover_confirmed"
    | "handover_completed"
    | "funds_released"
  scheduledDate?: string | null
  initializedAt?: string | null
  paidAt?: string | null
  scheduledAt?: string | null
  confirmedAt?: string | null
  completedAt?: string | null
  createdAt: string
  updatedAt: string
}

// 1️⃣ Request purchase — buyer must have a completed, paid inspection first
export async function requestPurchase(propertyId: string) {
  const res = await api.post("/purchase/request", { propertyId })
  return res.data as { success: boolean; message: string; purchaseId: string }
}

// 2️⃣ Initialize purchase payment
export async function initializePurchasePayment(
  purchaseId: string,
  callback_url: string
) {
  const res = await api.post("/purchase/initialize-payment", {
    purchaseId,
    callback_url,
  })
  return res.data as {
    success: boolean
    authorizationUrl: string
    reference: string
    purchaseId: string
    callback_url: string
  }
}

// 4️⃣ Schedule handover — agent only
export async function scheduleHandover(
  purchaseId: string,
  scheduledDate: string
) {
  const res = await api.patch("/purchase/schedule", {
    purchaseId,
    scheduledDate,
  })
  return res.data as { success: boolean; message: string; purchase: Purchase }
}

// 5️⃣ Reschedule / reject handover — buyer only
export async function rescheduleHandover(purchaseId: string, reason?: string) {
  const res = await api.patch("/purchase/reschedule", { purchaseId, reason })
  return res.data as { success: boolean; message: string; purchase: Purchase }
}

// 6️⃣ Confirm handover — buyer only
export async function confirmHandover(purchaseId: string) {
  const res = await api.patch(`/purchase/${purchaseId}/confirm`)
  return res.data as { success: boolean; message: string; purchase: Purchase }
}

// 7️⃣ Complete handover — buyer only
export async function completeHandover(purchaseId: string) {
  const res = await api.patch(`/purchase/${purchaseId}/complete`)
  return res.data as { success: boolean; message: string; purchase: Purchase }
}

// 8️⃣ Get single purchase — normalizes property.image the same way getInspectionDetails does
export async function getPurchaseDetails(purchaseId: string) {
  const res = await api.get(`/purchase/${purchaseId}`)
  const purchase = res.data.purchase as Purchase

  if (purchase.property && typeof purchase.property !== "string") {
    purchase.property.image =
      purchase.property.image ?? purchase.property.images?.[0]
  }

  return purchase
}

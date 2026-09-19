import api from "@/services/api"

export type Inspection = {
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
  owner:
    | string
    | {
        _id: string
        name?: string
        email: string
        phoneNumber?: string | null
        profilePicture?: string | null | string[]
      }
  user:
    | string
    | { _id: string; name?: string; email: string; phoneNumber?: string | null }
  code: string
  status:
    | "none"
    | "inspection_requested"
    | "inspection_initialized"
    | "inspection_paid"
    | "inspection_scheduled"
    | "inspection_confirmed"
    | "inspection_completed"
    | "inspection_cancelled"
  fee: number
  escrowHeldBy?: string
  feePaid: boolean
  feeReleased: boolean
  scheduledDate?: string | null
  initializedAt?: string | null
  paidAt?: string | null
  scheduledAt?: string | null
  confirmedAt?: string | null
  completedAt?: string | null
  createdAt: string
  updatedAt: string
}

// 1️⃣ Request inspection — creates the Inspection record, returns inspectionId + code
export async function requestInspection(propertyId: string) {
  const res = await api.post("/inspection/request", { propertyId })
  return res.data as {
    success: boolean
    resumed: boolean
    message: string
    inspectionId: string
    code?: string
    status?: string
  }
}

// 2️⃣ Get single inspection details
export async function getInspectionDetails(inspectionId: string) {
  const res = await api.get(`/inspection/${inspectionId}`)
  const inspection = res.data.inspection as Inspection

  if (inspection.property && typeof inspection.property !== "string") {
    inspection.property.image =
      inspection.property.image ?? inspection.property.images?.[0]
  }

  return inspection
}

// 3️⃣ Initialize inspection payment — returns Paystack authorizationUrl + backend-generated reference
export async function initializeInspectionPayment(
  inspectionId: string,
  callback_url: string
) {
  const res = await api.post("/inspection/initialize-payment", {
    inspectionId,
    callback_url,
  })
  return res.data as {
    success: boolean
    authorizationUrl: string
    reference: string
    inspectionId: string
    callback_url: string
  }
}

// Get all inspections for the logged-in buyer — used to check whether an inspection already exists for a given property before creating a new one
export async function getUserInspections() {
  const res = await api.get("/inspection/user-inspections")
  return res.data.inspections as Inspection[]
}

// agent schedule inspection endpoint
export async function scheduleInspection(
  inspectionId: string,
  scheduledDate: string
) {
  const res = await api.patch("/inspection/schedule", {
    inspectionId,
    scheduledDate,
  })
  return res.data as {
    success: boolean
    message: string
    inspection: Inspection
  }
}

// user(buyer) reschedule inspection
export async function rescheduleInspection(
  inspectionId: string,
  reason?: string
) {
  const res = await api.patch("/inspection/reschedule", {
    inspectionId,
    reason,
  })
  return res.data as {
    success: boolean
    message: string
    inspection: Inspection
  }
}

// user(buyer) confirms inspection schedule
export async function confirmInspection(inspectionId: string) {
  const res = await api.patch(`/inspection/${inspectionId}/confirm`)
  return res.data as {
    success: boolean
    message: string
    inspection: Inspection
  }
}

// user(buyer) completes inspection
export async function completeInspection(inspectionId: string) {
  const res = await api.patch(`/inspection/${inspectionId}/complete`)
  return res.data as {
    success: boolean
    message: string
    inspection: Inspection
  }
}

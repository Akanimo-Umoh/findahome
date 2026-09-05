import api from "@/services/api"

export type Inspection = {
  _id: string
  property:
    | string
    | { _id: string; title: string; price: number; address: string }
  owner: string | { _id: string; name?: string; email: string }
  user: string
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
  return res.data.inspection as Inspection
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

// Get all inspections for the logged-in buyer — used to check whether an
// inspection already exists for a given property before creating a new one
export async function getUserInspections() {
  const res = await api.get("/inspection/user-inspections")
  return res.data.inspections as Inspection[]
}

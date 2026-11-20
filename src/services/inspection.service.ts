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
        escrowFee?: number
        serviceCharge?: number
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
    | "inspection_payment_review"
    | "inspection_paid"
    | "inspection_scheduled"
    | "inspection_confirmed"
    | "inspection_completed"
    | "inspection_cancelled"
  fee: number
  // Paystack's amount differed from the fee; the admin sees this before approving
  amountMismatch?: boolean
  paidAmount?: number
  // the payment was rejected or the deal refunded, and the admin still has to send the money back
  refundDue?: boolean
  refundAmount?: number
  refundSentAt?: string | null
  refundSentAmount?: number
  refundReference?: string
  escrowHeldBy?: string
  feePaid: boolean
  feeReleased: boolean
  scheduledDate?: string | null
  initializedAt?: string | null
  // when Paystack confirmed the buyer's payment (paidAt is the admin approval)
  paystackPaidAt?: string | null
  paidAt?: string | null
  scheduledAt?: string | null
  confirmedAt?: string | null
  completedAt?: string | null
  // set by the backend once it records them (see docs/backend-fixes-code.md)
  feeReleasedAt?: string | null
  cancelledAt?: string | null
  // "property_taken": cancelled because another buyer secured the property.
  // refunded in full, with no processing fee
  cancelReason?: string | null
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

// Called when the buyer comes back from Paystack. The server checks the
// payment with Paystack and moves the inspection to inspection_payment_review.
// "processing" means Paystack couldn't be reached; the webhook finishes it.
export async function confirmInspectionPayment(
  inspectionId: string,
  reference?: string
) {
  const res = await api.post("/inspection/confirm-payment", {
    inspectionId,
    reference,
  })
  return res.data as {
    success: boolean
    status: Inspection["status"] | "processing"
    message?: string
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

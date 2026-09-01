export type PurchaseStatus =
  | "none"
  | "property_payment_made"
  | "handover_requested"
  | "handover_scheduled"
  | "handover_confirmed"
  | "handover_completed"
  | "funds_released"

export type Purchase = {
  _id: string
  property: {
    _id: string
    title: string
    price: number
    address: string
  }
  buyer: {
    _id: string
    name: string
    email: string
  }
  owner: {
    _id: string
    name: string
    email: string
  }
  price: number
  feePaid: boolean
  feeReleased: boolean
  status: PurchaseStatus
  createdAt: string
  updatedAt: string
}

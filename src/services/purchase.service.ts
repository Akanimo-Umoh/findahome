import api from "@/services/api"

export type Purchase = {
  _id: string
  property:
    | string
    | {
        _id: string
        title: string
        price?: number
        address?: string
        image?: string
        images?: string[]
      }
  buyer: string | { _id: string; name?: string; email: string }
  seller?: string | { _id: string; name?: string; email: string }
  owner?: string | { _id: string; name?: string; email: string }
  price: number
  status: string
  createdAt: string
  updatedAt: string
}

// TODO: not yet wired to a real detail page — inspections are being built first
export async function getPurchaseDetails(purchaseId: string) {
  const res = await api.get(`/purchase/${purchaseId}`)
  return res.data.purchase as Purchase
}

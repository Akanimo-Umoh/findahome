export type DisputeStatus = "pending_review" | "under_review" | "resolved"

export type Dispute = {
  id: string
  refId: string
  disputeType: string
  propertyName: string
  amount: string
  status: DisputeStatus
  lastUpdated: string
  buyerName: string
  dateIssued: string
  agentDescription: string
  evidence: { name: string }[]
  timeline: { label: string; date: string }[]
}

export const MOCK_DISPUTES: Dispute[] = [
  {
    id: "1",
    refId: "FH-TRX-002834",
    disputeType: "Payments",
    propertyName: "3 bedroom apartment, Lekki Phase 1",
    amount: "3,000,000",
    status: "pending_review",
    lastUpdated: "Nov 21, 2026",
    buyerName: "Victoria Ntekim",
    dateIssued: "15th Nov, 2025",
    agentDescription:
      "Buyer claims the property has issues that were not stated during inspection. I have video evidence from the inspection showing the bathroom and parking space were functional. Please review and step in.",
    evidence: [{ name: "imag3_54np" }, { name: "imag3_55nx" }],
    timeline: [
      { label: "Dispute submitted", date: "11 Nov, 2026 · 9:22 PM" },
      { label: "Dispute under review", date: "11 Nov, 2026 · 9:28 PM" },
    ],
  },
  {
    id: "2",
    refId: "FH-TRX-003291",
    disputeType: "Inspection",
    propertyName: "4 bedroom duplex, Ikoyi",
    amount: "7,500,000",
    status: "under_review",
    lastUpdated: "Nov 18, 2026",
    buyerName: "Emeka Okafor",
    dateIssued: "10th Nov, 2025",
    agentDescription:
      "Buyer is claiming the inspection was not properly conducted. All inspection protocols were followed and documented accordingly. Requesting admin review.",
    evidence: [{ name: "inspect_001" }],
    timeline: [
      { label: "Dispute submitted", date: "10 Nov, 2026 · 2:15 PM" },
      { label: "Dispute under review", date: "11 Nov, 2026 · 10:00 AM" },
    ],
  },
  {
    id: "3",
    refId: "FH-TRX-004817",
    disputeType: "Property Condition",
    propertyName: "2 bedroom flat, Ajah",
    amount: "1,200,000",
    status: "resolved",
    lastUpdated: "Oct 30, 2026",
    buyerName: "Amaka Eze",
    dateIssued: "20th Oct, 2025",
    agentDescription:
      "Dispute regarding property condition at handover. Both parties reached an agreement after admin mediation.",
    evidence: [{ name: "condition_img1" }, { name: "condition_img2" }],
    timeline: [
      { label: "Dispute submitted", date: "20 Oct, 2026 · 11:00 AM" },
      { label: "Dispute under review", date: "22 Oct, 2026 · 9:00 AM" },
      { label: "Dispute resolved", date: "30 Oct, 2026 · 3:45 PM" },
    ],
  },
]

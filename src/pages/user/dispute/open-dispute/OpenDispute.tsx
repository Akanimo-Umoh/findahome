import { useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { toast } from "sonner"
import { useQuery } from "@tanstack/react-query"
import nairaIcon from "@/assets/images/icon-naira.svg"
import warningIcon from "@/assets/images/icon-warning.svg"
import UploadFile from "@/components/open-dispute/UploadFile"
import PageHeader from "@/components/shared/PageHeader"
import Spinner from "@/components/Spinner"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  getInspectionDetails,
  type Inspection,
} from "@/services/inspection.service"
import { getPurchaseDetails, type Purchase } from "@/services/purchase.service"
import { createDispute } from "@/services/dispute.service"

const CATEGORY_OPTIONS = [
  { value: "payment", label: "Payment" },
  { value: "inspection", label: "Inspection" },
  { value: "handover", label: "Handover" },
  { value: "property_condition", label: "Property Condition" },
]

export default function OpenDispute() {
  const { transactionId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const isPurchase = searchParams.get("type") === "purchase"

  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [evidenceFiles, setEvidenceFiles] = useState<File[]>([]) // not sent yet — see note
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data: transaction, isLoading } = useQuery<Inspection | Purchase>({
    queryKey: [
      "disputeSourceTransaction",
      transactionId,
      isPurchase ? "purchase" : "inspection",
    ],
    queryFn: () =>
      isPurchase
        ? getPurchaseDetails(transactionId ?? "")
        : getInspectionDetails(transactionId ?? ""),
    enabled: !!transactionId,
  })

  if (isLoading) return <Spinner />

  const property =
    transaction && typeof transaction.property !== "string"
      ? transaction.property
      : undefined
  const buyer =
    transaction &&
    typeof (isPurchase
      ? (transaction as Purchase).buyer
      : (transaction as Inspection).user) !== "string"
      ? ((isPurchase
          ? (transaction as Purchase).buyer
          : (transaction as Inspection).user) as {
          name?: string
          email: string
        })
      : undefined
  const amount = transaction
    ? isPurchase
      ? (transaction as Purchase).price
      : (transaction as Inspection).fee
    : 0
  const agentId =
    transaction &&
    typeof (isPurchase
      ? (transaction as Purchase).owner
      : (transaction as Inspection).owner) !== "string"
      ? (
          (isPurchase
            ? (transaction as Purchase).owner
            : (transaction as Inspection).owner) as { _id: string }
        )._id
      : undefined
  const propertyId = property?._id

  const handleSubmit = async () => {
    if (!propertyId || !description.trim()) {
      toast.error("Please provide a description before submitting.")
      return
    }
    setIsSubmitting(true)
    try {
      await createDispute({
        propertyId,
        agentId,
        purchaseId: isPurchase ? transaction?._id : undefined,
        inspectionId: !isPurchase ? transaction?._id : undefined,
        description,
      })
      toast.success("Dispute submitted. Our team will review it shortly.")
      navigate("/dispute")
    } catch (err) {
      toast.error("Couldn't submit your dispute. Please try again.")
      console.error("createDispute error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mb-10 px-6 md:px-8 md:pt-6">
      <PageHeader title="Open Dispute" responsive />

      <main className="mt-6 md:mx-auto md:max-w-3xl">
        {/* property details — CHANGED: responsive layout + real data */}
        <div className="flex flex-col gap-3 rounded-xl border border-bg-accent p-3 sm:flex-row sm:items-center sm:gap-4">
          {property?.image ? (
            <img
              src={property.image}
              alt=""
              className="h-15 w-15 shrink-0 rounded-lg object-cover sm:h-25 sm:w-25"
            />
          ) : (
            <div className="h-15 w-15 shrink-0 rounded-lg bg-bg-accent sm:h-25 sm:w-25" />
          )}

          <div className="min-w-0 flex-1 space-y-2">
            <div className="space-y-1">
              <p className="line-clamp-2 font-raleway text-[12px] font-semibold tracking-[1px] md:text-[14px]">
                {property?.title ?? "No property linked"}
              </p>

              <div className="flex flex-wrap items-center gap-1">
                <div className="flex w-fit items-center">
                  <img src={nairaIcon} alt="" className="h-4 w-4" />
                  <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg md:text-[16px]">
                    {amount.toLocaleString()}
                  </p>
                </div>
                <p className="min-w-0 flex-1 text-[12px] text-text-secondary md:text-[14px]">
                  Buyer: {buyer?.name ?? buyer?.email ?? "—"}
                </p>
              </div>
            </div>

            <div className="space-y-1 text-[12px] leading-4 text-text-secondary md:text-[14px] md:leading-5.25">
              <p className="w-fit rounded-2xl bg-[#F39C12] px-2 py-1 text-bg-tertiary">
                {transaction?.feePaid ? "In Escrow" : "Not Yet Paid"}
              </p>
              <p>Ref ID: {transaction?.reference ?? transaction?._id ?? "—"}</p>
              <p>
                Last updated:{" "}
                {transaction
                  ? new Date(transaction.updatedAt).toLocaleDateString(
                      "en-US",
                      { day: "numeric", month: "short" }
                    )
                  : "—"}
              </p>
            </div>
          </div>
        </div>

        {/* notice */}
        <div className="mt-8 flex items-center gap-2">
          <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-lg bg-[#D0272733]">
            <img src={warningIcon} alt="" />
          </div>
          <p className="text-[12px] leading-4 md:text-[14px]">
            Only open a dispute if you cannot resolve the issue directly with
            the agent
          </p>
        </div>

        {/* dispute form */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
          className="mt-6"
        >
          <div className="flex flex-col justify-center gap-2">
            <label className="w-fit text-[14px] md:text-[16px]">
              Issue Category
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="select-issue w-full cursor-pointer rounded-lg border border-button-disabled bg-button-disabled px-2">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 flex flex-col justify-center gap-2">
            <label
              htmlFor="description"
              className="w-fit text-[14px] md:text-[16px]"
            >
              Description
            </label>
            <div className="rounded-lg bg-button-disabled px-2 py-2">
              <textarea
                name="description"
                id="description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide detailed information about the issue."
                className="w-full bg-transparent text-[14px] outline-none"
              />
            </div>
          </div>

          <div className="mt-4">
            <UploadFile onFilesSelected={setEvidenceFiles} />
          </div>
          {evidenceFiles.length > 0 && (
            <p className="mt-1 text-[11px] text-text-secondary">
              {evidenceFiles.length} file(s) selected — evidence upload isn't
              wired to the server yet.
            </p>
          )}

          <div className="mt-8 space-y-2">
            <Button
              variant="app-primary"
              size="full"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Dispute"}
            </Button>
            <p className="text-center text-[12px] leading-4 text-text-secondary lg:text-[14px] lg:leading-5.25">
              Our team will review your dispute and respond within 2-3 business
              days.
            </p>
          </div>
        </form>
      </main>
    </div>
  )
}

import { Link } from "react-router-dom"
import blueNairaIcon from "@/assets/agentImages/icon-blue-naira.svg"
import { useState } from "react"
import type { Purchase } from "@/types/purchase"
import { useAgentPurchases } from "@/hooks/useAgentPurchase"
import Skeleton from "@/components/ui/Skeleton"
import { useAgentInspections } from "@/hooks/useAgentInspection"
import type { Inspection } from "@/services/inspection.service"
import {
  PURCHASE_STATUS_LABEL,
  INSPECTION_STATUS_LABEL,
  getPurchaseCategory,
  getInspectionCategory,
  getPropertyId,
  getPersonName,
  getPropertyImage,
  tabs,
  type MergedItem,
} from "./transactionHelpers"

export default function Transactions() {
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "completed">(
    "all"
  )
  const {
    purchases,
    isLoading: purchaseLoading,
    error: purchasesError,
  } = useAgentPurchases()
  const {
    inspections,
    isLoading: inspectionsLoading,
    error: inspectionsError,
  } = useAgentInspections()

  const isLoading = purchaseLoading || inspectionsLoading
  const error = purchasesError || inspectionsError

  const purchasedPropertyIds = new Set(
    purchases.map((p) => getPropertyId(p.property))
  )
  const visibleInspections = inspections.filter(
    (i) => !purchasedPropertyIds.has(getPropertyId(i.property))
  )

  const merged: MergedItem[] = [
    ...visibleInspections.map((i) => ({
      kind: "inspection" as const,
      data: i,
    })),
    ...purchases.map((p) => ({ kind: "purchase" as const, data: p })),
  ].sort(
    (a, b) =>
      new Date(b.data.updatedAt).getTime() -
      new Date(a.data.updatedAt).getTime()
  )

  const filtered =
    activeTab === "all"
      ? merged
      : merged.filter((item) =>
          item.kind === "purchase"
            ? getPurchaseCategory(item.data.status) === activeTab
            : getInspectionCategory() === activeTab
        )

  return (
    <div>
      <div className="flex items-center justify-center gap-5">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`cursor-pointer rounded-lg px-2 py-1 text-[14px] transition-colors duration-300 xs:text-[16px] ${
              activeTab === tab.value
                ? "bg-button-bg text-white"
                : "bg-button-sec text-text-primary hover:bg-bg-accent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <section className="mt-6 space-y-4">
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl border border-bg-accent p-2"
            >
              <Skeleton className="h-15 w-15 shrink-0 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
          ))}

        {error && (
          <p className="mt-10 text-center text-[12px] text-text-secondary">
            {error}
          </p>
        )}

        {!isLoading && !error && filtered.length === 0 && (
          <p className="mt-10 text-center text-[12px] text-text-secondary">
            No {activeTab === "all" ? "" : activeTab} transactions yet.
          </p>
        )}

        {!isLoading &&
          !error &&
          filtered.map((item) => {
            const isPurchase = item.kind === "purchase"
            const property = item.data.property
            const propertyTitle =
              typeof property === "string" ? "" : property?.title
            const propertyImage = getPropertyImage(property)
            const buyerName = isPurchase
              ? getPersonName((item.data as Purchase).buyer)
              : getPersonName((item.data as Inspection).user)
            const price = isPurchase
              ? (item.data as Purchase).price
              : (item.data as Inspection).fee
            const statusLabel = isPurchase
              ? PURCHASE_STATUS_LABEL[(item.data as Purchase).status]
              : INSPECTION_STATUS_LABEL[(item.data as Inspection).status]
            const linkTo = isPurchase
              ? `/agent/transactions/${item.data._id}`
              : `/agent/transactions/${item.data._id}/schedule-inspection`

            return (
              <Link
                to={linkTo}
                key={item.data._id}
                className="flex items-center gap-3 rounded-xl border border-bg-accent p-2"
              >
                {propertyImage ? (
                  <img
                    src={propertyImage}
                    alt={propertyTitle}
                    className="h-15 w-15 shrink-0 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-15 w-15 shrink-0 rounded-lg bg-bg-accent" />
                )}

                <div className="space-y-2">
                  <div className="space-y-1">
                    <p className="line-clamp-1 font-raleway text-[12px] font-semibold tracking-[1px]">
                      {propertyTitle}
                    </p>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <img src={blueNairaIcon} alt="" className="h-4 w-4" />
                        <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
                          {price.toLocaleString()}
                        </p>
                      </div>
                      {buyerName && (
                        <p className="line-clamp-1 flex-1 text-[12px] leading-4 text-text-secondary">
                          Buyer: {buyerName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="w-fit rounded-2xl border border-text-disabled px-2 py-1 text-[12px] leading-4">
                      {statusLabel}
                    </p>
                  </div>

                  <div>
                    <p className="text-[12px] leading-4 text-text-secondary">
                      Last updated:{" "}
                      {new Date(item.data.updatedAt).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "short",
                        }
                      )}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
      </section>
    </div>
  )
}

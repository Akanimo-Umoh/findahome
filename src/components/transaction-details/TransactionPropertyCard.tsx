import blueNaira from "@/assets/images/icon-naira.svg"

interface BaseProps {
  image?: string
  title: string
}

interface DefaultVariantProps extends BaseProps {
  variant: "default"
  price: string
  paymentStatus?: string
  lastUpdated?: string
}

interface Phase5VariantProps extends BaseProps {
  variant: "phase5"
  agentName: string
  isAgentVerified?: boolean
  inspectionStatus?: string
}

type TransactionPropertyCardProps = DefaultVariantProps | Phase5VariantProps

export default function TransactionPropertyCard(
  props: TransactionPropertyCardProps
) {
  const { image, title } = props

  if (props.variant === "phase5") {
    const {
      agentName,
      isAgentVerified = false,
      inspectionStatus = "Inspection Completed",
    } = props

    return (
      <div className="flex items-center gap-3 rounded-xl border border-bg-accent p-2">
        {image ? (
          <img
            src={image}
            alt=""
            className="h-15 w-15 rounded-lg object-cover"
          />
        ) : (
          <div className="h-15 w-15 shrink-0 rounded-lg bg-bg-accent" />
        )}
        <div className="flex w-full flex-col justify-center gap-1">
          <p className="line-clamp-1 font-raleway text-[12px] font-semibold tracking-[1px] md:text-[16px]">
            {title}
          </p>

          <p className="text-[12px] leading-4 text-text-secondary">
            Listed by {agentName}{" "}
            {isAgentVerified && (
              <span className="text-button-bg">(Verified)</span>
            )}
          </p>

          <p className="w-fit rounded-2xl bg-success px-2 py-1 text-[12px] leading-4 text-bg-tertiary">
            {inspectionStatus}
          </p>
        </div>
      </div>
    )
  }

  // default variant
  const { price, paymentStatus, lastUpdated } = props

  return (
    <div className="flex items-center gap-3 rounded-xl border border-bg-accent p-2 lg:p-3">
      <div className="shrink-0">
        {image ? (
          <img
            src={image}
            alt=""
            className="h-15 w-15 rounded-lg object-cover"
          />
        ) : (
          <div className="h-15 w-15 rounded-lg bg-bg-accent" />
        )}
      </div>

      <div>
        <p className="font-raleway text-[14px] font-semibold tracking-[1px] md:text-[16px]">
          {title}
        </p>

        <div className="flex items-center">
          <img src={blueNaira} alt="" className="h-4 w-4" />
          <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg md:text-[16px]">
            {price}
          </p>
        </div>

        <div className="mt-1">
          {paymentStatus && (
            <p className="w-fit rounded-2xl bg-agents-bg px-2 text-[12px] leading-4 text-bg-tertiary md:text-[14px] md:leading-5.25">
              {paymentStatus}
            </p>
          )}

          {lastUpdated && (
            <p className="text-[12px] leading-4 text-text-secondary md:text-[14px] md:leading-5.25">
              Last updated: <span>{lastUpdated}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

import { motion, useReducedMotion, type Variants } from "framer-motion"

// Icons: these need to be the BLUE version (they now sit on a white tile).
import search from "@/assets/images/search-why.svg"
import chats from "@/assets/images/icon-chats.svg"
import payFee from "@/assets/images/icon-pay-fee.svg"
import inspect from "@/assets/images/icon-inspect.svg"
import home from "@/assets/images/icon-home.svg"
import { useMediaQuery } from "@/hooks/useMediaQuery"

const steps = [
  {
    icon: search,
    title: "Search Properties",
    details:
      "Explore verified listings and message agents direct. No login needed to browse.",
  },
  {
    icon: chats,
    title: "Connect with Agents",
    details: "Chat directly with trusted agents and schedule viewings.",
  },
  {
    icon: payFee,
    title: "Pay Inspection Fee",
    details:
      "Pay a small fee held securely in escrow. The agent is paid only after you confirm.",
  },
  {
    icon: inspect,
    title: "Inspect and Confirm",
    details:
      "Visit the property, then confirm the inspection was satisfactory to release the fee.",
  },
  {
    icon: home,
    title: "Pay and Move In",
    details:
      "Happy with the property? Proceed to payment and schedule the handover with the agent.",
  },
]

export default function HowItWorks() {
  const reduceMotion = useReducedMotion()
  // At lg the 5 steps sit in one row, so we cascade them left to right.
  // On smaller screens they stack and are revealed one by one as you scroll,
  // so a stagger delay would only make each card feel late.
  const isRow = useMediaQuery("(min-width: 1024px)")

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
    }),
  }

  // Number badge: pops in just after its card lands (inherits the card's state)
  const badgeVariants: Variants = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.4 },
    visible: (delay: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 420,
        damping: 18,
        delay: delay + 0.18,
      },
    }),
  }

  return (
    <div className="max-w-7xl px-6 md:px-8">
      <motion.div
        className="text-center text-text-primary md:flex md:flex-col md:gap-1"
        initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="font-raleway text-[24px] font-semibold tracking-[1px] md:text-[36px]">
          How It Works
        </h2>
        <p className="text-[12px] text-text-secondary md:text-[16px]">
          A safe, simple process to finding your dream apartment
        </p>
      </motion.div>

      {/* 1 col on mobile, 2 on sm/md (last card centers), 5 in a row on lg */}
      <ol className="mx-auto mt-8 flex max-w-sm flex-wrap justify-center gap-x-5 gap-y-7 sm:max-w-2xl md:mt-12 lg:max-w-full">
        {steps.map((step, index) => {
          const delay = isRow ? index * 0.1 : 0

          return (
            <motion.li
              key={step.title}
              custom={delay}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.35,
                margin: "0px 0px -40px 0px",
              }}
              className="relative w-full rounded-2xl bg-bg-accent p-4 pt-5 sm:w-[calc(50%-0.625rem)] lg:w-[calc(20%-1rem)]"
            >
              <motion.span
                variants={badgeVariants}
                className="absolute -top-3 left-0 flex h-6 w-6 items-center justify-center rounded-full bg-button-bg text-[12px] font-semibold text-white"
              >
                {index + 1}
              </motion.span>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-button-sec">
                <img src={step.icon} alt="" className="h-5 w-5" />
              </div>

              <h3 className="mt-3 text-[12px] font-semibold text-text-primary md:text-[14px]">
                {step.title}
              </h3>
              <p className="mt-1 text-[12px] leading-4.5 text-text-secondary md:text-[13px]">
                {step.details}
              </p>
            </motion.li>
          )
        })}
      </ol>
    </div>
  )
}

import { motion, useReducedMotion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const items = [
  {
    value: "inspection",
    trigger: "How does property inspection work?",
    content:
      "After selecting a property, you can pay a standard inspection fee to schedule a visit with the agent at an agreed date and time.",
  },
  {
    value: "escrow",
    trigger: "What is escrow and how does it protect me?",
    content:
      "Escrow securely holds your payment until both you and the agent confirm that all agreed steps like inspection and handover have been completed.",
  },
  {
    value: "money",
    trigger: "Is my money safe on FindaHome?",
    content:
      "Yes. All payments are protected using escrow and are only released when transaction conditions are met.",
  },
  {
    value: "unsatisfied",
    trigger: "What happens if I'm not satisfied after inspection?",
    content:
      "If you decide not to proceed, the transaction does not move forward and your funds remain protected according to the platform's policy.",
  },
  {
    value: "propertyList",
    trigger: "What types of properties are listed on FindaHome?",
    content:
      "FindaHome features apartments, houses, land, and commercial properties across different locations and budgets.",
  },
]

/* Right-pointing chevron (matches the design). Inline so there's no extra dependency. */
function Chevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 md:h-5 md:w-5"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

export default function Faq() {
  const reduceMotion = useReducedMotion()
  const offset = reduceMotion ? 0 : 20

  return (
    <div className="max-w-7xl px-6 font-ssPro text-text-primary md:px-8">
      <motion.div
        className="flex flex-col items-center gap-1 text-center"
        initial={{ opacity: 0, y: offset }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="font-raleway text-[24px] font-medium tracking-[1px] md:text-[36px] md:font-semibold">
          Frequently Asked Questions
        </h2>
        <p className="text-[12px] text-text-secondary md:text-[16px]">
          You've got questions? We have answers!
        </p>
      </motion.div>

      <Accordion
        type="single"
        collapsible
        className="mx-auto mt-6 max-w-2xl space-y-3 md:mt-12 md:space-y-4"
      >
        {items.map((item, index) => (
          <motion.div
            key={item.value}
            initial={{ opacity: 0, y: offset }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
              delay: index * 0.06,
            }}
          >
            <AccordionItem
              value={item.value}
              className="rounded-xl border border-bg-accent transition-colors last:border-b data-[state=open]:bg-button-sec"
            >
              {/* [&>svg]:hidden hides the built-in down chevron so ours can replace it */}
              <AccordionTrigger className="group cursor-pointer gap-3 px-3 py-3 text-[14px] font-normal hover:no-underline md:px-6 md:py-5 md:text-[18px] [&>svg]:hidden">
                <span className="text-left">{item.trigger}</span>
                <span
                  aria-hidden
                  className="shrink-0 text-text-primary transition-transform duration-200 group-data-[state=open]:rotate-90"
                >
                  <Chevron />
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-3 text-[14px] leading-5 text-text-secondary md:px-6 md:text-[16px] md:leading-relaxed">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </div>
  )
}

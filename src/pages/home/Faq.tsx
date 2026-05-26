import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Faq() {
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

  return (
    <div className="max-w-7xl space-y-4 px-6 font-ssPro text-text-primary md:space-y-12 md:px-8">
      <div className="flex flex-col items-center justify-center gap-1">
        <p className="text-center font-raleway text-[24px] font-medium tracking-[1px] text-text-primary md:text-[36px] md:font-semibold">
          Frequently asked questions
        </p>
        <p className="text-[12px] text-text-secondary md:text-[16px]">
          You've got questions? We have answers!
        </p>
      </div>

      <div className="">
        <Accordion
          type="single"
          collapsible
          className="mx-auto max-w-lg space-y-2 rounded-xl border-b border-bg-accent md:space-y-8"
          // defaultValue="billing"
        >
          {items.map((item) => (
            <AccordionItem
              key={item.value}
              value={item.value}
              className="rounded-xl border border-bg-accent"
            >
              <AccordionTrigger className="cursor-pointer p-2 md:py-6 md:text-[18px]">
                {item.trigger}
              </AccordionTrigger>
              <AccordionContent className="px-2 text-text-secondary md:text-[16px]">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

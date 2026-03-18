import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  ];

  return (
    <div className="px-6 space-y-4 font-ssPro text-text-primary">
      <div className="flex flex-col gap-1 items-center justify-center">
        <p className="text-[24px] font-raleway font-medium tracking-[1px] text-text-primary text-center">
          Frequently asked questions
        </p>
        <p className="text-[12px] text-text-secondary">
          You've got questions? We have answers!
        </p>
      </div>

      <div>
        <Accordion
          type="single"
          collapsible
          className="max-w-lg space-y-2 rounded-xl border-b border-bg-accent mx-auto"
          // defaultValue="billing"
        >
          {items.map((item) => (
            <AccordionItem
              key={item.value}
              value={item.value}
              className="border rounded-xl border-bg-accent"
            >
              <AccordionTrigger className="p-2">
                {item.trigger}
              </AccordionTrigger>
              <AccordionContent className="text-text-secondary px-2">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

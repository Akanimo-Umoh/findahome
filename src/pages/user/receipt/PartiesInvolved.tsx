import nairaIcon from "@/assets/images/icon-chat-naira.svg"

export default function PartiesInvolved() {
  const users = [
    {
      title: "Buyer Name:",
      text: "Victoria Ntekim",
    },
    {
      title: "Buyer Contact:",
      text: "08167288115",
    },
    {
      title: "Agent Name:",
      text: "Maryann Kikomu",
    },
    {
      title: "Date & Time:",
      text: "20th Oct, 2025 at 10 AM",
    },
    {
      title: "Transaction ID:",
      text: "TXN-89234567",
    },
  ]

  const transactionDetails = [
    {
      title: "Property Reference",
      text: "Ref: FH - 2862",
    },
    {
      title: "Total Amount Paid",
      text: "3,060,000",
    },

    {
      title: "Payment Method",
      text: "Card Payment",
    },
    {
      title: "Transaction Status",
      text: "Funds Released",
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col justify-center gap-2 rounded-xl bg-bg-warm-section p-2">
        {users.map((user, index) => (
          <div key={index} className="flex items-center justify-between">
            <p className="text-[12px] leading-4 text-text-primary">
              {user.title}
            </p>

            <p className="text-[12px] leading-4 text-text-secondary">
              {user.text}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col justify-center gap-2 rounded-xl bg-bg-accent p-2">
        {transactionDetails.map((detail, index) => (
          <div key={index} className="flex items-center justify-between">
            <p className="text-[12px] leading-4 text-text-primary">
              {detail.title}
            </p>

            {detail.title === "Total Amount Paid" ? (
              <p className="flex items-center text-[12px] leading-4 text-text-secondary">
                <img src={nairaIcon} alt="" />
                <span>{detail.text}</span>
              </p>
            ) : (
              <p className="text-[12px] leading-4 text-text-secondary">
                {detail.text}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

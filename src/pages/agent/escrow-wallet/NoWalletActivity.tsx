import walletHand from "@/assets/agentImages/img-hand-holding-wallet.png"

export default function NoWalletActivity() {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={walletHand} alt="" />

      <div className="mt-6 flex max-w-66 flex-col items-center justify-center gap-2">
        <p className="font-raleway text-[14px] font-semibold tracking-[1px]">
          No wallet activity yet
        </p>
        <p className="text-center text-[12px] leading-4 text-text-secondary">
          Once buyers make payments, your escrow earnings will appear here!
        </p>
      </div>
    </div>
  )
}

import walletHand from "@/assets/agentImages/img-hand-holding-wallet.png";

export default function NoWalletActivity() {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={walletHand} alt="" />

      <div className="flex flex-col items-center justify-center max-w-66 gap-2 mt-6">
        <p className="font-raleway font-semibold text-[14px] tracking-[1px]">
          No wallet activity yet
        </p>
        <p className="text-[12px] leading-4 text-text-secondary text-center">
          Once buyers make payments, your escrow earnings will appear here!
        </p>
      </div>
    </div>
  );
}

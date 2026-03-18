import noDisputeImg from "@/assets/images/img-no-dispute.png";

export default function NoDispute() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 mt-18.5">
      <img src={noDisputeImg} alt="" />
      <p className="text-[14px] text-text-primary">No Dispute created yet</p>
    </div>
  );
}

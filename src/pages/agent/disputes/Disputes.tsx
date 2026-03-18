import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import DisputeCard from "./DisputeCard";

export default function Disputes() {
  const navigate = useNavigate();

  return (
    <div className="text-text-primary mb-10 px-6">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          My Dispute
        </p>
      </div>

      <main className="mt-8">
        {/* tabs */}
        <div className="flex items-center justify-center gap-2.5">
          {/* this is the active tab */}
          <p className="border-b border-button-bg py-2 px-4 flex items-center justify-center">
            Active Disputes
          </p>
          {/* this is the inactive tab */}
          <p className="text-text-secondary py-2 px-4 flex items-center justify-center">
            Resolved Disputes
          </p>
        </div>

        {/* active tab contents */}
        <section className="mt-6">
          <DisputeCard />
        </section>
      </main>
    </div>
  );
}

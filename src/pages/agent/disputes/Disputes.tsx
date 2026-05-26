import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import DisputeCard from "./DisputeCard"

export default function Disputes() {
  const navigate = useNavigate()

  return (
    <div className="mb-10 px-6 text-text-primary">
      {/* header */}
      <div className="relative flex items-center justify-center">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="h-6 w-6" />
        </button>

        <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
          My Dispute
        </p>
      </div>

      <main className="mt-8">
        {/* tabs */}
        <div className="flex items-center justify-center gap-2.5">
          {/* this is the active tab */}
          <p className="flex items-center justify-center border-b border-button-bg px-4 py-2">
            Active Disputes
          </p>
          {/* this is the inactive tab */}
          <p className="flex items-center justify-center px-4 py-2 text-text-secondary">
            Resolved Disputes
          </p>
        </div>

        {/* active tab contents */}
        <section className="mt-6">
          <DisputeCard />
        </section>
      </main>
    </div>
  )
}

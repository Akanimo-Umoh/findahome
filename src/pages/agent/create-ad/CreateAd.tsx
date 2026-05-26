import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import Step2 from "./Step2"
import Step3 from "./Step3"

export default function CreateAd() {
  const navigate = useNavigate()

  return (
    <div className="mb-10 flex flex-col font-ssPro">
      <header className="px-6">
        {/* header */}
        <div className="relative flex items-center justify-center">
          <button className="absolute left-0" onClick={() => navigate(-1)}>
            <img src={goBack} alt="" />
          </button>

          <p className="font-raleway text-[18px] font-semibold">Create Ad</p>
        </div>
      </header>

      <main className="mt-6">
        {/* step 1 */}
        <div className="mx-6">
          <p className="">Step 1: Select Property</p>

          <div className="mt-2">
            <button className="w-full rounded-lg border border-dashed border-text-secondary px-2 py-4 text-[14px]">
              Select Property
            </button>
          </div>
        </div>

        {/* step 2 */}
        <div className="mt-8">
          <Step2 />
        </div>

        {/* step 3 */}
        <div className="mt-8">
          <Step3 />
        </div>

        {/* buttons */}
        <div className="mx-6 mt-8 flex flex-col gap-4">
          <button className="button-style h-[45px] w-full rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white">
            Create Ad
          </button>

          <button className="h-[45px] rounded-lg border border-text-secondary bg-button-disabled font-raleway text-[14px] font-semibold tracking-[1px]">
            Preview Ad
          </button>
        </div>
      </main>
    </div>
  )
}

import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import Step2 from "./Step2";
import Step3 from "./Step3";

export default function CreateAd() {
  const navigate = useNavigate();

  return (
    <div className="font-ssPro flex flex-col mb-10">
      <header className="px-6">
        {/* header */}
        <div className="flex items-center justify-center relative">
          <button className="absolute left-0" onClick={() => navigate(-1)}>
            <img src={goBack} alt="" />
          </button>

          <p className="text-[18px] font-raleway font-semibold">Create Ad</p>
        </div>
      </header>

      <main className="mt-6">
        {/* step 1 */}
        <div className="mx-6">
          <p className="">Step 1: Select Property</p>

          <div className="mt-2">
            <button className="text-[14px] rounded-lg py-4 px-2 border border-dashed border-text-secondary w-full">
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
        <div className="mt-8 mx-6 flex flex-col gap-4">
          <button className="button-style w-full h-[45px] rounded-lg text-white font-raleway font-semibold text-[14px] tracking-[1px]">
            Create Ad
          </button>

          <button className="font-raleway font-semibold text-[14px] tracking-[1px] border border-text-secondary bg-button-disabled rounded-lg h-[45px]">
            Preview Ad
          </button>
        </div>
      </main>
    </div>
  );
}

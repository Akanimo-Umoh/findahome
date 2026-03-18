import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
// import Step1 from "./Step1";
// import Step2 from "./Step2";
import Step3 from "./Step3";

export default function AddProperty() {
  const navigate = useNavigate();

  return (
    <div className="text-text-primary mb-10 px-6">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          Add Property
        </p>

        <button className="absolute right-0 font-raleway font-semibold text-[14px] tracking-[1px] text-button-bg">
          Save Draft
        </button>
      </div>

      {/* progress for the steps (1 to 3) */}
      <div className="mt-6">
        <div>progress bar</div>
        <p className="text-black text-center">Step 1 of 3</p>
      </div>

      <p className="text-[14px] text-text-secondary text-center mt-6">
        Create a compelling listing to attract potential buyers
      </p>

      {/* form for step 1 */}
      {/* <section className="mt-6">
        <Step1 />
      </section> */}

      {/* form for step 2 */}
      {/* <section className="mt-6">
        <Step2 />
      </section> */}

      {/* form for step 3 */}
      <section className="mt-6">
        <Step3 />
      </section>
    </div>
  );
}

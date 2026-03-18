import roleImg from "@/assets/agentImages/img-signup-as.png";
import asAgentIcon from "@/assets/agentImages/icon-continue-as-agent.svg";
import asBuyerIcon from "@/assets/agentImages/icon-continue-as-buyer.svg";
import secureIcon from "@/assets/agentImages/icon-secure.svg";
import trustedIcon from "@/assets/agentImages/icon-trusted.svg";
import ratedIcon from "@/assets/agentImages/icon-rated.svg";
import { Link, useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const navigate = useNavigate();

  const props = [
    {
      icon: secureIcon,
      title: "Secure",
    },
    {
      icon: trustedIcon,
      title: "Trusted",
    },
    {
      icon: ratedIcon,
      title: "Rated",
    },
  ];

  return (
    <div className="text-text-primary px-6 mb-10 w-full flex items-center flex-col justify-center">
      <div>
        <img src={roleImg} alt="" />
      </div>

      <p className="w-[157px] text-[14px] mx-auto text-center mt-8">
        List properties. Get buyers. Get paid securely.
      </p>

      <div className="space-y-4 w-full mt-8">
        <div className="space-y-3 border-black">
          {/* continue as agent */}
          <button
            onClick={() => navigate("/signup/agent")}
            className="button-style h-[45px] flex items-center justify-center rounded-lg gap-2 w-full cursor-pointer"
          >
            <img src={asAgentIcon} alt="" />
            <p className="text-[14px] font-raleway tracking-[1px] font-semibold text-white">
              Continue as Agent
            </p>
          </button>

          {/* continue as buyer */}
          <button
            onClick={() => navigate("/signup/user")}
            className="h-[45px] flex items-center justify-center rounded-lg gap-2 w-full border border-text-secondary bg-button-disabled cursor-pointer"
          >
            <img src={asBuyerIcon} alt="" />
            <p className="text-[14px] font-raleway tracking-[1px] font-semibold">
              Continue as Buyer
            </p>
          </button>
        </div>

        <p className="text-[12px] leading-4 text-text-secondary text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-[#274AD0]">
            Login
          </Link>
        </p>
      </div>

      <div className="mt-[69px] flex items-center justify-center gap-[56px] w-full">
        {props.map((prop, index) => (
          <div key={index} className="flex items-center gap-2">
            <img src={prop.icon} alt="" />
            <p className="text-[12px] leading-4">{prop.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

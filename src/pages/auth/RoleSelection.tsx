import roleImg from "@/assets/agentImages/img-signup-as.png"
import asAgentIcon from "@/assets/agentImages/icon-continue-as-agent.svg"
import asBuyerIcon from "@/assets/agentImages/icon-continue-as-buyer.svg"
import secureIcon from "@/assets/agentImages/icon-secure.svg"
import trustedIcon from "@/assets/agentImages/icon-trusted.svg"
import ratedIcon from "@/assets/agentImages/icon-rated.svg"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function RoleSelection() {
  const navigate = useNavigate()

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
  ]

  return (
    <div className="mb-10 flex w-full flex-col items-center justify-center px-6 text-text-primary">
      <div>
        <img src={roleImg} alt="" className="h-full w-full" />
      </div>

      <p className="mx-auto mt-8 w-[157px] text-center text-[14px]">
        List properties. Get buyers. Get paid securely.
      </p>

      <div className="mt-8 w-full space-y-4">
        <div className="space-y-3 border-black">
          {/* continue as agent */}
          <Button
            variant="app-primary"
            size="full"
            onClick={() => navigate("/signup/agent")}
          >
            <img src={asAgentIcon} alt="" />
            <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-white">
              Continue as Agent
            </p>
          </Button>

          {/* continue as buyer */}
          <Button
            variant="app-secondary"
            size="full"
            onClick={() => navigate("/signup/user")}
          >
            <img src={asBuyerIcon} alt="" />
            <p className="font-raleway text-[14px] font-semibold tracking-[1px]">
              Continue as Buyer
            </p>
          </Button>
        </div>

        <p className="text-center text-[12px] leading-4 text-text-secondary">
          Already have an account?{" "}
          <Link to="/login" className="text-[#274AD0]">
            Login
          </Link>
        </p>
      </div>

      <div className="mt-[69px] flex w-full items-center justify-center gap-[56px]">
        {props.map((prop, index) => (
          <div key={index} className="flex items-center gap-2">
            <img src={prop.icon} alt="" />
            <p className="text-[12px] leading-4">{prop.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

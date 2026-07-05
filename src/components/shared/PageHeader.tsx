import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"

interface PageHeaderProps {
  title: string
  /** Override default navigate(-1) behavior, e.g. to go to a specific route */
  onBack?: () => void
  /** Use the larger md/lg sizing seen on TransactionDetails. Default: false */
  responsive?: boolean
}

export default function PageHeader({
  title,
  onBack,
  responsive = false,
}: PageHeaderProps) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }

  return (
    <div className="relative flex items-center justify-center">
      <button onClick={handleBack} className="absolute left-0 cursor-pointer">
        <img
          src={goBack}
          alt=""
          className={responsive ? "h-6 w-6 md:h-8 md:w-8" : "h-6 w-6"}
        />
      </button>

      <p
        className={
          responsive
            ? "font-raleway text-[18px] font-semibold tracking-[1px] md:text-[22px]"
            : "font-raleway text-[18px] font-semibold tracking-[1px]"
        }
      >
        {title}
      </p>
    </div>
  )
}

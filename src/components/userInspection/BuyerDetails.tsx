import userIcon from "@/assets/images/icon-inspection-schedule-user.svg"
import phoneIcon from "@/assets/images/icon-inspection-schedule-phone.svg"
import emailIcon from "@/assets/images/icon-inspection-schedule-email.svg"

export default function BuyerDetails() {
  const buyerDetails = [
    {
      icon: userIcon,
      title: "Name",
      detail: "Victoria Ntekim",
    },
    {
      icon: phoneIcon,
      title: "Phone Number",
      detail: "08152833119",
    },
    {
      icon: emailIcon,
      title: "Email",
      detail: "etimvictoria62@gmail.com",
    },
  ]

  return (
    <div>
      <p>Buyer Details</p>

      <div className="mt-2 space-y-4">
        {buyerDetails.map((buyerDetail, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-bg-accent">
              <img src={buyerDetail.icon} alt="" />
            </div>

            <div>
              <p className="text-[14px]">{buyerDetail.title}</p>
              <p className="text-[14px] font-semibold">{buyerDetail.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

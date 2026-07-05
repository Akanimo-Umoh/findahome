import userIcon from "@/assets/images/icon-inspection-schedule-user.svg"
import phoneIcon from "@/assets/images/icon-inspection-schedule-phone.svg"
import emailIcon from "@/assets/images/icon-inspection-schedule-email.svg"

interface ContactDetailsProps {
  label: string
  name: string
  phone: string
  email: string
}

export default function ContactDetails({
  label,
  name,
  phone,
  email,
}: ContactDetailsProps) {
  const items = [
    { icon: userIcon, title: "Name", detail: name },
    { icon: phoneIcon, title: "Phone Number", detail: phone },
    { icon: emailIcon, title: "Email", detail: email },
  ]

  return (
    <section className="md:rounded-xl md:border md:border-bg-accent md:p-2 lg:p-3">
      <p>{label}</p>
      <div className="mt-2 space-y-4">
        {items.map((item) => (
          <div key={item.title} className="flex items-center gap-2">
            <div className="flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-bg-accent">
              <img src={item.icon} alt="" />
            </div>

            <div>
              <p className="text-[14px]">{item.title}</p>

              <p className="text-[14px] font-semibold">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

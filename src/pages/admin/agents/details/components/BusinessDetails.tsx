import AdminSection from "@/components/admin/ui/AdminSection"
import type { AdminUser } from "@/types/adminUser"

const Chips = ({ items }: { items?: string[] }) =>
  items?.length ? (
    <span className="flex flex-wrap justify-end gap-1.5">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[12.5px] font-semibold text-text-primary"
        >
          {item}
        </span>
      ))}
    </span>
  ) : (
    "—"
  )

// Everything the agent typed in the onboarding form, so the admin reviews the same answers the agent gave.
export default function BusinessDetails({ agent }: { agent: AdminUser }) {
  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "Business name", value: agent.businessName || "—" },
    { label: "License number", value: agent.licenseNumber || "—" },
    { label: "Office address", value: agent.officeAddress || "—" },
    {
      label: "Years of experience",
      value: agent.yearsOfExperience ? `${agent.yearsOfExperience}` : "—",
    },
    { label: "Service areas", value: <Chips items={agent.serviceArea} /> },
    { label: "Languages", value: <Chips items={agent.languages} /> },
    {
      label: "Website or social link",
      value: agent.socialLinkOrWebsite ? (
        <a
          href={
            /^https?:\/\//i.test(agent.socialLinkOrWebsite)
              ? agent.socialLinkOrWebsite
              : `https://${agent.socialLinkOrWebsite}`
          }
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-button-bg underline-offset-4 hover:underline"
        >
          {agent.socialLinkOrWebsite}
        </a>
      ) : (
        "—"
      ),
    },
  ]

  return (
    <AdminSection title="Business Details">
      <dl className="divide-y divide-slate-100 text-[14px]">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-start justify-between gap-6 py-2.5"
          >
            <dt className="shrink-0 text-text-secondary">{row.label}</dt>
            <dd className="min-w-0 text-right wrap-break-word text-text-primary">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </AdminSection>
  )
}

import { Eye, FileText } from "lucide-react"
import AdminSection from "@/components/admin/ui/AdminSection"
import type { AdminUser } from "@/types/adminUser"
import { agentDocuments } from "../../agentMeta"

const isPdf = (url: string) => /\.pdf($|\?)/i.test(url)

export default function DocumentsPanel({ agent }: { agent: AdminUser }) {
  const docs = agentDocuments(agent)
  const submitted = docs.filter((d) => d.url).length

  return (
    <AdminSection title="Verification Documents">
      <p className="-mt-2 mb-3 text-[13px] text-text-secondary">
        {submitted} of {docs.length} documents submitted at onboarding
      </p>

      <ul className="space-y-3">
        {docs.map((doc) => (
          <li
            key={doc.key}
            className="flex items-center gap-3 rounded-xl border border-slate-200 p-3"
          >
            <span className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100 text-slate-400">
              {doc.url && !isPdf(doc.url) ? (
                <img
                  src={doc.url}
                  alt=""
                  loading="lazy"
                  className="size-full object-cover"
                />
              ) : (
                <FileText size={22} aria-hidden />
              )}
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-semibold text-text-primary">
                {doc.label}
              </p>
              <p className="text-[12.5px] text-text-secondary">
                {doc.url ? "Submitted" : "Not submitted"} · {doc.hint}
              </p>
            </div>

            {doc.url && (
              <a
                href={doc.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${doc.label}`}
                className="flex size-9 items-center justify-center rounded-lg text-text-secondary outline-none hover:bg-slate-100 hover:text-text-primary focus-visible:ring-2 focus-visible:ring-button-bg/40"
              >
                <Eye size={18} aria-hidden />
              </a>
            )}
          </li>
        ))}
      </ul>

      <p className="mt-3 text-[12.5px] text-text-secondary">
        Verification is one decision for the agent. The backend doesn&rsquo;t
        track each document separately.
      </p>
    </AdminSection>
  )
}

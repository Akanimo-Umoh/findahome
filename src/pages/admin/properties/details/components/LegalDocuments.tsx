import { ExternalLink, FileText } from "lucide-react"
import AdminSection from "@/components/admin/ui/AdminSection"

// The checklist says "Ownership documents verified": this is where you check.
export default function LegalDocuments({ documents }: { documents: string[] }) {
  return (
    <AdminSection title="Ownership documents">
      {documents.length === 0 ? (
        <p className="text-[14px] text-text-secondary">
          The agent didn&rsquo;t upload any documents.
        </p>
      ) : (
        <ul className="grid gap-2 sm:grid-cols-2">
          {documents.map((url, i) => (
            <li key={url + i}>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2.5 text-[14px] font-semibold text-text-primary outline-none hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-button-bg/40"
              >
                <FileText size={17} aria-hidden className="text-button-bg" />
                <span className="flex-1 truncate">Document {i + 1}</span>
                <ExternalLink
                  size={14}
                  aria-hidden
                  className="text-text-secondary"
                />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </AdminSection>
  )
}

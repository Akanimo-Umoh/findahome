import { StickyNote } from "lucide-react"

type Note = {
  _id: string
  note: string
  createdAt: string
  author?: { name?: string } | string
}

const authorName = (author: Note["author"]) =>
  typeof author === "object" && author?.name ? author.name : "Admin"

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

export default function ListingAdminNotes({ notes }: { notes?: Note[] }) {
  if (!notes?.length) return null
  // newest first
  const sorted = [...notes].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  )

  return (
    <section className="mt-4 rounded-lg bg-amber-50 px-3 py-2.5 text-[13px] text-amber-900 md:text-[14px]">
      <p className="flex items-center gap-1 font-semibold">
        <StickyNote size={14} aria-hidden /> Notes from the admin
      </p>
      <ul className="mt-2 space-y-2">
        {sorted.map((n) => (
          <li key={n._id}>
            <p className="break-words whitespace-pre-wrap">{n.note}</p>
            <p className="text-amber-700">
              {authorName(n.author)} · {formatDate(n.createdAt)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}

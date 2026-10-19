import { useState } from "react"
import { Plus } from "lucide-react"
import AdminSection from "@/components/admin/ui/AdminSection"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { timeAgo } from "@/lib/adminFormat"
import type { AdminNote, AdminProperty } from "@/types/adminProperty"
import { useAddNote } from "../../shared/useModeration"

const authorName = (author: AdminNote["author"]) =>
  typeof author === "object" && author?.name ? author.name : "Admin"

export default function AdminNotes({ property }: { property: AdminProperty }) {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")
  const addNote = useAddNote(property._id)
  const notes = property.adminNotes ?? []

  const close = () => {
    setOpen(false)
    setText("")
  }

  return (
    <AdminSection title="Admin Notes">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[13px] text-text-secondary">Send notes to agents</p>
        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex cursor-pointer items-center gap-1 rounded text-[13px] font-semibold text-button-bg outline-none hover:underline focus-visible:ring-2 focus-visible:ring-button-bg/40"
          >
            <Plus size={14} aria-hidden />
            Add
          </button>
        )}
      </div>

      {open && (
        <div className="mt-3">
          <Textarea
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a note about this listing…"
            aria-label="Note"
            className="min-h-28"
          />
          <div className="mt-3 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={close}
              disabled={addNote.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="app-primary"
              disabled={!text.trim() || addNote.isPending}
              onClick={() => addNote.mutate(text.trim(), { onSuccess: close })}
            >
              {addNote.isPending ? "Saving…" : "Save Note"}
            </Button>
          </div>
        </div>
      )}

      {notes.length > 0 && (
        <ul className="mt-4 divide-y divide-slate-100">
          {notes.map((n) => (
            <li key={n._id} className="py-3 first:pt-0 last:pb-0">
              <p className="text-[14px] whitespace-pre-wrap text-text-primary">
                {n.note}
              </p>
              <p className="mt-1 text-[12.5px] text-text-secondary">
                {authorName(n.author)}, {timeAgo(n.createdAt)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </AdminSection>
  )
}

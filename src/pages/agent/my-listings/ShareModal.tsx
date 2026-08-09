import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import { toast } from "sonner"
import { Copy, Check } from "lucide-react"

type ShareModalProps = {
  isOpen: boolean
  onClose: () => void
  url: string
  title: string
}

const shareTargets = [
  {
    name: "WhatsApp",
    color: "bg-[#25D366]",
    getUrl: (url: string, title: string) =>
      `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="h-6 w-6">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.13h-.01c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.26-8.24 4.55 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    color: "bg-[#1877F2]",
    getUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="h-6 w-6">
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z" />
      </svg>
    ),
  },
  {
    name: "X",
    color: "bg-black",
    getUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5">
        <path d="M18.9 2H22l-7.6 8.7L23.3 22H16.6l-5.2-6.8L5.4 22H2.3l8.2-9.3L1.7 2h6.9l4.7 6.2L18.9 2zm-1.2 18h1.7L7.4 4H5.5l12.2 16z" />
      </svg>
    ),
  },
  {
    name: "Telegram",
    color: "bg-[#26A5E4]",
    getUrl: (url: string, title: string) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="h-6 w-6">
        <path d="M21.9 4.3 18.6 20c-.25 1.1-1 1.36-2 .85l-5.5-4.05-2.65 2.55c-.3.3-.55.55-1.1.55l.4-5.6L18 6.5c.45-.4-.1-.6-.7-.2L6.5 13.4 1 11.7c-1.2-.37-1.2-1.2.25-1.78L20.5 2.55c1-.36 1.9.24 1.4 1.75z" />
      </svg>
    ),
  },
]

export default function ShareModal({
  isOpen,
  onClose,
  url,
  title,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    toast.success("Link copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShareClick = (getUrl: (url: string, title: string) => string) => {
    window.open(
      getUrl(url, title),
      "_blank",
      "noopener,noreferrer,width=600,height=500"
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100%-48px)] max-w-md rounded-2xl p-6 font-ssPro text-text-primary">
        <DialogTitle className="text-center font-raleway text-[16px] font-semibold tracking-[1px]">
          Share
        </DialogTitle>

        <div className="mt-4 flex items-center justify-center gap-4">
          {shareTargets.map((target) => (
            <button
              key={target.name}
              type="button"
              onClick={() => handleShareClick(target.getUrl)}
              className="flex cursor-pointer flex-col items-center gap-1.5"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${target.color}`}
              >
                {target.icon}
              </div>
              <span className="text-[11px] text-text-secondary">
                {target.name}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2 rounded-lg border border-bg-accent px-3 py-2">
          <p className="flex-1 truncate text-[12px] text-text-secondary">
            {url}
          </p>
          <button
            type="button"
            onClick={handleCopy}
            className="flex shrink-0 cursor-pointer items-center gap-1 rounded-md bg-button-bg px-3 py-1.5 text-[12px] font-semibold text-white"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

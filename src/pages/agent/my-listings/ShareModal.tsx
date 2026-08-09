import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import { toast } from "sonner"
import { Copy, Check } from "lucide-react"
import { FaWhatsapp, FaFacebook, FaXTwitter, FaTelegram } from "react-icons/fa6"

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
    Icon: FaWhatsapp,
  },
  {
    name: "Facebook",
    color: "bg-[#1877F2]",
    getUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    Icon: FaFacebook,
  },
  {
    name: "X",
    color: "bg-black",
    getUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    Icon: FaXTwitter,
  },
  {
    name: "Telegram",
    color: "bg-[#26A5E4]",
    getUrl: (url: string, title: string) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    Icon: FaTelegram,
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
          {shareTargets.map(({ name, color, getUrl, Icon }) => (
            <button
              key={name}
              type="button"
              onClick={() => handleShareClick(getUrl)}
              className="flex cursor-pointer flex-col items-center gap-1.5"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${color}`}
              >
                <Icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-[11px] text-text-secondary">{name}</span>
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
            className="flex shrink-0 cursor-pointer items-center gap-1 rounded-md bg-button-bg px-3 py-1.5 text-[12px] font-semibold text-white hover:opacity-85"
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

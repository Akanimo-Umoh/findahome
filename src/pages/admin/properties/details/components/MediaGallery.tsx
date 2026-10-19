import { useState } from "react"
import { ChevronLeft, ChevronRight, ImageOff, Video } from "lucide-react"
import { cn } from "@/lib/utils"

type MediaGalleryProps = {
  images: string[]
  title: string
  hasVideo: boolean
}

const goTo = (id: string) =>
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" })

// Photos only. The video lives in its own "Video tour" panel below; the chip
// here just jumps to it.
export default function MediaGallery({
  images,
  title,
  hasVideo,
}: MediaGalleryProps) {
  const [index, setIndex] = useState(0)
  const count = images.length

  if (count === 0) {
    return (
      <div className="flex aspect-16/10 flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 text-text-secondary">
        <ImageOff size={28} aria-hidden />
        <p className="text-[14px]">No photos were uploaded for this listing</p>
      </div>
    )
  }

  const current = Math.min(index, count - 1)
  const step = (delta: number) => setIndex((current + delta + count) % count)

  const arrow =
    "absolute top-1/2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-text-primary shadow-sm outline-none transition hover:bg-white focus-visible:ring-2 focus-visible:ring-button-bg"

  return (
    <div className="space-y-3">
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label={`Photos of ${title}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") step(-1)
          if (e.key === "ArrowRight") step(1)
        }}
        className="relative aspect-16/10 overflow-hidden rounded-xl bg-slate-100 outline-none focus-visible:ring-2 focus-visible:ring-button-bg"
      >
        <img
          src={images[current]}
          alt={`${title}, photo ${current + 1} of ${count}`}
          className="size-full object-cover"
        />

        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => step(-1)}
              className={cn(arrow, "left-3")}
            >
              <ChevronLeft size={20} aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => step(1)}
              className={cn(arrow, "right-3")}
            >
              <ChevronRight size={20} aria-hidden />
            </button>
          </>
        )}

        <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-[12px] font-semibold text-white tabular-nums">
          {current + 1}/{count}
        </span>

        {hasVideo && (
          <button
            type="button"
            onClick={() => goTo("video-tour")}
            className="absolute right-3 bottom-3 flex cursor-pointer items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[12.5px] font-semibold text-text-primary shadow-sm outline-none hover:bg-white focus-visible:ring-2 focus-visible:ring-button-bg"
          >
            <Video size={14} aria-hidden />
            Watch video tour
          </button>
        )}
      </div>

      {count > 1 && (
        <ul className="flex gap-2.5 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <li key={src + i} className="shrink-0">
              <button
                type="button"
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === current}
                onClick={() => setIndex(i)}
                className={cn(
                  "block h-16 w-24 cursor-pointer overflow-hidden rounded-lg ring-2 ring-offset-2 transition outline-none focus-visible:ring-button-bg",
                  i === current
                    ? "ring-button-bg"
                    : "opacity-70 ring-transparent hover:opacity-100"
                )}
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="size-full object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

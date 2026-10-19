import { useState } from "react"
import AdminSection from "@/components/admin/ui/AdminSection"
import { cn } from "@/lib/utils"

// A listing can have several videos; show one player with a switcher.
// Nothing renders when there are none.
export default function VideoTour({ videos }: { videos: string[] }) {
  const [active, setActive] = useState(0)
  if (videos.length === 0) return null

  const current = Math.min(active, videos.length - 1)

  return (
    // scroll-mt clears the pinned header when "Watch video tour" jumps here
    <div id="video-tour" className="scroll-mt-48">
      <AdminSection title="Video tour">
        <video
          key={videos[current]}
          src={videos[current]}
          controls
          playsInline
          preload="metadata"
          className="aspect-video w-full rounded-lg bg-black"
        >
          Your browser can&rsquo;t play this video.{" "}
          <a href={videos[current]} target="_blank" rel="noreferrer">
            Open it in a new tab
          </a>
          .
        </video>

        {videos.length > 1 && (
          <div
            role="group"
            aria-label="Choose a video"
            className="mt-3 flex flex-wrap gap-2"
          >
            {videos.map((src, i) => (
              <button
                key={src}
                type="button"
                aria-pressed={i === current}
                onClick={() => setActive(i)}
                className={cn(
                  "h-8 cursor-pointer rounded-lg px-3 text-[13px] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-button-bg/40",
                  i === current
                    ? "bg-bg-accent text-button-bg"
                    : "text-text-secondary hover:bg-slate-50 hover:text-text-primary"
                )}
              >
                Video {i + 1}
              </button>
            ))}
          </div>
        )}
      </AdminSection>
    </div>
  )
}

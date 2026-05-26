import { useState } from "react"
import leftArrow from "@/assets/agentImages/icon-leftArrow.svg"
import rightArrow from "@/assets/images/icon-right-carousel.svg"
import videoIcon from "@/assets/images/icon-video-available.svg"

type Slide = { type: "image"; url: string } | { type: "video"; url: string }

type ImageCarouselProps = {
  images: string[]
  video?: string | string[] | null
}

export default function ImageCarousel({ images, video }: ImageCarouselProps) {
  const videoUrl = Array.isArray(video) ? (video[0] ?? null) : (video ?? null)

  const slides: Slide[] = [
    ...images.map((url) => ({ type: "image" as const, url })),
    ...(videoUrl ? [{ type: "video" as const, url: videoUrl }] : []),
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const currentSlide = slides[currentIndex]
  const isVideoSlide = currentSlide.type === "video"
  const hasVideo = !!videoUrl

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  // guard: if somehow images is empty and no video, show nothing
  if (slides.length === 0) {
    return (
      <div className="flex h-[202px] w-full items-center justify-center rounded-2xl bg-bg-accent">
        <p className="text-[12px] text-text-secondary">No images available</p>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* slide */}
      {isVideoSlide ? (
        <video
          src={currentSlide.url}
          controls
          className="h-[202px] w-full rounded-2xl object-cover"
        />
      ) : (
        <img
          src={currentSlide.url}
          alt={`Property image ${currentIndex + 1}`}
          className="h-[202px] w-full rounded-2xl object-cover"
        />
      )}

      {/* left button */}
      <button
        type="button"
        onClick={goToPrev}
        disabled={slides.length <= 1}
        className="absolute top-1/2 left-[11px] -translate-y-1/2 rounded-full bg-bg-accent p-2 disabled:opacity-40"
      >
        <img src={leftArrow} alt="Previous" />
      </button>

      {/* right button */}
      <button
        type="button"
        onClick={goToNext}
        disabled={slides.length <= 1}
        className="absolute top-1/2 right-[11px] -translate-y-1/2 rounded-full bg-bg-accent p-2 disabled:opacity-40"
      >
        <img src={rightArrow} alt="Next" />
      </button>

      {/* video available badge — only on image slides when video exists */}
      {hasVideo && !isVideoSlide && (
        <div className="absolute right-[11px] bottom-[19px] flex items-center justify-center gap-1 rounded-xl bg-[#E2EEFF4D] p-2 backdrop-blur-sm">
          <img src={videoIcon} alt="" className="hidden sm:flex" />
          <p className="text-[14px] text-text-secondary">Video available</p>
        </div>
      )}

      {/* slide counter */}
      <div className="absolute bottom-[21px] left-1/2 flex h-8 w-[33px] -translate-x-1/2 items-center justify-center rounded-2xl bg-bg-accent">
        <p className="text-[12px] text-text-primary">
          {currentIndex + 1}/{slides.length}
        </p>
      </div>
    </div>
  )
}

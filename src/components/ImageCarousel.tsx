import { useState } from "react"
import leftArrow from "@/assets/agentImages/icon-leftArrow.svg"
import rightArrow from "@/assets/images/icon-right-carousel.svg"

type Slide = { type: "image"; url: string } | { type: "video"; url: string }

type ImageCarouselProps = {
  images: string[]
  video?: string | string[] | null
}

export default function ImageCarousel({ images, video }: ImageCarouselProps) {
  const videoUrl = Array.isArray(video) ? (video[0] ?? null) : (video ?? null)

  const imageSlides: Slide[] = images.map((url) => ({
    type: "image" as const,
    url,
  }))

  const videoSlide: Slide[] = videoUrl
    ? [{ type: "video" as const, url: videoUrl }]
    : []

  // video first
  const slides: Slide[] = [...videoSlide, ...imageSlides]

  // image-only slides for fullscreen navigation
  const imageOnlySlides = imageSlides

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fullscreenIndex, setFullscreenIndex] = useState(0)

  const currentSlide = slides[currentIndex]
  const isVideoSlide = currentSlide?.type === "video"

  const goToPrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))

  const goToNext = () =>
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1))

  const openFullscreen = (imageUrl: string) => {
    const index = imageOnlySlides.findIndex((s) => s.url === imageUrl)
    setFullscreenIndex(index >= 0 ? index : 0)
    setIsFullscreen(true)
  }

  const fullscreenPrev = () =>
    setFullscreenIndex((prev) =>
      prev === 0 ? imageOnlySlides.length - 1 : prev - 1
    )

  const fullscreenNext = () =>
    setFullscreenIndex((prev) =>
      prev === imageOnlySlides.length - 1 ? 0 : prev + 1
    )

  // if somehow images is empty and no video, show nothing
  if (slides.length === 0) {
    return (
      <div className="flex h-[202px] w-full items-center justify-center rounded-2xl bg-bg-accent">
        <p className="text-[12px] text-text-secondary">No images available</p>
      </div>
    )
  }

  const showCarouselNav = slides.length > 1

  return (
    <>
      {/* carousel */}
      <div className="relative">
        {isVideoSlide ? (
          // video — plays inline, no fullscreen on click
          <video
            src={currentSlide.url}
            controls
            className="h-[202px] w-full rounded-2xl bg-black object-contain"
          />
        ) : (
          // image — opens fullscreen on click
          <img
            src={currentSlide.url}
            alt={`Property image ${currentIndex + 1}`}
            onClick={() => openFullscreen(currentSlide.url)}
            className="h-[202px] w-full cursor-zoom-in rounded-2xl bg-black object-contain"
          />
        )}

        {/* prev button — hidden when only one slide */}
        {showCarouselNav && (
          <button
            type="button"
            onClick={goToPrev}
            className="absolute top-1/2 left-[11px] -translate-y-1/2 cursor-pointer rounded-full bg-bg-accent p-2"
          >
            <img src={leftArrow} alt="Previous" />
          </button>
        )}

        {/* next button — hidden when only one slide */}
        {showCarouselNav && (
          <button
            type="button"
            onClick={goToNext}
            className="absolute top-1/2 right-[11px] -translate-y-1/2 cursor-pointer rounded-full bg-bg-accent p-2"
          >
            <img src={rightArrow} alt="Next" />
          </button>
        )}

        {/* counter — only shown when more than one slide */}
        {showCarouselNav && (
          <div className="absolute bottom-[21px] left-1/2 flex h-8 w-[33px] -translate-x-1/2 items-center justify-center rounded-2xl bg-bg-accent">
            <p className="text-[12px] text-text-primary">
              {currentIndex + 1}/{slides.length}
            </p>
          </div>
        )}
      </div>

      {/* fullscreen overlay — images only */}
      {isFullscreen && imageOnlySlides.length > 0 && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black">
          {/* header */}
          <div className="flex shrink-0 items-center justify-between px-4 pt-4 pb-2">
            <p className="text-[12px] text-white">
              {imageOnlySlides.length > 1
                ? `${fullscreenIndex + 1} / ${imageOnlySlides.length}`
                : ""}
            </p>
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/20 text-[18px] text-white"
            >
              ✕
            </button>
          </div>

          {/* image */}
          <div className="flex flex-1 items-center justify-center px-2">
            <img
              src={imageOnlySlides[fullscreenIndex].url}
              alt={`Property image ${fullscreenIndex + 1}`}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* navigation — only shown when more than one image */}
          {imageOnlySlides.length > 1 && (
            <div className="flex shrink-0 items-center justify-between px-4 py-6">
              <button
                type="button"
                onClick={fullscreenPrev}
                className="cursor-pointer rounded-full bg-white/20 p-2"
              >
                <img
                  src={leftArrow}
                  alt="Previous"
                  className="brightness-0 invert"
                />
              </button>

              <button
                type="button"
                onClick={fullscreenNext}
                className="cursor-pointer rounded-full bg-white/20 p-2"
              >
                <img
                  src={rightArrow}
                  alt="Next"
                  className="brightness-0 invert"
                />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}

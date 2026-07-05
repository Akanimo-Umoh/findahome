import { useState, useEffect, useRef } from "react"
import leftArrow from "@/assets/agentImages/icon-leftArrow.svg"
import rightArrow from "@/assets/images/icon-right-carousel.svg"
import Spinner from "@/components/Spinner"
import ImageFullscreen from "@/components/ImageFullscreen"

type ImageCarouselProps = {
  images: string[]
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fullscreenIndex, setFullscreenIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([]))
  const [fadeKey, setFadeKey] = useState(0)
  const preloadedRef = useRef<Set<number>>(new Set())

  useEffect(() => {
    if (!images.length) return
    images.forEach((url, index) => {
      if (preloadedRef.current.has(index)) return
      const img = new Image()
      img.src = url
      img.onload = () => {
        preloadedRef.current.add(index)
        setLoadedImages((prev) => new Set([...prev, index]))
      }
      img.onerror = () => {
        preloadedRef.current.add(index)
        setLoadedImages((prev) => new Set([...prev, index]))
      }
    })
  }, [images])

  if (!images.length) {
    return (
      <div className="flex h-50.5 w-full items-center justify-center rounded-2xl bg-bg-accent md:h-62.5 lg:h-[380px]">
        <p className="text-[12px] text-text-secondary">No images available</p>
      </div>
    )
  }

  const showNav = images.length > 1
  const isCurrentLoaded = loadedImages.has(currentIndex)

  const goTo = (index: number) => {
    setCurrentIndex(index)
    setFadeKey((k) => k + 1)
  }

  const goToPrev = () =>
    goTo(currentIndex === 0 ? images.length - 1 : currentIndex - 1)

  const goToNext = () =>
    goTo(currentIndex === images.length - 1 ? 0 : currentIndex + 1)

  const openFullscreen = () => {
    setFullscreenIndex(currentIndex)
    setIsFullscreen(true)
  }

  const fullscreenPrev = () =>
    setFullscreenIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))

  const fullscreenNext = () =>
    setFullscreenIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))

  return (
    <>
      {/* main carousel */}
      <div className="relative h-50.5 w-full overflow-hidden rounded-2xl bg-black md:h-62.5 lg:h-[380px]">
        {!isCurrentLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-bg-accent">
            <Spinner />
          </div>
        )}

        <img
          key={fadeKey}
          src={images[currentIndex]}
          alt={`Property image ${currentIndex + 1}`}
          onClick={openFullscreen}
          onLoad={() =>
            setLoadedImages((prev) => new Set([...prev, currentIndex]))
          }
          className={`h-full w-full cursor-zoom-in object-cover transition-opacity duration-300 ${
            isCurrentLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {showNav && (
          <>
            <button
              type="button"
              onClick={goToPrev}
              className="absolute top-1/2 left-[11px] -translate-y-1/2 cursor-pointer rounded-full bg-bg-accent p-2"
            >
              <img src={leftArrow} alt="Previous" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="absolute top-1/2 right-[11px] -translate-y-1/2 cursor-pointer rounded-full bg-bg-accent p-2"
            >
              <img src={rightArrow} alt="Next" />
            </button>
            <div className="absolute bottom-[21px] left-1/2 flex h-8 w-[33px] -translate-x-1/2 items-center justify-center rounded-2xl bg-bg-accent">
              <p className="text-[12px] text-text-primary">
                {currentIndex + 1}/{images.length}
              </p>
            </div>
          </>
        )}
      </div>

      {/* thumbnail strip — md only */}
      {images.length > 1 && (
        <div className="mt-3 hidden gap-2 overflow-x-auto md:flex lg:hidden">
          {images.map((url, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              className={`h-15 w-20 shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 ${
                currentIndex === index
                  ? "border-button-bg"
                  : "border-transparent"
              }`}
            >
              <img
                src={url}
                alt={`Thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* thumbnail strip — lg */}
      {images.length > 1 && (
        <div className="mt-3 hidden gap-2 overflow-x-auto lg:flex">
          {images.map((url, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              className={`h-20 w-[calc(25%-6px)] shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 ${
                currentIndex === index
                  ? "border-button-bg"
                  : "border-transparent"
              }`}
            >
              <img
                src={url}
                alt={`Thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* fullscreen */}
      {isFullscreen && (
        <ImageFullscreen
          images={images}
          currentIndex={fullscreenIndex}
          loadedImages={loadedImages}
          onClose={() => setIsFullscreen(false)}
          onPrev={fullscreenPrev}
          onNext={fullscreenNext}
          onThumbnailClick={setFullscreenIndex}
        />
      )}
    </>
  )
}

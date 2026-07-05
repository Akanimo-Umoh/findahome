import { useEffect } from "react"
import leftArrow from "@/assets/agentImages/icon-leftArrow.svg"
import rightArrow from "@/assets/images/icon-right-carousel.svg"
import Spinner from "@/components/Spinner"

type ImageFullscreenProps = {
  images: string[]
  currentIndex: number
  loadedImages: Set<number>
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  onThumbnailClick: (index: number) => void
}

export default function ImageFullscreen({
  images,
  currentIndex,
  loadedImages,
  onClose,
  onPrev,
  onNext,
  onThumbnailClick,
}: ImageFullscreenProps) {
  // lock background scroll while fullscreen is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 lg:p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="flex h-full w-full flex-col lg:h-auto lg:max-h-[90vh] lg:max-w-4xl lg:overflow-hidden lg:rounded-2xl lg:bg-black">
        {/* header */}
        <div className="flex shrink-0 items-center justify-between px-4 pt-4 pb-2">
          <p className="text-[12px] text-white">
            {images.length > 1 ? `${currentIndex + 1} / ${images.length}` : ""}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/20 text-[18px] text-white"
          >
            ✕
          </button>
        </div>

        {/* main image */}
        <div className="flex flex-1 items-center justify-center px-4 lg:min-h-[420px]">
          {loadedImages.has(currentIndex) ? (
            <img
              src={images[currentIndex]}
              alt={`Property image ${currentIndex + 1}`}
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <Spinner />
          )}
        </div>

        {/* mobile — arrow nav */}
        {images.length > 1 && (
          <div className="flex shrink-0 items-center justify-between px-4 py-6 lg:hidden">
            <button
              type="button"
              onClick={onPrev}
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
              onClick={onNext}
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

        {/* lg — thumbnail strip */}
        {images.length > 1 && (
          <div className="hidden shrink-0 gap-2 overflow-x-auto px-4 py-4 lg:flex">
            {images.map((url, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onThumbnailClick(index)}
                className={`h-16 w-24 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition-opacity ${
                  currentIndex === index
                    ? "border-white opacity-100"
                    : "border-transparent opacity-50 hover:opacity-80"
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
      </div>
    </div>
  )
}

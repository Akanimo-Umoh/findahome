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
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  const showNav = images.length > 1

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      {/* header — fixed height */}
      <div className="flex h-14 shrink-0 items-center justify-between px-4">
        <p className="text-[12px] text-white">
          {showNav ? `${currentIndex + 1} / ${images.length}` : ""}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/20 text-[18px] text-white"
        >
          ✕
        </button>
      </div>

      {/* main image — flex-1 fills remaining height between header and footer */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4">
        {showNav && (
          <button
            type="button"
            onClick={onPrev}
            className="absolute left-4 z-10 cursor-pointer rounded-full bg-white/20 p-2"
          >
            <img
              src={leftArrow}
              alt="Previous"
              className="brightness-0 invert"
            />
          </button>
        )}

        {loadedImages.has(currentIndex) ? (
          <img
            src={images[currentIndex]}
            alt={`Property image ${currentIndex + 1}`}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <Spinner />
        )}

        {showNav && (
          <button
            type="button"
            onClick={onNext}
            className="absolute right-4 z-10 cursor-pointer rounded-full bg-white/20 p-2"
          >
            <img src={rightArrow} alt="Next" className="brightness-0 invert" />
          </button>
        )}
      </div>

      {/* thumbnail strip — fixed height, only when multiple images */}
      {showNav && (
        <div className="flex h-24 shrink-0 items-center gap-2 overflow-x-auto px-4">
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
  )
}

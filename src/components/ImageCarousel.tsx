import { useState } from "react";
import leftArrow from "@/assets/agentImages/icon-leftArrow.svg";
import rightArrow from "@/assets/images/icon-right-carousel.svg";

type Slide = { type: "image"; url: string } | { type: "video"; url: string };

type ImageCarouselProps = {
  images: string[];
  video?: string | string[] | null;
};

export default function ImageCarousel({ images, video }: ImageCarouselProps) {
  const videoUrl = Array.isArray(video) ? (video[0] ?? null) : (video ?? null);

  const imageSlides: Slide[] = images.map((url) => ({
    type: "image" as const,
    url,
  }));

  const videoSlide: Slide[] = videoUrl
    ? [{ type: "video" as const, url: videoUrl }]
    : [];

  // video first
  const slides: Slide[] = [...videoSlide, ...imageSlides];

  // image-only slides for fullscreen navigation
  const imageOnlySlides = imageSlides;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

  const currentSlide = slides[currentIndex];
  const isVideoSlide = currentSlide?.type === "video";

  const goToPrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const goToNext = () =>
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  const openFullscreen = (imageUrl: string) => {
    const index = imageOnlySlides.findIndex((s) => s.url === imageUrl);
    setFullscreenIndex(index >= 0 ? index : 0);
    setIsFullscreen(true);
  };

  const fullscreenPrev = () =>
    setFullscreenIndex((prev) =>
      prev === 0 ? imageOnlySlides.length - 1 : prev - 1,
    );

  const fullscreenNext = () =>
    setFullscreenIndex((prev) =>
      prev === imageOnlySlides.length - 1 ? 0 : prev + 1,
    );

  // if somehow images is empty and no video, show nothing
  if (slides.length === 0) {
    return (
      <div className="rounded-2xl h-[202px] w-full bg-bg-accent flex items-center justify-center">
        <p className="text-text-secondary text-[12px]">No images available</p>
      </div>
    );
  }

  const showCarouselNav = slides.length > 1;

  return (
    <>
      {/* carousel */}
      <div className="relative">
        {isVideoSlide ? (
          // video — plays inline, no fullscreen on click
          <video
            src={currentSlide.url}
            controls
            className="rounded-2xl h-[202px] w-full object-contain bg-black"
          />
        ) : (
          // image — opens fullscreen on click
          <img
            src={currentSlide.url}
            alt={`Property image ${currentIndex + 1}`}
            onClick={() => openFullscreen(currentSlide.url)}
            className="rounded-2xl h-[202px] w-full object-contain bg-black cursor-zoom-in"
          />
        )}

        {/* prev button — hidden when only one slide */}
        {showCarouselNav && (
          <button
            type="button"
            onClick={goToPrev}
            className="p-2 bg-bg-accent absolute top-1/2 -translate-y-1/2 left-[11px] rounded-full cursor-pointer"
          >
            <img src={leftArrow} alt="Previous" />
          </button>
        )}

        {/* next button — hidden when only one slide */}
        {showCarouselNav && (
          <button
            type="button"
            onClick={goToNext}
            className="p-2 bg-bg-accent absolute top-1/2 -translate-y-1/2 right-[11px] rounded-full cursor-pointer"
          >
            <img src={rightArrow} alt="Next" />
          </button>
        )}

        {/* counter — only shown when more than one slide */}
        {showCarouselNav && (
          <div className="bg-bg-accent rounded-2xl w-[33px] h-8 flex items-center justify-center absolute bottom-[21px] left-1/2 -translate-x-1/2">
            <p className="text-[12px] text-text-primary">
              {currentIndex + 1}/{slides.length}
            </p>
          </div>
        )}
      </div>

      {/* fullscreen overlay — images only */}
      {isFullscreen && imageOnlySlides.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          {/* header */}
          <div className="flex items-center justify-between px-4 pt-4 pb-2 shrink-0">
            <p className="text-white text-[12px]">
              {imageOnlySlides.length > 1
                ? `${fullscreenIndex + 1} / ${imageOnlySlides.length}`
                : ""}
            </p>
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white text-[18px] cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* image */}
          <div className="flex-1 flex items-center justify-center px-2">
            <img
              src={imageOnlySlides[fullscreenIndex].url}
              alt={`Property image ${fullscreenIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* navigation — only shown when more than one image */}
          {imageOnlySlides.length > 1 && (
            <div className="flex items-center justify-between px-4 py-6 shrink-0">
              <button
                type="button"
                onClick={fullscreenPrev}
                className="p-2 bg-white/20 rounded-full cursor-pointer"
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
                className="p-2 bg-white/20 rounded-full cursor-pointer"
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
  );
}

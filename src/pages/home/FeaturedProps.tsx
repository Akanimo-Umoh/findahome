// import property from "@/assets/images/property.jpg"
// import landImg from "@/assets/images/img-land.jpg"
// import naira from "@/assets/images/naira.svg"
// import location from "@/assets/images/location.svg"
// import bed from "@/assets/images/bed.svg"
// import tubs from "@/assets/images/tubs.svg"
// import agentAvatar from "@/assets/images/agentAvatar.jpg"
// import favoriteIcon from "@/assets/images/icon-add-to-favorite.svg"
// // import verifiedIcon from "@/assets/images/icon-verified.svg"
// // import heartIcon from "@/assets/images/icon-heart.svg";

// export default function FeaturedProps() {
//   const featured = [
//     {
//       property_image: property,
//       title: "4 Bedroom Apartment",
//       value: "800k",
//       location: "Lekki Phase 1, Lagos",
//       bedroom: "2",
//       bathroom: "2",
//       avatar: agentAvatar,
//       listed_by: "MaryAnn Kikomu",
//     },
//     {
//       property_image: landImg,
//       title: "800 Sqm of Land",
//       value: "30M",
//       location: "Lekki Phase 1, Lagos",
//       landType: "Residential Land",
//       avatar: agentAvatar,
//       listed_by: "MaryAnn Kikomu",
//     },
//     {
//       property_image: property,
//       title: "4 Bedroom Apartment",
//       value: "800k",
//       location: "Lekki Phase 1, Lagos",
//       bedroom: "2",
//       bathroom: "2",
//       avatar: agentAvatar,
//       listed_by: "MaryAnn Kikomu",
//     },
//     {
//       property_image: property,
//       title: "4 Bedroom Apartment",
//       value: "800k",
//       location: "Lekki Phase 1, Lagos",
//       bedroom: "2",
//       bathroom: "2",
//       avatar: agentAvatar,
//       listed_by: "MaryAnn Kikomu",
//     },
//     {
//       property_image: property,
//       title: "4 Bedroom Apartment",
//       value: "800k",
//       location: "Lekki Phase 1, Lagos",
//       bedroom: "2",
//       bathroom: "2",
//       avatar: agentAvatar,
//       listed_by: "MaryAnn Kikomu",
//     },
//     {
//       property_image: property,
//       title: "4 Bedroom Apartment",
//       value: "800k",
//       location: "Lekki Phase 1, Lagos",
//       bedroom: "2",
//       bathroom: "2",
//       avatar: agentAvatar,
//       listed_by: "MaryAnn Kikomu",
//     },
//   ]

//   return (
//     <div className="text-text-100 mx-auto max-w-7xl">
//       <div className="flex flex-col items-center justify-center">
//         <p className="font-raleway text-[18px] font-semibold tracking-[1px] md:text-[36px]">
//           Featured Properties
//         </p>
//         <p className="font-ssPro text-xs text-text-secondary md:text-sm">
//           Handpicked for you
//         </p>
//       </div>

//       {/* featured container */}
//       <div className="mt-6 flex items-center justify-center md:mx-8 md:mt-12">
//         <div className="hideScroll flex w-full gap-6 overflow-x-auto overscroll-x-contain px-6 md:grid md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] md:items-center md:justify-between md:overflow-hidden md:px-0 lg:grid-cols-3">
//           {featured.map((feature, index) => (
//             <div
//               key={index}
//               className="mx-auto w-36.5 max-w-112.5 shrink-0 md:w-full md:min-w-0"
//             >
//               <div className="h-32.5 w-full overflow-hidden rounded-t-2xl md:h-62.5">
//                 <img
//                   src={feature.property_image}
//                   alt="property"
//                   className="h-32.5 w-36.5 object-cover md:h-full md:w-full"
//                 />
//               </div>

//               <div className="mt-1 space-y-2 md:mt-0 md:rounded-b-2xl md:border md:border-bg-accent md:p-3">
//                 <div className="space-y-1 font-raleway text-[12px] font-semibold tracking-[1px] md:flex md:items-center md:justify-between md:gap-1 md:space-y-0 md:text-[16px] md:font-medium">
//                   <p className="line-clamp-2 h-9 text-black md:line-clamp-1 md:h-auto md:flex-1">
//                     {feature.title}
//                   </p>
//                   <p className="flex items-center text-button-bg md:w-fit">
//                     <img src={naira} alt="naira" /> {feature.value}
//                   </p>
//                 </div>

//                 <div className="space-y-1 md:space-y-2">
//                   <div className="flex flex-col justify-center gap-2 font-ssPro text-[12px] text-text-secondary md:flex-row md:justify-between md:gap-4 md:text-[14px]">
//                     <div className="flex h-9 items-center gap-1 md:h-auto md:flex-1">
//                       <img src={location} alt="" />
//                       <p className="line-clamp-2 md:line-clamp-1">
//                         {feature.location}
//                       </p>
//                     </div>

//                     {feature.landType ? (
//                       <div className="flex items-center">
//                         <p>{feature.landType}</p>
//                       </div>
//                     ) : (
//                       <div className="flex items-center gap-2">
//                         <div className="flex items-center gap-1">
//                           <img src={bed} alt="" />{" "}
//                           <p>
//                             <span className="font-semibold text-text-primary">
//                               {feature.bedroom}
//                             </span>{" "}
//                             Beds
//                           </p>
//                         </div>

//                         <div className="flex items-center gap-1">
//                           <img src={tubs} alt="" />{" "}
//                           <p>
//                             <span className="font-semibold text-text-primary">
//                               {feature.bathroom}
//                             </span>{" "}
//                             Baths
//                           </p>
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   <div className="md:flex md:items-end md:justify-between">
//                     <div className="flex items-center gap-0.5 md:flex-col md:items-start md:justify-center">
//                       <img
//                         src={feature.avatar}
//                         alt="agent"
//                         className="h-5 w-5 shrink-0 rounded-full object-cover md:h-12.5 md:w-12.5"
//                       />

//                       <div className="font-ssPro text-[12px] md:text-[14px]">
//                         <p className="text-text-secondary">
//                           <span className="md:hidden">Listed by</span>
//                           <span className="hidden md:flex">Agent</span>
//                         </p>
//                         <p className="line-clamp-1 font-semibold text-black">
//                           {feature.listed_by}
//                         </p>
//                       </div>
//                     </div>

//                     <img
//                       src={favoriteIcon}
//                       alt=""
//                       className="hidden cursor-pointer md:flex"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <button className="mt-2 h-11.25 w-full cursor-pointer rounded-lg border border-button-bg bg-button-disabled font-raleway text-sm font-semibold tracking-[1px] text-text-primary md:hidden">
//                 View Details
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useProperties } from "@/hooks/useProperties"
import PropertyCardCtn from "@/components/shared/PropertyCardCtn"
import PropertyCardSkeleton from "@/components/PropertyCardSkeleton"

// Card widths inside the rail (percentages are of the rail's content box):
// mobile  -> 78% wide, so the next card peeks in and invites a swipe
// sm      -> exactly 2 cards per view
// lg+     -> exactly 3 cards per view (gap-6 = 1.5rem)
const itemClass =
  "flex w-[78%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"

export default function FeaturedProps() {
  const { properties, loading, error } = useProperties()

  // TODO: replace with whatever makes a property "featured" in your data,
  // e.g. properties.filter((p) => p.isFeatured). Slicing the list just shows
  // the first six (which overlap with the "Available Properties" section).
  const featured = properties.slice(0, 6)

  const railRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  // Reads the scroll position and enables/disables the arrows
  const updateArrows = useCallback(() => {
    const el = railRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  // ResizeObserver calls back once when it starts observing, so the arrows are
  // correct on first paint and whenever the cards load or the screen resizes.
  // (setState happens in the callback, not synchronously in the effect body.)
  useEffect(() => {
    const el = railRef.current
    if (!el) return
    const observer = new ResizeObserver(updateArrows)
    observer.observe(el)
    return () => observer.disconnect()
  }, [updateArrows, featured.length, loading])

  const scrollRail = (direction: 1 | -1) => {
    const el = railRef.current
    if (!el) return
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    el.scrollBy({
      left: direction * el.clientWidth * 0.9,
      behavior: reduceMotion ? "auto" : "smooth",
    })
  }

  // Nothing to feature, so don't render an empty section
  if (!loading && !error && featured.length === 0) return null

  return (
    <div className="mx-auto max-w-7xl font-ssPro text-text-primary">
      {/* Header: centered title, arrows on the right from md up */}
      <div className="relative px-6 md:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="font-raleway text-[18px] font-semibold tracking-[1px] md:text-[36px]">
            Featured Properties
          </p>
          <p className="text-xs text-text-secondary md:text-sm">
            Handpicked for you
          </p>
        </div>

        {/* On touch screens people swipe, so arrows are for mouse users */}
        <div className="absolute right-8 bottom-0 hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={() => scrollRail(-1)}
            disabled={!canPrev}
            aria-label="Previous featured properties"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-bg-accent bg-white transition hover:bg-button-sec disabled:cursor-default disabled:opacity-40 disabled:hover:bg-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollRail(1)}
            disabled={!canNext}
            aria-label="Next featured properties"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-bg-accent bg-white transition hover:bg-button-sec disabled:cursor-default disabled:opacity-40 disabled:hover:bg-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {error ? (
        <div className="mt-6 px-6 text-center text-red-500 md:mt-12">
          Error: {error}
        </div>
      ) : (
        /* The rail: one design on every screen, snaps card by card */
        <div
          ref={railRef}
          onScroll={updateArrows}
          role="region"
          aria-label="Featured properties"
          tabIndex={0}
          className="hideScroll mt-6 flex snap-x snap-mandatory scroll-pl-6 gap-6 overflow-x-auto overscroll-x-contain px-6 pb-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-button-bg md:mt-12 md:scroll-pl-8 md:px-8"
        >
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className={itemClass}>
                  <PropertyCardSkeleton />
                </div>
              ))
            : featured.map((property) => (
                <div key={property._id} className={itemClass}>
                  <PropertyCardCtn property={property} />
                </div>
              ))}
        </div>
      )}
    </div>
  )
}

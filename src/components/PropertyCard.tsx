// import naira from "@/assets/images/naira.svg"
// import location from "@/assets/images/location.svg"
// import bed from "@/assets/images/bed.svg"
// import tubs from "@/assets/images/tubs.svg"
// // import verified from "@/assets/images/icon-verified.svg"
// import type { Property } from "@/types/property"
// // import agentAvatar from "@/assets/images/agentAvatar.jpg";
// import favoriteIcon from "@/assets/images/icon-add-to-favorite.svg"
// import Avatar from "./Avatar"
// import { useFavorite } from "@/hooks/useFavorite"
// import heartIcon from "@/assets/images/icon-heart.svg"
// import verifiedIcon from "@/assets/images/icon-verified-green.svg"
// import { Link } from "react-router-dom"

// type PropertyCardProps = {
//   property: Property
//   to: string
// }

// export default function PropertyCard({ property, to }: PropertyCardProps) {
//   const { isSaved, isLoading, toggleFavorite } = useFavorite(property._id)
//   const isLand = property.propertyType === "land"

//   return (
//     <div className="relative max-w-112.5 overflow-hidden rounded-2xl border border-bg-accent transition hover:shadow-lg">
//       <div className="relative">
//         <img
//           src={property.images[0]}
//           alt={property.title}
//           className="h-50 w-full object-cover md:h-62.5"
//         />
//       </div>

//       <div className="space-y-6 px-4 py-3 md:space-y-0 md:p-3">
//         <div className="space-y-2">
//           <div className="flex items-center justify-between gap-2">
//             <p className="line-clamp-1 flex-1 font-raleway text-[12px] font-semibold tracking-[1px] text-black md:text-[16px]">
//               {property.title}
//             </p>
//             <div className="flex w-fit items-center font-raleway text-[12px] font-semibold tracking-[1px] text-[#274AD0] md:text-[16px]">
//               <img src={naira} alt="naira" />
//               <p className="line-clamp-1">{property.price.toLocaleString()}</p>
//             </div>
//           </div>

//           <div className="flex flex-col gap-2">
//             <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
//               <div className="flex items-center gap-1 md:flex-1">
//                 <img src={location} alt="" className="h-4 w-4" />
//                 <p className="line-clamp-1 text-[12px] text-text-secondary md:text-[14px]">
//                   {property.address}
//                 </p>
//               </div>

//               {isLand ? (
//                 property.landType && (
//                   <div className="flex h-5 items-center text-[12px] text-text-secondary md:text-[14px]">
//                     Type:&nbsp;
//                     <span className="capitalize">{property.landType}</span>
//                   </div>
//                 )
//               ) : (
//                 <div className="flex h-5 items-center gap-2 text-[12px] text-text-secondary md:text-[14px]">
//                   <div className="flex items-center gap-1">
//                     <img src={bed} alt="" className="h-4 w-4" />
//                     <p>
//                       <span className="md:font-semibold">
//                         {property.bedroom}
//                       </span>{" "}
//                       Beds
//                     </p>
//                   </div>

//                   <div className="flex items-center gap-1">
//                     <img src={tubs} alt="" className="h-4 w-4" />
//                     <p>
//                       <span className="md:font-semibold">
//                         {property.bathroom}
//                       </span>{" "}
//                       Baths
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="md:flex md:items-end md:justify-between md:gap-2">
//               <div className="flex items-center gap-1 md:flex-col md:items-start">
//                 <div className="shrink-0">
//                   <Avatar
//                     name={property.owner.name ?? "?"}
//                     src={
//                       Array.isArray(property.owner.profilePicture)
//                         ? property.owner.profilePicture[0]
//                         : property.owner.profilePicture
//                     }
//                     size="xs"
//                   />
//                 </div>

//                 <div className="flex w-full flex-1 items-center gap-0.5 text-[12px] text-text-secondary md:flex-col md:items-start md:text-[14px]">
//                   <p className="flex items-center">
//                     <span className="md:hidden">Listed by</span>
//                     <span className="hidden md:flex">Agent</span>
//                   </p>

//                   <div className="flex flex-1 items-center gap-1">
//                     <span className="line-clamp-1 max-w-fit font-semibold text-black">
//                       {property.owner.name}
//                     </span>
//                     {/* verified badge */}
//                     {property.owner.isVerified && (
//                       <img
//                         src={verifiedIcon}
//                         alt="verified"
//                         className="h-5 w-5 md:h-6 md:w-6"
//                       />
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 disabled={isLoading}
//                 onClick={(e) => {
//                   e.preventDefault()
//                   e.stopPropagation()
//                   toggleFavorite()
//                 }}
//                 className="relative z-20 hidden shrink-0 cursor-pointer disabled:opacity-50 md:flex"
//               >
//                 <img
//                   src={isSaved ? heartIcon : favoriteIcon}
//                   alt={isSaved ? "Remove from favorites" : "Add to favorites"}
//                 />
//               </button>
//             </div>
//           </div>
//         </div>

//         <Link
//           to={to}
//           className="relative z-20 flex h-11.25 w-full items-center justify-center rounded-lg border border-button-bg bg-button-sec font-raleway text-[14px] font-semibold tracking-[1px] text-text-primary md:hidden"
//         >
//           View Details
//         </Link>
//       </div>

//       <Link
//         to={to}
//         aria-label={`View ${property.title} details`}
//         className="absolute inset-0 z-10 hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-button-bg md:block"
//       />
//     </div>
//   )
// }

import { MapPin, BedDouble, Bath, LandPlot, Heart } from "lucide-react"
import { Link } from "react-router-dom"
import type { Property } from "@/types/property"
import { useFavorite } from "@/hooks/useFavorite"
import naira from "@/assets/images/naira.svg"
import verifiedIcon from "@/assets/images/icon-verified-green.svg"
import Avatar from "./Avatar"

type PropertyCardProps = {
  property: Property
  to: string
}

/* 800000 -> "800k", 1500000 -> "1.5M" */
function formatPrice(n: number) {
  if (n >= 1_000_000) return `${+(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${Math.round(n / 1_000)}k`
  return String(n)
}

export default function PropertyCard({ property, to }: PropertyCardProps) {
  const { isSaved, isLoading, toggleFavorite } = useFavorite(property._id)
  const isLand = property.propertyType === "land"

  const avatarSrc = Array.isArray(property.owner.profilePicture)
    ? property.owner.profilePicture[0]
    : property.owner.profilePicture

  return (
    <article className="relative flex h-full w-full max-w-112.5 flex-col overflow-hidden rounded-2xl border border-bg-accent bg-white transition hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-2/1 w-full overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />

        {/* z-20 keeps the button above the card-wide link */}
        <button
          type="button"
          disabled={isLoading}
          aria-pressed={isSaved}
          aria-label={isSaved ? "Remove from favorites" : "Add to favorites"}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggleFavorite()
          }}
          className="absolute top-2 right-2 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 text-gray-700 backdrop-blur transition hover:bg-white disabled:opacity-50"
        >
          <Heart
            className={`h-5 w-5 ${isSaved ? "fill-red-500 text-red-500" : ""}`}
          />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-3 md:p-4">
        <h3 className="line-clamp-1 font-raleway text-[14px] font-semibold tracking-[1px] text-black md:text-[16px]">
          {property.title}
        </h3>

        <p className="flex items-center font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg md:text-[16px]">
          <img src={naira} alt="naira" />
          <span>{formatPrice(property.price)}</span>
        </p>

        <p className="flex items-center gap-1.5 text-[12px] text-text-secondary md:text-[14px]">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden />
          <span className="line-clamp-1">{property.address}</span>
        </p>

        {/* Meta row: the only part that differs between land and buildings */}
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-text-secondary md:text-[14px]">
          {isLand ? (
            property.landType && (
              <li className="flex items-center gap-1.5">
                <LandPlot className="h-4 w-4" aria-hidden />
                Type:{" "}
                <span className="font-semibold capitalize">
                  {property.landType}
                </span>
              </li>
            )
          ) : (
            <>
              <li className="flex items-center gap-1.5">
                <BedDouble className="h-4 w-4" aria-hidden />
                {property.bedroom} {property.bedroom === 1 ? "Bed" : "Beds"}
              </li>
              <li className="flex items-center gap-1.5">
                <Bath className="h-4 w-4" aria-hidden />
                {property.bathroom} {property.bathroom === 1 ? "Bath" : "Baths"}
              </li>
            </>
          )}
        </ul>

        {/* mt-auto pins the agent row to the bottom so cards in a row line up */}
        <div className="mt-auto flex items-center gap-2 border-t border-bg-accent pt-3">
          <div className="shrink-0">
            <Avatar
              name={property.owner.name ?? "?"}
              src={avatarSrc}
              size="xs"
            />
          </div>

          <span className="line-clamp-1 text-[12px] font-semibold text-black md:text-[14px]">
            {property.owner.name}
          </span>

          {property.owner.isVerified && (
            <img
              src={verifiedIcon}
              alt="verified"
              className="h-4 w-4 shrink-0 md:h-5 md:w-5"
            />
          )}
        </div>
      </div>

      {/* Card-wide link */}
      <Link
        to={to}
        aria-label={`View ${property.title} details`}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-button-bg"
      />
    </article>
  )
}

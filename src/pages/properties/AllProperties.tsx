// import Navbar from "@/components/Navbar";
// import propertyImg from "@/assets/images/img-apartment.png";
// import naira from "@/assets/images/naira.svg";
// import location from "@/assets/images/location.svg";
// import bed from "@/assets/images/bed.svg";
// import tubs from "@/assets/images/tubs.svg";
// import agentAvatar from "@/assets/images/agentAvatar.jpg";
// import leftArrow from "@/assets/images/icon-left-arrow.svg";
// import rightArrow from "@/assets/images/icon-right-arrow.svg";

// type PropertyProps = {
//   property_image: string;
//   title: string;
//   value: string;
//   location: string;
//   bedroom: string;
//   bathroom: string;
//   avatar: string;
//   listed_by: string;
// };

// export default function AllProperties() {
//   const properties = [
//     {
//       property_image: propertyImg,
//       title: "4 Bedroom Apartment",
//       value: "800k",
//       location: "Lekki Phase 1, Lagos",
//       bedroom: "4",
//       bathroom: "2",
//       avatar: agentAvatar,
//       listed_by: "MaryAnn Kikomu",
//     },
//     {
//       property_image: propertyImg,
//       title: "4 Bedroom Apartment",
//       value: "800k",
//       location: "Lekki Phase 1, Lagos",
//       bedroom: "4",
//       bathroom: "2",
//       avatar: agentAvatar,
//       listed_by: "MaryAnn Kikomu",
//     },
//     {
//       property_image: propertyImg,
//       title: "4 Bedroom Apartment",
//       value: "800k",
//       location: "Lekki Phase 1, Lagos",
//       bedroom: "4",
//       bathroom: "2",
//       avatar: agentAvatar,
//       listed_by: "MaryAnn Kikomu",
//     },
//   ];

//   return (
//     <div className="flex min-h-screen flex-col font-ssPro">
//       {/* navbar */}
//       <Navbar />

//       {/* main contents */}
//       <main className="flex-1 mt-18 mx-6">
//         <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-text-primary">
//           Available Properties
//         </p>

//         {/* main properties ctn */}
//         <div className="mt-6 space-y-8">
//           {/* properties ctn */}
//           {properties.map((property, index) => (
//             <div key={index} className="rounded-2xl overflow-hidden">
//               <div>
//                 <img src={property.property_image} alt="" />
//               </div>

//               <div className="px-4 py-3 space-y-6 border rounded-b-2xl border-bg-accent">
//                 <div className="space-y-2">
//                   <div className="flex items-center justify-between">
//                     <p className="font-raleway font-semibold text-[12px] tracking-[1px] text-black line-clamp-1">
//                       {property.title}
//                     </p>
//                     <p className="flex items-center text-[#274AD0] font-raleway font-semibold text-[12px] tracking-[1px]">
//                       <img src={naira} alt="naira" /> <p>800k</p>
//                     </p>
//                   </div>

//                   <div className="flex flex-col gap-2">
//                     <div className="flex flex-col gap-2">
//                       <div className="flex items-center gap-1">
//                         <img src={location} alt="" className="w-4 h-4" />
//                         <p className="line-clamp-1 text-[12px]">
//                           {property.location}
//                         </p>
//                       </div>

//                       <div className="flex items-center gap-2 text-[12px] text-text-secondary">
//                         <div className="flex items-center gap-1">
//                           <img src={bed} alt="" className="w-4 h-4" />
//                           <p>{property.bedroom} Beds</p>
//                         </div>

//                         <div className="flex items-center gap-1">
//                           <img src={tubs} alt="" className="2-4 h-4" />
//                           <p>{property.bathroom} Baths</p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-1">
//                       <div>
//                         <img
//                           src={property.avatar}
//                           alt=""
//                           className="w-5 h-5 rounded-full object-cover"
//                         />
//                       </div>

//                       <p className="text-[12px] text-text-secondary flex items-center justify-center gap-0.5">
//                         Listed by
//                         <span className="font-semibold text-black">
//                           {property.listed_by}
//                         </span>
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   type="button"
//                   className="font-raleway font-semibold text-[14px] tracking-[1px] text-text-primary rounded-lg border border-button-bg bg-button-sec h-[45px] flex items-center justify-center w-full"
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))}

//           <div>
//             <div>
//               <img src={leftArrow} alt="" />
//             </div>

//             <div>
//               <p className="text-[12px]">1</p>
//               <p>2</p>
//               <p>3</p>
//               <p>...</p>
//               <p>10</p>
//             </div>

//             <div>
//               <img src={rightArrow} alt="" />
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// import { useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
// import Navbar from "@/components/Navbar";
// import propertyImg from "@/assets/images/img-apartment.png";
// import naira from "@/assets/images/naira.svg";
// import location from "@/assets/images/location.svg";
// import bed from "@/assets/images/bed.svg";
// import tubs from "@/assets/images/tubs.svg";
// import agentAvatar from "@/assets/images/agentAvatar.jpg";

// interface Property {
//   property_image: string;
//   title: string;
//   value: string;
//   location: string;
//   bedroom: string;
//   bathroom: string;
//   avatar: string;
//   listed_by: string;
// }

// type PageNumber = number | "...";

// export default function AllProperties() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const propertiesPerPage: number = 3;

//   // Generate 39 properties (you can replace this with actual data)
//   const allProperties: Property[] = Array.from({ length: 39 }, (_, index) => ({
//     property_image: propertyImg,
//     title: `4 Bedroom Apartment ${index + 1}`,
//     value: "800k",
//     location: "Lekki Phase 1, Lagos",
//     bedroom: "4",
//     bathroom: "2",
//     avatar: agentAvatar,
//     listed_by: "MaryAnn Kikomu",
//   }));

//   // Calculate pagination values
//   const totalPages: number = Math.ceil(
//     allProperties.length / propertiesPerPage,
//   );

//   // Get and validate page from URL
//   const getValidatedPage = (): number => {
//     const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
//     if (isNaN(pageFromUrl) || pageFromUrl < 1 || pageFromUrl > totalPages) {
//       return 1;
//     }
//     return pageFromUrl;
//   };

//   const currentPage = getValidatedPage();

//   const indexOfLastProperty: number = currentPage * propertiesPerPage;
//   const indexOfFirstProperty: number = indexOfLastProperty - propertiesPerPage;
//   const currentProperties: Property[] = allProperties.slice(
//     indexOfFirstProperty,
//     indexOfLastProperty,
//   );

//   // Validate and fix invalid page numbers in URL
//   useEffect(() => {
//     const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
//     if (isNaN(pageFromUrl) || pageFromUrl < 1 || pageFromUrl > totalPages) {
//       setSearchParams({ page: "1" }, { replace: true });
//     }
//   }, [searchParams, totalPages, setSearchParams]);

//   // Update URL when page changes
//   const updatePage = (pageNumber: number): void => {
//     setSearchParams({ page: pageNumber.toString() });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // Pagination handlers
//   const goToPage = (pageNumber: number): void => {
//     updatePage(pageNumber);
//   };

//   const goToPrevious = (): void => {
//     if (currentPage > 1) {
//       updatePage(currentPage - 1);
//     }
//   };

//   const goToNext = (): void => {
//     if (currentPage < totalPages) {
//       updatePage(currentPage + 1);
//     }
//   };

//   // Generate page numbers to display
//   const getPageNumbers = (): PageNumber[] => {
//     const pages: PageNumber[] = [];
//     const maxVisible: number = 5;

//     if (totalPages <= maxVisible) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       if (currentPage <= 3) {
//         pages.push(1, 2, 3, 4, "...", totalPages);
//       } else if (currentPage >= totalPages - 2) {
//         pages.push(
//           1,
//           "...",
//           totalPages - 3,
//           totalPages - 2,
//           totalPages - 1,
//           totalPages,
//         );
//       } else {
//         pages.push(
//           1,
//           "...",
//           currentPage - 1,
//           currentPage,
//           currentPage + 1,
//           "...",
//           totalPages,
//         );
//       }
//     }

//     return pages;
//   };

//   return (
//     <div className="flex min-h-screen flex-col font-ssPro">
//       {/* navbar */}
//       <Navbar />

//       {/* main contents */}
//       <main className="flex-1 mt-18 mx-6">
//         <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-text-primary">
//           Available Properties
//         </p>

//         {/* main properties ctn */}
//         <div className="mt-6 space-y-8">
//           {/* properties ctn */}
//           {currentProperties.map((property: Property, index: number) => (
//             <div key={index} className="rounded-2xl overflow-hidden">
//               <div>
//                 <img src={property.property_image} alt="" />
//               </div>

//               <div className="px-4 py-3 space-y-6 border rounded-b-2xl border-bg-accent">
//                 <div className="space-y-2">
//                   <div className="flex items-center justify-between">
//                     <p className="font-raleway font-semibold text-[12px] tracking-[1px] text-black line-clamp-1">
//                       {property.title}
//                     </p>
//                     <p className="flex items-center text-[#274AD0] font-raleway font-semibold text-[12px] tracking-[1px]">
//                       <img src={naira} alt="naira" /> <p>{property.value}</p>
//                     </p>
//                   </div>

//                   <div className="flex flex-col gap-2">
//                     <div className="flex flex-col gap-2">
//                       <div className="flex items-center gap-1">
//                         <img src={location} alt="" className="w-4 h-4" />
//                         <p className="line-clamp-1 text-[12px]">
//                           {property.location}
//                         </p>
//                       </div>

//                       <div className="flex items-center gap-2 text-[12px] text-text-secondary">
//                         <div className="flex items-center gap-1">
//                           <img src={bed} alt="" className="w-4 h-4" />
//                           <p>{property.bedroom} Beds</p>
//                         </div>

//                         <div className="flex items-center gap-1">
//                           <img src={tubs} alt="" className="w-4 h-4" />
//                           <p>{property.bathroom} Baths</p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-1">
//                       <div>
//                         <img
//                           src={property.avatar}
//                           alt=""
//                           className="w-5 h-5 rounded-full object-cover"
//                         />
//                       </div>

//                       <p className="text-[12px] text-text-secondary flex items-center justify-center gap-0.5">
//                         Listed by
//                         <span className="font-semibold text-black">
//                           {property.listed_by}
//                         </span>
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   type="button"
//                   className="font-raleway font-semibold text-[14px] tracking-[1px] text-text-primary rounded-lg border border-button-bg bg-button-sec h-[45px] flex items-center justify-center w-full"
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))}

//           {/* Pagination */}
//           <div className="flex items-center justify-center gap-2 py-8">
//             {/* Left Arrow */}
//             <button
//               onClick={goToPrevious}
//               disabled={currentPage === 1}
//               className={`w-8 h-8 flex items-center justify-center rounded ${
//                 currentPage === 1
//                   ? "text-gray-300 cursor-not-allowed"
//                   : "text-text-primary hover:bg-gray-100"
//               }`}
//               aria-label="Previous page"
//             >
//               ←
//             </button>

//             {/* Page Numbers */}
//             <div className="flex items-center gap-2">
//               {getPageNumbers().map((page: PageNumber, index: number) => (
//                 <button
//                   key={index}
//                   onClick={() => typeof page === "number" && goToPage(page)}
//                   disabled={page === "..."}
//                   className={`w-8 h-8 flex items-center justify-center rounded text-[12px] ${
//                     page === currentPage
//                       ? "bg-button-bg text-white font-semibold"
//                       : page === "..."
//                         ? "cursor-default"
//                         : "text-text-primary hover:bg-gray-100"
//                   }`}
//                   aria-label={
//                     typeof page === "number"
//                       ? `Go to page ${page}`
//                       : "More pages"
//                   }
//                   aria-current={page === currentPage ? "page" : undefined}
//                 >
//                   {page}
//                 </button>
//               ))}
//             </div>

//             {/* Right Arrow */}
//             <button
//               onClick={goToNext}
//               disabled={currentPage === totalPages}
//               className={`w-8 h-8 flex items-center justify-center rounded ${
//                 currentPage === totalPages
//                   ? "text-gray-300 cursor-not-allowed"
//                   : "text-text-primary hover:bg-gray-100"
//               }`}
//               aria-label="Next page"
//             >
//               →
//             </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import propertyImg from "@/assets/images/img-apartment.png";
import agentAvatar from "@/assets/images/agentAvatar.jpg";
import leftArrow from "@/assets/images/icon-left-arrow.svg";
import rightArrow from "@/assets/images/icon-right-arrow.svg";
import PropertyCard from "@/components/PropertyCard";

export default function AllProperties() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const ITEMS_PER_PAGE = 3;

  const properties = [
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
    {
      property_image: propertyImg,
      title: "4 Bedroom Apartment",
      value: "800k",
      location: "Lekki Phase 1, Lagos",
      bedroom: "4",
      bathroom: "2",
      avatar: agentAvatar,
      listed_by: "MaryAnn Kikomu",
    },
  ];

  const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProperties = properties.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setSearchParams({ page: page.toString() });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex min-h-screen flex-col font-ssPro">
      {/* navbar */}
      <Navbar />

      {/* main contents */}
      <main className="flex-1 mt-18 mx-6">
        <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-text-primary">
          Available Properties
        </p>

        {/* main properties ctn */}
        <div className="mt-6 space-y-8">
          {/* properties ctn */}
          {currentProperties.map((property, index) => (
            <PropertyCard
              key={startIndex + index}
              property_image={property.property_image}
              title={property.title}
              value={property.value}
              location={property.location}
              bedroom={property.bedroom}
              bathroom={property.bathroom}
              avatar={property.avatar}
              listed_by={property.listed_by}
            />
          ))}
        </div>
      </main>
 
      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 py-4 border border-red-600">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 ${
            currentPage === 1
              ? "opacity-40 cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          <img src={leftArrow} alt="Previous" className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2">
          {getPageNumbers().map((pageNum, index) => (
            <button
              key={index}
              onClick={() => typeof pageNum === "number" && goToPage(pageNum)}
              disabled={pageNum === "..."}
              className={`min-w-[32px] h-[32px] flex items-center justify-center rounded-md text-[14px] font-medium transition-colors ${
                pageNum === currentPage
                  ? "bg-[#274AD0] text-white"
                  : pageNum === "..."
                    ? "cursor-default text-text-secondary"
                    : "hover:bg-gray-100 text-text-primary cursor-pointer"
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 ${
            currentPage === totalPages
              ? "opacity-40 cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          <img src={rightArrow} alt="Next" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

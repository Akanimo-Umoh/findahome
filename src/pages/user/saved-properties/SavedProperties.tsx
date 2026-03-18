import saveIcon from "@/assets/images/icon-heart.svg";
import goBack from "@/assets/images/icon-back.svg";
// import apartmentImg from "@/assets/images/img-apartment.png";
import avatarImg from "@/assets/images/agentAvatar.jpg";
import { useNavigate } from "react-router-dom";
// import PropertyCard from "@/components/PropertyCard";
import landImg from "@/assets/agentImages/img-land.png";
import LandCard from "@/components/LandCard";

export default function SavedProperties() {
  const navigate = useNavigate();

//   const properties = [
//     {
//       id: "1",
//       property_image: apartmentImg,
//       title: "4 Bedroom Apartment",
//       value: "800k",
//       location: "Lekki Phase 1, Lagos",
//       bedroom: "4",
//       bathroom: "2",
//       avatar: avatarImg,
//       listed_by: "MaryAnn Kikomu",
//       is_verified: false,
//     },
//     {
//       id: "2",
//       property_image: apartmentImg,
//       title: "4 Bedroom Apartment",
//       value: "800k",
//       location: "Lekki Phase 1, Lagos",
//       bedroom: "4",
//       bathroom: "2",
//       avatar: avatarImg,
//       listed_by: "MaryAnn Kikomu",
//       is_verified: true,
//     },
//     {
//       id: "3",
//       property_image: apartmentImg,
//       title: "4 Bedroom Apartment",
//       value: "800k",
//       location: "Lekki Phase 1, Lagos",
//       bedroom: "4",
//       bathroom: "2",
//       avatar: avatarImg,
//       listed_by: "MaryAnn Kikomu",
//       is_verified: false,
//     },
//     {
//       id: "4",
//       property_image: apartmentImg,
//       title: "4 Bedroom Apartment",
//       value: "800k",
//       location: "Lekki Phase 1, Lagos",
//       bedroom: "4",
//       bathroom: "2",
//       avatar: avatarImg,
//       listed_by: "MaryAnn Kikomu",
//       is_verified: true,
//     },
//   ];

  const lands = [
    {
      id: "1",
      property_image: landImg,
      title: "600sqm of residential land",
      value: "3.6M",
      location: "Lekki Phase 1, Lagos",
      avatar: avatarImg,
      listed_by: "MaryAnn Kikomu",
      is_verified: false,
    },
    {
      id: "2",
      property_image: landImg,
      title: "600sqm of residential land",
      value: "3.6M",
      location: "Lekki Phase 1, Lagos",
      avatar: avatarImg,
      listed_by: "MaryAnn Kikomu",
      is_verified: true,
    },
    {
      id: "3",
      property_image: landImg,
      title: "600sqm of residential land",
      value: "3.6M",
      location: "Lekki Phase 1, Lagos",
      avatar: avatarImg,
      listed_by: "MaryAnn Kikomu",
      is_verified: false,
    },
    {
      id: "4",
      property_image: landImg,
      title: "600sqm of residential land",
      value: "3.6M",
      location: "Lekki Phase 1, Lagos",
      avatar: avatarImg,
      listed_by: "MaryAnn Kikomu",
      is_verified: true,
    },
  ];
 
  return (
    <div className="text-text-primary px-6 mb-10">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          My Wallet
        </p>

        <div className="absolute right-0">
          <img src={saveIcon} alt="" />
        </div>
      </div>

      <main className="mt-6">
        {/* tabs */}
        {/* these tabs are used to switch between the property types */}
        <div className="flex items-center justify-center gap-8">
          <button className="rounded-xl py-2 border border-bg-accent w-26">
            Apartments
          </button>

          <button className="w-26 py-2">Lands</button>
        </div>

        {/* main apartment card ctn */}
        {/* this is for the apartment cards */}
        {/* <div className="space-y-8 mt-8">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              property_image={property.property_image}
              title={property.title}
              value={property.value}
              location={property.location}
              bedroom={property.bedroom}
              bathroom={property.bathroom}
              avatar={property.avatar}
              listed_by={property.listed_by}
              is_verified={property.is_verified}
              img_height="h-[150px]"
            />
          ))}
        </div> */}

        {/* main land card ctn */}
        {/* this is for the land cards */}
        <div className="mt-8 space-y-8">
          {lands.map((land) => (
            <LandCard
              key={land.id}
              id={land.id}
              property_image={land.property_image}
              title={land.title}
              value={land.value}
              location={land.location}
              avatar={land.avatar}
              listed_by={land.listed_by}
              is_verified={land.is_verified}
              img_height="h-[150px]"
            />
          ))}
        </div>
      </main>
    </div>
  );
}

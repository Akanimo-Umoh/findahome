import propertyImg from "@/assets/images/img-apartment.png";
import agentAvatar from "@/assets/images/agentAvatar.jpg";
import { Link } from "react-router-dom";
import PropertyCard from "@/components/PropertyCard";

export default function Properties() {
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
  ];

  return (
    <div className="font-ssPro mx-6">
      <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-text-primary">
        Available Properties
      </p>

      {/* main properties ctn */}
      <div className="mt-6 space-y-8">
        {/* properties ctn */}
        {properties.map((property, index) => (
          <PropertyCard
            key={index}
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

      <div className="text-center mt-2">
        <Link to="/properties" className="text-text-secondary text-center">
          See More
        </Link>
      </div>
    </div>
  );
}

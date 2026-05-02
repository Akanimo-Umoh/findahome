import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import goBack from "@/assets/images/icon-back.svg";
import editIcon from "@/assets/agentImages/icon-edit.svg";
import nairaIcon from "@/assets/agentImages/icon-blue-naira.svg";
import verifiedIcon from "@/assets/images/icon-verified-green.svg";
import cardholder from "@/assets/images/icon-cardholder.svg";
import Details from "./Details";
import Avatar from "@/components/Avatar";
import api from "@/services/api";
import Spinner from "@/components/Spinner";
import ImageCarousel from "@/components/ImageCarousel";

type PropertyData = {
  _id: string;
  title: string;
  price: number;
  address: string;
  propertyType: "apartment" | "land";
  listingType: string;
  bedroom?: number;
  bathroom?: number;
  kitchen?: number;
  landSize?: string;
  landUnit?: string;
  serviceCharge?: number;
  nearbyPlaces?: string[];
  description?: string;
  images: string[];
  videos?: string[];
  owner: {
    name: string;
    profilePicture?: string | string[] | null;
    isVerified?: boolean;
  };
};

export default function PropertyPreview() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<PropertyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    async function fetchProperty() {
      try {
        const res = await api.get(`/property/${id}`);
        setProperty(res.data.property);
      } catch {
        setError("Failed to load property.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchProperty();
  }, [id]);

  if (isLoading) return <Spinner />;

  if (error || !property) {
    return (
      <div className="flex items-center justify-center h-screen font-ssPro">
        <div className="text-center">
          <p className="text-text-secondary text-[14px]">
            {error ?? "Property not found"}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-[#274AD0] underline text-[14px]"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const ownerAvatar = Array.isArray(property.owner.profilePicture)
    ? (property.owner.profilePicture[0] ?? null)
    : (property.owner.profilePicture ?? null);

  // video first, then images
  const videoUrl = property.videos?.[0] ?? null;

  return (
    <div className="text-text-primary mb-10 px-6">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>
        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          Preview Listing
        </p>
        <button className="absolute right-0 font-raleway font-semibold text-[14px] tracking-[1px] text-button-bg">
          <img src={editIcon} alt="" />
        </button>
      </div>

      <section className="mt-6">
        {/* carousel — video first, then images */}
        <ImageCarousel images={property.images} video={videoUrl} />

        <div className="mt-2">
          <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-black line-clamp-2">
            {property.title}
          </p>
          <div className="flex items-center mt-1">
            <img src={nairaIcon} alt="" />
            <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-button-bg">
              {property.price.toLocaleString()}
            </p>
          </div>
        </div>

        {/* agent details */}
        <div className="rounded-lg py-2 px-3 bg-bg-accent flex items-center gap-2 mt-4">
          <Avatar
            name={property.owner.name}
            src={ownerAvatar}
            size="md"
            className="w-[50px] h-[50px]"
          />
          <div className="flex flex-col justify-center gap-0.5">
            <div className="flex gap-1 items-center">
              <p className="text-text-secondary text-[12px] font-semibold">
                {property.owner.name}
              </p>
              {property.owner.isVerified && (
                <img src={verifiedIcon} alt="verified" />
              )}
            </div>
            <div className="flex gap-1 items-center">
              <img src={cardholder} alt="" />
              <p className="text-[12px] leading-4 text-text-secondary">
                NIN Verified Agent
              </p>
            </div>
          </div>
        </div>

        {/* details */}
        <div className="mt-6">
          <Details property={property} />
        </div>

        <button
          onClick={() => navigate("/agent/dashboard")}
          className="text-[14px] font-semibold font-raleway tracking-[1px] text-white rounded-lg h-[45px] bg-button-bg hover:bg-button-hover w-full mt-6"
        >
          Go to Dashboard
        </button>
      </section>
    </div>
  );
}

import stars from "@/assets/images/icon-rating.svg";
import rightArrow from "@/assets/images/icon-rightArrow-blue.svg";
import { useAuthContext } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function Reviews() {
  const MAX_STARS = 5;
  const { isAuthenticated, logout } = useAuthContext();
  const navigate = useNavigate();

  const reviews = [
    {
      rating: 1,
      review:
        "FindaHome made finding my dream apartment so easy. The verification badges gave me peace of mind throughout the process.",
      name: "Adebayo Johnson",
      location: "Ikeja, Lagos",
    },
    {
      rating: 2,
      review:
        "FindaHome made finding my dream apartment so easy. The verification badges gave me peace of mind throughout the process.",
      name: "Adebayo Johnson",
      location: "Ikeja, Lagos",
    },
    {
      rating: 4,
      review:
        "FindaHome made finding my dream apartment so easy. The verification badges gave me peace of mind throughout the process.",
      name: "Adebayo Johnson",
      location: "Ikeja, Lagos",
    },
    {
      rating: 5,
      review:
        "FindaHome made finding my dream apartment so easy. The verification badges gave me peace of mind throughout the process.",
      name: "Adebayo Johnson",
      location: "Ikeja, Lagos",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="px-6">
      <div className="flex flex-col gap-1 items-center justify-center">
        <p className="text-[24px] font-raleway font-medium tracking-[1px] text-text-primary">
          What our users are saying
        </p>
        <p className="text-[12px] text-text-secondary">
          Real stories from real people
        </p>
      </div>

      <div className="grid grid-cols-2 mt-4 gap-3.5">
        {reviews.map((review) => (
          <div
            key={`${review.name}-${review.rating}`}
            className="flex flex-col gap-1 py-2"
          >
            <div className="flex flex-col gap-2">
              <div className="flex gap-0.75">
                {Array.from({ length: MAX_STARS }).map((_, starIndex) => (
                  <motion.img
                    key={starIndex}
                    src={stars}
                    alt="rating"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: starIndex < review.rating ? 1 : 0.85,
                      opacity: starIndex < review.rating ? 1 : 0.3,
                    }}
                    whileHover={
                      starIndex < review.rating ? { scale: 1.15 } : {}
                    }
                    transition={{
                      delay: starIndex * 0.08,
                      type: "spring",
                      stiffness: 300,
                    }}
                    className="w-5 h-5"
                  />
                ))}
              </div>
              <p className="text-[12px] text-text-primary">{review.review}</p>
            </div>

            <div className="">
              <p className="font-raleway font-semibold text-[14px] tracking-[1px] text-text-primary">
                {review.name}
              </p>
              <p className="text-[12px] text-text-secondary">
                {review.location}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-button-bg py-3 rounded-2xl flex flex-col gap-4 items-center justify-between">
        <div className="text-white flex flex-col items-center justify-center gap-0.5">
          <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-center">
            {isAuthenticated
              ? "Welcome back!"
              : "Ready to find your dream home?"}
          </p>
          <p className="text-[12px]">
            {isAuthenticated
              ? "You're all set to explore amazing properties"
              : "Join thousands of happy homeowners and renters today"}
          </p>
        </div>

        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 h-11.25 rounded-lg px-6 bg-white hover:bg-gray-100 transition-colors"
          >
            <p className="font-raleway font-semibold text-[14px] tracking-[1px] text-button-bg">
              Logout
            </p>
            <img src={rightArrow} alt="arrow" className="w-5 h-5" />
          </button>
        ) : (
          <Link
            to="/signup"
            className="flex items-center justify-center gap-2 h-11.25 rounded-lg px-2 bg-white"
          >
            <p className="font-raleway font-semibold text-[14px] tracking-[1px] text-button-bg">
              Sign Up Now
            </p>
            <img src={rightArrow} alt="arrow" className="w-5 h-5" />
          </Link>
        )}
      </div>
    </div>
  );
}

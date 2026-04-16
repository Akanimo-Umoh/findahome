import rightArrow from "@/assets/images/icon-rightArrow-blue.svg";
import { useAuthContext } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import avatarImg from "@/assets/images/avatar.jpg";

export default function Reviews() {
  const { isAuthenticated } = useAuthContext();

  const reviews = [
    {
      review:
        "FindaHome made finding my dream apartment so easy. The verification badges gave me peace of mind throughout the process.",
      name: "Adebayo Johnson",
      location: "Ikeja, Lagos",
    },
    {
      review:
        "FindaHome made finding my dream apartment so easy. The verification badges gave me peace of mind throughout the process.",
      name: "Adebayo Johnson",
      location: "Ikeja, Lagos",
    },
    {
      review:
        "FindaHome made finding my dream apartment so easy. The verification badges gave me peace of mind throughout the process.",
      name: "Adebayo Johnson",
      location: "Ikeja, Lagos",
    },
    {
      review:
        "FindaHome made finding my dream apartment so easy. The verification badges gave me peace of mind throughout the process.",
      name: "Adebayo Johnson",
      location: "Ikeja, Lagos",
    },
  ];

  // const handleLogout = () => {
  //   logout();
  //   navigate("/", { replace: true });
  // };

  return (
    <div className="px-6 md:px-8">
      <div className="flex flex-col gap-1 items-center justify-center">
        <p className="text-[24px] font-raleway font-medium tracking-[1px] text-text-primary md:text-[36px] md:font-semibold text-center">
          What our users are saying
        </p>
        <p className="text-[12px] text-text-secondary md:text-[16px]">
          Real stories from real people
        </p>
      </div>

      <div className="grid mt-4 gap-10 md:mt-12 justify-items-center md:gap-20 md:gap-y-10 grid-cols-[repeat(auto-fit,minmax(162px,257px))] justify-center">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="flex flex-col items-center w-40.5 md:w-[257px] gap-2"
          >
            <img
              src={avatarImg}
              alt=""
              className="w-12.5 h-12.5 object-cover rounded-full border border-text-disabled"
            />

            <div className="flex flex-col gap-2 items-center">
              <p className="font-raleway font-semibold text-[12px] leading-4 md:text-[14px] md:tracking-[1px] text-text-primary">
                {review.name}
              </p>
              <p className="text-[12px] leading-4 text-text-secondary text-center md:text-[14px]">
                {review.review}
              </p>
            </div>
          </div>
        ))}
      </div>

      {isAuthenticated ? (
        ""
      ) : (
        <div className="mt-8 bg-button-bg py-3 rounded-2xl flex flex-col gap-4 items-center justify-between md:mt-10 md:p-3 md:rounded-2xl">
          <div className="text-white flex flex-col items-center justify-center gap-0.5 md:gap-2">
            <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-center md:text-[22px] md:font-medium">
              Ready to find your dream home?
            </p>
            <p className="text-[12px] text-center md:text-[14px]">
              Join thousands of happy homeowners and renters today
            </p>
          </div>

          <Link
            to="/signup"
            className="flex items-center justify-center gap-2 h-11.25 rounded-lg px-2 bg-white md:h-12 md:px-3"
          >
            <p className="font-raleway font-semibold text-[14px] tracking-[1px] text-button-bg md:text-[16px]">
              Sign Up Now
            </p>
            <img
              src={rightArrow}
              alt="arrow"
              className="w-5 h-5 md:w-6 md:h-6"
            />
          </Link>
        </div>
      )}
    </div>
  );
}

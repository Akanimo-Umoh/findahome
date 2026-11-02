import avatarImg from "@/assets/images/avatar.jpg"

export default function Reviews() {
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
    {
      review:
        "FindaHome made finding my dream apartment so easy. The verification badges gave me peace of mind throughout the process.",
      name: "Adebayo Johnson",
      location: "Ikeja, Lagos",
    },
  ]

  // const handleLogout = () => {
  //   logout();
  //   navigate("/", { replace: true });
  // };

  return (
    <div className="max-w-7xl px-6 md:px-8">
      <div className="flex flex-col items-center justify-center gap-1">
        <p className="text-center font-raleway text-[24px] font-medium tracking-[1px] text-text-primary md:text-[36px] md:font-semibold">
          What our users are saying
        </p>
        <p className="text-[12px] text-text-secondary md:text-[16px]">
          Real stories from real people
        </p>
      </div>

      <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(162px,257px))] justify-center justify-items-center gap-10 md:mt-12 md:gap-20 md:gap-y-10">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="flex w-40.5 flex-col items-center gap-2 md:w-[257px]"
          >
            <img
              src={avatarImg}
              alt=""
              className="h-12.5 w-12.5 rounded-full border border-text-disabled object-cover"
            />

            <div className="flex flex-col items-center gap-2">
              <p className="font-raleway text-[12px] leading-4 font-semibold text-text-primary md:text-[14px] md:tracking-[1px]">
                {review.name}
              </p>
              <p className="text-center text-[12px] leading-4 text-text-secondary md:text-[14px]">
                {review.review}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

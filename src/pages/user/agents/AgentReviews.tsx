import agentAvatar from "@/assets/images/agentAvatar.jpg";
import yellowStar from "@/assets/images/icon-yellow-star.svg";
import starIcon from "@/assets/images/icon-normal-star.svg";

export default function AgentReviews() {
  return (
    <div>
      <p>Reviews</p>

      <div className="mt-3 space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <img
                src={agentAvatar}
                alt=""
                className="w-7.5 h-7.5 object-cover rounded-full"
              />
              <div>
                <p className="font-semibold text-[12px]">Maryann Kikomu</p>
                <p className="text-[12px] leading-4">2 days ago</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <img src={yellowStar} alt="" />
              <img src={yellowStar} alt="" />
              <img src={yellowStar} alt="" />
              <img src={yellowStar} alt="" />
              <img src={starIcon} alt="" />
            </div>
          </div>

          {/* review */}
          <p className="text-[12px] leading-[17px] mt-1 text-text-secondary">
            John was exceptional throughout the entire process. Very
            professional, responsive, and helped us find exactly what we were
            looking for. The escrow process was smooth and secure.
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <img
                src={agentAvatar}
                alt=""
                className="w-7.5 h-7.5 object-cover rounded-full"
              />
              <div>
                <p className="font-semibold text-[12px]">Maryann Kikomu</p>
                <p className="text-[12px] leading-4">2 days ago</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <img src={yellowStar} alt="" />
              <img src={yellowStar} alt="" />
              <img src={yellowStar} alt="" />
              <img src={yellowStar} alt="" />
              <img src={starIcon} alt="" />
            </div>
          </div>

          {/* review */}
          <p className="text-[12px] leading-[17px] mt-1 text-text-secondary">
            John was exceptional throughout the entire process. Very
            professional, responsive, and helped us find exactly what we were
            looking for. The escrow process was smooth and secure.
          </p>
        </div>
      </div>
    </div>
  );
}

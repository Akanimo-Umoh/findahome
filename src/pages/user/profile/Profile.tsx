import avatar from "@/assets/images/agentAvatar.jpg";
import addPicture from "@/assets/images/icon-picture.svg";
import changePasswordIcon from "@/assets/images/icon-change-password.svg";
import rightArrowIcon from "@/assets/images/icon-right-arrow.svg";
import supportIcon from "@/assets/images/icon-support.svg";
import feedbackIcon from "@/assets/images/icon-feedback.svg";
import userSwitchIcon from "@/assets/images/icon-user-switch.svg";
// import editProfile from "@/assets/images/icon-edit-profile.svg";
import Summary from "./Summary";
import PersonalInformation from "./PersonalInformation";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { useProfilePicture } from "@/hooks/useProfilePicture";
import { useRef } from "react";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();
  const { changeProfilePicture, isUploading } = useProfilePicture();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      changeProfilePicture(file);
    }
  };

  return (
    <div className="px-6 text-text-primary mb-10">
      {/* header */}
      <div className="flex items-center gap-4 mt-0.5">
        <div className="relative shrink-0">
          <img
            src={user?.profilePicture ?? avatar}
            alt=""
            className="w-17.5 h-17.5 object-cover rounded-full"
          />

          {/* file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="absolute -bottom-1 right-0 disabled:opacity-50"
          >
            <img src={addPicture} alt="change profile picture" />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <div>
            <p className="font-raleway font-semibold tracking-[1px] line-clamp-1">
              {user?.name}
            </p>
            <p className="text-[12px] leadinig-4 line-clamp-1">{user?.email}</p>
          </div>

          {/* <div className="flex items-center py-1 px-2 gap-1 border border-button-bg rounded-lg">
            <img src={editProfile} alt="" />
            <p className="font-raleway text-[14px] tracking-[1px] font-semibold">
              Edit Profile
            </p>
          </div> */}
        </div>
      </div>

      {/* profile */}
      <section className="mt-6">
        <div className="flex flex-col rounded-lg gap-2 p-2 bg-bg-accent">
          <div className="flex items-center justify-between">
            <p>Profile Completion</p>
            <p>75%</p>
          </div>

          <div>progress bar</div>

          <p className="text-[12px] leading-4 text-text-secondary">
            You're almost set! Verify your details to complete your FindaHome
            profile.
          </p>
        </div>

        <div className="mt-6">
          <Summary />
        </div>
      </section>

      {/* personal information */}
      <section className="mt-6">
        <PersonalInformation />
      </section>

      {/* verification */}
      {/* <section className="mt-6">
        <PersonalInformation />
      </section> */}

      {/* security */}
      <div className="mt-6">
        <p>Security</p>

        <div className="rounded-lg border border-bg-accent p-3 flex flex-col gap-4 mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={changePasswordIcon} alt="" />
              <p className="text-[14px] text-text-secondary">Change Password</p>
            </div>

            <img src={rightArrowIcon} alt="" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={supportIcon} alt="" />
              <p className="text-[14px] text-text-secondary">Contact Support</p>
            </div>

            <img src={rightArrowIcon} alt="" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={feedbackIcon} alt="" />
              <p className="text-[14px] text-text-secondary">Send Feedback</p>
            </div>

            <img src={rightArrowIcon} alt="" />
          </div>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 flex items-center border border-button-bg rounded-lg py-1 px-2 gap-1 mx-auto"
      >
        <img src={userSwitchIcon} alt="" />
        <p className="font-raleway font-semibold text-[14px] tracking-[1px]">
          Log out
        </p>
      </button>
    </div>
  );
}

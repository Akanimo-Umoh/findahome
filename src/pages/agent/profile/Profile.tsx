import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import verifiedIcon from "@/assets/images/icon-verified-green.svg";
import checkIcon from "@/assets/agentImages/icon-check-green-circle.svg";
import pendingIcon from "@/assets/agentImages/icon-pending-review.svg";
import creditIcon from "@/assets/agentImages/icon-white-credit-card.svg";
import arrowIcon from "@/assets/agentImages/icon-blue-right-long-arrow.svg";
import infoIcon from "@/assets/agentImages/icon-grey-info.svg";
import lockIcon from "@/assets/agentImages/icon-blue-lock.svg";
import rightIcon from "@/assets/agentImages/icon-grey-arrow.svg";
import activeIcon from "@/assets/agentImages/icon-active-sessions.svg";
import { useAuthContext } from "@/context/AuthContext";
import Avatar from "@/components/Avatar";
import { useLogout } from "@/hooks/useLogout";

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const { handleLogout } = useLogout();

  return (
    <div className="font-ssPro flex flex-col mb-10 mx-6">
      <header className="">
        {/* header */}
        <div className="flex items-center justify-center relative">
          <button className="absolute left-0" onClick={() => navigate(-1)}>
            <img src={goBack} alt="" />
          </button>

          <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
            Profile & Settings
          </p>
        </div>
      </header>

      <main className="mt-6">
        <div className="agent-profile py-5 px-6 rounded-lg">
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="relative pb-2">
              <Avatar
                name={user?.name ?? "?"}
                src={user?.profilePicture}
                className="w-17.5 h-17.5 rounded-full object-cover"
              />
              <img
                src={verifiedIcon}
                alt=""
                className="absolute bottom-[1.5px] right-[1.5px]"
              />
            </div>

            <div>
              <p className="text-center">{user?.name}</p>
              <p className="text-[12px] leading-4 text-text-secondary text-center">
                {user?.role}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-2">
            <p className="text-[12px] leading-4 text-button-bg rounded-2xl py-0.5 px-2 text-center bg-bg-accent">
              Licensed Agent
            </p>
            <p className="text-[12px] leading-4 text-success bg-[#D8F3DC] py-0.5 px-2 rounded-2xl">
              Verified
            </p>
          </div>
        </div>

        {/* acct information */}
        <div className="mt-6">
          <p className="text-text-secondary">ACCOUNT INFORMATION</p>

          <div className="mt-4 space-y-3">
            <div className="text-[12px] leading-4 flex items-center justify-between bg-bg-tertiary py-1 px-2 rounded-lg">
              <p>Full Name:</p>
              <p className="text-text-secondary">{user?.name}</p>
            </div>

            <div className="text-[12px] leading-4 flex items-center justify-between bg-bg-tertiary py-1 px-2 rounded-lg">
              <p>Email</p>
              <p className="text-text-secondary">{user?.email}</p>
            </div>

            <div className="text-[12px] leading-4 flex items-center justify-between bg-bg-tertiary py-1 px-2 rounded-lg">
              <p>Phone Number</p>
              <p className="text-text-secondary">{user?.phoneNumber}</p>
            </div>

            <div className="text-[12px] leading-4 flex items-center justify-between bg-bg-tertiary py-1 px-2 rounded-lg">
              <p>ID Verification</p>

              <div className="flex items-center gap-1">
                <img src={checkIcon} alt="" />
                <p className="text-text-secondary">Complete</p>
              </div>
            </div>

            <div className="text-[12px] leading-4 flex items-center justify-between bg-bg-tertiary py-1 px-2 rounded-lg">
              <p>Business Registration</p>

              <div className="flex items-center gap-1">
                <img src={pendingIcon} alt="" />
                <p className="text-warning">Pending Review</p>
              </div>
            </div>
          </div>
        </div>

        {/* BANK & PAYOUT SETTINGS */}
        <div className="mt-8">
          <p className="text-text-secondary">BANK & PAYOUT SETTINGS</p>

          <div className="mt-4">
            <div className="flex items-center justify-between gap-4 py-1 px-2 rounded-lg bg-bg-tertiary">
              <div className="flex items-center gap-2">
                <div className="w-7.5 h-7.5 bg-button-bg rounded-full flex items-center justify-center shrink-0">
                  <img src={creditIcon} alt="" />
                </div>

                <div className="space-y-0.5">
                  <p className="text-[12px] leading-4 line-clamp-1">
                    Access Bank
                  </p>
                  <p className="text-[12px] leading-4 text-text-secondary line-clamp-1">
                    ****4810
                  </p>
                </div>
              </div>

              {/* takes you to the select account */}
              <p className="text-[12px] leading-4 text-text-secondary bg-bg-accent py-1 px-2 rounded-lg">
                Default
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between max-w-[319px] mx-auto px-3">
              <p className="text-[12px] leading-4 text-button-bg">
                Add/Edit Bank Account
              </p>
              <img src={arrowIcon} alt="" className="w-5 h-5" />
            </div>

            <div className="flex items-start gap-2 mt-4 mx-5">
              <img src={infoIcon} alt="" className="w-6 h-6 shrink-0" />

              <p className="text-[12px] leading-4 text-text-secondary">
                Payouts are processed securely via Escrow services. Changes may
                take 24 hrs to verify.
              </p>
            </div>
          </div>
        </div>

        {/* SECURITY */}
        <div className="mt-8">
          <p className="text-text-secondary">SECURITY</p>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-bg-accent flex items-center justify-center shrink-0">
                  <img src={lockIcon} alt="" />
                </div>
                <p className="text-[14px]">Change Password</p>
              </div>

              <img src={rightIcon} alt="" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-bg-accent flex items-center justify-center shrink-0">
                  <img src={lockIcon} alt="" />
                </div>
                <p className="text-[14px]">Two - Factor Authentications</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-[12px] leading-4 text-success rounded-lg p-1 bg-[#D8F3DC]">
                  Enabled
                </p>
                <img src={rightIcon} alt="" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-bg-accent flex items-center justify-center shrink-0">
                  <img src={activeIcon} alt="" />
                </div>
                <p className="text-[14px]">Active Sessions</p>
              </div>

              <img src={rightIcon} alt="" />
            </div>
          </div>
        </div>

        {/* SUPPORT & LEGAL */}
        <div className="mt-8">
          <p className="text-text-secondary">SUPPORT & LEGAL</p>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[14px]">Help & Support</p>
              <img src={rightIcon} alt="" />
            </div>

            <div className="flex items-center justify-between">
              <p className="text-[14px]">Terms of service</p>
              <img src={rightIcon} alt="" />
            </div>

            <div className="flex items-center justify-between">
              <p className="text-[14px]">Privacy Policy</p>
              <img src={rightIcon} alt="" />
            </div>
          </div>
        </div>

        {/* log out */}
        <button
          onClick={handleLogout}
          className="border border-text-secondary h-[45px] rounded-lg bg-button-disabled font-raleway font-semibold text-[14px] tracking-[1px] mt-8 w-full cursor-pointer"
        >
          Log out
        </button>
      </main>
    </div>
  );
}

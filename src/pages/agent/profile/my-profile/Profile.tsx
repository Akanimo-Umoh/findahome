import verifiedIcon from "@/assets/images/icon-verified-green.svg"
import checkIcon from "@/assets/agentImages/icon-check-green-circle.svg"
import pendingIcon from "@/assets/agentImages/icon-pending-review.svg"
import creditIcon from "@/assets/agentImages/icon-white-credit-card.svg"
import arrowIcon from "@/assets/agentImages/icon-blue-right-long-arrow.svg"
import infoIcon from "@/assets/agentImages/icon-grey-info.svg"
import lockIcon from "@/assets/agentImages/icon-blue-lock.svg"
import rightIcon from "@/assets/agentImages/icon-grey-arrow.svg"
import activeIcon from "@/assets/agentImages/icon-active-sessions.svg"
import { useAuthContext } from "@/context/AuthContext"
import Avatar from "@/components/Avatar"
import { useLogout } from "@/hooks/useLogout"
import PageHeader from "@/components/shared/PageHeader"
import { Link } from "react-router-dom"

export default function Profile() {
  const { user } = useAuthContext()
  const { handleLogout } = useLogout()

  return (
    <div className="mb-10 flex flex-col">
      {/* header */}
      <PageHeader title="Profile & Settings" responsive />

      <main className="mt-6">
        <div className="agent-profile rounded-lg px-6 py-5">
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="relative pb-2">
              <Avatar
                name={user?.name ?? "?"}
                src={user?.profilePicture}
                className="h-17.5 w-17.5 rounded-full object-cover"
              />
              <img
                src={verifiedIcon}
                alt=""
                className="absolute right-[1.5px] bottom-[1.5px]"
              />
            </div>

            <div>
              <p className="text-center">{user?.name}</p>
              <p className="text-center text-[12px] leading-4 text-text-secondary">
                {user?.role}
                {/* this is meant to be for the business name gotten from the onboarding, will fix this once the backend includes it in the endpoints */}
              </p>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-center gap-4">
            <p className="rounded-2xl bg-bg-accent px-2 py-0.5 text-center text-[12px] leading-4 text-button-bg">
              Licensed Agent
            </p>
            <p className="rounded-2xl bg-[#D8F3DC] px-2 py-0.5 text-[12px] leading-4 text-success">
              Verified
            </p>
          </div>
        </div>

        {/* acct information */}
        <div className="mt-6">
          <p className="text-text-secondary">ACCOUNT INFORMATION</p>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-bg-tertiary px-2 py-1 text-[12px] leading-4">
              <p>Full Name:</p>
              <p className="text-text-secondary">{user?.name}</p>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-bg-tertiary px-2 py-1 text-[12px] leading-4">
              <p>Email</p>
              <p className="text-text-secondary">{user?.email}</p>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-bg-tertiary px-2 py-1 text-[12px] leading-4">
              <p>Phone Number</p>
              <p className="text-text-secondary">{user?.phoneNumber}</p>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-bg-tertiary px-2 py-1 text-[12px] leading-4">
              <p>ID Verification</p>

              <div className="flex items-center gap-1">
                <img src={checkIcon} alt="" />
                <p className="text-text-secondary">Complete</p>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-bg-tertiary px-2 py-1 text-[12px] leading-4">
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
            <div className="flex items-center justify-between gap-4 rounded-lg bg-bg-tertiary px-2 py-1">
              <div className="flex items-center gap-2">
                <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full bg-button-bg">
                  <img src={creditIcon} alt="" />
                </div>

                <div className="space-y-0.5">
                  <p className="line-clamp-1 text-[12px] leading-4">
                    Access Bank
                  </p>
                  <p className="line-clamp-1 text-[12px] leading-4 text-text-secondary">
                    ****4810
                  </p>
                </div>
              </div>

              {/* takes you to the select account */}
              <p className="rounded-lg bg-bg-accent px-2 py-1 text-[12px] leading-4 text-text-secondary">
                Default
              </p>
            </div>

            <div className="mx-auto mt-3 flex max-w-[319px] items-center justify-between px-3">
              <p className="text-[12px] leading-4 text-button-bg">
                Add/Edit Bank Account
              </p>
              <img src={arrowIcon} alt="" className="h-5 w-5" />
            </div>

            <div className="mx-5 mt-4 flex items-start gap-2">
              <img src={infoIcon} alt="" className="h-6 w-6 shrink-0" />

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
            <Link
              to="/agent/change-password"
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-bg-accent">
                  <img src={lockIcon} alt="" />
                </div>
                <p className="text-[14px]">Change Password</p>
              </div>

              <img src={rightIcon} alt="" />
            </Link>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-bg-accent">
                  <img src={lockIcon} alt="" />
                </div>
                <p className="text-[14px]">Two - Factor Authentications</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="rounded-lg bg-[#D8F3DC] p-1 text-[12px] leading-4 text-success">
                  Enabled
                </p>
                <img src={rightIcon} alt="" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-bg-accent">
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
          className="mt-8 h-[45px] w-full cursor-pointer rounded-lg border border-text-secondary bg-button-disabled font-raleway text-[14px] font-semibold tracking-[1px]"
        >
          Log out
        </button>
      </main>
    </div>
  )
}

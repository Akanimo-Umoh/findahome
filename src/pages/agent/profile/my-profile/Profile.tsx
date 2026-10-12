import verifiedIcon from "@/assets/images/icon-verified-green.svg"
import checkIcon from "@/assets/agentImages/icon-check-green-circle.svg"
import pendingIcon from "@/assets/agentImages/icon-pending-review.svg"
import creditIcon from "@/assets/agentImages/icon-white-credit-card.svg"
import infoIcon from "@/assets/agentImages/icon-grey-info.svg"
import lockIcon from "@/assets/agentImages/icon-blue-lock.svg"
import rightIcon from "@/assets/agentImages/icon-grey-arrow.svg"
import { useAuthContext } from "@/context/AuthContext"
import Avatar from "@/components/Avatar"
import { useLogout } from "@/hooks/useLogout"
import { useBankAccounts } from "@/hooks/useBankAccounts"
import { useAgentProfile } from "@/hooks/useAgentDirectory"
import PageHeader from "@/components/shared/PageHeader"
import Skeleton from "@/components/ui/Skeleton"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function Profile() {
  const { user } = useAuthContext()
  const { handleLogout } = useLogout()
  const { accounts, isLoading, error } = useBankAccounts()
  const { agent, isLoading: isLoadingAgent } = useAgentProfile(user?._id ?? "")
  const payoutAccount =
    accounts.find((account) => account.isDefault) ?? accounts[0]

  return (
    <div className="mb-10 flex flex-col md:pt-6 lg:pt-8">
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

              {isLoadingAgent ? (
                <Skeleton className="h-4 w-20" />
              ) : agent ? (
                <div className="flex items-center gap-1">
                  <img
                    src={agent.isVerified ? checkIcon : pendingIcon}
                    alt=""
                  />
                  <p
                    className={
                      agent.isVerified ? "text-success" : "text-warning"
                    }
                  >
                    {agent.isVerified ? "Verified" : "Pending Review"}
                  </p>
                </div>
              ) : (
                <p className="text-text-secondary">Status unavailable</p>
              )}
            </div>
          </div>
        </div>

        {/* BANK & PAYOUT SETTINGS */}
        <div className="mt-8">
          <p className="text-text-secondary">BANK & PAYOUT SETTINGS</p>

          <div className="mt-4">
            {isLoading ? (
              <div className="flex items-center gap-3 rounded-lg bg-bg-tertiary px-3 py-3">
                <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton className="h-3.5 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ) : error ? (
              <div className="rounded-lg border border-state-error/30 bg-[#FFF0F0] px-3 py-3">
                <p className="text-[12px] text-state-error">{error}</p>
                <Link
                  to="/agent/manage-account"
                  className="mt-2 inline-block text-[12px] font-semibold text-button-bg underline"
                >
                  Manage bank accounts
                </Link>
              </div>
            ) : payoutAccount ? (
              <>
                <Link
                  to="/agent/manage-account"
                  className="flex items-center justify-between gap-3 rounded-lg bg-bg-tertiary px-3 py-2 transition-colors hover:bg-bg-accent"
                  aria-label={`Manage payout account: ${payoutAccount.bankName}, ending in ${payoutAccount.accountNumber.slice(-4)}`}
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-button-bg">
                      <img src={creditIcon} alt="" />
                    </div>

                    <div className="min-w-0 space-y-0.5">
                      <p className="line-clamp-1 text-[12px] leading-4">
                        {payoutAccount.bankName}
                      </p>
                      <p className="line-clamp-1 text-[12px] leading-4 text-text-secondary">
                        {payoutAccount.accountName} · ****
                        {payoutAccount.accountNumber.slice(-4)}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    {payoutAccount.isDefault && (
                      <span className="rounded-lg bg-bg-accent px-2 py-1 text-[12px] leading-4 text-text-secondary">
                        Default
                      </span>
                    )}
                    <img src={rightIcon} alt="" />
                  </div>
                </Link>

                <Button
                  variant="app-secondary"
                  size="full"
                  asChild
                  className="mt-3"
                >
                  <Link to="/agent/manage-account">Manage bank accounts</Link>
                </Button>
              </>
            ) : (
              <div className="rounded-lg border border-dashed border-text-disabled bg-bg-tertiary px-4 py-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bg-accent">
                    <img src={creditIcon} alt="" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold">
                      No payout account added
                    </p>
                    <p className="mt-1 text-[12px] leading-4 text-text-secondary">
                      Add a bank account to receive funds released from escrow.
                    </p>
                  </div>
                </div>
                <Button
                  variant="app-primary"
                  size="full"
                  asChild
                  className="mt-4"
                >
                  <Link to="/agent/manage-account">Add bank account</Link>
                </Button>
              </div>
            )}

            <div className="mx-5 mt-4 flex items-start gap-2">
              <img src={infoIcon} alt="" className="h-6 w-6 shrink-0" />

              <p className="text-[12px] leading-4 text-text-secondary">
                Payouts are processed securely via Escrow services. Changes may
                take 24 hrs to verify.
              </p>
            </div>
          </div>
        </div>

        {/* ACCOUNT SECURITY */}
        <div className="mt-8">
          <div className="rounded-lg bg-bg-tertiary p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bg-accent">
                <img src={lockIcon} alt="" />
              </div>

              <div className="min-w-0">
                <p className="text-[14px] font-semibold">
                  Keep your account secure
                </p>
                <p className="mt-1 text-[12px] leading-4 text-text-secondary">
                  Update your password to help protect access to your account.
                </p>
              </div>
            </div>

            <Button
              variant="app-secondary"
              size="full"
              asChild
              className="mt-4"
            >
              <Link to="/agent/change-password">Change password</Link>
            </Button>
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
        <Button
          variant="app-secondary"
          size="full"
          onClick={handleLogout}
          className="mt-8 lg:hidden"
        >
          Log out
        </Button>
      </main>
    </div>
  )
}

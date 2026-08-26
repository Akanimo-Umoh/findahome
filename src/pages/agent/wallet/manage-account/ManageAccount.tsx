import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import accountIcon from "@/assets/agentImages/icon-white-bank-account.svg"
import shieldIcon from "@/assets/agentImages/icon-shield.svg"
import withdrawIcon from "@/assets/agentImages/icon-blue-withdraw.svg"
import addIcon from "@/assets/agentImages/icon-add-property.svg"
import { Button } from "@/components/ui/button"
import { useBankAccounts } from "@/hooks/useBankAccounts"
import { toast } from "sonner"
import Skeleton from "@/components/ui/Skeleton"

export default function ManageAccount() {
  const navigate = useNavigate()
  const { accounts, isLoading, error, setDefault } = useBankAccounts()

  const handleSetDefault = async (id: string) => {
    try {
      await setDefault(id)
    } catch (err) {
      toast.error("Failed to update default account.")
      console.error("setDefault error:", err)
    }
  }

  return (
    <div className="mb-10 md:pt-6 lg:pt-8">
      {/* header */}
      <div className="relative flex items-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 cursor-pointer"
        >
          <img src={goBack} alt="" className="h-6 w-6" />
        </button>

        <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
          Manage Account
        </p>
      </div>

      <div className="mx-auto max-w-125">
        <div className="mt-6 flex flex-col items-center justify-center">
          <div className="flex h-15 w-15 shrink-0 items-center justify-center rounded-3xl bg-bg-accent">
            <img src={withdrawIcon} alt="" />
          </div>

          <div className="mt-6 flex max-w-[247px] flex-col items-center justify-center gap-1">
            <p>Your withdrawal account</p>
            <p className="text-center text-[12px] leading-4 text-text-secondary">
              Funds released from escrow will be deposited into your default
              account.
            </p>
          </div>
        </div>

        {/* accounts */}
        <div className="mt-[36px] space-y-4">
          {isLoading &&
            Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-lg border border-bg-accent p-3"
              >
                <Skeleton className="h-12.5 w-12.5 shrink-0 rounded-3xl" />
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-3 w-40" />
                </div>
              </div>
            ))}

          {error && (
            <p className="text-center text-[14px] text-text-secondary">
              {error}
            </p>
          )}

          {!isLoading && !error && accounts.length === 0 && (
            <p className="text-center text-[14px] text-text-secondary">
              You haven't added a bank account yet.
            </p>
          )}

          {accounts.map((account) => (
            <button
              key={account._id}
              type="button"
              onClick={() => handleSetDefault(account._id)}
              className="flex w-full cursor-pointer items-center gap-4 rounded-xl border border-bg-accent p-3 transition-colors hover:border-button-bg"
            >
              <div className="flex h-12.5 w-12.5 shrink-0 items-center justify-center rounded-3xl bg-button-bg">
                <img src={accountIcon} alt="" />
              </div>

              <div className="flex flex-1 flex-col items-start gap-1">
                <div className="flex w-full items-center justify-between gap-2">
                  <p className="line-clamp-1 flex-1 text-left text-[14px] tracking-[1px]">
                    {account.bankName}
                  </p>
                  {account.isDefault ? (
                    <p className="w-fit rounded-2xl bg-button-bg px-2 py-0.5 text-[12px] leading-4 text-white">
                      Default
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSetDefault(account._id)}
                      className="text-[12px] font-semibold text-button-bg underline"
                    >
                      Set as default
                    </button>
                  )}
                </div>

                {/* account number */}
                <p className="text-[12px] leading-4 text-text-secondary">
                  {account.accountNumber}
                </p>
                {/* account name */}
                <p className="text-[12px] leading-4 text-text-secondary">
                  {account.accountName}
                </p>
              </div>
            </button>
          ))}
        </div>

        <div className="mx-auto mt-6 space-y-4">
          <div className="flex items-start gap-2 bg-button-sec p-2">
            <img src={shieldIcon} alt="" />
            <p className="text-[12px] leading-4 text-text-secondary">
              Your bank details are encrypted and stored securely. All payouts
              are processed through verified accounts only.
            </p>
          </div>

          {/* takes you to the add account page */}
          <Button
            variant="app-primary"
            size="full"
            onClick={() => navigate("/agent/add-account")}
          >
            <img src={addIcon} alt="" />
            <p>Add New Account</p>
          </Button>
        </div>
      </div>
    </div>
  )
}

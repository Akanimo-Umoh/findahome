import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import AdminSection from "@/components/admin/ui/AdminSection"
import { Button } from "@/components/ui/button"
import Skeleton from "@/components/ui/Skeleton"
import { requestError } from "@/lib/requestError"
import { forgotPassword, resetPassword } from "@/services/auth.service"
import Field, { inputClass } from "./Field"
import { useMe } from "../useMe"

const MIN_LENGTH = 8

function PasswordForm({ email }: { email: string }) {
  const [sent, setSent] = useState(false)
  const [code, setCode] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")

  const sendCode = useMutation({
    mutationFn: () => forgotPassword({ email }),
    onSuccess: () => {
      setSent(true)
      toast.success("We sent a code to your email")
    },
    onError: (err) =>
      toast.error(
        requestError(err, "Couldn't send the code. Please try again.")
      ),
  })

  const change = useMutation({
    mutationFn: () =>
      resetPassword({ email, code: code.trim(), newPassword: password }),
    onSuccess: () => {
      toast.success("Password changed")
      setSent(false)
      setCode("")
      setPassword("")
      setConfirm("")
    },
    onError: (err) =>
      toast.error(
        requestError(err, "Couldn't change your password. Please try again.")
      ),
  })

  const tooShort = password !== "" && password.length < MIN_LENGTH
  const mismatch = confirm !== "" && confirm !== password
  const ready =
    code.trim() !== "" && password.length >= MIN_LENGTH && confirm === password

  if (!sent) {
    return (
      <div className="space-y-3">
        <p className="text-[14px] text-text-secondary">
          To change your password, we&rsquo;ll email a verification code to{" "}
          <span className="font-semibold text-text-primary">{email}</span>.
        </p>
        <Button
          variant="outline"
          disabled={sendCode.isPending}
          onClick={() => sendCode.mutate()}
        >
          {sendCode.isPending ? "Sending…" : "Send verification code"}
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (ready) change.mutate()
      }}
      className="space-y-4"
    >
      <Field id="pw-code" label="Verification code" hint={`Sent to ${email}.`}>
        <input
          id="pw-code"
          inputMode="numeric"
          autoComplete="one-time-code"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          className={inputClass}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id="pw-new"
          label="New password"
          hint={tooShort ? `Use at least ${MIN_LENGTH} characters.` : undefined}
        >
          <input
            id="pw-new"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field
          id="pw-confirm"
          label="Confirm new password"
          hint={mismatch ? "The passwords don't match." : undefined}
        >
          <input
            id="pw-confirm"
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <button
          type="button"
          disabled={sendCode.isPending}
          onClick={() => sendCode.mutate()}
          className="cursor-pointer text-[13px] font-semibold text-button-bg underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-button-bg/40"
        >
          Send a new code
        </button>
        <Button
          type="submit"
          variant="app-primary"
          disabled={!ready || change.isPending}
        >
          {change.isPending ? "Saving…" : "Change password"}
        </Button>
      </div>
    </form>
  )
}

export default function PasswordCard() {
  const me = useMe()

  return (
    <AdminSection title="Password">
      {me.isLoading ? (
        <Skeleton className="h-24 w-full" />
      ) : !me.data ? (
        <p className="text-[14px] text-text-secondary">
          Your account didn&rsquo;t load, so the password can&rsquo;t be changed
          right now.
        </p>
      ) : me.data.isGoogleUser ? (
        <p className="text-[14px] text-text-secondary">
          You sign in with Google, so there&rsquo;s no password to change here.
        </p>
      ) : (
        <PasswordForm email={me.data.email} />
      )}
    </AdminSection>
  )
}

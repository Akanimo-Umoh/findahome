import { useEffect } from "react"
import { useAuthContext } from "@/context/AuthContext"
import { useMyVerification } from "@/hooks/useMyVerification"

// The balance stored in the session is only a snapshot from login, and several
// screens read it (dashboard, wallet, withdraw, ad payment). This keeps it in
// step with what the server says, so they are all right without each one
// fetching it.
//
// It depends only on the fetched account, never on `user`: after a withdrawal
// the page sets the new balance itself, and an older fetched copy must not
// overwrite it. The next fetch brings the server's current number anyway.
export function useSyncBalance() {
  const { user, updateUser } = useAuthContext()
  const { me } = useMyVerification()

  useEffect(() => {
    if (!user || typeof me?.balance !== "number") return
    if (me.balance !== user.balance) {
      updateUser({ ...user, balance: me.balance })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me])
}

import { useEffect, useRef, useState } from "react"
import {
  resolveBankAccount,
  type ResolvedAccount,
} from "@/services/bank.service"

export function useResolveBankAccount(bankName: string, accountNumber: string) {
  const [resolved, setResolved] = useState<ResolvedAccount | null>(null)
  const [isResolving, setIsResolving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setResolved(null)
    setError(null)

    if (!bankName || accountNumber.length !== 10) {
      return
    }

    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(async () => {
      setIsResolving(true)
      try {
        const result = await resolveBankAccount(accountNumber, bankName)
        setResolved(result)
      } catch {
        setError("Couldn't verify this account. Check the number and bank.")
      } finally {
        setIsResolving(false)
      }
    }, 600)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [bankName, accountNumber])

  return { resolved, isResolving, error }
}

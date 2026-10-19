import { isAxiosError } from "axios"

// Turns a failed request into a sentence an admin can act on.
export function requestError(err: unknown, fallback: string): string {
  if (isAxiosError(err)) {
    const message = err.response?.data?.message
    if (typeof message === "string" && message) return message
    // Express answers an unknown route with an HTML 404 and no message
    if (err.response?.status === 404) {
      return "This isn't available on the server yet."
    }
    return fallback
  }
  if (err instanceof Error && err.message) return err.message
  return fallback
}

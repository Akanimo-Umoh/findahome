import { useEffect } from "react"
import { useLocation } from "react-router-dom"

/**
 * Scrolls to the element whose id matches the URL hash (e.g. "/#faq").
 * Call it once in the page that owns those sections (Home).
 *
 * `key` changes on every navigation, so clicking the same link twice
 * (or clicking it after scrolling away) still scrolls.
 */
export function useScrollToHash() {
  const { hash, key } = useLocation()

  useEffect(() => {
    if (!hash) return

    const id = decodeURIComponent(hash.slice(1))

    // Wait a frame so the sections exist when arriving from another page
    const frame = requestAnimationFrame(() => {
      const el = document.getElementById(id)
      if (!el) return

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches

      el.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      })
    })

    return () => cancelAnimationFrame(frame)
  }, [hash, key])
}

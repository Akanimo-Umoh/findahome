import { motion, useReducedMotion } from "framer-motion"
import { useAuthContext } from "@/context/AuthContext"
import rightArrow from "@/assets/images/icon-rightArrow-blue.svg"
import { Link } from "react-router-dom"

export default function Action() {
  const { isAuthenticated } = useAuthContext()
  const reduceMotion = useReducedMotion()

  // Signed-in users don't need a sign-up prompt, so render nothing at all
  if (isAuthenticated) return null

  return (
    <div className="max-w-7xl px-6 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex w-full max-w-200 flex-col items-center gap-4 rounded-xl bg-button-bg px-4 py-6 text-center text-white sm:gap-5 sm:px-8 sm:py-8 md:gap-6 md:rounded-2xl md:py-10 lg:py-12"
      >
        <div className="flex flex-col items-center gap-1 md:gap-2">
          <h2 className="font-raleway text-[18px] font-semibold tracking-[1px] text-balance md:text-[22px] lg:text-[28px]">
            Ready to find your dream home?
          </h2>
          <p className="text-[12px] text-balance md:text-[14px] lg:text-[16px]">
            Join thousands of happy homeowners and renters today
          </p>
        </div>

        <Link
          to="/signup"
          className="group flex h-11.25 items-center justify-center gap-2 rounded-lg bg-white px-4 transition hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98] md:h-12 md:px-6"
        >
          <span className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg md:text-[16px]">
            Sign Up Now
          </span>
          <img
            src={rightArrow}
            alt=""
            className="h-5 w-5 transition-transform motion-safe:group-hover:translate-x-0.5 md:h-6 md:w-6"
          />
        </Link>
      </motion.div>
    </div>
  )
}

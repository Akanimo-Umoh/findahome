import FeaturedProps from "./FeaturedProps"
import HowItWorks from "./HowItWorks"
import Reviews from "./Reviews"
import Search from "./Search"
import Properties from "./Properties"
import Faq from "./Faq"
import { useAuthContext } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
// import Why from "./Why";

export default function Home() {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.role === "agent") navigate("/agent/dashboard", { replace: true })
    if (user?.role === "admin") navigate("/admin/dashboard", { replace: true })
  }, [user, navigate])

  return (
    <div className="font-ssPro">
      <section className="heroBg relative pt-9.25 pb-10.75 md:flex md:h-[calc(100vh-66px)] md:items-center md:justify-center md:p-0">
        {/* black overlay */}
        <div className="absolute inset-0 bg-black/20 md:bg-[#00000099]" />

        <div className="relative z-10 max-w-7xl">
          <div className="mx-auto flex max-w-85.5 flex-col items-center justify-center gap-1 text-center text-white md:max-w-full md:gap-2">
            <p className="font-raleway text-[18px] leading-7.5 font-semibold tracking-[1px] md:font-metamorphous md:text-[40px] md:leading-15 md:font-normal">
              <span className="md:hidden">
                Find your next home, stress-free
              </span>
              <span className="hidden md:flex">Your next home, made easy.</span>
            </p>

            <p className="text-[12px] leading-4 md:max-w-138 md:text-[18px] md:leading-[27px]">
              <span className="md:hidden">
                Discover verified properties across Nigeria. Connect with
                trusted agents and move in safely.
              </span>
              <span className="hidden md:flex">
                Search smarter, ask questions instantly, and move forward faster
                with a seamless home-finding experience.
              </span>
            </p>
          </div>

          <div className="mx-6 mt-55.5 md:mx-11.5 md:mt-20">
            <Search />
          </div>
        </div>
      </section>

      <main className="mx-auto mt-10 max-w-7xl space-y-10 md:mt-20 md:space-y-20">
        {/* featured section */}
        <section>
          <FeaturedProps />
        </section>

        {/* why section */}
        {/* <section className="mt-8">
        <Why />
        </section> */}

        <section>
          <Properties />
        </section>

        {/* how it works */}
        <section>
          <HowItWorks />
        </section>

        {/* frequently asked questions */}
        <section>
          <Faq />
        </section>

        {/* reviews */}
        <section>
          <Reviews />
        </section>
      </main>
    </div>
  )
}

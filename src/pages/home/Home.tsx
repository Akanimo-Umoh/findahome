import FeaturedProps from "./FeaturedProps"
import HowItWorks from "./HowItWorks"
// import Reviews from "./Reviews"
import Search from "./Search"
import Properties from "./Properties"
import Faq from "./Faq"
import { useAuthContext } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Why from "./Why"
import testImg from "./test-img.jpg"
import naira from "@/assets/images/naira.svg"
import { ListingCard, type Listing } from "./ListingCard"
import Action from "./Action"
import { useScrollToHash } from "@/hooks/useScrollToHash"

export default function Home() {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.role === "agent") navigate("/agent/dashboard", { replace: true })
    if (user?.role === "admin") navigate("/admin/dashboard", { replace: true })
  }, [user, navigate])

  const mockListings: Listing[] = [
    {
      id: "1",
      kind: "apartment",
      title: "4 Bedroom Apartment",
      price: 800_000,
      location: "Lekki Phase 1, Lagos",
      imageUrl: "/images/apartment.jpg",
      beds: 4,
      baths: 2,
      agent: { name: "Eden Properties", avatarUrl: "/images/eden.jpg" },
    },
    {
      id: "2",
      kind: "land",
      title: "800Sqm of Land",
      price: 800_000,
      location: "Lekki Phase 1, Lagos",
      imageUrl: "/images/land.jpg",
      landType: "Residential",
      agent: { name: "MaryAnn Kikomu", avatarUrl: "/images/maryann.jpg" },
    },
  ]

  useScrollToHash()

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

            <p className="text-[12px] leading-4 md:max-w-138 md:text-[18px] md:leading-6.75">
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

      {/* test new cards design */}
      <section className="mt-10 border border-red-800 px-6">
        <div className="overflow-hidden rounded-2xl">
          <img src={testImg} alt="" className="h-40 w-full max-w-82.5" />

          <div className="mt-4 font-raleway text-[12px] font-semibold tracking-[1px]">
            <p className="text-black">4 Bedroom Apartment</p>
            <p className="flex items-center border border-blue-700">
              <img src={naira} alt="" className="" />
              <span className="text-button-bg">800k</span>
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      <main className="mx-auto mt-10 max-w-7xl space-y-10 md:mt-20 md:space-y-20">
        {/* featured section */}
        <section>
          <FeaturedProps />
        </section>

        <section>
          <Properties />
        </section>

        {/* how it works */}
        <section id="how-it-works" className="scroll-mt-20">
          <HowItWorks />
        </section>

        {/* why section */}
        <section id="why-choose-us" className="mt-8 scroll-mt-20">
          <Why />
        </section>

        {/* frequently asked questions */}
        <section id="faq" className="scroll-mt-20">
          <Faq />
        </section>

        {/* reviews */}
        {/* <section>
          <Reviews />
        </section> */}

        {/* action link */}
        <section>
          <Action />
        </section>
      </main>
    </div>
  )
}

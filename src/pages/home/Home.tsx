import FeaturedProps from "./FeaturedProps";
import HowItWorks from "./HowItWorks";
import Reviews from "./Reviews";
import Search from "./Search";
import Properties from "./Properties";
import Faq from "./Faq";
// import Why from "./Why";

export default function Home() {
  return (
    <div className="font-ssPro">
      <section className="heroBg pt-9.25 pb-10.75 relative">
        {/* black overlay */}
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10">
          <div className="flex flex-col items-center justify-center text-center gap-1 max-w-[342px] mx-auto text-white">
            <p className="font-raleway text-[18px] font-semibold tracking-[1px] leading-7.5">
              Find your next home, stress-free
            </p>

            <p className="text-[12px] leading-4">
              Discover verified properties across Nigeria. Connect with trusted
              agents and move in safely.
            </p>
          </div>

          <div className="mt-55.5 mx-6">
            <Search />
          </div>
        </div>
      </section>

      {/* featured section */}
      <section className="mt-10">
        <FeaturedProps />
      </section>

      {/* why section */}
      {/* <section className="mt-8">
        <Why />
      </section> */}

      <section className="mt-10">
        <Properties />
      </section>

      {/* how it works */}
      <section className="mt-10">
        <HowItWorks />
      </section>

      {/* frequently asked questions */}
      <section className="mt-10">
        <Faq />
      </section>

      {/* reviews */}
      <section className="mt-10">
        <Reviews />
      </section>
    </div>
  );
}

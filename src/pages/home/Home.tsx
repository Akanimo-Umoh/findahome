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
      <section className="heroBg pt-9.25 pb-10.75 relative md:h-screen md:flex md:items-center md: justify-center md:p-0">
        {/* black overlay */}
        <div className="absolute inset-0 bg-black/20 md:bg-[#00000099]" />

        <div className="relative z-10 border border-red-500">
          <div className="flex flex-col items-center justify-center text-center gap-1 max-w-85.5 mx-auto text-white md:max-w-full md:gap-2">
            <p className="font-raleway text-[18px] font-semibold tracking-[1px] leading-7.5 md:text-[40px] md:leading-15 md:font-metamorphous md:font-normal">
              <span className="md:hidden">
                Find your next home, stress-free
              </span>
              <span className="hidden md:flex">Your next home, made easy.</span>
            </p>

            <p className="text-[12px] leading-4 md:max-w-138 border md:text-[18px] md:leading-[27px]">
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

          <div className="mt-55.5 mx-6 md:mt-20">
            <Search />
          </div>
        </div>
      </section>

      <main className="space-y-10 mt-10">
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
  );
}

import FeaturedProps from "./FeaturedProps";
import HowItWorks from "./HowItWorks";
import Reviews from "./Reviews";
import Search from "./Search";
import Why from "./Why";

export default function Home() {
  return (
    <div className="font-ssPro">
      <section className="heroBg pt-4.25 pb-17.25">
        <div className="flex flex-col items-center justify-center text-center gap-1 max-w-[342px] mx-auto text-white">
          <p className="font-raleway text-[18px] font-semibold tracking-[1px] leading-7.5">
            Find your next home, stress-free
          </p>

          <p className="text-[12px] leading-4.5">
            Discover verified properties across Nigeria. Connect with trusted
            agents and move in safely.
          </p>
        </div>

        <div className="mt-17 mx-6">
          <Search />
        </div>
      </section>

      {/* featured section */}
      <section className="mt-8">
        <FeaturedProps />
      </section>

      {/* why section */}
      <section className="mt-8">
        <Why />
      </section>

      {/* how it works */}
      <section className="mt-8">
        <HowItWorks />
      </section>

      {/* reviews */}
      <section className="mt-8">
        <Reviews />
      </section>
    </div>
  );
}

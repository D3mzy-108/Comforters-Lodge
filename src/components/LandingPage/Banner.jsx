import HeroBg from "@/assets/images/banner/landing-page-hero-banner.png";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { Link } from "react-router-dom";

export default function HeroBanner() {
  return (
    <section
      className="relative h-screen"
      style={{
        backgroundImage: `url(${HeroBg})`,
        backgroundBlendMode: "darken",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 p-5 bg-linear-to-br lg:bg-linear-to-r from-black/80 to-black/40 from-50% z-100"></div>
      <div
        className={`absolute inset-0 z-200 px-6 bg-linear-to-b text-alpha text-wrap py-40 h-screen flex justify-center items-center`}
      >
        <div className="w-full md:w-5/6">
          <div className="w-full max-w-[700px] flex flex-col items-start gap-2">
            <h1 className="text-md text-[#7a6651] mb-2">
              Abiding Grace, Peace & Love.

            </h1>
            <h1 className="text-3xl md:text-4xl">
              Build a deeper relationship with God. Start your day centered on the Word of Truth, connected to the Spirit, and renewed in your soul.

              {/* Updated texts */}
            </h1>
            <p className="py-6 lg:py-3 text-lg text-white/60 md:text-2xl">
              Five minutes to reset your day. Let God speak first. Our
              daily devotionals are designed to help you pause, hear His voice,
              and carry His peace into everything that follows.
            </p>
            <div className="w-fit flex max-md:flex-col gap-1 max-md:gap-3">
              <Link to={`/feed`}>
                <Button
                  variant={"link"}
                  size={"sm"}
                  className={`font-normal text-lg flex rounded-xl px-5 py-6 text-white underline`}
                >
                  <h6 className="text-gray-200/50">Start with <span className="text-white">{"Today's Devotional >>"}</span></h6>
                  
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

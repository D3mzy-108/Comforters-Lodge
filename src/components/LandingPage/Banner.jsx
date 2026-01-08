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
        className={`absolute inset-0 z-200 px-6 bg-linear-to-b text-alpha text-wrap py-40 mt-12 md:mt-0 h-screen flex justify-center items-center`}
      >
        <div className="w-full md:w-5/6">
          <div className="w-full max-w-[700px] flex flex-col items-start gap-2 space-y-2">
            <h1 className="text-3xl md:text-4xl">
              {"Begin your day grounded in God's Word"}
            </h1>
            <p className="text-lg text-white/60 my-2">
              <span>
                {`Take a few minutes to pause, reflect, and listen. Our daily
                devotionals help you centre your heart on Scripture, attend to
                the Spirit, and carry peace into the rest of your day.`}
              </span>
              <br />
              <br />
              <span>
                {`Each devotional is short, focused, and designed to fit naturally
                into your morning or evening routine. Start today's devotional`}
              </span>
            </p>

            <div className="w-fit mt-4">
              <Link to={`/scripture`}>
                <Button
                  variant={"default"}
                  size={"sm"}
                  className={`font-normal text-lg flex rounded-full px-5 py-6 text-black bg-(--primary)`}
                >
                  {"Start Today's Devotional >>"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

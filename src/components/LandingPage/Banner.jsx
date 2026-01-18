import HeroBg from "@/assets/images/banner/landing-page-hero-banner.png";
import { Button } from "@/components/shadcn/animate-ui/components/buttons/button";
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
            <h1
              className="text-[3.25rem] font-bold"
              style={{ lineHeight: 1.2 }}
            >
              <span className="text-(--secondary)">
                <span>{"Begin your day grounded in "}</span>
              </span>
              <br />
              <span className="text-(--primary)">{"God's Word"}</span>
            </h1>
            <p className="text-xl text-white/80 my-2 italic">
              <span>
                {`Still your heart. Attend to the Spirit. Carry peace into your day.`}
              </span>
            </p>

            <div className="w-fit mt-4">
              <Link to={`/lesson`}>
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

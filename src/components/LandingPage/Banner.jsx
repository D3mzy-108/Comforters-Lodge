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
            <h1 className="text-3xl md:text-6xl font-roboto font-bold">
              Build your Relationship with God
            </h1>
            <p className="py-6 text-lg text-white/60 md:text-2xl">
              The five minutes that can reset your whole mind: let God speak
              first and shape the rest of your day.
            </p>
            <div className="w-fit flex gap-1">
              <Link
                to={`/devotionals?date=${new Date().getFullYear()}-${
                  new Date().getMonth() + 1
                }-${new Date().getDate()}`}
              >
                <Button
                  variant={"default"}
                  size={"sm"}
                  className={`text-lg rounded-full px-5 py-6 text-black bg-(--primary) border-2 border-(--primary) hover:bg-(--secondary)`}
                >
                  {"Today's Devotional >>"}
                </Button>
              </Link>
              <Button
                variant={"link"}
                size={"sm"}
                className={`font-normal text-lg rounded-xl px-5 py-6 text-white underline`}
              >
                {"Check out our communities >>"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

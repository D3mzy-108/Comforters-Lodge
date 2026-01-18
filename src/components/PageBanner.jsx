import HeroBg from "@/assets/images/banner/landing-page-hero-banner.png";

export default function PageBanner({ title = "" }) {
  return (
    <section
      className="relative h-fit"
      style={{
        backgroundImage: `url(${HeroBg})`,
        backgroundBlendMode: "darken",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        padding: 0,
      }}
    >
      <div className="pt-48 lg:pt-60 pb-24 px-3 bg-linear-to-br lg:bg-linear-to-r from-black/80 to-black/40 from-50%">
        <div className="text-alpha">
          <div className="w-full md:w-5/6 mx-auto">
            <div className="w-full max-w-[700px] flex flex-col items-start gap-2 space-y-2">
              <h1 className="text-6xl lg:text-7xl font-bold font-sans">
                {title}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import HeroBg from "@/assets/images/banner/landing-page-hero-banner.png";

export default function PageBanner({
  title = "",
  highlightedTitleText = "",
  subtitle = "",
}) {
  const parseTitle = () => {
    if (!highlightedTitleText) return title;

    const simpleTitleTexts = title.split(highlightedTitleText);
    if (simpleTitleTexts.length > 2) return title;

    return (
      <span>
        {simpleTitleTexts[0]}
        <span className="text-(--primary)">{highlightedTitleText}</span>
        {simpleTitleTexts[1]}
      </span>
    );
  };

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
              <h1
                className="text-[3.25rem] font-bold font-sans text-wrap"
                style={{ lineHeight: 1.2 }}
              >
                {parseTitle()}
              </h1>
              <p className="text-lg">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

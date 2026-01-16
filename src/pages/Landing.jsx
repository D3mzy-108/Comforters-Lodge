import NavBar from "@/components/Navbar";
import BtnStyle1 from "@/components/BtnStyle1";
import Demo1 from "@/assets/Demo1.jpg";
import Demo2 from "@/assets/Demo2.jpg";
import Demo3 from "@/assets/Demo3.jpg";
import Demo4 from "@/assets/Demo4.jpg";
import HeroBanner from "@/components/LandingPage/Banner";
import SiteFeatures from "@/components/LandingPage/Features";

const Landing = () => {
  const books = [
    {
      src: Demo1,
      title: "· FLEE: How Strategic Flight Fuels Eternal Purpose.",
    },
    { src: Demo2, title: "STAND: When Conviction Refuses To Bow" },
    { src: Demo3, title: "Follow Me: A 60-Day Walk with Jesus" },
    { src: Demo4, title: "Read Ask Go" },
  ];

  return (
    <div className="min-h-100 max-w-screen overflow-hidden relative">
      <div className="w-full bg-white space-y-12 relative">
        {/* Bug here idk what to do */}
        <NavBar />

        {/* **************************Hero************************** */}
        <HeroBanner />

        <SiteFeatures />

        <section className="flex flex-col-reverse md:flex-row text-wrap items-center justify-between bg-[#f9fafb] gap-4 px-6 md:px-16 py-16 rounded-lg">
          {/* Left side - books */}
          <div className="grid grid-cols-2 gap-6 md:w-1/2">
            {books.map((book, index) => (
              <div
                key={index}
                className="shadow-md hover:shadow-lg transition-all bg-white rounded-md overflow-hidden flex justify-center items-center p-4"
              >
                <img
                  src={book.src}
                  alt={book.title}
                  className="object-contain w-full h-auto max-h-64"
                />
              </div>
            ))}
          </div>

          {/* Right side - text */}
          <div className="mt-10 md:mt-0 md:ml-12 md:w-1/2 text-center md:text-left">
            <p className="uppercase tracking-wide text-sm text-gray-500 font-semibold mb-2">
              {"Comforter's Lodge Store"}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse Our Resources
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {`The Comforter's Lodge store includes daily devotionals, topical devotionals, resources for married couples, guides for kids, and featured resources from Comforter's Lodge Ministries' partners.`}
            </p>
            <BtnStyle1 Btn1text={"Browse our Resources"} />
            
          </div>
        </section>
      </div>
    </div>
  );
};

export default Landing;

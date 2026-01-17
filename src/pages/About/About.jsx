import { Link } from "react-router";
import flowLogo from "@/assets/flowLogo.mp4";
import PageBanner from "@/components/PageBanner";

const About = () => {
  return (
    <div className="min-h-screen text-wrap">
      <PageBanner title="About Us" />
      <div className="px-4 md:px-20 text-center">
        <div className="py-8">
          <div className="flex flex-col lg:flex-row-! justify-center items-center gap-4">
            <video
              src={flowLogo}
              alt="CLM Logo"
              autoPlay
              loop
              muted
              className="rounded-full bg-cover bg-center size-48"
            />
            <legend className="text-4xl font-bold">Comforter's Lodge</legend>
            <p className="text-xl text-(--textHighlight)">
              Abiding Grace, Peace, and Love.
            </p>

            <h1 className="text-2xl max-w-4xl text-center mt-8 text-beta">
              {`At Comforter's Lodge Ministries, we are a place of rest, renewal,
              and revival within the Cherubim & Seraphim Church family based in
              Lagos, Nigeria. Here, we help believers encounter the living
              Christ through prayer, grounded biblical teaching, and intentional
              discipleship. Our name captures our calling: a safe LODGE for the
              weary, where the COMFORTER, the Holy Spirit, brings healing,
              guidance, strength, and transformation. Our Vision To see a
              generation of Christians walking in deep fellowship with
              God—renewed in mind, restored in heart, and released into
              purposeful, fruitful mission. Our Mission - Teach Scripture in
              ways that speak to everyday life - Cultivate prophetic prayer and
              heartfelt worship - Provide practical resources for personal
              growth, inner healing, and disciple-making - Equip the Body of
              Christ to live holy, Spirit-empowered lives that bear eternal
              fruit`}
            </h1>
          </div>
        </div>
      </div>
      <div className="py-16 flex px-4 md:px-20 flex-col items-center">
        <h1 className="md:text-4xl text-2xl font-bold text-(--textHighlight) font">
          Our Mission
        </h1>
        <div className="flex gap-4">
          <h1 className="text-2xl max-w-4xl text-center mt-8 text-beta">
            {" "}
            {`Teach Scripture in ways that speak to everyday life, Cultivate
            prophetic prayer and heartfelt worship, Provide practical resources
            for personal growth, inner healing, and disciple-making, Equip the
            Body of Christ to live holy, Spirit-empowered lives that bear
            eternal fruit.`}{" "}
            <br />
          </h1>
        </div>
      </div>
      <div className="py-16 flex px-4 md:px-20 flex-col items-center">
        <h1 className="md:text-4xl text-2xl font-bold text-(--textHighlight) font">
          Our Story
        </h1>
        <div className="flex gap-4">
          <h1 className="text-2xl max-w-4xl text-center mt-8 text-beta">
            {" "}
            {`Comforter's Lodge was born in 2020, during the COVID-19 pandemic. As
            physical gatherings paused, a hunger grew for more than routine
            religion—a longing for authentic, life-giving relationship with God.
            What began as online Bible studies and prayers soon became a stream
            of hope. People from all walks of life found comfort, challenge, and
            commissioning through these virtual gatherings. Rooted in the rich
            prayer heritage of the Cherubim & Seraphim Church, Comforter's Lodge
            has blossomed into a vibrant community where the Holy Spirit moves
            powerfully. Today, through sermons, retreats, publications, and
            online teaching, we nurture disciples who hear God's voice and
            follow Him faithfully in every season.`}
          </h1>
        </div>
      </div>
      <div className="py-16 flex px-4 md:px-20 flex-col items-center">
        <h1 className="md:text-4xl text-2xl font-bold text-(--textHighlight) font">
          What We Believe
        </h1>
        <div className="flex gap-4">
          <h1 className="text-2xl max-w-4xl text-center mt-8 text-beta">
            {" "}
            <p className="text-center">
              {`We stand on the historic Christian faith, revealed in Scripture and lived in the power of the Holy Spirit:`}
            </p>
            <br />
            {` - The Bible as God's inspired, infallible, and authoritative
            Word`}
            <br />
            {" - Salvation by grace through faith in Jesus Christ alone"}
            <br />
            {` - The Trinity: one God eternally existing as Father, Son, and
            Holy Spirit`}
            <br />
            {` - The present-day person, power, gifts, and ministry of the
            Holy Spirit`}
            <br />
            {" - A life marked by holiness, worship, and loving service"} <br />
            <p className="tracking-wide text-xl mt-8 text-center">
              <span>Read our </span>
              <Link to="/declaration" className="font-bold underline">
                Declaration of Faith
              </Link>
            </p>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default About;

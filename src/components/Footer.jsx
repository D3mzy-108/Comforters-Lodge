import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { InstagramIcon, X } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { FaWhatsappSquare } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import logo1 from "@/assets/Logo1.png";
const navLinks = [
  {
    to: "/feed",
    category: "CLM",
    label: "About",
  },
  {
    to: "/feed",
    category: "CLM",
    label: "Donate",
  },
  {
    to: "/feed",
    category: "CLM",
    label: "Store",
  },
  {
    to: "/feed",
    category: "Explore",
    label: "Devotionals",
  },
  {
    to: "/feed",
    category: "Explore",
    label: "Hymns",
  },
  {
    to: "/feed",
    category: "Explore",
    label: "Scripture",
  },
  {
    to: "/feed",
    category: "Explore",
    label: "Prayer",
  },
  {
    to: "/feed",
    category: "CLM",
    label: "Contact",
  },
  {
    to: "/feed",
    category: "",
    label:
      "Contact Address: 17304 Preston Rd Suite 1060 Dallas, TX 75252 Phone: 214-705-3710 Email: contact@first15.org To donate by check, mail to: PO Box 226903 Dallas, TX 75222-6903",
  },
  // {
  //   to: "/feed",
  //   label: "Prayer",
  // },
  // {
  //   to: "/feed",
  //   label: "Prayer",
  // },
];
const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row min-h-screen lg:items-center gap-8 text-wrap text-beta py-16 px-4 md:px-20 border-t border-gray-400 mt-8 flex-wrap">
      <div className="flex gap-4 flex-wrap w-fit">
        <nav className="flex flex-col gap-4 w-md text-xl">
          <h1 className="font-serif text-2xl md:text-3xl my-4 lg:mt-0 lg:mb-0">Comforter's Lodge</h1>
          {navLinks.map((link, index) =>
            link.category == "CLM" ? (
              <a key={index} className="row-span-1">
                <Link to={link.to}>{link.label}</Link>
              </a>
            ) : (
              ""
            )
          )}
        </nav>
        <nav className="flex flex-col gap-4 w-lg text-xl">
          <h1 className="font-serif text-2xl md:text-3xl mt-12 lg:mt-0 lg:mb-0 mb-2 mr-auto">Explore</h1>
          {navLinks.map((link, index) =>
            link.category == "Explore" ? (
              <a key={index} className="row-span-1">
                <Link to={link.to}>{link.label}</Link>
              </a>
            ) : (
              ""
            )
          )}
        </nav>
        <div className="text-[#7a6651] w-fit text-semibold flex flex-col gap-4 mt-8 lg:mt-0 flex-wrap justify-between text-xl">
        <p className="flex  flex-col">
            <div className={` w-full  bg-cover bg-center`}>
              <img src={logo1} alt="Logo" className="h-40 w-40" />
              </div>Comforter's Lodge Ministries <br />
            <span className="text-lg text-wrap!">
              An outreach of the <br className="md:hidden" /> Cherubim & Seraphim Church.
            </span>
          </p>
          <p className="text-sm">© 2026 Comforter's Lodge Ministries. All Rights Reserved.</p>
        </div>
      </div>
          <div className="flex flex-row gap-4">
            <FaInstagram className="w-6 h-6 hover:text-(--primary) transition-colors cursor-pointer" />
            <FaWhatsapp className="w-6 h-6 hover:text-(--primary) transition-colors cursor-pointer" />

            <BsTwitterX className="w-6 h-6 hover:text-(--primary) transition-colors cursor-pointer" />
          </div>
      {/* <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Donate</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
      <form>
        <h6 className="footer-title">Newsletter</h6>
        <fieldset className="w-80">
          <label>Enter your email address</label>
          <div className="join">
            <input
              type="text"
              placeholder="username@site.com"
              className="input input-bordered join-item"
            />
            <button className="btn btn-primary join-item">Subscribe</button>
          </div>
        </fieldset>
      </form> */}
    </footer>
  );
};

export default Footer;

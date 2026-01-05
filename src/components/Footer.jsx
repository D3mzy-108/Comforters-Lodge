import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/animate-ui/components/buttons/button";
const navLinks = [
  {
    to: "/",
    label: "Home",
  },
  {
    to: "/feed",
    label: "Devotionals",
  },
  {
    to: "/feed",
    label: "Hymns",
  },
  {
    to: "/feed",
    label: "Scripture",
  },
  {
    to: "/feed",
    label: "Prayer",
  },
  {
    to: "/feed",
    label: "Contact",
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
    <footer className="flex flex-col justify-between  gap-8 text-wrap text-beta p-10 h-fit border-t border-gray-400 mt-8">
      
      <nav className="grid grid-cols-4 gap-4 w-3xl text-xl">
        {navLinks.map((link, index) => (
          <a key={index} className="row-span-1">
            <Link to={link.to}>{link.label}</Link>
          </a>
        ))}
      </nav>
      <div className="text-[#7a6651] text-semibold flex justify-between text-xl">
        <p>
          Comforter's Lodge Ministries <br />
          <span className="text-lg">
            An outreach of the Cherubim & Seraphim Church.
          </span> 
        </p>
          <p className="text-sm">
            Copyright 2026 Comforter's Lodge
          </p>
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

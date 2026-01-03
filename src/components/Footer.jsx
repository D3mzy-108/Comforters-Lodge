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
  ];
const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal text-wrap text-beta p-10 h-fit border-t border-gray-400 mt-8">
      <nav>
        <h6 className="footer-title">Services</h6>
          {navLinks.map((link, index) => (
            <a key={index}>
              <Link to={link.to}>
                  {link.label}
              </Link>
            </a>
          ))}
        </nav>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav>
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
      </form>
    </footer>
  );
};

export default Footer;

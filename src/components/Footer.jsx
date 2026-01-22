import { memo } from "react";
import { Link } from "react-router";
import {
  FaInstagram,
  FaThreads,
  FaWhatsapp,
  FaRegEnvelope,
} from "react-icons/fa6";

import logo1 from "@/assets/Logo1.png";

// Keep data stable and easy to maintain.
// Use ids as keys (avoid array index), and group links once.
const NAV_LINKS = [
  { id: "about", to: "/about", category: "CLM", label: "About" },
  { id: "store", to: "/", category: "CLM", label: "Store" },
  { id: "donate", to: "/", category: "CLM", label: "Support Us" },
  {
    id: "devotionals",
    to: "/lesson",
    category: "Explore",
    label: "Devotionals",
  },
  { id: "hymns", to: "/hymns", category: "Explore", label: "Hymns" },
  { id: "prayer", to: "/", category: "Explore", label: "Prayer" },
  {
    id: "scripture",
    to: "/scripture",
    category: "Explore",
    label: "Scripture",
  },
];

// If you need to display contact details, keep them separate from nav items.
const CONTACT_EMAIL = "info@clm.org.ng";
const CONTACT_TEXT = [`Email: ${CONTACT_EMAIL}`];

const groupedLinks = NAV_LINKS.reduce((acc, link) => {
  (acc[link.category] ??= []).push(link);
  return acc;
}, /** @type {Record<string, Array<{id:string;to:string;category:string;label:string}>>} */ ({}));

function LinkList({ title, links }) {
  return (
    <nav className="flex flex-col gap-4 text-xl">
      <h2 className="font-serif text-2xl md:text-3xl my-4 lg:my-0">{title}</h2>
      <ul className="flex flex-col gap-4">
        {links?.map((l) => (
          <li key={l.id}>
            <Link
              to={l.to}
              className="hover:text-(--primary) transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="inline-flex"
    >
      {children}
    </a>
  );
}

const Footer = memo(function Footer() {
  return (
    <footer className="w-full border-t border-gray-400 mt-8 py-16 px-4 md:px-20 text-beta">
      <div className="flex flex-col md:flex-row gap-10 flex-wrap">
        {/* LINKS */}
        <div className="w-full md:flex-1">
          <LinkList title="Comforter's Lodge" links={groupedLinks.CLM} />
        </div>
        <div className="w-full md:flex-1">
          <LinkList title="Explore" links={groupedLinks.Explore} />
        </div>

        {/* Branding */}
        <div className="w-full md:flex-1 text-wrap">
          <div className="text-[#7a6651] font-semibold flex flex-col gap-6 text-xl max-w-sm">
            <div className="flex flex-col gap-2">
              <img
                src={logo1}
                alt="Comforter's Lodge logo"
                className="size-32 -ml-4"
              />
              <div>
                Comforter's Lodge Ministries
                <div className="text-lg font-normal">
                  An outreach of the{" "}
                  <span className="whitespace-nowrap">
                    Cherubim &amp; Seraphim
                  </span>{" "}
                  Church.
                </div>
              </div>
            </div>

            {/* Optional: show contact details as real content, not a nav link */}
            <ul className="flex flex-col gap-1">
              {CONTACT_TEXT.map((_, index) => (
                <li key={index} className="text-sm text-pretty leading-relaxed">
                  {_}
                </li>
              ))}
            </ul>

            <p className="text-sm">
              © 2026 Comforter's Lodge Ministries. All Rights Reserved.
            </p>

            {/* Socials */}
            <div className="w-fit flex gap-6 mt-2">
              <SocialIcon href={`mailto:${CONTACT_EMAIL}`} label="Instagram">
                <FaRegEnvelope className="size-6 hover:text-(--primary) transition-colors" />
              </SocialIcon>
              <SocialIcon
                href="https://instagram.com/comforterslodge/"
                label="Instagram"
              >
                <FaInstagram className="size-6 hover:text-(--primary) transition-colors" />
              </SocialIcon>
              <SocialIcon
                href="https://www.threads.com/@comfortersLodge"
                label="Threads"
              >
                <FaThreads className="size-6 hover:text-(--primary) transition-colors" />
              </SocialIcon>
              {/* <SocialIcon
                href="https://facebook.com/@comfortersLodge"
                label="Facebook"
              >
                <FaFacebook className="size-6 hover:text-(--primary) transition-colors" />
              </SocialIcon> */}
              <SocialIcon href="https://wa.me/+2348098090555" label="WhatsApp">
                <FaWhatsapp className="size-6 hover:text-(--primary) transition-colors" />
              </SocialIcon>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;

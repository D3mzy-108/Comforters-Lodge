import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/shadcn/animate-ui/components/buttons/button";
import { MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/animate-ui/components/radix/dropdown-menu";
import logo from "@/assets/Logo1.png";

const NavBar = () => {
  const navigate = useNavigate();
  // const [isCatOpen, isCatClosed] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // NAVBAR STYLES
  const navStateClasses = `max-w-screen lg:px-10 py-4 ease-in-out transition-all duration-500 fixed w-full flex items-center justify-between z-5000 ${
    scrolled
      ? "backdrop-blur-lg bg-[#F5F5F5] text-slate-800"
      : "bg-transparent text-[#C4C5C6]"
  }`;

  // Home, Hymns, scripture & prayer added to list, Communties -> About, Feed-> Devotionals

  const navLinks = [
    {
      to: "/",
      label: "Home",
    },
    {
      to: "/about",
      label: "About",
    },
    {
      to: "/devotionals",
      label: "Devotionals",
    },
    {
      to: "/hymns",
      label: "Hymnnal",
    },
    {
      to: "/prayer",
      label: "Prayer",
    },
  ];

  return (
    <div className={navStateClasses}>
      <div className="flex w-full py-2 px-0 items-center gap-8">
        {/* ***************LOGO******************* */}
        <Link to="/">
          <div className="flex items-center lg:pl-4 pr-10 pl-2 justify-between border-r-2 border-(--primary)">
            <img src={logo} alt="Logo" className="size-20" />

            <div className="w-fit ml-2">
              <legend className="text-lg sm:text-xl">
                {""}
                {"Comforter's Lodge"}
              </legend>
              <span className="text-xs sm:text-sm text-(--primary)">
                {"Abiding Grace, Peace & Love."}
              </span>
            </div>
          </div>
        </Link>
        {/* ************NAVLIST**************** */}
        <ul className="hidden min-[1200px]:flex justify-start flex-1 items-center">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link to={link.to}>
                <Button
                  variant={"link"}
                  size={"lg"}
                  className={`font-normal text-xl cursor-pointer ${
                    scrolled ? "text-slate-800" : "text-white/70"
                  }`}
                >
                  {link.label}
                </Button>
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden min-[1200px]:flex w-fit">
          <Button
            variant={"default"}
            size={"lg"}
            className=" rounded-full bg-(--primary) hover:bg-(--primary) px-6 py-6 text-lg font-normal text-black"
          >
            Support Us
          </Button>
        </div>

        {/* MOBILE NAVBAR DROPDOWN MENU */}
        <div className="w-fit block min-[1200px]:hidden ml-auto px-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-(--secondary) rounded-full p-3 border-none outline-none">
              <MenuIcon className="text-xl text-black" />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-white/50 backdrop-blur-md z-5000 border-none outline-none w-60 p-3">
              <DropdownMenuGroup>
                {navLinks.map((link, index) => (
                  <div key={index}>
                    <DropdownMenuItem
                      variant="destructive"
                      className="hover:bg-transparent"
                      onClick={() => navigate(link.to)}
                    >
                      <span>{link.label}</span>
                    </DropdownMenuItem>
                    {index === navLinks.length - 1 ? (
                      <></>
                    ) : (
                      <DropdownMenuSeparator className="bg-(--primary) my-3" />
                    )}
                  </div>
                ))}
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

// ASSIGNMENT
// Build a car rental service using tailwind

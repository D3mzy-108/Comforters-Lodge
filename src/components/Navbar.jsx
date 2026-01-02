import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/animate-ui/components/radix/dropdown-menu";

const AuthTriggerBtns = () => {
  return (
    <div className="w-fit flex gap-4">
      <Link to={"/"}>
        <Button
          variant={"default"}
          size={"default"}
          className={`font-medium rounded-full px-6 py-5 text-black hover:bg-(--primary) text-base border-2 border-(--primary) bg-(--secondary)`}
        >
          {"Login"}
        </Button>
      </Link>
      <Link to={"/"}>
        <Button
          variant={"default"}
          size={"default"}
          className={`font-medium rounded-full px-6 py-5 text-black bg-(--primary) text-base border-2 border-(--primary) hover:text-black hover:bg-(--secondary)`}
        >
          {"Join Us"}
        </Button>
      </Link>
    </div>
  );
};

const NavBar = () => {
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
  const navStateClasses = ` lg:px-10 py-4 ease-in-out transition-all duration-500 fixed w-full flex items-center justify-between z-5000 ${
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
      to: "/",
      label: "About",
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
      to: "/",
      label: "Donate",
    },
  ];

  return (
    <div className={navStateClasses}>
      <div className="flex w-full px-4 py-3 lg:px-0 items-center gap-3">
        {/* ***************LOGO******************* */}
        <div className="flex items-center lg:px-4 px-2 justify-between">
          <span className="lg:pl-6 lg:pr-4 py-2 border-r-2 border-(--primary)">
            <Link to="/">
              <legend className="text-xl lg:text-2xl flex mr-5 w-fit">
                {""}
                Comforter's Lodge
              </legend>
            </Link>
          </span>
        </div>
        {/* ************NAVLIST**************** */}
        <ul className="hidden lg:flex justify-start flex-1 text-xl items-center">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link to={link.to}>
                <Button
                  variant={"link"}
                  size={"lg"}
                  className={`font-normal text-lg ${
                    scrolled ? "text-slate-800" : "text-white/70"
                  }`}
                >
                  {link.label}
                </Button>
              </Link>
            </li>
          ))}
        </ul>

        <div className="w-fit hidden lg:block">
          <AuthTriggerBtns />
        </div>

        {/* MOBILE NAVBAR DROPDOWN MENU */}
        <div className="w-fit block lg:hidden ml-auto px-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-(--secondary) rounded-full p-3 border-none outline-none">
              <MenuIcon className="text-xl text-black" />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-[#F5F5F5] z-5000 border-none outline-none">
              <DropdownMenuLabel className="underline">Menu</DropdownMenuLabel>

              <DropdownMenuGroup>
                {navLinks.map((link, index) => (
                  <DropdownMenuItem key={index}>
                    <Link to={link.to}>
                      <span>{link.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="bg-(--primary) my-3" />

              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <AuthTriggerBtns />
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* <div className="relative block lg:hidden">
          <FaBars
            color="gray"
            onClick={() => {
              isCatClosed(!isCatOpen);
            }}
            className={isCatOpen ? "hidden" : "block"}
          />
          <FaTimes
            onClick={() => {
              isCatClosed(!isCatOpen);
            }}
            className={isCatOpen ? "block" : "hidden"}
          />
          <ul
            className={`
              ${
                isCatOpen
                  ? `flex flex-col ${window.addEventListener(
                      "scroll",
                      closeOnScroll
                    )} absolute right-10 lg:right-50 bg-[#f7f5f34b] backdrop-blur-3xl p-8 gap-10 text-xl  text-gray-800 items-center`
                  : "hidden"
              } `}
          >
            <li className="border-b-2 w-full border-orange-200">Category</li>
            <li className="border-b-2 w-full border-orange-200">Blogs</li>
            <li className="border-b-2 w-full border-orange-200">Go Deeper</li>
            <Link to="/pages/Today">
              <BtnStyle2
                Btn2text={"Today's Devotional"}
                destination={"/Today.jsx"}
              />
            </Link>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default NavBar;

// ASSIGNMENT
// Build a car rental service using tailwind

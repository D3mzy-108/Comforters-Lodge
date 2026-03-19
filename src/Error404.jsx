import error404 from "./assets/images/banner/404-banner.png";
import error404Mobile from "./assets/images/banner/404-banner-mobile.png";
import { Button } from "./components/shadcn/animate-ui/components/buttons/button";
import { MoveRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Error404() {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <div className="w-full h-screen flex items-center justify-center md:justify-start relative">
        <img
          src={error404}
          alt=""
          className="w-full h-screen object-cover max-md:hidden"
        />
        <img
          src={error404Mobile}
          alt=""
          className="w-full h-screen object-cover md:hidden"
        />

        <div className="absolute inset-0 bg-linear-to-b md:bg-linear-to-r from-black/80 to-black/20 px-3 py-10 md:p-8">
          <div className="w-full h-full flex items-start justify-center md:items-center md:justify-start">
            <div className="w-full max-w-4xl space-y-8 text-[#fef1c6] text-wrap text-center md:text-start py-20 lg:px-8">
              <legend className="font-bold text-6xl">Page Not Found</legend>
              <p className="text-2xl text-[#fef1c6]/80 leading-relaxed">
                Seems this path has led you astray on your journey with us.
                <br />
                But don't worry, the Word is always available!
              </p>

              <div className="w-full flex gap-4">
                <Button
                  variant={"default"}
                  size={"lg"}
                  className="bg-(--primary) hover:bg-(--primary) rounded-full px-8 py-6 text-lg text-black"
                  onClick={() => navigate("/devotionals")}
                >
                  Read Devotional
                  <MoveRightIcon className="size-4" />
                </Button>
                <Button
                  variant={"outline"}
                  size={"lg"}
                  className="border-(--primary) hover:bg-(--primary)/10 rounded-full px-8 py-6 text-lg text-(--primary)"
                  onClick={() => navigate("/bible")}
                >
                  Read Scriptures
                  <MoveRightIcon className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

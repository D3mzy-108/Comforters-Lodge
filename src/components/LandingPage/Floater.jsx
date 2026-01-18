import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/shadcn/animate-ui/components/buttons/button";

function Floater() {
  return (
    <div className="sticky p-0 w-fit hidden md:block z-500 rounded-xl text-white">
      <Link to={"/lesson"}>
        <Button
          variant={"default"}
          size={"default"}
          className={`fixed p-8 w-fit bg-[#7a6651] hover:bg-[#7a6651]/90 right-16 bottom-16`}
        >
          {"Devotionals >>"}
        </Button>
      </Link>
    </div>
  );
}

export default Floater;

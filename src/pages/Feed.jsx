import React from "react";
import NavBar from "../components/Navbar";
import { ArrowLeft, Forward, Share, Share2Icon, SortAsc } from "lucide-react";
import { Link } from "react-router";
import Footer from "../components/Footer";

function Feed() {
  const Demo = [
    {
      title: "Jelly",
      preview: "lorem ipsum dolor sit amet constracteur",
      destination: "",
    },
    {
      title: "Can",
      preview: "lorem ipsum dolor sit amet constracteur",
      destination: "",
    },
    {
      title: "Peanut",
      preview: "lorem ipsum dolor sit amet constracteur",
      destination: "",
    },
    {
      title: "Carr",
      preview: "lorem ipsum dolor sit amet constracteur",
      destination: "",
    },
  ];
  return (
    <div className="bg-white min-h-screen">
      <section className="py-4! px-10 border flex border-black/20">
        <div className="w-full h-fit flex justify-start items-center gap-4">
          <Link to="/">
            <div className="p-4 border w-fit rounded-full hover:bg-black/20 ease-in-out duration-150 transition-all">
              <ArrowLeft />
            </div>{" "}
          </Link>
          <div className="flex flex-col gap-2">
            <h1 className="text-xl lg:text-2xl  font-bold">Feed</h1>
            <p className="text-sm lg:text-lg text-gray-600">
              Daily Devotionals & Lessons
            </p>
          </div>
        </div>
        <div className="ml-10 p-4 w-full flex items-center gap-4">
          <input
            type="text"
            placeholder=" Search lessons, themes..."
            className="w-full h-10 p-4 bg-white rounded-xl border-black border focus:border-2"
          />
          <div className="flex py-2 px-4 border rounded-xl hover:bg-black/75 hover:text-white ease-in-out duration-150 transition-all">
            <SortAsc />
            <p>Sort</p>
          </div>
        </div>
      </section>
      <section className="py-20! grid bg-alpha">
        <div className="grid grid-flow-col auto-cols-[20rem]  px-10 gap-4 h-30 md:h-50 w-full overflow-x-scroll overflow-y-auto">
          {Demo.map((d) => (
            <div
              className={` text-wrap h-50 p-4 rounded-xl text-white bg-linear-120 from-red-700 to-blue-800`}
            >
              <div className="flex flex-col gap-2 justify-end h-full">
                <h1 className="text-xl">{d.title}</h1>
                <h1>{d.preview}</h1>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="grid grid-cols-9 min-h-screen p-10 bg-alpha gap-8">
        <div className="h-full col-span-5">
            <div className="p-8 w-full flex justify-between"> 
                <h1 className="text-2xl font-bold tracking-wide">Title
                    {/* This box should show only the devotional of that day */}
                </h1>
                {/* <Share2Icon/> */}
                <Forward/>
            </div>
            <div className="mt-8 text-wrap flex flex-col gap-4 border-b border-beta/50 p-8">
                <h1 className="text-2xl font-semibold tracking-wide">Key Thought</h1>
                <p>
                    
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus voluptatum ad fuga veritatis temporibus, corporis nesciunt laborum nisi amet rem dolorum quo dolore ratione ea consequatur neque. Distinctio, placeat.
                </p>
                <div></div>
            </div>
            <div className="mt-4 text-wrap flex flex-col gap-4 p-8">
                <h1 className="text-2xl font-semibold tracking-wide">Prayer</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus voluptatum ad fuga veritatis temporibus, corporis nesciunt laborum nisi amet rem dolorum quo dolore ratione ea consequatur neque. Distinctio, placeat.
                </p>
            </div>
        </div>
        <div className="h-full col-span-4 border rounded-xl border-beta"></div>
      </section>
      <Footer/>
    </div>
  );
}

export default Feed;

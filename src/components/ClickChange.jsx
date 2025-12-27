import BtnStyle1 from "../components/BtnStyle1";
import BtnStyle2 from "../components/BtnStyle2";
import { useState, useEffect } from "react";

function ClickChange({ title, yapText, flexStyle, btnNext, bg1, bg2, bg3, boxHnW, setting1, setting2, opt1,opt2,opt3, uniquePadding}) {
  const [clicked1, useClick1] = useState(true);
  const [clicked2, useClick2] = useState(false);
  const [clicked3, useClick3] = useState(false);
  return (
    <div className={`flex items-center justify-center  ${uniquePadding} w-full text-wrap text-beta `}>
      <div className={`${flexStyle}`}>
        <div
          className={`${boxHnW} ${
            setting1?clicked1
              ?
                 "bg-red-700"
              : clicked2
              ? "bg-blue-700"
              : clicked3
              ? "bg-green-700"
              : "bg-red-500": "bg-none"
          } ease-in-out duration-150 transition-all`}
        >
          {setting2?
            clicked1?
               bg1
                
              : clicked2
              ? bg2
                
              : clicked3
              ? bg3
                
              : "bg-red-500":""
          }
        </div>
        <div className="flex flex-col gap-4 ">
          <h1 className="text-3xl lg:text-6xl font-serif px-4">{title}</h1>
          <div className=" flex md:px-16 overflow-scroll gap-2 lg:justify-start lg:no-scrollbar px-4 text-nowrap  flex-wrap">
            <button
              onClick={() => {
                useClick1(true);
                useClick2(false);
                useClick3(false);
              }}
              className={`px-4 py-2 text-sm rounded-full ${
                clicked1
                  ? "border-orange-300 hover:border-orange-300"
                  : "border-transparent"
              } border-2 bg-conic-90 from-white via-gray-200 to-white hover:border-gray-400 ease-in duration-200`}
            >
              {opt1}
            </button>
            <button
              onClick={() => {
                useClick2(true);
                useClick1(false);
                useClick3(false);
              }}
              className={`px-4 py-2 text-sm rounded-full ${
                clicked2
                  ? "border-orange-300 hover:border-orange-300"
                  : "border-transparent"
              } border-2 bg-conic-90 from-white via-gray-200 to-white hover:border-gray-400 ease-in w-fit duration-200`}
            >
              {opt2}
            </button>
            <button
              onClick={() => {
                useClick3(true);
                useClick2(false);
                useClick1(false);
              }}
              className={`px-4 py-2 text-sm rounded-full ${
                clicked3
                  ? "border-orange-300 hover:border-orange-300"
                  : "border-transparent"
              } border-2 bg-conic-90 from-white via-gray-200 to-white hover:border-gray-400 ease-in duration-200`}
            >
              {opt3}
            </button>
          </div>
          <div className=" px-4">
            <p className={` text-xl lg:w-[65%]`}>{yapText}</p>
            {btnNext}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClickChange;




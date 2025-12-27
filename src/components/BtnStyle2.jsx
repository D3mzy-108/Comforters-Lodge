import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Landing from "../pages/Landing";


function BtnStyle2({ Btn2text, destination}) {
  return (
    <button className="py-2.5 px-6 hover:bg-alpha hover:text-gamma hover:border-gamma m-4 border border-transparent ease-in-out duration-300 rounded-full transition-all bg-gamma text-white">
      {Btn2text}
    </button>
  );
}

export default BtnStyle2;

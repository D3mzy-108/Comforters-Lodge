import React from "react";

function BtnStyle1({ Btn1text, destination }) {
  return (
    <button className="py-2.5 m-4 hover:bg-gamma px-6 rounded-full border border-gamma hover:text-alpha transition-all text-gamma">
      {Btn1text}
    </button>
  );
}

export default BtnStyle1;
import React from "react";
import Header from "../Header";
import Bar from "../Sidebar";

function Main() {
  return (
    <div className="w-full">
      <div className="flex">
        <Bar />
        <div className="p-2 flex justify-center items-center text-center w-[65%]">
          WELCOME
        </div>
      </div>
    </div>
  );
}

export default Main;

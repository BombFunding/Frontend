"use client";

import React from "react";
// import Voting from "@/components/Voting/Voting";
import Comment from "@/components/Comment/Comment";
import { BarChart1 } from "@/components/BarChart/BarChart1";
import BarChart2 from "@/components/BarChart/BarChart2";



const BlankPage = () => {
  return (
    <div className="flex flex-wrap gap-6 p-6 bg-gray-100">
        <div className="flex-1 min-w-[300px]">
      <BarChart1 />
        </div>
        <div className="flex-1 min-w-[300px]">
      <BarChart2 />
        </div>
  </div>
  );
};

export default BlankPage;
"use client";

import React from "react";
// import Voting from "@/components/Voting/Voting";
import Comment from "@/components/Comment/Comment";
import BarChart1 from "../components/BarChart/BarChart1";
import BarChart2 from "../components/BarChart/BarChart2";
import Fund from "../components/BarChart/BarChart1";
import ProjectFund from "@/components/BarChart/BarChart3";
import ProjectLikeAndView from "@/components/BarChart/BarChart4";
import LikeAndView from "../components/BarChart/BarChart2";

const BlankPage = () => {
	return (
		// <div className="flex flex-wrap gap-6 p-6 bg-gray-100">
		<div>
			{/* <Comment /> */}
			<LikeAndView />

		</div>
	);
};

export default BlankPage;

// export default function TestChart() {
//   return <BarChart2 />;
// }

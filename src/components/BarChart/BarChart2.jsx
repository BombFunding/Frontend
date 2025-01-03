// import React, { useEffect, useState } from "react";
// import { TrendingUp } from "lucide-react";
// import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from "recharts";
// import { getData } from "@/Services/ApiClient/Services";
// import { useParams } from "react-router-dom";
// import useProfileStore from "@/stores/ProfileStore/ProfileStore";

// const chartConfig = {
//   view: {
//     label: "view",
//     color: "#4CAF50", // Replace with actual colors
//   },
//   like: {
//     label: "like",
//     color: "#FF9800", // Replace with actual colors
//   },
// };

// function ChartTooltipContent({ payload, label }) {
//   if (!payload || !payload.length) return null;

//   const translationMap = {
//     view: "بازدید",
//     like: "لایک",
//   };

//   return (
//     <div style={{ background: "#fff", padding: "10px", border: "1px solid #ddd" }} className="font-vazirmatn">
//       <p>{label}</p>
//       {payload.map((entry, index) => (
//         <p key={`item-${index}`}>
//           {translationMap[entry.name] || entry.name}: {entry.value}
//         </p>
//       ))}
//     </div>
//   );
// }

// export default function BarChart2() {
//   const [chartData, setChartData] = useState([]);
//   const balls = useProfileStore(state => state.username);

//   useEffect(() => {
//     // Fetch the data from the API
//     if (!balls) return

//     const fetchChartData = async () => {
//       try {
//         const data = await getData(`profile_statics/last-7-days/?username=${balls}`);
//         // data[0]["view"] = 100
//         // data[0]["like"] = 10
//         // data[1]["view"] = 100
//         // data[1]["like"] = 10
//         setChartData(data);

//       } catch (error) {
//         console.log("Error fetching chart data:", error);
//       } finally {
//         // setLoading(false);
//       }
//     };

//     fetchChartData();
//   }, [balls])

//   return (
//     <div className="card p-1 bg-white rounded-lg shadow-md text-xs">
//       <div className="card-header"></div>
//       <div className="card-content">
//         <div className="flex justify-center" style={{ width: "100%", height: 300 }}>
//           <BarChart width={400} height={300} data={chartData}>
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="day"
//               tickLine={false}
//               tickMargin={10}
//               axisLine={false}
//               tickFormatter={(value) => value.slice(0, 8)}
//               className="font-vazirmatn"
//             />
//             <Tooltip content={<ChartTooltipContent />} />
//             <Bar
//               dataKey="view"
//               fill={chartConfig.view.color}
//               radius={[4, 4, 0, 0]}
//             />
//             <Bar
//               dataKey="like"
//               fill={chartConfig.like.color}
//               radius={[4, 4, 0, 0]}
//             />
//           </BarChart>
//         </div>
//       </div>
//       <div className="card-footer" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//         <div style={{ display: "flex", alignItems: "center", gap: "4px", fontWeight: "bold" }}>
//           {/* <p dir="rtl">
//           افزایش بازدید در هفته اخیر
//               <span dir="ltr">۵.۲٪</span>
//           </p>
//           <TrendingUp size={16} /> */}
//         </div>
//         {/* <p style={{ color: "#6c757d" }}>
//          بازدید کنندگان هفته اخیر
//         </p> */}
//       </div>
//     </div>
//   );
// }

"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "../../components/ui/chart";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";
const chartData = [
	{ date: "2024-04-01", desktop: 222, mobile: 150 },
	{ date: "2024-04-02", desktop: 97, mobile: 180 },
	{ date: "2024-04-03", desktop: 167, mobile: 120 },
	{ date: "2024-04-04", desktop: 242, mobile: 260 },
	{ date: "2024-04-05", desktop: 373, mobile: 290 },
	{ date: "2024-04-06", desktop: 301, mobile: 340 },
	{ date: "2024-04-07", desktop: 245, mobile: 180 },
	{ date: "2024-04-08", desktop: 409, mobile: 320 },
	{ date: "2024-04-09", desktop: 59, mobile: 110 },
	{ date: "2024-04-10", desktop: 261, mobile: 190 },
	{ date: "2024-04-11", desktop: 327, mobile: 350 },
	{ date: "2024-04-12", desktop: 292, mobile: 210 },
	{ date: "2024-04-13", desktop: 342, mobile: 380 },
	{ date: "2024-04-14", desktop: 137, mobile: 220 },
	{ date: "2024-04-15", desktop: 120, mobile: 170 },
	{ date: "2024-04-16", desktop: 138, mobile: 190 },
	{ date: "2024-04-17", desktop: 446, mobile: 360 },
	{ date: "2024-04-18", desktop: 364, mobile: 410 },
	{ date: "2024-04-19", desktop: 243, mobile: 180 },
	{ date: "2024-04-20", desktop: 89, mobile: 150 },
	{ date: "2024-04-21", desktop: 137, mobile: 200 },
	{ date: "2024-04-22", desktop: 224, mobile: 170 },
	{ date: "2024-04-23", desktop: 138, mobile: 230 },
	{ date: "2024-04-24", desktop: 387, mobile: 290 },
	{ date: "2024-04-25", desktop: 215, mobile: 250 },
	{ date: "2024-04-26", desktop: 75, mobile: 130 },
	{ date: "2024-04-27", desktop: 383, mobile: 420 },
	{ date: "2024-04-28", desktop: 122, mobile: 180 },
	{ date: "2024-04-29", desktop: 315, mobile: 240 },
	{ date: "2024-04-30", desktop: 454, mobile: 380 },
	{ date: "2024-05-01", desktop: 165, mobile: 220 },
	{ date: "2024-05-02", desktop: 293, mobile: 310 },
	{ date: "2024-05-03", desktop: 247, mobile: 190 },
	{ date: "2024-05-04", desktop: 385, mobile: 420 },
	{ date: "2024-05-05", desktop: 481, mobile: 390 },
	{ date: "2024-05-06", desktop: 498, mobile: 520 },
	{ date: "2024-05-07", desktop: 388, mobile: 300 },
	{ date: "2024-05-08", desktop: 149, mobile: 210 },
	{ date: "2024-05-09", desktop: 227, mobile: 180 },
	{ date: "2024-05-10", desktop: 293, mobile: 330 },
	{ date: "2024-05-11", desktop: 335, mobile: 270 },
	{ date: "2024-05-12", desktop: 197, mobile: 240 },
	{ date: "2024-05-13", desktop: 197, mobile: 160 },
	{ date: "2024-05-14", desktop: 448, mobile: 490 },
	{ date: "2024-05-15", desktop: 473, mobile: 380 },
	{ date: "2024-05-16", desktop: 338, mobile: 400 },
	{ date: "2024-05-17", desktop: 499, mobile: 420 },
	{ date: "2024-05-18", desktop: 315, mobile: 350 },
	{ date: "2024-05-19", desktop: 235, mobile: 180 },
	{ date: "2024-05-20", desktop: 177, mobile: 230 },
	{ date: "2024-05-21", desktop: 82, mobile: 140 },
	{ date: "2024-05-22", desktop: 81, mobile: 120 },
	{ date: "2024-05-23", desktop: 252, mobile: 290 },
	{ date: "2024-05-24", desktop: 294, mobile: 220 },
	{ date: "2024-05-25", desktop: 201, mobile: 250 },
	{ date: "2024-05-26", desktop: 213, mobile: 170 },
	{ date: "2024-05-27", desktop: 420, mobile: 460 },
	{ date: "2024-05-28", desktop: 233, mobile: 190 },
	{ date: "2024-05-29", desktop: 78, mobile: 130 },
	{ date: "2024-05-30", desktop: 340, mobile: 280 },
	{ date: "2024-05-31", desktop: 178, mobile: 230 },
	{ date: "2024-06-01", desktop: 178, mobile: 200 },
	{ date: "2024-06-02", desktop: 470, mobile: 410 },
	{ date: "2024-06-03", desktop: 103, mobile: 160 },
	{ date: "2024-06-04", desktop: 439, mobile: 380 },
	{ date: "2024-06-05", desktop: 88, mobile: 140 },
	{ date: "2024-06-06", desktop: 294, mobile: 250 },
	{ date: "2024-06-07", desktop: 323, mobile: 370 },
	{ date: "2024-06-08", desktop: 385, mobile: 320 },
	{ date: "2024-06-09", desktop: 438, mobile: 480 },
	{ date: "2024-06-10", desktop: 155, mobile: 200 },
	{ date: "2024-06-11", desktop: 92, mobile: 150 },
	{ date: "2024-06-12", desktop: 492, mobile: 420 },
	{ date: "2024-06-13", desktop: 81, mobile: 130 },
	{ date: "2024-06-14", desktop: 426, mobile: 380 },
	{ date: "2024-06-15", desktop: 307, mobile: 350 },
	{ date: "2024-06-16", desktop: 371, mobile: 310 },
	{ date: "2024-06-17", desktop: 475, mobile: 520 },
	{ date: "2024-06-18", desktop: 107, mobile: 170 },
	{ date: "2024-06-19", desktop: 341, mobile: 290 },
	{ date: "2024-06-20", desktop: 408, mobile: 450 },
	{ date: "2024-06-21", desktop: 169, mobile: 210 },
	{ date: "2024-06-22", desktop: 317, mobile: 270 },
	{ date: "2024-06-23", desktop: 480, mobile: 530 },
	{ date: "2024-06-24", desktop: 132, mobile: 180 },
	{ date: "2024-06-25", desktop: 141, mobile: 190 },
	{ date: "2024-06-26", desktop: 434, mobile: 380 },
	{ date: "2024-06-27", desktop: 448, mobile: 490 },
	{ date: "2024-06-28", desktop: 149, mobile: 200 },
	{ date: "2024-06-29", desktop: 103, mobile: 160 },
	{ date: "2024-06-30", desktop: 446, mobile: 400 },
];

// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//   },
//   desktop: {
//     label: "Desktop",
//     color: "hsl(var(--chart-1))",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "hsl(var(--chart-2))",
//   },
// }
// satisfies ChartConfig

function BarChart2() {
	const [timeRange, setTimeRange] = React.useState("90d");

	const filteredData = chartData.filter((item) => {
		const date = new Date(item.date);
		const referenceDate = new Date("2024-06-30");
		let daysToSubtract = 90;
		if (timeRange === "30d") {
			daysToSubtract = 30;
		} else if (timeRange === "7d") {
			daysToSubtract = 7;
		}
		const startDate = new Date(referenceDate);
		startDate.setDate(startDate.getDate() - daysToSubtract);
		return date >= startDate;
	});

	return (
		<Card>
			console.log(234234);
			<CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
				<div className="grid flex-1 gap-1 text-center sm:text-left">
					<CardTitle>Area Chart - Interactive</CardTitle>
					<CardDescription>
						Showing total visitors for the last 3 months
					</CardDescription>
				</div>
				<Select value={timeRange} onValueChange={setTimeRange}>
					<SelectTrigger
						className="w-[160px] rounded-lg sm:ml-auto"
						aria-label="Select a value"
					>
						<SelectValue placeholder="Last 3 months" />
					</SelectTrigger>
					<SelectContent className="rounded-xl">
						<SelectItem value="90d" className="rounded-lg">
							Last 3 months
						</SelectItem>
						<SelectItem value="30d" className="rounded-lg">
							Last 30 days
						</SelectItem>
						<SelectItem value="7d" className="rounded-lg">
							Last 7 days
						</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer className="aspect-auto h-[250px] w-full">
					<AreaChart data={filteredData}>
						<defs>
							<linearGradient
								id="fillDesktop"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="5%"
									stopColor="var(--color-desktop)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-desktop)"
									stopOpacity={0.1}
								/>
							</linearGradient>
							<linearGradient
								id="fillMobile"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="5%"
									stopColor="var(--color-mobile)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-mobile)"
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								const date = new Date(value);
								return date.toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
								});
							}}
						/>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									labelFormatter={(value) => {
										return new Date(
											value
										).toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
										});
									}}
									indicator="dot"
								/>
							}
						/>
						<Area
							dataKey="mobile"
							type="natural"
							fill="url(#fillMobile)"
							stroke="var(--color-mobile)"
							stackId="a"
						/>
						<Area
							dataKey="desktop"
							type="natural"
							fill="url(#fillDesktop)"
							stroke="var(--color-desktop)"
							stackId="a"
						/>
						<ChartLegend content={<ChartLegendContent />} />
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}

export default BarChart2;

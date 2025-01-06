"use client";

import React, { useEffect, useState, useRef } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, Tooltip } from "recharts";
import { getData } from "@/Services/ApiClient/Services";
import { useParams } from "react-router-dom";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "../ui/chart";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

// const chartData = [
//   { date: "2024-04-01", desktop: 222, mobile: 150 },
//   { date: "2024-04-02", desktop: 97, mobile: 180 },
//   { date: "2024-04-03", desktop: 167, mobile: 120 },
//   { date: "2024-04-04", desktop: 242, mobile: 260 },
//   { date: "2024-04-05", desktop: 373, mobile: 290 },
//   { date: "2024-04-06", desktop: 301, mobile: 340 },
//   { date: "2024-04-07", desktop: 245, mobile: 180 },
//   { date: "2024-04-08", desktop: 409, mobile: 320 },
//   { date: "2024-04-09", desktop: 59, mobile: 110 },
//   { date: "2024-04-10", desktop: 261, mobile: 190 },
//   { date: "2024-06-29", desktop: 103, mobile: 160 },
//   { date: "2024-09-30", desktop: 446, mobile: 400 },
// ]

const rawData = [
	// Your raw data
	{ date: "2024-08", like: 0, view: 0 },
	{ date: "2024-09", like: 5, view: 12 },
	{ date: "2024-10", like: 2, view: 8 },
	{ date: "2024-11", like: 7, view: 15 },
];
// const rawData = [
// 	// Your raw data
// 	{ date: "2024-12-08", like: 0, view: 0 },
// 	{ date: "2024-12-09", like: 5, view: 12 },
// 	{ date: "2024-12-10", like: 2, view: 8 },
// 	{ date: "2024-12-11", like: 7, view: 15 },
// 	{ date: "2024-12-12", like: 3, view: 9 },
// 	{ date: "2024-12-13", like: 9, view: 18 },
// 	{ date: "2024-12-14", like: 4, view: 11 },
// 	{ date: "2024-12-15", like: 11, view: 22 },
// 	{ date: "2024-12-16", like: 6, view: 14 },
// 	{ date: "2024-12-17", like: 13, view: 25 },
// 	{ date: "2024-12-18", like: 8, view: 17 },
// 	{ date: "2024-12-19", like: 15, view: 28 },
// 	{ date: "2024-12-20", like: 10, view: 20 },
// 	{ date: "2024-12-21", like: 17, view: 31 },
// 	{ date: "2024-12-22", like: 12, view: 23 },
// 	{ date: "2024-12-23", like: 19, view: 34 },
// 	{ date: "2024-12-24", like: 14, view: 26 },
// 	{ date: "2024-12-25", like: 21, view: 37 },
// 	{ date: "2024-12-26", like: 16, view: 29 },
// 	{ date: "2024-12-27", like: 23, view: 40 },
// 	{ date: "2024-12-28", like: 18, view: 32 },
// 	{ date: "2024-12-29", like: 25, view: 43 },
// 	{ date: "2024-12-30", like: 20, view: 35 },
// 	{ date: "2024-12-31", like: 27, view: 46 },
// 	{ date: "2025-01-01", like: 22, view: 38 },
// 	{ date: "2025-01-02", like: 29, view: 49 },
// 	{ date: "2025-01-03", like: 24, view: 41 },
// 	{ date: "2025-01-04", like: 31, view: 52 },
// 	{ date: "2025-01-05", like: 33, view: 55 },
// ];

// const chartConfig = [
// 	{
// 		label: "like",
// 		color: "hsl(var(--chart-1))",
// 	},
// 	{
// 		label: "view",
// 		color: "hsl(var(--chart-2))",
// 	},
// ];

// const chartConfig = {
//   like: {
//     label: "like",
//     color: "hsl(var(--chart-1))",
//   }
// }

function StartupLikesChart() {
	const [timeRange, setTimeRange] = useState("30d");
	const [chartData, setChartData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const uname = useProfileStore((state) => state.username);
	const filteredData = chartData.filter((item) => {
		const date = new Date(item.date);
		const referenceDate = new Date();
		let daysToSubtract = 30;
		if (timeRange === "90d") daysToSubtract = 90;
		else if (timeRange === "365d") daysToSubtract = 365;
		const startDate = new Date(referenceDate);
		startDate.setDate(startDate.getDate() - daysToSubtract);
		return date >= startDate;
	});
	const x = timeRange === "365d" ? "month" : "Date";
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);

			// Determine API endpoint based on selected time range
			const apiEndpoints = {
				"30d": "/profile_statics/last-30-days/",
				"90d": "/profile_statics/last-90-days/",
				"365d": "/profile_statics/last-year/",
			};
			const apiUrl = `http://104.168.46.4:8000${apiEndpoints[timeRange]}?username=${uname}`; // ${uname} when fixed
			try {
				const response = await fetch(apiUrl, {
					headers: {
						Accept: "application/json",
					},
				});
				const data = await response.json();
				// const data = rawData;
				// Transform API data to match the required format
				var formattedData = data
					.map((item) => ({
						date: item.date,
						mobile: item.view, // Replace "mobile" with "view"
						desktop: item.like, // Replace "desktop" with "like"
					}))
					.reverse();
				// console.log(apiEndpoints[timeRange]);
				if (apiEndpoints[timeRange] === "/profile_statics/last-year/")
					formattedData = data
						.map((item) => ({
							date: item.month,
							mobile: item.view, // Replace "mobile" with "view"
							desktop: item.like, // Replace "desktop" with "like"
						}))
						.reverse();

				// console.log(formattedData);
				// setChartData(formattedData);

				console.log(data);

				if (timeRange === "365d") {
					const newdata = data.map((item) => ({
						...item,
						date: item.month,
					}));
					setChartData(newdata.reverse());
				} else {
					setChartData(data.reverse());
				}

				// setChartData(rawData);
			} catch (error) {
				console.error("Error fetching chart data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [timeRange]);

	const areaRef = useRef(null);

	useEffect(() => {
		if (areaRef.current) {
			// Access the underlying SVG path element
			const pathElement = areaRef.current.querySelector(
				".recharts-area-curve"
			); // Or other selector

			if (pathElement) {
				// Now you can manipulate the path element (use with caution!)
				// For example, get the total length:
				const pathLength = pathElement.getTotalLength();
				console.log("Path Length:", pathLength);

				// Or get a point at a specific length:
				const point = pathElement.getPointAtLength(pathLength / 2);
				console.log("Midpoint:", point);
			}
		}
	}, [areaRef]);
	return (
		<Card className="border-solid border-2 border-bomborange">
			<CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
				<div className="grid flex-1 gap-1 text-center sm:text-left">
					<CardTitle>چارت پروفایل</CardTitle>
					<CardDescription>تعداد لایک‌ها</CardDescription>
				</div>
				<Select value={timeRange} onValueChange={setTimeRange}>
					<SelectTrigger
						className="w-32 rounded-lg sm:ml-auto font-vazirmatn text-center justify-center"
						aria-label="Select a value"
					>
						<SelectValue placeholder="Last 3 months" />
					</SelectTrigger>
					<SelectContent className="rounded-xl">
						<SelectItem
							value="30d"
							className="rounded-lg font-vazirmatn justify-center "
						>
							{" "}
							یک ماه اخیر{" "}
						</SelectItem>
						<SelectItem
							value="90d"
							className="rounded-lg font-vazirmatn justify-center"
						>
							{" "}
							سه ماه اخیر{" "}
						</SelectItem>
						<SelectItem
							value="365d"
							className="rounded-lg font-vazirmatn justify-center"
						>
							{" "}
							یک سال اخیر{" "}
						</SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer className="aspect-auto h-[250px] w-full">
					{/* config={chartConfig} */}
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
									stopColor="#4CAF50"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="#4CAF50"
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
									stopColor="#FF7043"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="#FF7043"
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
										// console.log(payload);
										if (
											new Date(value).toString() !==
											"Invalid Date"
										) {
											return new Date(
												value
											).toLocaleDateString("en-US", {
												month: "short",
												day: "numeric",
											});
										}
										return value;
									}}
									indicator="line"
									offset={0}
								/>
							}
						/>

						<Area
							dataKey="like"
							type="monotone"
							fill="url(#fillMobile)"
							stroke="#FF7043"
							stackId="a"
						/>
						{/* <Area dataKey="desktop" type="monotone" fill="url(#fillDesktop)" stroke="#4CAF50" stackId="a"/> */}
						{/* <ChartLegend content={<ChartLegendContent payload={{dataKey: "like", value: "لایک"}} />} /> */}
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}

export default StartupLikesChart;

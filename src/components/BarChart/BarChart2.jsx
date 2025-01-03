"use client";

import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, Tooltip } from "recharts";
import { getData } from "@/Services/ApiClient/Services";
import { useParams } from "react-router-dom";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from "../../components/ui/card";
import {ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent} from "../../components/ui/chart";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../components/ui/select";

const chartData = [
	{ date: "2024-04-01", desktop: 222, mobile: 150 },
	{ date: "2024-04-02", desktop: 97, mobile: 180 },
	{ date: "2024-04-03", desktop: 167, mobile: 120 },
];

// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//   },
//   desktop: {
//     label: "بازدید",
//     color: "hsl(var(--chart-1))",
//   },
//   mobile: {
//     label: "لایک",
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
			<CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
				{/* <div className="grid flex-1 gap-1 text-center sm:text-left">
					<CardTitle>Area Chart - Interactive</CardTitle>
					<CardDescription>
						Showing total visitors for the last 3 months
					</CardDescription>
				</div> */}
				<Select value={timeRange} onValueChange={setTimeRange}>
					<SelectTrigger
						className="w-[160px] rounded-lg sm:ml-auto font-vazirmatn text-center"
						aria-label="Select a value"
					>
						<SelectValue placeholder="Last 3 months" />
					</SelectTrigger>
					<SelectContent className="rounded-xl">
          <SelectItem value="7d" className="rounded-lg font-vazirmatn"> یک هفته اخیر </SelectItem>
          <SelectItem value="30d" className="rounded-lg font-vazirmatn"> یک ماه اخیر </SelectItem>
						<SelectItem value="90d" className="rounded-lg font-vazirmatn"> سه ماه اخیر </SelectItem>
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer className="aspect-auto h-[250px] w-full">
					<AreaChart data={filteredData}>
						<defs>
							<linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8}/>
								<stop offset="95%" stopColor="#4CAF50" stopOpacity={0.1}/>
							</linearGradient>
							<linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#FF7043" stopOpacity={0.8}/>
								<stop offset="95%" stopColor="#FF7043" stopOpacity={0.1}/>
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
                  labelFormatter={(value, payload) => {
                // console.log(payload);
                if (new Date(value).toString() !== "Invalid Date") {
                  return new Date(value).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                  });
                } 
                payload.forEach((item) => {
                  if (item.dataKey === "mobile")
                    return "ویو"; // Custom label for "mobile"
                  else if (item.dataKey === "desktop")
                    return "لایک"; // Custom label for "desktop"
              });
    return value;
  }}
  indicator="dot"
              />
                    }
            />
            {/* <Tooltip
            content={({ payload }) => {
              // Customize the tooltip content here
              if (!payload || payload.length === 0) return null;
              const { date, mobile, desktop } = payload[0].payload;
              return (
                <div className="custom-tooltip">
                  <p>{new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                  <p><strong>بازدید: </strong>{mobile}</p>
                  <p><strong>لایک: </strong>{desktop}</p>
                </div>
              );
            }}
            cursor={false}
          /> */}
						<Area
							dataKey="mobile"
							type="natural"
							fill="url(#fillMobile)"
							stroke="#FF7043"
							stackId="a"
						/>
						<Area
							dataKey="desktop"
							type="natural"
							fill="url(#fillDesktop)"
							stroke="#4CAF50"
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

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

function MainChart({ color, label, apiEndpoints, projectId, className }) {
  const [timeRange, setTimeRange] = useState("30d");
  const [chartData, setChartData] = useState([]);
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
      // Determine API endpoint based on selected time range
      // const apiEndpoints = {
      // 	"30d": "/profile_statics/last-30-days/",
      // 	"90d": "/profile_statics/last-90-days/",
      // 	"365d": "/profile_statics/last-year/",
      // };
      const apiUrl = `http://104.168.46.4:8000${apiEndpoints[timeRange]}?username=${uname}`; // ${uname} when fixed
      try {
        // const response = await fetch(apiUrl, {
        // 	headers: {
        // 		Accept: "application/json",
        // 	},
        // });
        // const data = response.json();
        getData(apiUrl).then((data) => {
          if (timeRange === "365d") {
            const newdata = data.map((item) => ({
              ...item,
              date: item.month,
            }));
            setChartData(newdata.reverse());
          } else {
            setChartData(data.reverse());
          }
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, [timeRange]);
  return (
    <Card className={`border-solid border-2 border-bomborange ${className}`}>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          {projectId ? (
            <CardTitle>چارت پروژه</CardTitle>
          ) : (
            <CardTitle>چارت پروفایل</CardTitle>
          )}
          {label === "fund" ? (
            <CardDescription>سرمایه جذب شده</CardDescription>
          ) : label === "like" ? (
            <CardDescription>میزان محبوبیت</CardDescription>
          ) : (
            <CardDescription>بازدیدهای انجام شده</CardDescription>
          )}
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
              {/* <linearGradient
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
							</linearGradient> */}
              <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                {/* <stop
									offset="10%"
									stopColor={color ? color : "blue"}
									// stopColor={color}
									stopOpacity={0.8}
								/>
								<stop
									offset="90%"
									stopColor={color ? color : "white"}
									stopOpacity={0.1}
								/> */}
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
                    if (new Date(value).toString() !== "Invalid Date") {
                      return new Date(value).toLocaleDateString("en-US", {
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
              dataKey={label}
              type="monotone"
              fill="url(#fill)"
              stroke={color ? color : "#FF7043"}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default MainChart;

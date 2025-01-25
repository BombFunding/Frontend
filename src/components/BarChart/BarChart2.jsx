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

function LikeAndView() {
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
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // Determine API endpoint based on selected time range
      const apiEndpoints = {
        "30d": "/profile_statics/last-30-days/",
        "90d": "/profile_statics/last-90-days/",
        "365d": "/profile_statics/last-year/",
      };
      const apiUrl = `http://104.168.46.4:8000${apiEndpoints[timeRange]}?username=amin3`; // ${uname} when fixed
      try {
        const response = await fetch(apiUrl, {
          headers: {
            Accept: "application/json",
          },
        });
        const data = await response.json();
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
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  const lineRef = useRef(null);

  useEffect(() => {
    if (lineRef.current) {
      const pathLength = lineRef.current.getTotalLength();
      console.log("Path Length:", pathLength);
    }
  }, [lineRef]);
  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>چارت پروفایل</CardTitle>
          <CardDescription>تعداد لایک و ویو</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[110px] rounded-lg sm:ml-auto font-vazirmatn text-center justify-center"
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
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4CAF50" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF7043" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FF7043" stopOpacity={0.1} />
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
              dataKey="mobile"
              type="basis"
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

export default LikeAndView;

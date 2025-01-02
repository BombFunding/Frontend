"use client";

import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip } from "recharts";
import { getData } from "@/Services/ApiClient/Services";
import { useParams } from "react-router-dom";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";

// const chartData = [
//   { month: "مهر", fund: 0 },
//   { month: "آبان", fund: 200 },
//   { month: "آذر", fund: 120 },
//   { month: "دی", fund: 190 },
//   { month: "بهمن", fund: 130 },
//   { month: "اسفند", fund: 140 },
// ];



// Chart configuration
const chartConfig = {
  fund: {
    label: "فاند",
    color: "#22d3ee",
  },
};

// Custom Tooltip renderer
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="p-2 bg-white border rounded shadow"
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: "0.375rem",
        }}
      >
        <p className="text-sm">{label}</p>
        <p className="text-sm" style={{ color: chartConfig.fund.color }}>
          {chartConfig.fund.label}: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export function BarChart1() {
    const [chartData, setChartData] = useState([]); 
    const [loading, setLoading] = useState(true);
    // const balls = useProfileStore(state => state.username);
    // const useProfileStore = create((set) => ({
    //   username: null, // Default initialization
    //   setUsername: (username) => set({ username }),
    // }));
    const balls = useProfileStore(state => state.username);
    console.log(`Username is : ${balls}`);
    useEffect(() => {
      if (!balls) return
      console.log(`Username is: ${balls}`)
      const fetchChartData = async () => {
        try {
          // Use getData from services.js to fetch the API data
          const data = await getData(`/profile_statics/last-6-months/?username=${balls}`);
          setChartData(data); // Update the chart data state with the API response
        } catch (error) {
          console.error("Error fetching chart data:", error);
        } finally {
          setLoading(false); // Set loading to false after fetching the data
        }
      };
  
      fetchChartData();
    }, [balls]);
  
    if (loading) {
      return <div>Loading chart...</div>;
    }
  return (
    <div className="p-1 bg-white rounded-lg shadow-md text-xs">
      <div className="flex justify-center">
        <AreaChart
          className="p-3 "
          width={450}
          height={300}
          data={chartData}
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            interval={0}
            tickFormatter={(value) => value}
            className="font-vazirmatn text-s"
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            dataKey="fund"
            type="monotone"
            fill={chartConfig.fund.color}
            fillOpacity={0.4}
            stroke={chartConfig.fund.color}
            stackId="a"
          />
        </AreaChart>
      </div>
    </div>
  );
}
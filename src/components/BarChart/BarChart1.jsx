"use client";

import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip } from "recharts";

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
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(
              "http://104.168.46.4:8000/profile_statics/last-7-days/?username=tara",
              {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "X-CSRFTOKEN": "51VoasHbfJ0uJb2wtmNJ08Qg7RYYBDZRZGSmZ4u3eZ0kTq0DjcLGlebc8HlYPLle", // Add CSRF token here
                },
              }
            );
    
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json(); // Parse response JSON
            setChartData(data); // Update chart data state
          } catch (error) {
            console.error("Failed to fetch data:", error);
          } finally {
            setLoading(false); // Set loading to false after fetching data
          }
        };
    
        fetchData();
      }, []);
      if (loading) {
        return <div>Loading chart...</div>;
      }    
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Chart */}
      <div className="overflow-x-auto">
        <AreaChart
          width={600}
          height={300}
          data={chartData}
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 8)}
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
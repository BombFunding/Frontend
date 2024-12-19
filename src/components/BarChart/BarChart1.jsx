"use client";

import { Area, AreaChart, CartesianGrid, XAxis, Tooltip } from "recharts";

const chartData = [
  { month: "آبان", fund: 80 },
  { month: "آذر", fund: 200 },
  { month: "دی", fund: 120 },
  { month: "بهمن", fund: 190 },
  { month: "اسفند", fund: 130 },
  { month: "اردیبهشت", fund: 140 },
];

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
import React from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from "recharts";
import { CenterFocusStrong } from "@mui/icons-material";

const chartData = [
    { day: "شنبه", view: 300, like: 150 },
    { day: "یکشنبه", view: 250, like: 130 },
    { day: "دوشنبه", view: 120, like: 45 },
    { day: "سه شنبه", view: 150, like: 70 },
    { day: "چهارشنبه", view: 200, like: 95 },
    { day: "پنجشنبه", view: 180, like: 80 },
    { day: "جمعه", view: 220, like: 110 },
  ];

const chartConfig = {
  view: {
    label: "view",
    color: "#4CAF50", // Replace with actual colors
  },
  like: {
    label: "like",
    color: "#FF9800", // Replace with actual colors
  },
};

function ChartTooltipContent({ payload, label }) {
  if (!payload || !payload.length) return null;

  const translationMap = {
    view: "بازدید",
    like: "لایک",
  };

  return (
    <div style={{ background: "#fff", padding: "10px", border: "1px solid #ddd" }} className="font-vazirmatn">
      <p>{label}</p>
      {payload.map((entry, index) => (
        <p key={`item-${index}`}>
          {translationMap[entry.name] || entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

export default function BarChart2() {
  return (
    <div className="card">
      <div className="card-header">
      </div>
      <div className="card-content">
        <div style={{ width: "100%", height: 300 }}>
          <BarChart width={500} height={300} data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 8)}
              className="font-vazirmatn"
            />
            <Tooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="view"
              fill={chartConfig.view.color}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="like"
              fill={chartConfig.like.color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </div>
      </div>
      <div className="card-footer" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px", fontWeight: "bold" }}>
        {/* <p dir="rtl">
        افزایش بازدید در هفته اخیر 
            <span dir="ltr">۵.۲٪</span>
        </p>
        <TrendingUp size={16} /> */}
        </div>
        {/* <p style={{ color: "#6c757d" }}>
         بازدید کنندگان هفته اخیر
        </p> */}
      </div>
    </div>
  );
}
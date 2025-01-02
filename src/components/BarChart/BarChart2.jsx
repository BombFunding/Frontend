import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from "recharts";
import { getData } from "@/Services/ApiClient/Services";
import { useParams } from "react-router-dom";
import useProfileStore from "@/stores/ProfileStore/ProfileStore";

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
  const [chartData, setChartData] = useState([]);
  const balls = useProfileStore(state => state.username);
  console.log(balls);
  useEffect(() => {
    // Fetch the data from the API
    if (!balls) return

    const fetchChartData = async () => {
      try {
        const data = await getData(`profile_statics/last-7-days/?username=${balls}`);
        // data[0]["view"] = 100
        // data[0]["like"] = 10
        // data[1]["view"] = 100
        // data[1]["like"] = 10
        setChartData(data);

      } catch (error) {
        console.log("Error fetching chart data:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchChartData();
  }, [balls])

  return (
    <div className="card p-1 bg-white rounded-lg shadow-md text-xs">
      <div className="card-header"></div>
      <div className="card-content">
        <div className="flex justify-center" style={{ width: "100%", height: 300 }}>
          <BarChart width={400} height={300} data={chartData}>
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
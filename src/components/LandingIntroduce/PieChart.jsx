"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useInView } from 'react-intersection-observer'; 

const colors = [
  
  '#FF7517',  
  '#9B3922',  
  '#0C084B',  
  '#024CAA',  
  '#87A922',  
  '#821131',  
  '#C7253E',  
  '#E2A701',
  '#556B2F'
];


let colorIndex = 0;

// const getRandomData = () => {
//   const browsers = ["chrome", "safari", "firefox", "edge", "other"];
//   return browsers.map((browser) => {
//     const color = colors[colorIndex % colors.length];
//     colorIndex++;
//     return {
//       browser,
//       visitors: Math.floor(Math.random() * 300) + 100,
//       fill: color,
//     };
//   });
// }

const getRandomData = async () => {
  try {
    // Fetch data from the API
    const response = await fetch('http://localhost:8000/landing/category-revenue/', {
      method: 'GET',
    });
    
    // Check if the response is ok (status 200)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Parse the response JSON
    const data = await response.json();

    // Log the received data to the console for verification
    console.log("Received Data from API:", data);

    // Define categories and map data from API (adjusted to match the new format)
    const categories = [
      { browser: "تکنولوژی", visitors: data["تکنولوژی"] || 0 },
      { browser: "هنری", visitors: data["هنری"] || 0 },
      { browser: "سلامت", visitors: data["سلامت"] || 0 },
      { browser: "گردشگری", visitors: data["گردشگری"] || 0 },
      { browser: "آموزش", visitors: data["آموزش"] || 0 },
      { browser: "مالی", visitors: data["مالی"] || 0 },
    ];

    // Log formatted categories to verify data processing
    console.log("Formatted Categories:", categories);

    // Define colors for the chart
    let colorIndex = 0;
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FF8333", "#33FFD7"];
    
    // Map the categories to the format with random colors
    return categories.map((category) => {
      const color = colors[colorIndex % colors.length];
      colorIndex++;
      return {
        browser: category.browser,
        visitors: category.visitors,
        fill: color,
      };
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const PieChartComponent = () => {
  const [chartData, setChartData] = React.useState([]); // Store the data in the state

  React.useEffect(() => {
    // Fetch the data when the component mounts
    const fetchData = async () => {
      const data = await getRandomData();
      console.log("Chart Data:", data); // Log chart data to verify
      setChartData(data); // Set the fetched data to state
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, [chartData]);

  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 1, 
  });

  return (
    <Card ref={ref} className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>توزیع درآمدی استارتاپ ها</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
              isAnimationActive={inView}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          میلیون تومان
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          مجموع درآمد همه استارتاپ ها در یک ماه گذشته<TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          توزیع درآمد ها برحسب دسته بندی پروژه است
        </div>
      </CardFooter>
    </Card>
  );
};

// const PieChartComponent2 = () => {
//   const chartData = React.useMemo(() => getRandomData(), []); 
//   const totalVisitors = React.useMemo(() => {
//     return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
//   }, [chartData]);

//   const { ref, inView } = useInView({
//     triggerOnce: true, 
//     threshold: 1, 
//   });

//   return (
//     <Card
//       ref={ref}
//       className="flex flex-col" 
//     >
//       <CardHeader className="items-center pb-0">
//         <CardTitle>توزیع محبوبیت استارتاپ ها</CardTitle>
//         <CardDescription>January - June 2024</CardDescription>
//       </CardHeader>
//       <CardContent className="flex-1 pb-0">
//         <ChartContainer className="mx-auto aspect-square max-h-[250px]">
//           <PieChart>
//             <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
//             <Pie
//               data={chartData}
//               dataKey="visitors"
//               nameKey="browser"
//               innerRadius={60}
//               strokeWidth={5}
//               isAnimationActive={inView} 
//             >
//               <Label
//                 content={({ viewBox }) => {
//                   if (viewBox && "cx" in viewBox && "cy" in viewBox) {
//                     return (
//                       <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
//                         <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
//                           {totalVisitors.toLocaleString()}
//                         </tspan>
//                         <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
//                           Visitors
//                         </tspan>
//                       </text>
//                     );
//                   }
//                 }}
//               />
//             </Pie>
//           </PieChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col gap-2 text-sm">
//         <div className="flex items-center gap-2 font-medium leading-none">
//           مجموع درآمد همه استارتاپ ها در یک ماه گذشته<TrendingUp className="h-4 w-4" />
//         </div>
//         <div className="leading-none text-muted-foreground">
// توزیع درآمد ها برحسب دسته بندی پروژه است
//         </div>
//       </CardFooter>
//     </Card>
//   );
// };

// const PieChartComponent3 = () => {
//   const chartData = React.useMemo(() => getRandomData(), []); 
//   const totalVisitors = React.useMemo(() => {
//     return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
//   }, [chartData]);

//   const { ref, inView } = useInView({
//     triggerOnce: true, 
//     threshold: 1, 
//   });

//   return (
//     <Card
//       ref={ref}
//       className="flex flex-col" 
//     >
//       <CardHeader className="items-center pb-0">
//         <CardTitle>توزیع بازدید استارتاپ ها</CardTitle>
//         <CardDescription>January - June 2024</CardDescription>
//       </CardHeader>
//       <CardContent className="flex-1 pb-0">
//         <ChartContainer className="mx-auto aspect-square max-h-[250px]">
//           <PieChart>
//             <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
//             <Pie
//               data={chartData}
//               dataKey="visitors"
//               nameKey="browser"
//               innerRadius={60}
//               strokeWidth={5}
//               isAnimationActive={inView} 
//             >
//               <Label
//                 content={({ viewBox }) => {
//                   if (viewBox && "cx" in viewBox && "cy" in viewBox) {
//                     return (
//                       <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
//                         <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
//                           {totalVisitors.toLocaleString()}
//                         </tspan>
//                         <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
//                           بازدید
//                         </tspan>
//                       </text>
//                     );
//                   }
//                 }}
//               />
//             </Pie>
//           </PieChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col gap-2 text-sm">
//         <div className="flex items-center gap-2 font-medium leading-none">
//           مجموع درآمد همه استارتاپ ها در یک ماه گذشته<TrendingUp className="h-4 w-4" />
//         </div>
//         <div className="leading-none text-muted-foreground">
// توزیع درآمد ها برحسب دسته بندی پروژه است
//         </div>
//       </CardFooter>
//     </Card>
//   );
// };

function ThreePieCharts() {
  return (
<div className="flex flex-wrap lg:flex-nowrap flex-col lg:flex-row justify-around items-center gap-4">
  {/* <PieChartComponent3 />
  <PieChartComponent2 /> */}
  <PieChartComponent />
</div>

  );
}

export default ThreePieCharts;

"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useInView } from 'react-intersection-observer'; 
import moment from 'moment-jalaali'; 

const colors = [
  '#FF7517',  
  '#024CAA',  
  '#821131',  
  '#C7253E',  
  '#E2A701',
  '#556B2F',
  '#87A922',  
  '#9B3922',  
  '#0C084B',  
];

  const currentDate = moment(); 
  const persianMonth = currentDate.jMonth(); 
  const persianYear = currentDate.jYear(); 
  const persianMonthName = currentDate.format('jMMMM'); 
  const lastMonthName = moment().subtract(1, 'month').format('jMMMM'); 

let colorIndex = 0;


const getRandomData = async () => {
  try {
    
    const response = await fetch('http://localhost:8000/landing/category-revenue/', {
      method: 'GET',
    });
    
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    
    const data = await response.json();

    
    console.log("Received Data from API:", data);

    
    const categories = [
      { browser: "تکنولوژی", visitors: data["تکنولوژی"] || 0 },
      { browser: "هنری", visitors: data["هنری"] || 0 },
      { browser: "سلامت", visitors: data["سلامت"] || 0 },
      { browser: "گردشگری", visitors: data["گردشگری"] || 0 },
      { browser: "آموزش", visitors: data["آموزش"] || 0 },
      { browser: "مالی", visitors: data["مالی"] || 0 },
    ];

    
    console.log("Formatted Categories:", categories);

    
    let colorIndex = 0;
    
    
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
  const [chartData, setChartData] = React.useState([]); 

  React.useEffect(() => {
    
    const fetchData = async () => {
      const data = await getRandomData();
      console.log("Chart Data:", data); 
      setChartData(data); 
    };

    fetchData();
  }, []); 

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
                <CardDescription>{`${lastMonthName} - ${persianMonthName} ${persianYear}`}</CardDescription>
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
                          هزار تومان
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
        مقادیر برحسب هزار تومان است
        </div>
      </CardFooter>
    </Card>
  );
};

const PieChartComponent2 = () => {
  const [chartData, setChartData] = React.useState([]); 

  React.useEffect(() => {
    
    const fetchData = async () => {
      const data = await getRandomData();
      console.log("Chart Data:", data); 
      setChartData(data); 
    };

    fetchData();
  }, []); 

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
        <CardTitle>توزیع محبوبیت استارتاپ ها</CardTitle>
                <CardDescription>{`${lastMonthName} - ${persianMonthName} ${persianYear}`}</CardDescription>
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
                          هزار تومان
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
        مقادیر برحسب هزار تومان است
        </div>
      </CardFooter>
    </Card>
  );
};

const PieChartComponent3 = () => {
  const [chartData, setChartData] = React.useState([]); 

  React.useEffect(() => {
    
    const fetchData = async () => {
      const data = await getRandomData();
      console.log("Chart Data:", data); 
      setChartData(data); 
    };

    fetchData();
  }, []); 

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
        <CardTitle>توزیع بازدید استارتاپ ها</CardTitle>
                <CardDescription>{`${lastMonthName} - ${persianMonthName} ${persianYear}`}</CardDescription>
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
                          هزار تومان
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
        مقادیر برحسب هزار تومان است
        </div>
      </CardFooter>
    </Card>
  );
};

function ThreePieCharts() {
  return (
<div className="flex flex-wrap lg:flex-nowrap flex-col lg:flex-row justify-around items-center gap-4">
  <PieChartComponent3 />
  <PieChartComponent2 />
  <PieChartComponent />
  <PieChartComponent />
</div>

  );
}

export default ThreePieCharts;

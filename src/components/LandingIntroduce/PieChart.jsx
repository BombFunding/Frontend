"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useInView } from 'react-intersection-observer'; 
import moment from 'moment-jalaali'; 
import { Bar, BarChart, XAxis, YAxis } from "recharts"


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


const get_revenue_data = async () => {
  try {
    const response = await fetch('http://104.168.46.4:8000/landing/category-revenue/', {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log("Received Data from API:", data);
    const categories = [
      { category: "تکنولوژی", startup: data["تکنولوژی"] || 0 },
      { category: "هنری", startup: data["هنری"] || 0 },
      { category: "سلامت", startup: data["سلامت"] || 0 },
      { category: "گردشگری", startup: data["گردشگری"] || 0 },
      { category: "آموزش", startup: data["آموزش"] || 0 },
      { category: "مالی", startup: data["مالی"] || 0 },
    ];

    // console.log("Formatted Categories:", categories);

    let colorIndex = 0;
    return categories.map((category) => {
      const color = colors[colorIndex % colors.length];
      colorIndex++;
      return {
        category: category.category,
        startup: category.startup,
        fill: color,
      };
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const get_count_data = async () => {
  try {
    const response = await fetch('http://104.168.46.4:8000/landing/category-count/', {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log("Received Data from API:", data);
    const categories = [
      { category: "تکنولوژی", startup: data["تکنولوژی"] || 0 },
      { category: "هنری", startup: data["هنری"] || 0 },
      { category: "سلامت", startup: data["سلامت"] || 0 },
      { category: "گردشگری", startup: data["گردشگری"] || 0 },
      { category: "آموزش", startup: data["آموزش"] || 0 },
      { category: "مالی", startup: data["مالی"] || 0 },
    ];

    // console.log("Formatted Categories:", categories);

    let colorIndex = 0;
    return categories.map((category) => {
      const color = colors[colorIndex % colors.length];
      colorIndex++;
      return {
        category: category.category,
        startup: category.startup,
        fill: color,
      };
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
const get_liked_data = async () => {
  try {
    const response = await fetch('http://104.168.46.4:8000/landing/category-liked/', {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log("Received Data from API:", data);
    const categories = [
      { category: "تکنولوژی", startup: data["تکنولوژی"] || 0 },
      { category: "هنری", startup: data["هنری"] || 0 },
      { category: "سلامت", startup: data["سلامت"] || 0 },
      { category: "گردشگری", startup: data["گردشگری"] || 0 },
      { category: "آموزش", startup: data["آموزش"] || 0 },
      { category: "مالی", startup: data["مالی"] || 0 },
    ];

    // console.log("Formatted Categories:", categories);

    let colorIndex = 0;
    return categories.map((category) => {
      const color = colors[colorIndex % colors.length];
      colorIndex++;
      return {
        category: category.category,
        startup: category.startup,
        fill: color,
      };
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
const get_viewd_data = async () => {
  try {
    const response = await fetch('http://104.168.46.4:8000/landing/category-viewd/', {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log("Received Data from API:", data);
    const categories = [
      { category: "تکنولوژی", startup: data["تکنولوژی"] || 0 },
      { category: "هنری", startup: data["هنری"] || 0 },
      { category: "سلامت", startup: data["سلامت"] || 0 },
      { category: "گردشگری", startup: data["گردشگری"] || 0 },
      { category: "آموزش", startup: data["آموزش"] || 0 },
      { category: "مالی", startup: data["مالی"] || 0 },
    ];

    // console.log("Formatted Categories:", categories);

    let colorIndex = 0;
    return categories.map((category) => {
      const color = colors[colorIndex % colors.length];
      colorIndex++;
      return {
        category: category.category,
        startup: category.startup,
        fill: color,
      };
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

//////////////////////////////////////////////////////////////////////////////////////
const PieChartComponent = () => {
  const [chartData, setChartData] = React.useState([]); 

  React.useEffect(() => {
    
    const fetchData = async () => {
      const data = await get_revenue_data();
      console.log("Chart Data:", data); 
      setChartData(data); 
    };

    fetchData();
  }, []); 

  const totalstartup = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.startup, 0);
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
              dataKey="startup"
              nameKey="category"
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
                          {totalstartup.toLocaleString()}
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
      const data = await get_liked_data();
      console.log("Chart Data:", data); 
      setChartData(data); 
    };

    fetchData();
  }, []); 

  const totalstartup = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.startup, 0);
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
              dataKey="startup"
              nameKey="category"
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
                          {totalstartup.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
نفر
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
          مجموع لایک همه استارتاپ ها در یک ماه گذشته<TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
       برحسب حوزه هایی که در آن فعالیت میکند
   </div>
      </CardFooter>
    </Card>
  );
};

const PieChartComponent3 = () => {
  const [chartData, setChartData] = React.useState([]); 

  React.useEffect(() => {
    
    const fetchData = async () => {
      const data = await get_viewd_data();
      console.log("Chart Data:", data); 
      setChartData(data); 
    };

    fetchData();
  }, []); 

  const totalstartup = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.startup, 0);
  }, [chartData]);

  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 1, 
  });

  return (
    <Card ref={ref} className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>توزیع بازدیدهای استارتاپ ها</CardTitle>
                <CardDescription>{`${lastMonthName} - ${persianMonthName} ${persianYear}`}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="startup"
              nameKey="category"
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
                          {totalstartup.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          بار بازدید
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
          مجموع بازدید استارتاپهای فعال در آن حوزه<TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          تعداد بازدید ها در یک ماه گذشته حساب شده است
        </div>
      </CardFooter>
    </Card>
  );
};

const BarChartComponent = () => {
  const [chartData, setChartData] = React.useState([]); 

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await get_count_data();
      console.log("Chart Data:", data); 
      setChartData(data); 
    };
    fetchData();
  }, []); 

  const totalstartup = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.startup, 0);
  }, [chartData]);

  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 1, 
  });

  const chartConfig = chartData.reduce((acc, { category, startup, fill }) => {
    acc[category] = {
      label: category,
      color: fill,
    };
    return acc;
  }, {});

  return (
    <Card ref={ref} className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>توزیع تعداد استارتاپ ها</CardTitle>
        <CardDescription>{`از زمان شروع تا - ${persianMonthName} ${persianYear}`}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer className="mx-auto aspect-square max-h-[250px]">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value]?.label || value
              }
            />
            <XAxis dataKey="startup" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar
              dataKey="startup"
              layout="vertical"
              radius={5}
              fill={(data) => chartConfig[data.category]?.color || "gray"}
              isAnimationActive={inView}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          تعداد استارتاپ های کل سایت
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
  برحسب حوزه هایی که در آن فعالیت میکند
        </div>
      </CardFooter>
    </Card>
  );
};

function ThreePieCharts() {
  return (
<div className="flex flex-wrap lg:flex-nowrap flex-col lg:flex-row justify-around items-center gap-0">

  <BarChartComponent />
  <PieChartComponent2 />
  <PieChartComponent3 />
  <PieChartComponent />
</div>

  );
}

export default ThreePieCharts;

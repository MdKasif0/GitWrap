"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell, LabelList } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

type ContributionGraphProps = {
  data: Array<{ date: string; count: number }>;
  bestMonth?: string;
}

export function ContributionGraph({ data, bestMonth }: ContributionGraphProps) {
  const monthlyData = data.reduce((acc, { date, count }) => {
    const month = new Date(date).toLocaleString('default', { month: 'long' });
    const monthShort = new Date(date).toLocaleString('default', { month: 'short' });
    
    const existing = acc.find(d => d.name === month);
    if (existing) {
      existing.total += count;
    } else {
      acc.push({ name: month, shortName: monthShort, total: count });
    }
    return acc;
  }, [] as Array<{ name: string; shortName: string; total: number }>);
  
  const allMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const chartData = allMonths.map(monthName => {
    const found = monthlyData.find(d => d.name === monthName);
    return found || { name: monthName, shortName: monthName.substring(0,3), total: 0 };
  });

  const maxContributions = Math.max(...chartData.map(d => d.total));

  return (
    <ChartContainer config={{
        total: {
          label: "Contributions",
        }
      }} className="h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={chartData}
            margin={{ top: 30, right: 0, left: 0, bottom: 0 }}
            barCategoryGap="20%"
          >
            <CartesianGrid vertical={false} stroke="hsl(var(--muted-foreground)/.1)" />
            <XAxis
              dataKey="shortName"
              tickFormatter={(value) => value.charAt(0)}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis hide={true} domain={[0, maxContributions + 50]}/>
            <Tooltip
                cursor={{ fill: 'transparent' }}
                content={<ChartTooltipContent 
                    formatter={(value, name, props) => (
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-lg">{value}</span>
                        <span className="text-sm text-muted-foreground">{props.payload.name}</span>
                      </div>
                    )}
                    indicator="dot"
                    hideLabel
                />}
            />
            <Bar dataKey="total" radius={4}>
               <LabelList 
                  dataKey="total" 
                  position="top" 
                  formatter={(value: number, props: any) => (chartData[props.index].name === bestMonth ? value : null)}
                  className="fill-white font-bold"
                />
              {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={
                      entry.name === bestMonth 
                        ? "url(#bestMonthGradient)"
                        : "url(#defaultGradient)"
                    }
                  />
              ))}
            </Bar>
            <defs>
              <linearGradient id="defaultGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary) / 0.5)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--primary) / 0.1)" stopOpacity={0.2}/>
              </linearGradient>
               <linearGradient id="bestMonthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={1}/>
                <stop offset="95%" stopColor="hsl(var(--primary) / 0.5)" stopOpacity={0.8}/>
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
  )
}

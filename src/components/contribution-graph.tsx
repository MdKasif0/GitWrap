"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

type ContributionGraphProps = {
  data: Array<{ date: string; count: number }>;
}

export function ContributionGraph({ data }: ContributionGraphProps) {
  const monthlyData = data.reduce((acc, { date, count }) => {
    const month = new Date(date).toLocaleString('default', { month: 'short' });
    const year = new Date(date).getFullYear();
    const key = `${month} ${year}`;
    
    const existing = acc.find(d => d.name === month);
    if (existing) {
      existing.total += count;
    } else {
      acc.push({ name: month, total: count });
    }
    return acc;
  }, [] as Array<{ name: string; total: number }>);
  
  // Ensure we have 12 months for a consistent graph
  const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const chartData = allMonths.map(monthName => {
    const found = monthlyData.find(d => d.name === monthName);
    return found || { name: monthName, total: 0 };
  });

  return (
    <ChartContainer config={{
        total: {
          label: "Contributions",
        }
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/.2)" />
            <XAxis
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              cursor={{ fill: 'hsl(var(--accent))', opacity: 0.1 }}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
  )
}

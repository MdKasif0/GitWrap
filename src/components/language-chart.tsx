"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

const LANGUAGE_COLORS: { [key: string]: string } = {
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  TypeScript: "#3178c6",
  "C++": "#f34b7d",
  C: "#555555",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Ruby: "#701516",
  Go: "#00ADD8",
  PHP: "#4F5D95",
  OTHER: "#CCCCCC",
};

type LanguageChartProps = {
  data: { language: string; percentage: number }[];
};

export function LanguageChart({ data }: LanguageChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="language"
          stroke="hsl(var(--muted-foreground))"
          tickLine={false}
          axisLine={false}
          tick={{ fill: "hsl(var(--foreground))" }}
        />
        <Bar dataKey="percentage" barSize={20} radius={[0, 10, 10, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={LANGUAGE_COLORS[entry.language] || LANGUAGE_COLORS.OTHER}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

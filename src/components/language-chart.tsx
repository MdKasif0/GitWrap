"use client";

import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts";

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
  Rust: "#dea584",
  OTHER: "#CCCCCC",
};

type LanguageChartProps = {
  data: { language: string; percentage: number }[];
};

export function LanguageChart({ data }: LanguageChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="percentage"
          nameKey="language"
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="80%"
          startAngle={90}
          endAngle={-270}
          paddingAngle={2}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={LANGUAGE_COLORS[entry.language] || LANGUAGE_COLORS.OTHER}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export { LANGUAGE_COLORS };

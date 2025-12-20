"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type HeatmapProps = {
  data: { date: string; count: number }[];
};

export function ContributionHeatmap({ data }: HeatmapProps) {
  const startDate = new Date('2025-01-01T00:00:00.000Z');
  const endDate = new Date('2025-12-31T00:00:00.000Z');

  const values = data.reduce((acc, d) => {
    acc[d.date] = d.count;
    return acc;
  }, {} as { [key: string]: number });

  const weeks: { date: string; count: number; level: number }[][] = [];
  let currentDate = new Date(startDate);
  currentDate.setDate(currentDate.getDate() - currentDate.getDay());

  for (let i = 0; i < 53; i++) {
    const week: { date: string; count: number; level: number }[] = [];
    for (let j = 0; j < 7; j++) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const count = values[dateStr] || 0;
      let level = 0;
      if (count > 0) level = 1;
      if (count >= 3) level = 2;
      if (count >= 6) level = 3;
      if (count >= 10) level = 4;
      
      const dayDate = new Date(currentDate);

      if (dayDate >= startDate && dayDate <= endDate) {
        week.push({
          date: dateStr,
          count: count,
          level: level,
        });
      } else {
        // Push an empty placeholder for days outside the year range but within the grid
        week.push({ date: 'placeholder', count: -1, level: -1 });
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }
    weeks.push(week);
  }
  
  const levelColors = [
    'bg-gray-700/40', // Level 0
    'bg-green-900',   // Level 1
    'bg-green-700',   // Level 2
    'bg-green-500',   // Level 3
    'bg-green-300'    // Level 4
  ];

  return (
     <TooltipProvider>
      <div className="flex flex-col gap-2 rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
        <div className="flex gap-1 overflow-hidden">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-rows-7 gap-1">
              {week.map((day, dayIndex) => {
                 if (day.level === -1) {
                    return <div key={dayIndex} className="size-3 rounded-sm bg-transparent" />;
                  }
                return (
                  <Tooltip key={dayIndex} delayDuration={100}>
                    <TooltipTrigger asChild>
                      <div className={cn("size-3 rounded-sm", levelColors[day.level])} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm font-bold">
                        {day.count} contributions on {new Date(day.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>2025</span>
           <div className="flex items-center gap-1">
            <span>Less</span>
            {levelColors.map((color, i) => (
              <div key={i} className={cn("size-3 rounded-sm", color)} />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

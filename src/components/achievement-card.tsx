import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AchievementCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  rarity: 'Legendary' | 'Epic' | 'Rare' | 'Common';
  color: 'yellow' | 'purple' | 'blue' | 'gray';
};

const rarityStyles = {
  Legendary: 'border-yellow-400/50 bg-yellow-900/20 text-yellow-400',
  Epic: 'border-purple-400/50 bg-purple-900/20 text-purple-400',
  Rare: 'border-blue-400/50 bg-blue-900/20 text-blue-400',
  Common: 'border-gray-400/50 bg-gray-900/20 text-gray-400',
};

const glowStyles = {
    yellow: 'shadow-[0_0_20px_0] shadow-yellow-500/30',
    purple: 'shadow-[0_0_20px_0] shadow-purple-500/30',
    blue: 'shadow-[0_0_20px_0] shadow-blue-500/30',
    gray: 'shadow-[0_0_20px_0] shadow-gray-500/20',
}

export function AchievementCard({ icon, title, description, rarity, color }: AchievementCardProps) {
  return (
    <div className={cn(
        "relative rounded-xl border p-3 sm:p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full flex flex-col justify-between",
        rarityStyles[rarity],
        glowStyles[color]
    )}>
      <div>
        <div className="flex items-start gap-3 mb-2">
          <div className="flex-shrink-0 [&>svg]:size-4 mt-1">
              {icon}
          </div>
          <div>
            <h3 className="text-base font-bold text-white leading-tight">{title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
      </div>
      <Badge variant="outline" className={cn("mt-2 border-none text-xs w-min", rarityStyles[rarity])}>
        {rarity}
      </Badge>
    </div>
  );
}

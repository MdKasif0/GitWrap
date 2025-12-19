import { GithubForm } from "@/components/github-form";
import { AnimatedBackground } from "@/components/animated-background";
import { FeatureCard } from "@/components/feature-card";
import { StatsIcon } from "@/components/icons/stats-icon";
import { AchievementsIcon } from "@/components/icons/achievements-icon";
import { SeriousnessIcon } from "@/components/icons/seriousness-icon";
import { ShareIcon } from "@/components/icons/share-icon";

export default function Home() {
  const features = [
    {
      icon: <StatsIcon />,
      title: "Stats",
      description: "Your contributions, languages, and commits visualized.",
    },
    {
      icon: <AchievementsIcon />,
      title: "Achievements",
      description: "Unlock badges for milestones and rare coding feats.",
    },
    {
      icon: <SeriousnessIcon />,
      title: "Seriousness / 1000",
      description: "How serious was your coding this year? Find your score.",
    },
    {
      icon: <ShareIcon />,
      title: "Share Your Year",
      description: "Generate a personalized card to share your journey.",
    },
  ];

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-4">
      <AnimatedBackground />
      <div className="z-10 flex w-full max-w-4xl flex-col items-center space-y-16">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="relative">
            <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-br from-[#8B5CF6] via-[#EC4899] to-[#10B981] bg-clip-text text-transparent sm:text-8xl">
              GitHub Wrapped <span className="text-4xl sm:text-6xl">🎁</span>
            </h1>
             <div className="absolute -top-4 -left-8 sm:-top-5 sm:-left-12 text-sm sm:text-base font-bold bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-sm -rotate-12">
              2025
            </div>
          </div>
          <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Unwrap your coding year - see your stats, achievements, and developer journey in an epic visual story
          </p>
        </div>
        <GithubForm />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full">
          {features.map((feature, i) => (
            <FeatureCard key={i} {...feature} />
          ))}
        </div>
      </div>
    </main>
  );
}

import { generateAchievements } from "@/ai/flows/generate-achievements";
import { generateGitHubRoast } from "@/ai/flows/generate-github-roast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchGitHubData } from "@/lib/github-api";
import { Award, Code, Flame, GitCommit, GitMerge, Sparkles } from "lucide-react";
import { StatsCard } from "@/components/stats-card";
import { ContributionGraph } from "@/components/contribution-graph";
import { ExportCard } from "@/components/export-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function WrappedPage({ params }: { params: { username: string } }) {
  const githubData = await fetchGitHubData(params.username);
  
  const [achievementsResult, roastResult] = await Promise.all([
    generateAchievements({
      username: githubData.username,
      contributionCount: githubData.contributionCount,
      mostUsedLanguage: githubData.mostUsedLanguage,
      commitCount: githubData.commitCount,
    }),
    generateGitHubRoast({
      username: githubData.username,
      contributionCount: githubData.contributionCount,
      mostUsedLanguage: githubData.mostUsedLanguage,
      totalCommits: githubData.commitCount,
    }),
  ]);

  const { achievements } = achievementsResult;
  const { roast } = roastResult;

  return (
    <div className="min-h-screen bg-background">
      <header className="p-4 text-center">
        <Button variant="link" asChild className="text-primary">
          <Link href="/">← Back to start</Link>
        </Button>
      </header>
      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <section className="flex flex-col items-center gap-4 text-center opacity-0 animate-fade-in-up">
          <Avatar className="h-24 w-24 border-4 border-primary">
            <AvatarImage src={githubData.avatarUrl} alt={githubData.name} data-ai-hint="person portrait" />
            <AvatarFallback>{githubData.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-4xl font-bold">{githubData.name}</h1>
            <p className="text-xl text-muted-foreground">@{githubData.username}</p>
          </div>
          <h2 className="text-2xl font-bold text-primary">Your 2025 GitWrap is here!</h2>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatsCard
            title="Total Contributions"
            value={githubData.contributionCount.toLocaleString()}
            icon={GitMerge}
            style={{ animationDelay: '100ms' }}
          />
          <StatsCard
            title="Total Commits"
            value={githubData.commitCount.toLocaleString()}
            icon={GitCommit}
            style={{ animationDelay: '200ms' }}
          />
          <StatsCard
            title="Most Used Language"
            value={githubData.mostUsedLanguage}
            icon={Code}
            style={{ animationDelay: '300ms' }}
          />
        </section>

        <section className="mt-8">
          <ContributionGraph data={githubData.contributionData} />
        </section>

        <section className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
            <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold">
              <Sparkles className="text-primary" />
              Achievements Unlocked
            </h3>
            <div className="space-y-3">
              {achievements.map((achievement, i) => (
                <Card key={i} className="bg-card/50">
                  <CardContent className="flex items-center gap-4 p-4">
                    <Award className="h-6 w-6 flex-shrink-0 text-primary" />
                    <p className="font-medium">{achievement}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold">
              <Flame className="text-primary" />
              Your Annual Roast
            </h3>
            <Card className="bg-gradient-to-br from-[#0A0A50]/50 to-background">
              <CardContent className="p-6">
                <p className="text-lg italic text-foreground/90">{roast}</p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section className="mt-12 flex flex-col items-center">
            <h3 className="mb-4 text-2xl font-bold text-center">Share Your Year</h3>
            <ExportCard data={githubData} />
        </section>
      </main>
    </div>
  );
}

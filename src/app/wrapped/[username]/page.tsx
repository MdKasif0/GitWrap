

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchGitHubData } from "@/lib/github-api";
import { Award, Code, Flame, GitCommit, GitMerge, Sparkles, Star, Milestone, CalendarDays, TrendingUp, Github, Languages, ArrowLeft, ArrowRight } from "lucide-react";
import { ContributionGraph } from "@/components/contribution-graph";
import { ExportCard } from "@/components/export-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { WrappedCard } from "@/components/wrapped-card";
import NumberTicker from "@/components/number-ticker";
import { LanguageChart } from "@/components/language-chart";
import { Card, CardContent } from "@/components/ui/card";


export default async function WrappedPage({ params }: { params: { username: string } }) {
  const githubData = await fetchGitHubData(params.username);
  
  // Temporarily hardcode AI-generated content
  const achievements = [
    `Code Alchemist: Mastered the art of crafting code in ${githubData.mostUsedLanguage}!`,
    `Commitment Champion: Reached a new milestone with ${githubData.commitCount} commits!`,
    `Contribution King/Queen: Your ${githubData.contributionCount} contributions are making a difference!`,
    "Open Source Star: You've become a beacon in the open-source community!"
  ];
  const roast = `With ${githubData.commitCount} commits, you're practically paying rent on GitHub. Your main language is ${githubData.mostUsedLanguage}? Nice, I hear that's the second-best language for writing 'hello world'.`;


  const topLangs = githubData.topLanguages.slice(0, 5);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-4">
       <div className="pointer-events-none absolute inset-0 z-0 h-full w-full bg-black">
        <div className="absolute inset-0 z-0 bg-[url('https://firebasestudio.app/assets/bg-stars.svg')] bg-repeat"></div>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_10%,transparent_100%)]"></div>
      </div>
      <header className="absolute top-4 left-4 z-20">
        <Button variant="ghost" asChild>
          <Link href="/"><ArrowLeft /> Back to start</Link>
        </Button>
      </header>
      <main className="z-10 flex w-full max-w-2xl flex-col items-center">
        <Carousel className="w-full">
          <CarouselContent>
            {/* Card 1: Welcome */}
            <CarouselItem>
              <WrappedCard>
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <Avatar className="h-32 w-32 border-4 border-primary shadow-lg">
                    <AvatarImage src={githubData.avatarUrl} alt={githubData.name} data-ai-hint="person portrait" />
                    <AvatarFallback>{githubData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h1 className="mt-6 text-5xl font-bold">{githubData.name}</h1>
                  <p className="text-2xl text-muted-foreground">@{githubData.username}</p>
                  <p className="mt-8 text-3xl font-semibold bg-gradient-to-br from-white to-neutral-400 bg-clip-text text-transparent">Your 2025 GitHub Journey</p>
                </div>
              </WrappedCard>
            </CarouselItem>

            {/* Card 2: Commit Overview */}
            <CarouselItem>
              <WrappedCard>
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <GitCommit className="h-16 w-16 text-primary" />
                  <h2 className="mt-4 text-3xl font-bold">Commit Overview</h2>
                  <div className="my-8">
                    <p className="text-8xl font-black text-white">
                      <NumberTicker value={githubData.commitCount} />
                    </p>
                    <p className="text-2xl text-muted-foreground">Total Commits</p>
                  </div>
                  <p className="text-lg text-foreground">That's a lot of code!</p>
                </div>
              </WrappedCard>
            </CarouselItem>

             {/* Card 3: Language Breakdown */}
            <CarouselItem>
              <WrappedCard>
                <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                  <Languages className="h-16 w-16 text-primary" />
                  <h2 className="mt-4 text-3xl font-bold">Language Breakdown</h2>
                  <div className="my-6 w-full h-64">
                    <LanguageChart data={topLangs} />
                  </div>
                  <p className="text-lg text-foreground">Your top languages of 2025.</p>
                </div>
              </WrappedCard>
            </CarouselItem>

             {/* Card 4: Streak & Patterns */}
            <CarouselItem>
              <WrappedCard>
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <TrendingUp className="h-16 w-16 text-primary" />
                  <h2 className="mt-4 text-3xl font-bold">Streak & Patterns</h2>
                  <div className="my-8 flex w-full justify-around">
                    <div className="text-center">
                       <p className="text-6xl font-black text-white">
                        <NumberTicker value={githubData.longestStreak} />
                       </p>
                      <p className="text-xl text-muted-foreground">Day Streak</p>
                    </div>
                    <div className="text-center">
                      <p className="text-6xl font-black text-white">{githubData.mostProductiveDay.substring(0,3)}</p>
                      <p className="text-xl text-muted-foreground">Busiest Day</p>
                    </div>
                  </div>
                   <div className="w-full h-48 px-4">
                    <ContributionGraph data={githubData.contributionData} />
                  </div>
                </div>
              </WrappedCard>
            </CarouselItem>
            
            {/* Card 5: Repository Highlights */}
            <CarouselItem>
              <WrappedCard>
                <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
                  <Github className="h-16 w-16 text-primary" />
                  <h2 className="text-3xl font-bold">Repository Highlights</h2>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    <div className="text-center">
                      <p className="text-5xl font-black text-white"><NumberTicker value={githubData.totalStars} /></p>
                      <p className="text-lg text-muted-foreground">Stars Earned</p>
                    </div>
                     <div className="text-center">
                      <p className="text-5xl font-black text-white"><NumberTicker value={githubData.reposCreated} /></p>
                      <p className="text-lg text-muted-foreground">Repos Created</p>
                    </div>
                    <div className="text-center">
                      <p className="text-5xl font-black text-white"><NumberTicker value={githubData.mergedPRs} /></p>
                      <p className="text-lg text-muted-foreground">PRs Merged</p>
                    </div>
                    <div className="text-center">
                      <p className="text-5xl font-black text-white"><NumberTicker value={githubData.issuesOpened} /></p>
                      <p className="text-lg text-muted-foreground">Issues Opened</p>
                    </div>
                  </div>
                  <p className="text-lg text-foreground mt-4">Top Repo: <span className="font-bold text-primary">{githubData.mostCommittedRepo || 'N/A'}</span></p>
                </div>
              </WrappedCard>
            </CarouselItem>

            {/* Card 6: The Roast */}
            <CarouselItem>
              <WrappedCard>
                <div className="flex h-full flex-col items-center justify-center text-center bg-gradient-to-br from-[#0A0A50]/80 to-background rounded-lg p-8">
                  <Flame className="h-16 w-16 text-primary" />
                  <h2 className="mt-4 text-3xl font-bold">The Roast</h2>
                  <p className="mt-6 text-2xl italic leading-relaxed text-foreground/90">{roast}</p>
                   <p className="absolute bottom-6 text-xs text-muted-foreground">Generated by Gemini AI</p>
                </div>
              </WrappedCard>
            </CarouselItem>

             {/* Card 7: Achievements */}
             <CarouselItem>
              <WrappedCard>
                <div className="flex h-full flex-col items-center justify-center text-center p-6">
                  <Sparkles className="h-16 w-16 text-primary" />
                  <h2 className="mt-4 text-3xl font-bold">Achievements</h2>
                  <div className="mt-6 w-full space-y-3 px-4">
                    {achievements.slice(0, 4).map((achievement, i) => (
                      <Card key={i} className="bg-card/50">
                        <CardContent className="flex items-center gap-4 p-4">
                          <Award className="h-6 w-6 flex-shrink-0 text-primary" />
                          <p className="font-medium text-left">{achievement}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </WrappedCard>
            </CarouselItem>

            {/* Card 8: Share */}
            <CarouselItem>
                <WrappedCard>
                    <div className="flex h-full flex-col items-center justify-center text-center">
                        <h2 className="text-3xl font-bold">Share Your Wrap</h2>
                        <div className="my-8 scale-90">
                           <ExportCard data={githubData} />
                        </div>
                    </div>
                </WrappedCard>
            </CarouselItem>

          </CarouselContent>
          <CarouselPrevious className="left-[-50px] text-white hover:text-primary size-10" />
          <CarouselNext className="right-[-50px] text-white hover:text-primary size-10" />
        </Carousel>
      </main>
       <footer className="absolute bottom-4 z-10 text-center text-sm text-white/50">
        <p>&copy; GitWrap 2025 - All rights reserved.</p>
      </footer>
    </div>
  );
}


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchGitHubData } from "@/lib/github-api";
import { Award, Code, Flame, GitCommit, GitMerge, Sparkles, Star, Milestone, CalendarDays, TrendingUp, Github, Languages, ArrowLeft, ArrowRight, Share2, X, Pause, ChevronDown, CheckCircle, GitPullRequest } from "lucide-react";
import { ContributionGraph } from "@/components/contribution-graph";
import { ExportCard } from "@/components/export-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi, CarouselProgress } from "@/components/ui/carousel";
import { WrappedCard } from "@/components/wrapped-card";
import NumberTicker from "@/components/number-ticker";
import { LanguageChart, LANGUAGE_COLORS } from "@/components/language-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateGitHubRoast } from "@/ai/flows/generate-github-roast";
import { GiftIcon } from "@/components/icons/gift-icon";
import { Badge } from "@/components/ui/badge";
import { ContributionHeatmap } from "@/components/contribution-heatmap";


export default async function WrappedPage({ params }: { params: { username: string } }) {
  const githubData = await fetchGitHubData(params.username);
  
  const roastData = {
    username: githubData.username,
    contributionCount: githubData.contributionCount,
    mostUsedLanguage: githubData.mostUsedLanguage,
    totalCommits: githubData.commitCount,
    commitMessages: githubData.commitMessages,
    repos: githubData.repoNames
  };
  const { roast } = await generateGitHubRoast(roastData);
  
  const achievements = [
    `Code Alchemist: Mastered the art of crafting code in ${githubData.mostUsedLanguage}!`,
    `Commitment Champion: Reached a new milestone with ${githubData.commitCount} commits!`,
    `Contribution King/Queen: Your ${githubData.contributionCount} contributions are making a difference!`,
    "Open Source Star: You've become a beacon in the open-source community!"
  ];


  const topLangs = githubData.topLanguages.slice(0, 5);

  const getLangAbbreviation = (lang: string) => {
    const abbreviations: { [key: string]: string } = {
        'JavaScript': 'JS',
        'Python': 'Py',
        'TypeScript': 'TS',
        'C++': 'C++',
        'C#': 'C#',
        'Shell': 'sh',
        'HTML': 'HTML',
        'CSS': 'CSS',
        'Ruby': 'rb',
        'Go': 'Go',
        'Rust': 'rs',
    };
    return abbreviations[lang] || lang.substring(0, 2).toUpperCase();
  }
  const topLangAbbr = getLangAbbreviation(githubData.mostUsedLanguage);
  const topLangColor = LANGUAGE_COLORS[githubData.mostUsedLanguage] || LANGUAGE_COLORS.OTHER;
  
  const totalLangBytes = githubData.topLanguages.reduce((sum, lang) => sum + lang.bytes, 0);


  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-background">
       <div className="pointer-events-none absolute inset-0 z-0 h-full w-full bg-black">
        <div className="absolute inset-0 z-0 bg-[url('https://firebasestudio.app/assets/bg-stars.svg')] bg-repeat"></div>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_10%,transparent_100%)]"></div>
      </div>
      <header className="absolute top-4 left-4 z-20">
        <Button variant="ghost" asChild>
          <Link href="/"><ArrowLeft /> Back to start</Link>
        </Button>
      </header>
      <main className="z-10 flex h-full w-full flex-col items-center">
        <Carousel className="h-full w-full">
          <CarouselProgress />
          <CarouselContent className="h-full">
            {/* Card 1: Welcome */}
            <CarouselItem className="h-full">
              <WrappedCard>
                <div className="flex h-full flex-col items-center justify-between text-center">
                    <div /> 
                    <div className="flex flex-col items-center">
                      <GiftIcon className="h-32 w-32" />
                      <p className="mt-8 text-2xl text-muted-foreground">@{githubData.username}'s</p>
                      <h1 className="text-5xl font-bold bg-gradient-to-br from-white to-green-400 bg-clip-text text-transparent">
                        2025 GitHub Wrapped
                      </h1>
                      <p className="mt-4 text-lg text-muted-foreground">Your year in code, unwrapped.</p>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground">
                       <p>SWIPE OR PRESS &rarr; TO CONTINUE</p>
                       <ChevronDown className="animate-bounce" />
                    </div>
                </div>
              </WrappedCard>
            </CarouselItem>

            {/* Card 2: Commit Overview */}
            <CarouselItem className="h-full">
               <WrappedCard className="flex flex-col justify-between items-center text-center p-8">
                 <div className="absolute top-0 left-0 w-full h-full bg-[url('/circuit-board.svg')] bg-cover opacity-5 mix-blend-lighten z-0" />
                 <div className="z-10">
                   <h2 className="text-2xl text-muted-foreground">In 2025, you made</h2>
                   <p
                     className="my-2 text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-cyan-300 to-yellow-300"
                     style={{
                       textShadow: '0 0 10px hsl(var(--primary)/0.5), 0 0 20px hsl(var(--primary)/0.3)',
                     }}
                   >
                     <NumberTicker value={githubData.commitCount} />
                   </p>
                   <p className="text-6xl font-bold text-white/90">commits</p>

                   <div className="mt-6 space-y-1 text-lg">
                      <p>That's <span className="font-bold text-white">{(githubData.commitCount / 365).toFixed(1)} per day</span> on average!</p>
                      <p>Your best month? <span className="font-bold text-primary">{githubData.bestMonth} 🔥</span></p>
                   </div>
                 </div>

                 <div className="w-full h-48 z-10 mt-auto">
                    <ContributionGraph 
                      data={githubData.contributionData} 
                      bestMonth={githubData.bestMonth}
                    />
                  </div>
               </WrappedCard>
             </CarouselItem>

             {/* Card 3: Language Breakdown */}
            <CarouselItem className="h-full">
              <WrappedCard className="flex flex-col items-center justify-center p-6 text-center">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/circuit-board.svg')] bg-cover opacity-5 mix-blend-lighten z-0" />
                <div className="z-10 w-full max-w-md">
                  <h2 className="text-3xl font-bold mb-4">Your Language Journey</h2>
                  
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4 mb-6 relative">
                    <div className="flex items-center gap-4">
                      <div className="size-16 rounded-full flex items-center justify-center text-background text-2xl font-bold" style={{ backgroundColor: topLangColor }}>
                        {topLangAbbr}
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-left">{githubData.mostUsedLanguage}</h3>
                        <p className="text-muted-foreground text-left">was your go-to in 2025.</p>
                      </div>
                    </div>
                     <p className="text-lg text-muted-foreground mt-2">You wrote <span className="font-bold text-white">
                      {(githubData.topLanguages.find(l => l.language === githubData.mostUsedLanguage)?.bytes || 0).toLocaleString()}
                      </span> lines of code.</p>
                    <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground border-none">#1 TOP LANG</Badge>
                  </Card>

                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4 w-full">
                    <h3 className="text-xl font-semibold mb-2">Distribution</h3>
                    <div className="relative w-full h-48">
                      <LanguageChart data={topLangs} />
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-4xl font-bold">{topLangs.length}</span>
                        <span className="text-muted-foreground">LANGS</span>
                      </div>
                    </div>
                     <div className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-2">
                        {topLangs.map(({ language, percentage }) => (
                            <Badge key={language} variant="outline" className="text-sm border-none" style={{
                                backgroundColor: `${LANGUAGE_COLORS[language] || LANGUAGE_COLORS.OTHER}20`,
                                color: LANGUAGE_COLORS[language] || LANGUAGE_COLORS.OTHER,
                                border: `1px solid ${LANGUAGE_COLORS[language] || LANGUAGE_COLORS.OTHER}80`
                            }}>
                                {language} {percentage}%
                            </Badge>
                        ))}
                    </div>
                  </Card>
                </div>
              </WrappedCard>
            </CarouselItem>

             {/* Card 4: Streak Highlight */}
            <CarouselItem className="h-full">
               <WrappedCard className="flex flex-col items-center justify-center p-8 text-center">
                <h2 className="text-4xl font-bold mb-8">Streak Highlight</h2>
                
                <div className="flex items-center justify-center gap-4">
                  <Flame className="size-20 text-orange-500" style={{ filter: 'drop-shadow(0 0 10px #F59E0B)'}}/>
                  <div>
                    <p className="text-8xl font-black text-green-400" style={{ textShadow: '0 0 10px hsla(148, 99%, 46%, 0.7)'}}>
                      <NumberTicker value={githubData.longestStreak} />
                      <span className="text-5xl ml-2">DAYS</span>
                    </p>
                    <p className="text-xl text-muted-foreground">Longest Streak</p>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-3">
                   <Flame className="size-8 text-orange-400" />
                   <div>
                      <p className="text-3xl font-bold">
                        <NumberTicker value={42} />
                      </p>
                      <p className="text-sm text-muted-foreground">Current Streak</p>
                   </div>
                </div>

                <p className="mt-8 text-lg text-foreground/80 max-w-sm">
                  Consistency is key! Your dedication to coding every day is inspiring.
                </p>

                <div className="mt-8 w-full max-w-xl">
                  <ContributionHeatmap data={githubData.contributionData} />
                </div>
              </WrappedCard>
            </CarouselItem>
            
            {/* Card 5: Repository Highlights */}
            <CarouselItem className="h-full">
              <WrappedCard className="flex flex-col items-center justify-center p-6 text-center">
                <h2 className="text-4xl font-bold mb-8">Repository Highlights</h2>
                  <p className="max-w-xl text-lg text-muted-foreground mb-8">
                    Your impact on open source was electric this year. Here's the code that defined your 2025 journey.
                  </p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl">
                  <Card className="bg-card/50 text-center flex flex-col justify-center items-center p-6">
                      <Star className="size-10 text-primary mb-4"/>
                      <p className="text-4xl font-black text-white"><NumberTicker value={githubData.totalStars} /></p>
                      <p className="text-lg text-muted-foreground">Stars Earned</p>
                  </Card>
                   <Card className="bg-card/50 text-center flex flex-col justify-center items-center p-6">
                      <Github className="size-10 text-primary mb-4"/>
                      <p className="text-4xl font-black text-white"><NumberTicker value={githubData.reposCreated} /></p>
                      <p className="text-lg text-muted-foreground">New Repos</p>
                  </Card>
                  <Card className="bg-card/50 text-center flex flex-col justify-center items-center p-6">
                      <GitPullRequest className="size-10 text-primary mb-4"/>
                      <p className="text-4xl font-black text-white"><NumberTicker value={githubData.mergedPRs} /></p>
                      <p className="text-lg text-muted-foreground">PRs Merged</p>
                  </Card>
                  <Card className="bg-card/50 text-center flex flex-col justify-center items-center p-6">
                      <CheckCircle className="size-10 text-primary mb-4"/>
                      <p className="text-4xl font-black text-white"><NumberTicker value={githubData.issuesOpened} /></p>
                      <p className="text-lg text-muted-foreground">Issues Solved</p>
                  </Card>
                </div>
                 <p className="text-lg text-foreground mt-8">Your most committed repo: <span className="font-bold text-primary">{githubData.mostCommittedRepo || 'N/A'}</span></p>
              </WrappedCard>
            </CarouselItem>

            {/* Card 6: The Roast */}
            <CarouselItem className="h-full">
              <WrappedCard>
                <div className="flex h-full flex-col items-center justify-center text-center bg-gradient-to-br from-[#0A0A50]/80 to-background rounded-lg p-8 max-w-2xl">
                  <Flame className="h-16 w-16 text-primary" />
                  <h2 className="mt-4 text-3xl font-bold">The Roast</h2>
                  <p className="mt-6 text-2xl italic leading-relaxed text-foreground/90">{roast}</p>
                   <p className="absolute bottom-6 text-xs text-muted-foreground">Generated by Gemini AI</p>
                </div>
              </WrappedCard>
            </CarouselItem>

             {/* Card 7: Achievements */}
             <CarouselItem className="h-full">
              <WrappedCard>
                <div className="flex h-full flex-col items-center justify-center text-center p-6">
                  <Sparkles className="h-16 w-16 text-primary" />
                  <h2 className="mt-4 text-3xl font-bold">Achievements</h2>
                  <div className="mt-6 w-full space-y-3 px-4 max-w-md">
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
            <CarouselItem className="h-full">
                <WrappedCard>
                    <div className="flex h-full flex-col items-center justify-center text-center">
                        <h2 className="text-3xl font-bold mb-8">Share Your Wrap</h2>
                        <ExportCard data={githubData} />
                    </div>
                </WrappedCard>
            </CarouselItem>

          </CarouselContent>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-4 rounded-full bg-black/50 px-4 py-2 backdrop-blur-sm">
            <CarouselPrevious variant="ghost" className="static translate-y-0 text-white hover:text-primary" />
            <button className="text-white hover:text-primary">
              <Pause />
            </button>
            <CarouselNext variant="ghost" className="static translate-y-0 text-white hover:text-primary" />
          </div>
          <div className="absolute bottom-6 right-6 z-20">
              <Button size="icon" variant="ghost" className="rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-primary hover:text-primary-foreground">
                  <Share2 />
              </Button>
          </div>
          <div className="absolute bottom-6 left-6 z-20">
              <Button size="icon" variant="ghost" asChild className="rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground">
                  <Link href="/"><X /></Link>
              </Button>
          </div>
        </Carousel>
      </main>
       <footer className="absolute bottom-4 z-10 text-center text-sm text-white/50">
        <p>&copy; GitWrap 2025 - All rights reserved.</p>
      </footer>
    </div>
  );
}

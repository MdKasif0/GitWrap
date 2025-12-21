


import type { Metadata } from 'next';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchGitHubData } from "@/lib/github-api";
import { Award, Code, Flame, GitCommit, GitMerge, Sparkles, Star, Milestone, CalendarDays, TrendingUp, Github, Languages, ArrowLeft, ArrowRight, Share2, X, Pause, ChevronDown, CheckCircle, GitPullRequest, Trophy, BrainCircuit, Rocket, ChevronLeft, ChevronRight, GitFork, Users } from "lucide-react";
import { ContributionGraph } from "@/components/contribution-graph";
import { ExportCard } from "@/components/export-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi, CarouselProgress } from "@/components/ui/carousel";
import { WrappedCard } from "@/components/wrapped-card";
import NumberTicker from "@/components/number-ticker";
import { LanguageChart, LANGUAGE_COLORS } from "@/components/language-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GiftIcon } from "@/components/icons/gift-icon";
import { Badge } from "@/components/ui/badge";
import { ContributionHeatmap } from "@/components/contribution-heatmap";
import { AchievementCard } from "@/components/achievement-card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Download, Link as LinkIcon, Twitter } from 'lucide-react';
import { generateWrap } from '@/ai/flows/generate-wrap';
import type { GenerateWrapOutput } from '@/ai/flows/generate-wrap';


export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
  const username = params.username;
  const description = `Check out ${username}'s GitHub Wrapped 2025! See their coding stats, top languages, contribution streaks, and more.`;
  return {
    title: `${username}'s GitHub Wrapped 2025 | GitWrap`,
    description: description,
    alternates: {
      canonical: `https://gitwrap.netlify.app/wrapped/${username}`,
    },
    openGraph: {
        title: `${username}'s GitHub Wrapped 2025`,
        description: description,
        url: `https://gitwrap.netlify.app/wrapped/${username}`,
        images: [
            {
                url: '/og-gitwrap.png', // Fallback image
                width: 1200,
                height: 630,
                alt: `GitWrap card for ${username}`,
            },
        ],
        type: 'article',
        authors: [username],
    },
     twitter: {
      card: 'summary_large_image',
      title: `${username}'s GitHub Wrapped 2025 | GitWrap`,
      description: description,
      creator: '@GitWrap',
      images: ['/og-gitwrap.png'],
    },
  };
}

const achievementIcons: { [key: string]: React.ReactNode } = {
  Trophy: <Trophy />,
  Flame: <Flame />,
  BrainCircuit: <BrainCircuit />,
  GitPullRequest: <GitPullRequest />,
  Rocket: <Rocket />,
  Code: <Code />,
};

export default async function WrappedPage({ params }: { params: { username: string } }) {
  const githubData = await fetchGitHubData(params.username);
  
  const aiData: GenerateWrapOutput = await generateWrap({
    username: githubData.username,
    bio: githubData.bio,
    followers: githubData.followers,
    totalStars: githubData.totalStars,
    contributionCount: githubData.contributionCount,
    commitCount: githubData.commitCount,
    mostUsedLanguage: githubData.mostUsedLanguage,
    commitMessages: githubData.commitMessages,
    repos: githubData.repoNames,
  });

  const { longRoast, shortRoast, achievements } = aiData;
  
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

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": `${githubData.name}'s GitHub Wrapped 2025`,
      "description": `GitHub statistics and coding analytics for ${githubData.name} in 2025.`,
      "image": `https://gitwrap.netlify.app/api/og/${githubData.username}`,
      "author": {
        "@type": "Person",
        "name": githubData.name,
        "url": `https://github.com/${githubData.username}`
      },
      "publisher": {
        "@type": "Organization",
        "name": "GitWrap",
        "logo": {
          "@type": "ImageObject",
          "url": "https://gitwrap.netlify.app/gitwrap.png"
        }
      },
      "datePublished": "2025-01-01",
      "dateModified": new Date().toISOString()
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://gitwrap.netlify.app"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": githubData.username,
          "item": `https://gitwrap.netlify.app/wrapped/${githubData.username}`
        }
      ]
    }
  ];


  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
    <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-background">
       <div className="pointer-events-none absolute inset-0 z-0 h-full w-full bg-black">
        <div className="absolute inset-0 z-0 bg-[url('https://firebasestudio.app/assets/bg-stars.svg')] bg-repeat"></div>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_10%,transparent_100%)]"></div>
      </div>
      <header className="absolute top-4 left-4 z-20">
        <Button variant="ghost" asChild>
          <Link href="/"><ChevronLeft /> Back to start</Link>
        </Button>
      </header>
      <main className="z-10 flex h-full w-full flex-col items-center">
        <Carousel className="h-full w-full">
          <CarouselProgress />
          <CarouselContent className="h-full">
            {/* Card 1: Welcome */}
            <CarouselItem className="h-full">
              <WrappedCard>
                <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="flex flex-col items-center">
                        <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-primary/50 mb-4">
                            <AvatarImage src={githubData.avatarUrl} alt={githubData.name} />
                            <AvatarFallback>{githubData.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h2 className="text-4xl md:text-5xl font-bold text-white">{githubData.name}</h2>
                        <p className="text-xl md:text-2xl text-muted-foreground">@{githubData.username}</p>
                        {githubData.bio && <p className="mt-4 max-w-md text-lg text-foreground/80 italic">"{githubData.bio}"</p>}
                        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-br from-white to-green-400 bg-clip-text text-transparent mt-8">
                            2025 GitHub Wrapped
                        </h1>
                        <p className="mt-2 text-lg md:text-xl text-muted-foreground">Your year in code, unwrapped.</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-24">
                       <p>SWIPE OR PRESS</p>
                       <ChevronRight /> 
                       <p>TO CONTINUE</p>
                    </div>
                </div>
              </WrappedCard>
            </CarouselItem>

            {/* Card 2: Commit Overview */}
            <CarouselItem className="h-full">
               <WrappedCard className="flex flex-col justify-center items-center text-center p-8">
                 <div className="absolute top-0 left-0 w-full h-full bg-[url('/circuit-board.svg')] bg-cover opacity-5 mix-blend-lighten z-0" />
                 <div className="z-10 flex flex-col items-center">
                   <h2 className="text-2xl md:text-3xl text-muted-foreground">In 2025, you made</h2>
                   <div className="my-4 text-8xl md:text-9xl font-black text-green-300"
                     style={{
                       textShadow: '0 0 10px hsl(var(--primary)/0.5), 0 0 20px hsl(var(--primary)/0.3)',
                     }}
                   >
                     <NumberTicker value={githubData.commitCount} />
                   </div>
                   <p className="text-6xl md:text-7xl font-bold text-white/90">commits</p>

                   <div className="mt-6 space-y-1 text-lg md:text-xl">
                      <p>That's <span className="font-bold text-white">{(githubData.commitCount / 365).toFixed(1)} per day</span> on average!</p>
                      <p>Your best month? <span className="font-bold text-primary">{githubData.bestMonth} 🔥</span></p>
                   </div>
                 </div>

                 <div className="w-full h-48 md:h-64 z-10 mt-12 max-w-4xl">
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
                <div className="z-10 w-full max-w-md md:max-w-xl">
                  <h2 className="text-3xl md:text-4xl font-bold mb-8">Your Language Journey</h2>
                  
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4 mb-6 relative">
                    <div className="flex items-center gap-4">
                      <div className="size-16 md:size-20 rounded-full flex items-center justify-center text-background text-2xl md:text-3xl font-bold" style={{ backgroundColor: topLangColor }}>
                        {topLangAbbr}
                      </div>
                      <div>
                        <h3 className="text-3xl md:text-4xl font-bold text-left">{githubData.mostUsedLanguage}</h3>
                        <p className="text-muted-foreground text-left md:text-lg">was your go-to in 2025.</p>
                      </div>
                    </div>
                     <p className="text-lg md:text-xl text-muted-foreground mt-2">You wrote <span className="font-bold text-white">
                      {(githubData.topLanguages.find(l => l.language === githubData.mostUsedLanguage)?.bytes || 0).toLocaleString()}
                      </span> lines of code.</p>
                    <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground border-none">#1 TOP LANG</Badge>
                  </Card>

                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4 w-full">
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">Distribution</h3>
                    <div className="relative w-full h-48 md:h-56">
                      <LanguageChart data={topLangs} />
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-4xl md:text-5xl font-bold">{topLangs.length}</span>
                        <span className="text-muted-foreground md:text-lg">LANGS</span>
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
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Streak Highlight</h2>
                
                <div className="flex items-center justify-center gap-4">
                  <Flame className="size-20 md:size-24 text-orange-500" style={{ filter: 'drop-shadow(0 0 10px #F59E0B)'}}/>
                  <div>
                    <p className="text-8xl md:text-9xl font-black text-green-400" style={{ textShadow: '0 0 10px hsla(148, 99%, 46%, 0.7)'}}>
                      <NumberTicker value={githubData.longestStreak} />
                      <span className="text-5xl md:text-6xl ml-2">DAYS</span>
                    </p>
                    <p className="text-xl md:text-2xl text-muted-foreground">Longest Streak</p>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-3">
                    <Flame className="size-8 md:size-10 text-orange-400" />
                    <div>
                        <p className="text-3xl md:text-4xl font-bold">
                            <NumberTicker value={githubData.currentStreak} />
                        </p>
                        <p className="text-sm md:text-base text-muted-foreground">Current Streak</p>
                    </div>
                </div>

                <p className="mt-8 text-lg md:text-xl text-foreground/80 max-w-md">
                  Consistency is key! Your dedication to coding every day is inspiring.
                </p>

                <div className="mt-8 w-full max-w-xl md:max-w-3xl">
                  <ContributionHeatmap data={githubData.contributionData} />
                </div>
              </WrappedCard>
            </CarouselItem>
            
            {/* Card 5: Repository Highlights */}
            <CarouselItem className="h-full">
              <WrappedCard className="flex flex-col items-center justify-center p-6 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Repository Highlights</h2>
                  <p className="max-w-xl text-lg md:text-xl text-muted-foreground mb-8">
                    Your impact on open source was electric this year. Here's the code that defined your 2025 journey.
                  </p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl">
                  <Card className="bg-card/50 text-center flex flex-col justify-center items-center p-6">
                      <Star className="size-10 md:size-12 text-primary mb-4"/>
                      <p className="text-4xl md:text-5xl font-black text-white"><NumberTicker value={githubData.totalStars} /></p>
                      <p className="text-lg md:text-xl text-muted-foreground">Stars Earned</p>
                  </Card>
                   <Card className="bg-card/50 text-center flex flex-col justify-center items-center p-6">
                      <Github className="size-10 md:size-12 text-primary mb-4"/>
                      <p className="text-4xl md:text-5xl font-black text-white"><NumberTicker value={githubData.reposCreated} /></p>
                      <p className="text-lg md:text-xl text-muted-foreground">New Repos</p>
                  </Card>
                  <Card className="bg-card/50 text-center flex flex-col justify-center items-center p-6">
                      <GitFork className="size-10 md:size-12 text-primary mb-4"/>
                      <p className="text-4xl md:text-5xl font-black text-white"><NumberTicker value={githubData.forks} /></p>
                      <p className="text-lg md:text-xl text-muted-foreground">Total Forks</p>
                  </Card>
                  <Card className="bg-card/50 text-center flex flex-col justify-center items-center p-6">
                      <Users className="size-10 md:size-12 text-primary mb-4"/>
                      <p className="text-4xl md:text-5xl font-black text-white"><NumberTicker value={githubData.followers} /></p>
                      <p className="text-lg md:text-xl text-muted-foreground">Followers</p>
                  </Card>
                </div>
                 <p className="text-lg md:text-xl text-foreground mt-8">Your most committed repo: <span className="font-bold text-primary">{githubData.mostCommittedRepo || 'N/A'}</span></p>
              </WrappedCard>
            </CarouselItem>

            {/* Card 6: The Roast */}
            <CarouselItem className="h-full">
              <WrappedCard>
                <div className="relative flex h-full flex-col items-center justify-center text-center">
                  <div className="relative w-full max-w-2xl md:max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-lg">
                    <p className="absolute -top-8 left-4 text-8xl font-black text-primary/50">“</p>
                    <p className="text-xl sm:text-2xl font-bold italic leading-relaxed text-white/90 text-left">{longRoast}</p>
                    <p className="absolute -bottom-8 right-4 text-8xl font-black text-primary/50">”</p>
                     <p className="mt-6 text-sm italic text-primary">— Roasted by GitWrap</p>
                  </div>
                </div>
              </WrappedCard>
            </CarouselItem>

             {/* Card 7: Achievements */}
             <CarouselItem className="h-full">
              <WrappedCard>
                <div className="flex h-full flex-col items-center justify-center text-center p-6">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">Achievements</h2>
                  <p className="text-muted-foreground mb-8 md:text-lg">Your 2025 Coding Milestones</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl md:max-w-2xl">
                    {achievements.map((achievement, i) => (
                      <AchievementCard 
                        key={i} 
                        icon={achievementIcons[achievement.icon] || <GitPullRequest />}
                        title={achievement.title}
                        description={achievement.description}
                        rarity={achievement.rarity}
                        color={achievement.color}
                      />
                    ))}
                  </div>
                </div>
              </WrappedCard>
            </CarouselItem>

            {/* Card 8: Share */}
            <CarouselItem className="h-full">
                <WrappedCard>
                    <div className="flex h-full flex-col items-center justify-center text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-8">Share Your Wrap</h2>
                        <ExportCard data={githubData} roast={shortRoast} />
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
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon" variant="ghost" className="absolute bottom-6 right-6 z-20 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-primary hover:text-primary-foreground">
                  <Share2 />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-[#1C1C1C] border-primary/20">
                <DialogHeader>
                    <DialogTitle className="text-center text-white">Share Your Card</DialogTitle>
                </DialogHeader>
                <ExportCard data={githubData} roast={shortRoast} isModalVersion={true} />
            </DialogContent>
          </Dialog>
          <div className="absolute bottom-6 left-6 z-20">
              <Button size="icon" variant="ghost" asChild className="rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground">
                  <Link href="/"><X /></Link>
              </Button>
          </div>
        </Carousel>
      </main>
    </div>
    </>
  );
}

    

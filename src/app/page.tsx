

import { GithubForm } from "@/components/github-form";
import { AnimatedBackground } from "@/components/animated-background";
import { FeatureCard } from "@/components/feature-card";
import { StatsIcon } from "@/components/icons/stats-icon";
import { AchievementsIcon } from "@/components/icons/achievements-icon";
import { ShareIcon } from "@/components/icons/share-icon";
import Image from "next/image";
import { Header } from "@/components/header";

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
      icon: <ShareIcon />,
      title: "Share Your Year",
      description: "Generate a personalized card to share your journey.",
    },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "GitWrap",
      "alternateName": "GitHub Wrapped 2025",
      "url": "https://gitwrap.netlify.app",
      "description": "Create your personalized GitHub Wrapped 2025. Analyze your coding stats, top languages, contribution streaks, and get roasted by AI.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://gitwrap.netlify.app/wrapped/{search_term_string}"
        },
        "query-input": "required name=search_term_string"
      },
       "sameAs": [
        "https://twitter.com/GitWrap", // Replace with your actual handle
        "https://github.com/your-org/gitwrap" // Replace with your actual repo
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "GitWrap",
      "url": "https://gitwrap.netlify.app",
      "logo": "https://gitwrap.netlify.app/gitwrap.png",
      "description": "GitWrap creates personalized GitHub year-in-review experiences for developers.",
      "sameAs": [
        "https://twitter.com/GitWrap" // Replace with your actual handle
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "GitWrap",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "browserRequirements": "Requires JavaScript. Works on Chrome, Firefox, Safari, Edge."
    }
  ];

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-4 pt-24">
      <Header />
      <AnimatedBackground />
      <div className="z-10 flex w-full max-w-4xl flex-col items-center space-y-16">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="relative">
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-br from-green-300 via-primary to-green-600 bg-clip-text text-transparent sm:text-8xl">
              GitHub Wrapped
            </h1>
             <div className="absolute -top-4 -left-8 sm:-top-5 sm:-left-12 text-sm sm:text-base font-bold bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-sm -rotate-12">
              2025
            </div>
          </div>
          <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Unwrap your coding year - see your stats, achievements, and developer journey in an epic visual story
          </p>
          <a
            href="https://gitroasted.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center gap-2 text-xl font-bold transition-transform hover:scale-105 bg-gradient-to-r from-orange-500 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent"
          >
            <Image src="/gitroasted.png" alt="GitRoasted Logo" width={24} height={24} />
            Try GitRoasted
          </a>
        </div>
        <GithubForm />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
          {features.map((feature, i) => (
            <FeatureCard key={i} {...feature} />
          ))}
        </div>
      </div>
    </main>
    </>
  );
}

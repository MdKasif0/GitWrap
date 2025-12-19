import { GithubForm } from "@/components/github-form";
import { Logo } from "@/components/logo";
import { AnimatedBackground } from "@/components/animated-background";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-4">
      <AnimatedBackground />
      <div className="z-10 flex flex-col items-center space-y-8">
        <div className="flex flex-col items-center space-y-4 text-center">
          <Logo />
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-br from-white to-neutral-400 bg-clip-text text-transparent sm:text-7xl">
            GitWrap 2025
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground sm:text-xl">
            Your GitHub Year in Review. Get your personalized activity report based on your contributions in 2025.
          </p>
        </div>
        <GithubForm />
      </div>
      <footer className="absolute bottom-4 z-10 text-center text-sm text-white/50">
        <p>&copy; GitWrap 2025 - All rights reserved.</p>
      </footer>
    </main>
  );
}

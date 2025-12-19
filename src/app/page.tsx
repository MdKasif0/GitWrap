import { GithubForm } from "@/components/github-form";
import { Logo } from "@/components/logo";
import { AnimatedBackground } from "@/components/animated-background";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-4">
      <AnimatedBackground />
      <div className="z-10 flex flex-col items-center space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <Logo />
          <p className="max-w-md text-center text-lg text-muted-foreground">
            Get your personalized 2025 GitHub activity report.
          </p>
        </div>
        <GithubForm />
      </div>
    </main>
  );
}

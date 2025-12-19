"use client";

import { useState, useEffect } from "react";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { FileSearch, GitCommit, GitMerge, Languages, Sparkles } from "lucide-react";

const steps = [
  { label: "Fetching user profile...", percentage: 20, icon: GitMerge },
  { label: "Loading repositories...", percentage: 40, icon: GitCommit },
  { label: "Analyzing commits...", percentage: 60, icon: FileSearch },
  { label: "Processing languages...", percentage: 80, icon: Languages },
  { label: "Generating insights...", percentage: 90, icon: Sparkles },
  { label: "Preparing your wrap...", percentage: 100, icon: Sparkles },
];

export function LoadingScreen() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 2000); // Change step every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const { label, percentage, icon: Icon } = steps[currentStep];

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-4 text-white">
      <div className="absolute inset-0 z-0 h-full w-full bg-black">
        <div className="absolute inset-0 z-10 bg-[url('https://firebasestudio.app/assets/bg-stars.svg')] bg-repeat"></div>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_10%,transparent_100%)]"></div>
        <div 
          className="absolute inset-0 z-20 opacity-30 mix-blend-screen [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_70%)]" 
          style={{
            background: 'linear-gradient(135deg, hsl(var(--primary)), #96D3A0, #0A0A50, #ADD8E6)',
            backgroundSize: '400% 400%',
            animation: 'gradient-spin 20s linear infinite alternate',
          }}
        />
        <div className="absolute -bottom-1/2 left-0 right-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
      </div>

      <style jsx>{`
        @keyframes gradient-spin {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes progress-shine {
          0% { background-position: -100% 0; }
          100% { background-position: 100% 0; }
        }
        .progress-shine {
          background-image: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          background-size: 200% 100%;
          animation: progress-shine 2s infinite linear;
        }
        @keyframes particle-glow {
          0%, 100% { box-shadow: 0 0 4px 2px hsla(var(--primary-hsl), 0.5), 0 0 8px 4px hsla(var(--primary-hsl), 0.3); }
          50% { box-shadow: 0 0 8px 4px hsla(var(--primary-hsl), 0.7), 0 0 16px 8px hsla(var(--primary-hsl), 0.5); }
        }
      `}</style>
      
      <div className="relative z-10 flex flex-col items-center gap-12 text-center">
        <Logo className="text-4xl" />

        <div className="w-full max-w-2xl space-y-8">
          <div className="relative h-6 w-full rounded-full bg-white/10 p-1 shadow-inner backdrop-blur-md">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-blue-400 via-cyan-300 to-green-400 progress-shine"
              style={{ 
                width: `${percentage}%`,
                transition: 'width 1s ease-out'
              }}
            />
            {/* Particles */}
            <div className="absolute inset-0" style={{ width: `${percentage}%` }}>
              {Array.from({length: 10}).map((_, i) => {
                const particleSize = Math.random() * 3 + 1;
                const particleLeft = Math.random() * 100;
                const particleTop = Math.random() * 100 - 50;
                const animationDuration = Math.random() * 3 + 2;
                const animationDelay = Math.random() * 2;
                
                return (
                  <div
                    key={i}
                    className="absolute rounded-full bg-cyan-200"
                    style={{
                      width: `${particleSize}px`,
                      height: `${particleSize}px`,
                      left: `${particleLeft}%`,
                      top: `${particleTop}%`,
                      opacity: Math.random(),
                      animation: `particle-glow ${animationDuration}s infinite alternate`,
                      animationDelay: `${animationDelay}s`,
                    }}
                  />
                );
              })}
            </div>
          </div>
          
          <div>
            <p className="text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-green-300 bg-clip-text text-transparent mb-2">{percentage}%</p>
            <div className="flex items-center justify-center gap-2">
              <Icon className="h-5 w-5 text-green-300" />
              <p className="text-lg text-white/80">{label}</p>
            </div>
          </div>
        </div>

      </div>
        <div className="absolute bottom-4 text-center text-sm text-white/50">
            <p>&copy; GitWrap 2025 - All rights reserved.</p>
        </div>
    </div>
  );
}

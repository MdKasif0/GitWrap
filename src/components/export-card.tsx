"use client"

import { useRef } from "react"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, GitCommit, GitMerge, Code } from "lucide-react"
import type { GitHubData } from "@/lib/github-api"
import { Logo } from "./logo"

type ExportCardProps = {
  data: GitHubData
}

export function ExportCard({ data }: ExportCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const handleDownload = () => {
    toast({
      title: "Feature in development",
      description: "Image export will be available soon!",
    })
  }

  return (
    <div className="flex flex-col items-center gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
      <div
        ref={cardRef}
        className="w-full max-w-md"
      >
        <Card className="bg-background/80 backdrop-blur-xl border-white/20 p-1 shadow-2xl">
          <CardContent className="flex flex-col gap-6 rounded-lg bg-card/50 p-6">
            <div className="flex items-center justify-between">
              <Logo className="text-xl"/>
              <span className="font-bold text-xl text-primary">2025</span>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24 border-4 border-primary">
                <AvatarImage src={data.avatarUrl} alt={data.name} data-ai-hint="person portrait" />
                <AvatarFallback>{data.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-2xl font-bold">{data.name}</h3>
                <p className="text-muted-foreground">@{data.username}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <GitMerge className="mx-auto mb-1 h-6 w-6 text-primary" />
                <p className="text-xs text-muted-foreground">Contributions</p>
                <p className="font-bold text-lg">{data.contributionCount.toLocaleString()}</p>
              </div>
              <div>
                <GitCommit className="mx-auto mb-1 h-6 w-6 text-primary" />
                <p className="text-xs text-muted-foreground">Commits</p>
                <p className="font-bold text-lg">{data.commitCount.toLocaleString()}</p>
              </div>
              <div>
                <Code className="mx-auto mb-1 h-6 w-6 text-primary" />
                <p className="text-xs text-muted-foreground">Top Language</p>
                <p className="font-bold text-lg">{data.mostUsedLanguage}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Button onClick={handleDownload} className="w-full max-w-md">
        <Download />
        <span>Download Card</span>
      </Button>
    </div>
  )
}

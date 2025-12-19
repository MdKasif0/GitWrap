"use client"

import { useRef, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, GitCommit, GitMerge, Code, Share2, Link as LinkIcon, Twitter } from "lucide-react"
import type { GitHubData } from "@/lib/github-api"
import { Logo } from "./logo"
import html2canvas from 'html2canvas';


type ExportCardProps = {
  data: GitHubData
}

export function ExportCard({ data }: ExportCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false);

  const generateImage = async (): Promise<{ dataUrl: string, blob: Blob } | null> => {
    if (!cardRef.current) return null;
    setIsProcessing(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        backgroundColor: null,
        scale: 2
      });
      const dataUrl = canvas.toDataURL('image/png');
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(b => b ? resolve(b) : reject(new Error("Canvas toBlob failed")), 'image/png');
      });
      return { dataUrl, blob };
    } catch (err) {
      console.error("Error generating image:", err);
      toast({
        variant: "destructive",
        title: "Image Generation Failed",
        description: "Could not generate the image. Please try again.",
      });
      return null;
    } finally {
      setIsProcessing(false);
    }
  }

  const handleDownload = async () => {
    const image = await generateImage();
    if (image) {
      const link = document.createElement('a');
      link.download = `gitwrap-${data.username}-2025.png`;
      link.href = image.dataUrl;
      link.click();
      toast({
        title: "Download Started",
        description: "Your GitWrap card is being downloaded.",
      });
    }
  }

  const handleShare = async () => {
    const image = await generateImage();
    const shareUrl = window.location.origin;
    const shareText = `Check out my #GitWrap2025! My GitHub year in review. 🚀`;
    if (image && navigator.share) {
       const file = new File([image.blob], `gitwrap-${data.username}-2025.png`, { type: 'image/png' });
       if(navigator.canShare({ files: [file] })) {
        try {
            await navigator.share({
                title: 'My GitWrap 2025',
                text: shareText,
                files: [file],
                url: shareUrl,
            });
            toast({ title: "Shared successfully!" });
        } catch (error) {
            console.error('Error sharing', error);
            // Fallback to copying link if sharing fails
            copyLink();
        }
      } else {
         // Fallback for when files cannot be shared
         copyLink();
      }
    } else {
        // Fallback for browsers that don't support navigator.share
        copyLink();
    }
  }
  
  const handleTwitterShare = async () => {
    const shareUrl = window.location.href;
    const text = `Check out my GitHub year in review! #GitWrap2025 🚀`;
    const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterIntentUrl, '_blank');
  };

  const copyLink = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl).then(() => {
        toast({
            title: "Link Copied!",
            description: "The link to your GitWrap has been copied to your clipboard.",
        });
    });
  }


  return (
    <div className="flex flex-col items-center gap-4 w-full">
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

       <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          <Button onClick={handleDownload} disabled={isProcessing}>
            <Download />
            <span>{isProcessing ? 'Generating...' : 'Download'}</span>
          </Button>
          <Button onClick={handleShare} disabled={isProcessing}>
            <Share2 />
            <span>Share</span>
          </Button>
          <Button onClick={handleTwitterShare} variant="outline" className="col-span-1">
            <Twitter className="fill-current" />
            Share on X
          </Button>
          <Button onClick={copyLink} variant="outline" className="col-span-1">
            <LinkIcon />
            Copy Link
          </Button>
      </div>

    </div>
  )
}

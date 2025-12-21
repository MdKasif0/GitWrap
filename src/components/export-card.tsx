"use client"

import { useRef, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, GitCommit, Code, Share2, Link as LinkIcon, Twitter, Star, Github } from "lucide-react"
import type { GitHubData } from "@/lib/github-api"
import { Logo } from "./logo"
import html2canvas from 'html2canvas';
import Image from "next/image";


type ExportCardProps = {
  data: GitHubData;
  roast: string;
  isModalVersion?: boolean;
}

export function ExportCard({ data, roast, isModalVersion = false }: ExportCardProps) {
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
    <div className="flex flex-col items-center gap-4 w-full max-w-md">
      <div
        ref={cardRef}
        className="w-full"
      >
        <Card className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black border-purple-500/20 shadow-2xl overflow-hidden">
          <CardContent className="flex flex-col gap-6 p-8 items-center text-center">
            
            <div className="flex flex-col items-center gap-2">
              <Avatar className="h-24 w-24 border-4 border-purple-500/50">
                <AvatarImage src={data.avatarUrl} alt={data.name} data-ai-hint="person portrait" />
                <AvatarFallback>{data.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-white">{data.name}</h3>
                <p className="text-muted-foreground">@{data.username}</p>
              </div>
            </div>
            
            <p className="text-base text-muted-foreground italic">"{roast}"</p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-center w-full">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <div className="text-left">
                  <p className="font-bold text-lg text-white">{data.totalStars.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Total Stars</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <GitCommit className="h-5 w-5 text-green-400" />
                 <div className="text-left">
                  <p className="font-bold text-lg text-white">{data.commitCount.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Total Commits</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Github className="h-5 w-5 text-gray-400" />
                 <div className="text-left">
                  <p className="font-bold text-lg text-white">{data.reposCreated.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Public Repos</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-blue-400" />
                 <div className="text-left">
                  <p className="font-bold text-lg text-white">{data.mostUsedLanguage}</p>
                  <p className="text-xs text-muted-foreground">Top Language</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm pt-4">
               <Image src="/gitwrap.png" alt="GitWrap Logo" width={16} height={16} />
               <span className="font-bold text-primary">GitWrap</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {isModalVersion ? (
        <div className="grid grid-cols-2 gap-4 w-full mt-4">
            <Button onClick={handleDownload} variant="outline" className="h-12 bg-zinc-800 border-zinc-700 text-white">
                <Download />
                <span>Save</span>
            </Button>
            <Button onClick={copyLink} variant="outline" className="h-12 bg-zinc-800 border-zinc-700 text-white">
                <LinkIcon />
                <span>Copy</span>
            </Button>
            <Button onClick={handleTwitterShare} variant="outline" className="col-span-2 h-12 bg-zinc-800 border-zinc-700 text-white">
                <Twitter className="fill-current" />
                Share on X
            </Button>
            <Button onClick={handleShare} className="col-span-2 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <Share2 />
                <span>Share</span>
            </Button>
        </div>
      ) : (
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
      )}

    </div>
  )
}

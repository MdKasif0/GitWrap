'use client';

import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function ShareButton() {
  const { toast } = useToast();

  const handleShare = async () => {
    const shareUrl = window.location.origin;
    const shareText = `Check out GitWrap 2025 and get your personalized GitHub year in review! 🚀 #GitWrap2025`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'GitWrap 2025 - Your GitHub Year in Review',
          text: shareText,
          url: shareUrl,
        });
        toast({ title: 'Shared successfully!' });
      } catch (error) {
        console.error('Error sharing', error);
        copyLink(shareUrl);
      }
    } else {
      copyLink(shareUrl);
    }
  };

  const copyLink = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: 'Link Copied!',
        description:
          'The link has been copied to your clipboard.',
      });
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleShare}
      aria-label="Share GitWrap"
    >
      <Share2 className="h-5 w-5" />
    </Button>
  );
}

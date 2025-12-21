
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatedBackground } from '@/components/animated-background';
import { ArrowLeft, Copy, Check, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';

export default function SupportPage() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const upiId = 'your-upi-id@fam';

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    toast({
      title: 'Copied to clipboard!',
      description: `UPI ID: ${upiId}`,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-4">
      <AnimatedBackground />

      <Link href="/" className="absolute top-4 left-4 z-20">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-[600px] rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 shadow-2xl backdrop-blur-lg"
      >
        <div className="text-center">
          <div className="mb-6 text-6xl">☕</div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-br from-green-300 via-primary to-green-600 bg-clip-text text-transparent sm:text-5xl">
            Support GitWrap
          </h1>
          <p className="mt-4 max-w-md mx-auto text-lg text-muted-foreground">
            If you enjoy GitWrap, consider supporting its development. Your
            donations help cover server costs and fuel future updates!
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8">
          {/* UPI ID Section */}
          <Card className="rounded-xl border-white/10 bg-white/5 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-white">Copy UPI ID</h2>
              <div className="mt-4 flex items-center justify-between rounded-lg bg-black/30 p-3">
                <span className="font-mono text-lg text-green-300">{upiId}</span>
                <Button variant="ghost" size="icon" onClick={handleCopy} className="transition-all duration-300 hover:scale-110 hover:text-primary active:scale-95">
                  {copied ? <Check className="h-5 w-5 text-green-400" /> : <Copy className="h-5 w-5" />}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* QR Code Section */}
          <Card className="rounded-xl border-white/10 bg-white/5 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <h2 className="text-lg font-semibold text-white">Scan QR Code</h2>
              <p className="text-sm text-muted-foreground">Scan with any UPI app</p>
              <div className="mt-4 flex justify-center">
                <Image
                  src="https://placehold.co/300x300/png?text=Your+QR+Code"
                  alt="UPI QR Code"
                  width={300}
                  height={300}
                  className="rounded-lg bg-white p-2"
                />
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Supports FamApp, Google Pay, PhonePe, Paytm, and more.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-white">Every Coffee Counts!</h2>
          <p className="mt-2 text-muted-foreground max-w-lg mx-auto">
            Your support helps us dedicate more time to building awesome new features, maintaining the servers, and keeping GitWrap free for everyone.
          </p>
        </div>
        
        <Separator className="my-8 bg-white/10" />

        <div className="text-center text-xs text-muted-foreground">
            <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="h-4 w-4" />
                <h3 className="font-semibold text-white">Secure & Private</h3>
            </div>
            <p className="max-w-md mx-auto">
                Payments are processed directly through your UPI app. GitWrap does not handle or store any payment information. No personal data is collected during this process.
            </p>
        </div>

      </motion.div>
    </main>
  );
}

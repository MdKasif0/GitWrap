
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/header';
import { AnimatedBackground } from '@/components/animated-background';
import { ArrowLeft, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

export default function SupportPage() {
  const { toast } = useToast();
  const upiId = 'your-upi-id@fam';

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    toast({
      title: 'Copied to clipboard!',
      description: `UPI ID: ${upiId}`,
    });
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-4">
      <Header />
      <AnimatedBackground />

      <Link href="/" className="absolute top-4 left-4 z-20">
        <Button variant="ghost">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-[600px] rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-lg"
      >
        <div className="text-center">
          <div className="mb-6 text-6xl">☕</div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent sm:text-5xl">
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
                <Button variant="ghost" size="icon" onClick={handleCopy}>
                  <Copy className="h-5 w-5" />
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
      </motion.div>
    </main>
  );
}

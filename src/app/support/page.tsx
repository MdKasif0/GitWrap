'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Header } from '@/components/header';
import { AnimatedBackground } from '@/components/animated-background';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SupportPage() {
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
      </motion.div>
    </main>
  );
}

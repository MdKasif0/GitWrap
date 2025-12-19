"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type WrappedCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function WrappedCard({ children, className }: WrappedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="p-1"
    >
      <div
        className={cn(
          "relative h-[600px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-8 shadow-2xl backdrop-blur-lg",
          className
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}

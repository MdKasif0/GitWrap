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
      className="h-full w-full"
    >
      <div
        className={cn(
          "relative h-full w-full overflow-hidden bg-black/30 p-8 shadow-2xl backdrop-blur-lg",
          className
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}

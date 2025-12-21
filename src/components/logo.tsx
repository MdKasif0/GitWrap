import { cn } from "@/lib/utils"
import Image from "next/image"

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 text-2xl font-black tracking-tighter text-white", className)}>
      <Image
        src="/gitwrap.png"
        alt="GitWrap Logo"
        width={32}
        height={32}
        className="h-8 w-8"
      />
      <span className="bg-gradient-to-br from-white to-neutral-400 bg-clip-text text-3xl text-transparent">GitWrap</span>
    </div>
  );
}

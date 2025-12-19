import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 text-2xl font-black tracking-tighter text-white", className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8 text-primary"
      >
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="m9.09 9.09.41 5.83 5.41-1.41" />
        <path d="m14.91 14.91-.41-5.83-5.41 1.41" />
      </svg>
      <span className="bg-gradient-to-br from-white to-neutral-400 bg-clip-text text-3xl text-transparent">GitHub Wrapped</span>
    </div>
  );
}

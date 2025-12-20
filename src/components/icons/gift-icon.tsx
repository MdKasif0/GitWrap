export const GiftIcon = ({ className }: { className?: string }) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 128 128"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="gift-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="hsl(var(--primary))" />
        <stop offset="100%" stopColor="hsl(var(--primary) / 0.5)" />
      </linearGradient>
      <filter id="gift-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="8" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g fill="url(#gift-gradient)" stroke="url(#gift-gradient)" strokeWidth="4" filter="url(#gift-glow)">
      <path d="M96,64 L96,112 L32,112 L32,64 L96,64 Z M112,64 L112,48 L16,48 L16,64 L112,64 Z M72,112 L72,48 L56,48 L56,112 L72,112 Z" />
      <path d="M64,48 C73.333333,32 86.666667,24 104,24 C96,8 82.666667,0 64,0 C45.333333,0 32,8 24,24 C41.333333,24 54.666667,32 64,48 Z" />
    </g>
  </svg>
);

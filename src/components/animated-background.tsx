"use client"

export const AnimatedBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden bg-[#0D0E1B]">
        <div className="absolute inset-0 z-0 bg-[url('https://firebasestudio.app/assets/bg-stars.svg')] bg-repeat opacity-50"></div>
        <div 
          className="absolute inset-[-200px] z-10 opacity-30 mix-blend-soft-light [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_70%)]" 
          style={{
            background: 'linear-gradient(135deg, #2DD4BF, #8B5CF6, #EC4899, #10B981)',
            backgroundSize: '400% 400%',
            animation: 'gradient-spin 20s linear infinite alternate',
          }}
        />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0D0E1B] via-[#0D0E1B]/80 to-transparent" />
      <style jsx>{`
        @keyframes gradient-spin {
          0% {
            background-position: 0% 50%;
            transform: rotate(0deg);
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

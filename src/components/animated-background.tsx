"use client"

export const AnimatedBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 bg-[url('https://firebasestudio.app/assets/bg-stars.svg')] bg-repeat"></div>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.1)_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_10%,transparent_100%)]"></div>
        <div 
          className="absolute inset-0 z-10 opacity-30 mix-blend-screen [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_70%)]" 
          style={{
            background: 'linear-gradient(135deg, hsl(var(--primary)), #96D3A0, #0A0A50, #ADD8E6)',
            backgroundSize: '400% 400%',
            animation: 'gradient-spin 20s linear infinite alternate',
          }}
        />
        <div className="absolute -bottom-1/2 left-0 right-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
      <style jsx>{`
        @keyframes gradient-spin {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  )
}

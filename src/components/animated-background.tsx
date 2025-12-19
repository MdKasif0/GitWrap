"use client"

import { cn } from "@/lib/utils"
import React, { forwardRef, useEffect, useState } from "react"

export const AnimatedBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden">
      <div className="absolute inset-[-200%] w-[400%] h-[400%]">
        <div className="absolute inset-0 z-0 h-full w-full bg-transparent">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </div>
        <div 
          className="absolute inset-0 z-10 opacity-50 mix-blend-color-dodge [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_70%)]" 
          style={{
            background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(340, 89%, 71%), hsl(190, 89%, 71%), hsl(50, 89%, 71%))',
            backgroundSize: '400% 400%',
            animation: 'gradient-spin 20s linear infinite',
          }}
        />
      </div>
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

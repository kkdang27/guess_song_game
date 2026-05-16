"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface WaveformVisualizerProps {
  isPlaying: boolean
}

export function WaveformVisualizer({ isPlaying }: WaveformVisualizerProps) {
  const [bars] = useState(() => 
    Array.from({ length: 64 }, () => Math.random() * 0.6 + 0.2)
  )
  
  return (
    <div className="h-24 flex items-center justify-center gap-[2px] px-4">
      {bars.map((height, index) => (
        <motion.div
          key={index}
          className="w-1 rounded-full bg-gradient-to-t from-primary to-secondary"
          animate={{
            height: isPlaying 
              ? [
                  `${height * 100}%`,
                  `${Math.random() * 60 + 20}%`,
                  `${height * 100}%`,
                ]
              : `${height * 40}%`,
          }}
          transition={{
            duration: 0.3 + Math.random() * 0.2,
            repeat: isPlaying ? Infinity : 0,
            ease: "easeInOut",
          }}
          style={{
            opacity: 0.6 + (index / bars.length) * 0.4,
          }}
        />
      ))}
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface RankBadgeProps {
  rank: string
  division?: string
  size?: "small" | "medium" | "large"
}

const rankConfig: Record<string, { color: string; gradient: string; glow: string }> = {
  Bronze: {
    color: "text-orange-400",
    gradient: "from-orange-600 to-orange-400",
    glow: "shadow-[0_0_30px_rgba(251,146,60,0.4)]",
  },
  Silver: {
    color: "text-gray-300",
    gradient: "from-gray-400 to-gray-300",
    glow: "shadow-[0_0_30px_rgba(209,213,219,0.4)]",
  },
  Gold: {
    color: "text-yellow-400",
    gradient: "from-yellow-500 to-yellow-400",
    glow: "shadow-[0_0_30px_rgba(250,204,21,0.4)]",
  },
  Platinum: {
    color: "text-cyan-400",
    gradient: "from-cyan-500 to-cyan-300",
    glow: "shadow-[0_0_30px_rgba(34,211,238,0.4)]",
  },
  Diamond: {
    color: "text-purple-400",
    gradient: "from-purple-500 to-pink-400",
    glow: "shadow-[0_0_30px_rgba(168,85,247,0.4)]",
  },
}

const sizeConfig = {
  small: { badge: "w-12 h-12", icon: "w-6 h-6", text: "text-xs" },
  medium: { badge: "w-20 h-20", icon: "w-10 h-10", text: "text-sm" },
  large: { badge: "w-32 h-32", icon: "w-16 h-16", text: "text-lg" },
}

export function RankBadge({ rank, division, size = "medium" }: RankBadgeProps) {
  const config = rankConfig[rank] || rankConfig.Bronze
  const sizes = sizeConfig[size]
  
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative flex flex-col items-center"
    >
      {/* Outer Glow Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className={cn(
          "absolute rounded-full opacity-30",
          sizes.badge,
          `bg-gradient-to-r ${config.gradient}`
        )}
        style={{ filter: "blur(20px)" }}
      />
      
      {/* Badge Container */}
      <div className={cn(
        "relative rounded-full p-1",
        `bg-gradient-to-br ${config.gradient}`,
        config.glow
      )}>
        <div className={cn(
          "rounded-full bg-card flex items-center justify-center",
          sizes.badge
        )}>
          <div className={cn(
            "rounded-full flex items-center justify-center",
            `bg-gradient-to-br ${config.gradient}`,
            sizes.icon
          )}>
            <RankIcon rank={rank} className={cn("text-card", size === "large" ? "w-8 h-8" : size === "medium" ? "w-5 h-5" : "w-3 h-3")} />
          </div>
        </div>
      </div>
      
      {/* Division Badge */}
      {division && (
        <div className={cn(
          "absolute -bottom-1 px-2 py-0.5 rounded-full text-card font-bold",
          `bg-gradient-to-r ${config.gradient}`,
          sizes.text
        )}>
          {division}
        </div>
      )}
    </motion.div>
  )
}

function RankIcon({ rank, className }: { rank: string; className?: string }) {
  // Simple shield icon for ranks
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

"use client"

import { motion } from "framer-motion"
import { BarChart3 } from "lucide-react"

const songStatsData = [
  { stage: "Drums", percentage: 12, color: "bg-primary" },
  { stage: "Bass", percentage: 18, color: "bg-cyan-400" },
  { stage: "Piano", percentage: 28, color: "bg-secondary" },
  { stage: "Synth", percentage: 22, color: "bg-yellow-400" },
  { stage: "Melody", percentage: 15, color: "bg-orange-400" },
  { stage: "Final", percentage: 5, color: "bg-muted-foreground" },
]

export function SongStats() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Guess Distribution by Stage</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {songStatsData.map((stat, index) => (
          <motion.div
            key={stat.stage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">{stat.stage}</span>
              <span className="text-sm font-bold text-foreground">{stat.percentage}%</span>
            </div>
            
            {/* Progress Bar */}
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stat.percentage}%` }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                className={`h-full rounded-full ${stat.color}`}
              />
            </div>
            
            {/* Ring Visualization */}
            <div className="absolute -right-2 top-0 w-16 h-16 opacity-20">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-muted"
                />
                <motion.circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className={stat.color.replace('bg-', 'text-')}
                  strokeDasharray={`${stat.percentage} 100`}
                  initial={{ strokeDasharray: "0 100" }}
                  animate={{ strokeDasharray: `${stat.percentage} 100` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-primary">342</p>
            <p className="text-sm text-muted-foreground">Total Games</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-secondary">74%</p>
            <p className="text-sm text-muted-foreground">Guess Rate</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-cyan-400">2.8</p>
            <p className="text-sm text-muted-foreground">Avg Stage</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-400">12</p>
            <p className="text-sm text-muted-foreground">Best Streak</p>
          </div>
        </div>
      </div>
    </div>
  )
}

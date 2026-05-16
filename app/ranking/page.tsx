"use client"

import { motion } from "framer-motion"
import { 
  Trophy, 
  Target, 
  Zap, 
  TrendingUp, 
  Shield,
  ChevronUp,
  ChevronDown
} from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"
import { Navbar } from "@/components/navbar"
import { RankBadge } from "@/components/rank-badge"
import { StatsCard } from "@/components/stats-card"
import { SongStats } from "@/components/song-stats"
import { cn } from "@/lib/utils"

const rankTiers = [
  { name: "Bronze", minMMR: 0, maxMMR: 999, color: "from-orange-600 to-orange-400" },
  { name: "Silver", minMMR: 1000, maxMMR: 1499, color: "from-gray-400 to-gray-300" },
  { name: "Gold", minMMR: 1500, maxMMR: 1999, color: "from-yellow-500 to-yellow-400" },
  { name: "Platinum", minMMR: 2000, maxMMR: 2499, color: "from-cyan-500 to-cyan-300" },
  { name: "Diamond", minMMR: 2500, maxMMR: 3000, color: "from-purple-500 to-pink-400" },
]

const userStats = {
  rank: "Diamond",
  division: "II",
  mmr: 2450,
  peakMMR: 2580,
  winRate: 68,
  totalGames: 342,
  wins: 233,
  losses: 109,
  avgStageGuess: 2.8,
  accuracy: 74,
  winStreak: 5,
  bestStreak: 12,
}

export default function RankingPage() {
  const currentTier = rankTiers.find(t => 
    userStats.mmr >= t.minMMR && userStats.mmr <= t.maxMMR
  ) || rankTiers[0]
  
  const progressInTier = ((userStats.mmr - currentTier.minMMR) / (currentTier.maxMMR - currentTier.minMMR)) * 100
  
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navbar />
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Ranking</h1>
          <p className="text-muted-foreground">Track your competitive progress and stats</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Rank Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div className="glass-card rounded-2xl p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Rank Badge */}
                <RankBadge rank={userStats.rank} division={userStats.division} size="large" />
                
                {/* Rank Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <h2 className="text-4xl font-bold text-foreground">{userStats.rank} {userStats.division}</h2>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 text-primary text-sm">
                      <ChevronUp className="w-4 h-4" />
                      <span>+45</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center md:justify-start gap-4 text-muted-foreground mb-6">
                    <span className="text-2xl font-mono font-bold text-foreground">{userStats.mmr} MMR</span>
                    <span className="text-sm">Peak: {userStats.peakMMR}</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>{currentTier.name} ({currentTier.minMMR})</span>
                      <span>{currentTier.maxMMR}</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressInTier}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={cn(
                          "h-full rounded-full bg-gradient-to-r",
                          currentTier.color
                        )}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {Math.round(currentTier.maxMMR - userStats.mmr)} MMR to next tier
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Rank Tier Preview */}
              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="text-sm font-semibold text-muted-foreground mb-4">Rank Tiers</h3>
                <div className="flex items-center justify-between gap-2">
                  {rankTiers.map((tier, index) => (
                    <div
                      key={tier.name}
                      className={cn(
                        "flex-1 p-3 rounded-xl text-center transition-all",
                        tier.name === currentTier.name
                          ? "bg-muted ring-2 ring-primary"
                          : "bg-muted/30 opacity-60"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 mx-auto rounded-full bg-gradient-to-br mb-2",
                        tier.color
                      )} />
                      <p className="text-xs font-medium text-foreground">{tier.name}</p>
                      <p className="text-xs text-muted-foreground">{tier.minMMR}+</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <StatsCard
              icon={Trophy}
              iconColor="text-primary"
              label="Win Rate"
              value={`${userStats.winRate}%`}
              subValue={`${userStats.wins}W - ${userStats.losses}L`}
            />
            <StatsCard
              icon={Target}
              iconColor="text-secondary"
              label="Accuracy"
              value={`${userStats.accuracy}%`}
              subValue="Correct guesses"
            />
            <StatsCard
              icon={Zap}
              iconColor="text-yellow-400"
              label="Avg Stage"
              value={userStats.avgStageGuess.toFixed(1)}
              subValue="Earlier = Better"
            />
            <StatsCard
              icon={TrendingUp}
              iconColor="text-cyan-400"
              label="Win Streak"
              value={userStats.winStreak.toString()}
              subValue={`Best: ${userStats.bestStreak}`}
            />
          </motion.div>
        </div>
        
        {/* Song Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <SongStats />
        </motion.div>
      </main>
    </div>
  )
}

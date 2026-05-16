"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Trophy, 
  Crown, 
  Medal, 
  Globe, 
  Calendar, 
  Users,
  ChevronUp,
  ChevronDown,
  Flame
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AnimatedBackground } from "@/components/animated-background"
import { Navbar } from "@/components/navbar"
import { cn } from "@/lib/utils"

const leaderboardData = {
  global: [
    { rank: 1, name: "MusicMaster", avatar: "", mmr: 2980, winRate: 82, streak: 15, country: "US", change: 0 },
    { rank: 2, name: "SoundHunter", avatar: "", mmr: 2890, winRate: 79, streak: 8, country: "UK", change: 1 },
    { rank: 3, name: "BeatLegend", avatar: "", mmr: 2850, winRate: 77, streak: 12, country: "CA", change: -1 },
    { rank: 4, name: "TuneWizard", avatar: "", mmr: 2780, winRate: 75, streak: 6, country: "DE", change: 2 },
    { rank: 5, name: "RhythmKing", avatar: "", mmr: 2720, winRate: 73, streak: 4, country: "JP", change: 0 },
    { rank: 6, name: "MelodyPro", avatar: "", mmr: 2680, winRate: 71, streak: 9, country: "AU", change: -2 },
    { rank: 7, name: "AudioAce", avatar: "", mmr: 2640, winRate: 70, streak: 3, country: "FR", change: 1 },
    { rank: 8, name: "SonicStar", avatar: "", mmr: 2590, winRate: 68, streak: 7, country: "BR", change: 3 },
    { rank: 9, name: "HarmonyHero", avatar: "", mmr: 2550, winRate: 67, streak: 2, country: "KR", change: -1 },
    { rank: 10, name: "BassDropper", avatar: "", mmr: 2510, winRate: 65, streak: 5, country: "MX", change: 0 },
  ],
  weekly: [
    { rank: 1, name: "WeekendWarrior", avatar: "", mmr: 450, winRate: 88, streak: 12, country: "SE", change: 0 },
    { rank: 2, name: "TuneWizard", avatar: "", mmr: 420, winRate: 85, streak: 8, country: "DE", change: 2 },
    { rank: 3, name: "MusicMaster", avatar: "", mmr: 380, winRate: 82, streak: 6, country: "US", change: -1 },
    { rank: 4, name: "SoundHunter", avatar: "", mmr: 350, winRate: 79, streak: 4, country: "UK", change: 1 },
    { rank: 5, name: "RhythmRider", avatar: "", mmr: 320, winRate: 76, streak: 5, country: "NL", change: -2 },
  ],
  friends: [
    { rank: 1, name: "You", avatar: "", mmr: 2450, winRate: 68, streak: 5, country: "US", change: 2, isCurrentUser: true },
    { rank: 2, name: "BestFriend123", avatar: "", mmr: 2280, winRate: 64, streak: 3, country: "US", change: 0 },
    { rank: 3, name: "CoolDude99", avatar: "", mmr: 2150, winRate: 61, streak: 1, country: "CA", change: -1 },
    { rank: 4, name: "MusicLover", avatar: "", mmr: 1980, winRate: 58, streak: 0, country: "UK", change: 1 },
  ],
}

const rankColors: Record<string, string> = {
  Diamond: "text-purple-400",
  Platinum: "text-cyan-400",
  Gold: "text-yellow-400",
  Silver: "text-gray-400",
  Bronze: "text-orange-400",
}

function getRankFromMMR(mmr: number): string {
  if (mmr >= 2500) return "Diamond"
  if (mmr >= 2000) return "Platinum"
  if (mmr >= 1500) return "Gold"
  if (mmr >= 1000) return "Silver"
  return "Bronze"
}

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("global")
  
  const getIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-300" />
    if (rank === 3) return <Medal className="w-5 h-5 text-orange-400" />
    return <span className="text-sm font-bold text-muted-foreground w-5 text-center">{rank}</span>
  }
  
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navbar />
      
      <main className="relative z-10 max-w-5xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-primary" />
            Leaderboards
          </h1>
          <p className="text-muted-foreground">Compete for the top spots and earn exclusive rewards</p>
        </motion.div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="glass-card p-1 h-auto">
            <TabsTrigger 
              value="global" 
              className="flex items-center gap-2 px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Globe className="w-4 h-4" />
              Global
            </TabsTrigger>
            <TabsTrigger 
              value="weekly"
              className="flex items-center gap-2 px-6 py-3 data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
            >
              <Calendar className="w-4 h-4" />
              Weekly
            </TabsTrigger>
            <TabsTrigger 
              value="friends"
              className="flex items-center gap-2 px-6 py-3 data-[state=active]:bg-cyan-500 data-[state=active]:text-white"
            >
              <Users className="w-4 h-4" />
              Friends
            </TabsTrigger>
          </TabsList>
          
          {Object.entries(leaderboardData).map(([key, data]) => (
            <TabsContent key={key} value={key}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-2xl overflow-hidden"
              >
                {/* Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border text-sm font-medium text-muted-foreground">
                  <div className="col-span-1">Rank</div>
                  <div className="col-span-5">Player</div>
                  <div className="col-span-2 text-center">{key === "weekly" ? "Points" : "MMR"}</div>
                  <div className="col-span-2 text-center">Win Rate</div>
                  <div className="col-span-2 text-center">Streak</div>
                </div>
                
                {/* Rows */}
                <div className="divide-y divide-border">
                  {data.map((player, index) => (
                    <motion.div
                      key={player.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        "grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-muted/30 transition-colors",
                        player.isCurrentUser && "bg-primary/10 hover:bg-primary/15"
                      )}
                    >
                      {/* Rank */}
                      <div className="col-span-1 flex items-center gap-2">
                        {getIcon(player.rank)}
                        {player.change !== 0 && (
                          <span className={cn(
                            "flex items-center text-xs",
                            player.change > 0 ? "text-primary" : "text-destructive"
                          )}>
                            {player.change > 0 ? (
                              <ChevronUp className="w-3 h-3" />
                            ) : (
                              <ChevronDown className="w-3 h-3" />
                            )}
                          </span>
                        )}
                      </div>
                      
                      {/* Player */}
                      <div className="col-span-5 flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={player.avatar} />
                          <AvatarFallback className="bg-secondary/20 text-secondary">
                            {player.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground flex items-center gap-2">
                            {player.name}
                            {player.isCurrentUser && (
                              <span className="text-xs text-muted-foreground">(You)</span>
                            )}
                          </p>
                          <p className={cn(
                            "text-xs",
                            rankColors[getRankFromMMR(key === "weekly" ? player.mmr * 6 : player.mmr)]
                          )}>
                            {getRankFromMMR(key === "weekly" ? player.mmr * 6 : player.mmr)} • {player.country}
                          </p>
                        </div>
                      </div>
                      
                      {/* MMR/Points */}
                      <div className="col-span-2 text-center">
                        <span className="text-lg font-bold text-foreground">{player.mmr.toLocaleString()}</span>
                      </div>
                      
                      {/* Win Rate */}
                      <div className="col-span-2 text-center">
                        <span className="text-foreground">{player.winRate}%</span>
                      </div>
                      
                      {/* Streak */}
                      <div className="col-span-2 text-center flex items-center justify-center gap-1">
                        {player.streak > 0 && <Flame className="w-4 h-4 text-orange-400" />}
                        <span className={cn(
                          "font-medium",
                          player.streak >= 5 ? "text-orange-400" : "text-foreground"
                        )}>
                          {player.streak}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  )
}

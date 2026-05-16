"use client"

import { motion } from "framer-motion"
import { Crown, Medal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const topPlayers = [
  { id: 1, name: "MusicMaster", avatar: "", rank: "Diamond", mmr: 2850, winRate: "78%", country: "US" },
  { id: 2, name: "SoundHunter", avatar: "", rank: "Diamond", mmr: 2780, winRate: "75%", country: "UK" },
  { id: 3, name: "BeatDropper", avatar: "", rank: "Platinum", mmr: 2650, winRate: "72%", country: "CA" },
  { id: 4, name: "TuneWizard", avatar: "", rank: "Platinum", mmr: 2580, winRate: "69%", country: "DE" },
  { id: 5, name: "RhythmKing", avatar: "", rank: "Platinum", mmr: 2520, winRate: "67%", country: "JP" },
]

const rankColors: Record<string, string> = {
  Diamond: "text-cyan-400",
  Platinum: "text-gray-300",
  Gold: "text-yellow-400",
  Silver: "text-gray-400",
  Bronze: "text-orange-400",
}

const positionIcons = [
  <Crown key="1" className="w-4 h-4 text-yellow-400" />,
  <Medal key="2" className="w-4 h-4 text-gray-300" />,
  <Medal key="3" className="w-4 h-4 text-orange-400" />,
]

export function TopPlayers() {
  return (
    <div className="glass-card rounded-2xl p-6 h-full">
      <div className="flex items-center gap-2 mb-6">
        <Crown className="w-5 h-5 text-secondary" />
        <h2 className="text-lg font-semibold text-foreground">Top Players</h2>
      </div>
      
      <div className="space-y-3">
        {topPlayers.map((player, index) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
          >
            <div className="w-8 h-8 flex items-center justify-center">
              {index < 3 ? (
                positionIcons[index]
              ) : (
                <span className="text-sm font-bold text-muted-foreground">{index + 1}</span>
              )}
            </div>
            
            <Avatar className="w-10 h-10">
              <AvatarImage src={player.avatar} />
              <AvatarFallback className="bg-secondary/20 text-secondary text-sm">
                {player.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground truncate">{player.name}</p>
                <span className="text-xs">{player.country}</span>
              </div>
              <p className={`text-xs ${rankColors[player.rank]}`}>{player.rank}</p>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-bold text-foreground">{player.mmr}</p>
              <p className="text-xs text-muted-foreground">{player.winRate} WR</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import { TrendingUp, Play } from "lucide-react"

const trendingSongs = [
  { id: 1, title: "Blinding Lights", artist: "The Weeknd", plays: "12.4K", trend: "+24%" },
  { id: 2, title: "Anti-Hero", artist: "Taylor Swift", plays: "11.2K", trend: "+18%" },
  { id: 3, title: "As It Was", artist: "Harry Styles", plays: "9.8K", trend: "+15%" },
  { id: 4, title: "Heat Waves", artist: "Glass Animals", plays: "8.5K", trend: "+12%" },
  { id: 5, title: "Bad Habit", artist: "Steve Lacy", plays: "7.3K", trend: "+9%" },
]

export function TrendingSongs() {
  return (
    <div className="glass-card rounded-2xl p-6 h-full">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Trending Songs</h2>
      </div>
      
      <div className="space-y-3">
        {trendingSongs.map((song, index) => (
          <motion.div
            key={song.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors">
              {index + 1}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{song.title}</p>
              <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
            </div>
            
            <div className="text-right">
              <p className="text-xs text-muted-foreground">{song.plays}</p>
              <p className="text-xs text-primary">{song.trend}</p>
            </div>
            
            <button className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Play className="w-3 h-3 text-primary-foreground ml-0.5" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

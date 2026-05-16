"use client"

import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Check, X, Unlock, Eye, Trophy, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeedItem {
  id: number
  type: "guess" | "join" | "stage" | "correct"
  user?: string
  message: string
  stage?: number
  isCorrect?: boolean
  time: string
  hintsUsed?: number
}

interface LiveFeedProps {
  items?: FeedItem[]
}

const defaultFeedItems: FeedItem[] = [
  { id: 1, type: "correct", user: "SoundHunter", message: "Guessed correctly!", isCorrect: true, time: "12s ago", hintsUsed: 2, stage: 2 },
  { id: 2, type: "stage", user: "BeatDropper", message: "revealed Piano", stage: 3, time: "15s ago" },
  { id: 3, type: "guess", user: "MusicMaster", message: "Wrong guess", isCorrect: false, time: "20s ago" },
  { id: 4, type: "stage", user: "You", message: "revealed Bass", stage: 2, time: "25s ago" },
  { id: 5, type: "join", user: "TuneWizard", message: "joined the game", time: "30s ago" },
]

const stageNames = ["", "Drums", "Bass", "Piano", "Synth", "Melody", "Full Reveal"]

export function LiveFeed({ items = defaultFeedItems }: LiveFeedProps) {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-secondary" />
        Live Feed
      </h3>
      
      <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-2 text-sm"
            >
              {/* Icon based on event type */}
              {item.type === "correct" && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 neon-green-glow"
                >
                  <Trophy className="w-3 h-3 text-primary" />
                </motion.div>
              )}
              {item.type === "guess" && (
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                  item.isCorrect ? "bg-primary/20" : "bg-destructive/20"
                )}>
                  {item.isCorrect ? (
                    <Check className="w-3 h-3 text-primary" />
                  ) : (
                    <X className="w-3 h-3 text-destructive" />
                  )}
                </div>
              )}
              {item.type === "stage" && (
                <motion.div 
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0"
                >
                  <Unlock className="w-3 h-3 text-secondary" />
                </motion.div>
              )}
              {item.type === "join" && (
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-muted-foreground">+</span>
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                {item.type === "correct" ? (
                  <div>
                    <p className="text-foreground">
                      <span className="font-semibold text-primary">{item.user}</span>
                      {" "}<span className="text-primary">guessed correctly!</span>
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        Stage {item.stage} ({stageNames[item.stage || 1]})
                      </span>
                      <span className="text-xs text-secondary flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        {item.hintsUsed} hints
                      </span>
                    </div>
                  </div>
                ) : item.type === "stage" ? (
                  <div>
                    <p className="text-foreground">
                      <span className={cn(
                        "font-medium",
                        item.user === "You" ? "text-secondary" : "text-muted-foreground"
                      )}>
                        {item.user}
                      </span>
                      {" "}<span className="text-secondary">{item.message}</span>
                    </p>
                    <span className="text-xs text-muted-foreground">
                      Now at Stage {item.stage}
                    </span>
                  </div>
                ) : item.user ? (
                  <p className="text-foreground">
                    <span className="font-medium text-muted-foreground">{item.user}</span>
                    {" "}{item.message}
                  </p>
                ) : (
                  <p className="text-muted-foreground">{item.message}</p>
                )}
                <span className="text-xs text-muted-foreground/70">{item.time}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Stage Legend */}
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground mb-2">Player Stages:</p>
        <div className="flex flex-wrap gap-2">
          {[
            { name: "SoundHunter", stage: 2, status: "correct" },
            { name: "BeatDropper", stage: 3, status: "playing" },
            { name: "MusicMaster", stage: 1, status: "playing" },
            { name: "You", stage: 2, status: "playing" },
          ].map((player) => (
            <div
              key={player.name}
              className={cn(
                "flex items-center gap-1.5 px-2 py-1 rounded-full text-xs",
                player.status === "correct" 
                  ? "bg-primary/20 text-primary" 
                  : player.name === "You"
                  ? "bg-secondary/20 text-secondary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              <span className="font-medium">{player.name}</span>
              {player.status === "correct" ? (
                <Check className="w-3 h-3" />
              ) : (
                <span className="text-[10px] opacity-70">S{player.stage}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

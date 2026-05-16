"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, Trophy, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function DailyChallenge() {
  return (
    <div className="glass-card rounded-2xl p-6 h-full relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full" />
      
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Daily Challenge</h2>
        </div>
        
        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary mb-3">
            <Trophy className="w-3 h-3" />
            2X XP Bonus
          </span>
          
          <h3 className="text-2xl font-bold text-foreground mb-2">
            90s Hip-Hop Edition
          </h3>
          <p className="text-sm text-muted-foreground">
            Guess 5 classic hip-hop tracks from the golden era. 
            Complete for exclusive rewards!
          </p>
        </div>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>12h 34m left</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="text-sm text-muted-foreground">
            <span className="text-primary font-semibold">1,234</span> completed
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Your Progress</span>
              <span className="text-foreground font-medium">3/5</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "60%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-primary rounded-full"
              />
            </div>
          </div>
        </div>
        
        <Link href="/play?mode=daily">
          <Button className="w-full bg-primary hover:bg-primary/90 neon-green-glow group">
            Continue Challenge
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

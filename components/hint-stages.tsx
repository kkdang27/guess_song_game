"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Lock, ChevronRight, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HintStagesProps {
  currentStage: number
  onRevealNext: () => void
  isRevealing?: boolean
}

const stages = [
  { id: 1, name: "Drums", description: "Rhythm foundation" },
  { id: 2, name: "Bass", description: "Low-end groove" },
  { id: 3, name: "Piano", description: "Harmonic layer" },
  { id: 4, name: "Synth", description: "Electronic textures" },
  { id: 5, name: "Melody", description: "Main theme" },
  { id: 6, name: "Full", description: "Complete song" },
]

export function HintStages({ currentStage, onRevealNext, isRevealing }: HintStagesProps) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [justUnlocked, setJustUnlocked] = useState<number | null>(null)
  
  const nextStage = stages[currentStage]
  const canRevealMore = currentStage < 6
  
  const handleRevealClick = () => {
    setShowConfirmation(true)
  }
  
  const handleConfirmReveal = () => {
    setShowConfirmation(false)
    setJustUnlocked(currentStage + 1)
    onRevealNext()
    setTimeout(() => setJustUnlocked(null), 1500)
  }
  
  const handleCancelReveal = () => {
    setShowConfirmation(false)
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-medium text-muted-foreground">Hint Progression</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Score bonus</span>
          <span className="text-sm font-bold text-primary">{Math.max(7 - currentStage, 1)}x</span>
        </div>
      </div>
      
      {/* Stage Timeline */}
      <div className="relative mb-6">
        {/* Progress Track */}
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-border/50 rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-primary/50 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStage - 1) / (stages.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        
        {/* Stage Dots */}
        <div className="relative flex justify-between px-0">
          {stages.map((stage, index) => {
            const stageNumber = index + 1
            const isUnlocked = stageNumber <= currentStage
            const isCurrent = stageNumber === currentStage
            const isNext = stageNumber === currentStage + 1
            const wasJustUnlocked = stageNumber === justUnlocked
            
            return (
              <div key={stage.id} className="flex flex-col items-center">
                {/* Unlock Burst Animation */}
                <AnimatePresence>
                  {wasJustUnlocked && (
                    <motion.div
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 4, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="absolute w-8 h-8 rounded-full bg-primary/30 pointer-events-none"
                    />
                  )}
                </AnimatePresence>
                
                <motion.div
                  animate={
                    isCurrent 
                      ? { scale: [1, 1.1, 1] } 
                      : wasJustUnlocked
                      ? { scale: [0.8, 1.2, 1] }
                      : {}
                  }
                  transition={{ 
                    duration: isCurrent ? 2 : 0.5, 
                    repeat: isCurrent ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                  className={cn(
                    "relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                    isUnlocked
                      ? "bg-primary/20 border-primary"
                      : isNext
                      ? "bg-muted border-muted-foreground/30 border-dashed"
                      : "bg-muted/50 border-transparent",
                    isCurrent && "ring-4 ring-primary/20"
                  )}
                >
                  {isUnlocked ? (
                    stageNumber < currentStage ? (
                      <Check className="w-4 h-4 text-primary" />
                    ) : (
                      <span className="text-xs font-bold text-primary">{stageNumber}</span>
                    )
                  ) : (
                    <Lock className={cn(
                      "w-3 h-3",
                      isNext ? "text-muted-foreground" : "text-muted-foreground/30"
                    )} />
                  )}
                </motion.div>
                
                <span className={cn(
                  "text-xs mt-2 font-medium transition-colors text-center",
                  isUnlocked ? "text-foreground" : isNext ? "text-muted-foreground" : "text-muted-foreground/40"
                )}>
                  {stage.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Current Stage Info */}
      <div className="p-4 rounded-xl bg-muted/30 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">
              {stages[currentStage - 1]?.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {stages[currentStage - 1]?.description}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Stage</p>
            <p className="text-lg font-bold text-primary">{currentStage}/6</p>
          </div>
        </div>
      </div>
      
      {/* Reveal Next Hint Button */}
      {canRevealMore && (
        <Button
          onClick={handleRevealClick}
          disabled={isRevealing}
          variant="outline"
          className="w-full h-12 border-dashed border-muted-foreground/30 hover:border-secondary hover:bg-secondary/5 transition-all"
        >
          <Lock className="w-4 h-4 mr-2 text-muted-foreground" />
          <span className="text-muted-foreground">Need a hint? Reveal </span>
          <span className="text-secondary font-medium ml-1">{nextStage?.name}</span>
          <ChevronRight className="w-4 h-4 ml-2 text-muted-foreground" />
        </Button>
      )}
      
      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={handleCancelReveal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-2xl p-6 max-w-sm w-full text-center"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-secondary" />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Reveal {nextStage?.name}?
              </h3>
              
              <p className="text-sm text-muted-foreground mb-6">
                Your score bonus will drop from{" "}
                <span className="text-primary font-semibold">{Math.max(7 - currentStage, 1)}x</span>
                {" "}to{" "}
                <span className="text-secondary font-semibold">{Math.max(6 - currentStage, 1)}x</span>
              </p>
              
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  onClick={handleCancelReveal}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmReveal}
                  className="flex-1 bg-secondary hover:bg-secondary/90"
                >
                  Reveal
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Check,
  ChevronRight,
  Sparkles,
  RotateCcw,
  Target,
  Zap,
  Music,
  Disc3,
  SkipForward
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedBackground } from "@/components/animated-background"
import { Navbar } from "@/components/navbar"
import { WaveformVisualizer } from "@/components/waveform-visualizer"
import { HintStages } from "@/components/hint-stages"
import { GuessInput } from "@/components/guess-input"
import { cn } from "@/lib/utils"

interface PlayerStats {
  hintsUsed: number
  replaysPerStage: Record<number, number>
  totalGuesses: number
  correctGuessStage: number | null
}

const stageNames = ["", "Drums", "Bass", "Piano", "Synth", "Melody", "Full Reveal"]

// Mock album art - in production this would come from the song data
const mockAlbumArt = "/placeholder.svg"

export default function PlayPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentStage, setCurrentStage] = useState(1)
  const [showResult, setShowResult] = useState(false)
  const [guessResult, setGuessResult] = useState<"correct" | "wrong" | null>(null)
  const [isRevealing, setIsRevealing] = useState(false)
  
  // Statistics tracking
  const [stats, setStats] = useState<PlayerStats>({
    hintsUsed: 0,
    replaysPerStage: { 1: 0 },
    totalGuesses: 0,
    correctGuessStage: null,
  })
  
  // Track replays
  const handlePlayPause = useCallback(() => {
    if (!isPlaying) {
      setStats(prev => ({
        ...prev,
        replaysPerStage: {
          ...prev.replaysPerStage,
          [currentStage]: (prev.replaysPerStage[currentStage] || 0) + 1
        }
      }))
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying, currentStage])
  
  // Player-controlled hint reveal
  const handleRevealNext = useCallback(() => {
    if (currentStage >= 6) return
    
    setIsRevealing(true)
    
    setTimeout(() => {
      setCurrentStage(prev => {
        const newStage = Math.min(prev + 1, 6)
        return newStage
      })
      
      setStats(prev => ({
        ...prev,
        hintsUsed: prev.hintsUsed + 1,
        replaysPerStage: {
          ...prev.replaysPerStage,
          [currentStage + 1]: 0
        }
      }))
      
      setIsRevealing(false)
    }, 500)
  }, [currentStage])
  
  const handleGuess = useCallback((guess: string) => {
    const isCorrect = guess.toLowerCase().includes("blinding")
    
    setStats(prev => ({
      ...prev,
      totalGuesses: prev.totalGuesses + 1,
      correctGuessStage: isCorrect ? currentStage : prev.correctGuessStage
    }))
    
    setGuessResult(isCorrect ? "correct" : "wrong")
    
    if (isCorrect) {
      setShowResult(true)
    }
  }, [currentStage])
  
  const resetRound = useCallback(() => {
    setShowResult(false)
    setGuessResult(null)
    setCurrentStage(1)
    setIsPlaying(false)
    setStats({
      hintsUsed: 0,
      replaysPerStage: { 1: 0 },
      totalGuesses: 0,
      correctGuessStage: null,
    })
  }, [])
  
  const calculatePoints = () => {
    const basePoints = 1000
    const multiplier = Math.max(7 - currentStage, 1)
    const replayPenalty = Object.values(stats.replaysPerStage).reduce((a, b) => a + b, 0) * 5
    return Math.max(basePoints * multiplier - replayPenalty, 100)
  }
  
  const totalReplays = Object.values(stats.replaysPerStage).reduce((a, b) => a + b, 0)
  
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navbar />
      
      <main className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Success Overlay */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className="text-center max-w-md mx-4 w-full"
              >
                {/* Album Art Reveal */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", delay: 0.1 }}
                  className="relative w-48 h-48 mx-auto mb-8"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 blur-2xl" />
                  <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
                    <Disc3 className="w-24 h-24 text-primary/50" />
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Check className="w-6 h-6 text-primary" />
                    <span className="text-sm font-medium text-primary uppercase tracking-wider">Correct</span>
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-1">Blinding Lights</h2>
                  <p className="text-lg text-muted-foreground mb-8">The Weeknd</p>
                </motion.div>
                
                {/* Stats Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-3 gap-3 mb-8"
                >
                  <div className="glass-card rounded-xl p-4">
                    <Target className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{currentStage}</p>
                    <p className="text-xs text-muted-foreground">{stageNames[currentStage]}</p>
                  </div>
                  
                  <div className="glass-card rounded-xl p-4">
                    <Zap className="w-5 h-5 text-secondary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-secondary">+{calculatePoints()}</p>
                    <p className="text-xs text-muted-foreground">{Math.max(7 - currentStage, 1)}x bonus</p>
                  </div>
                  
                  <div className="glass-card rounded-xl p-4">
                    <RotateCcw className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{stats.hintsUsed}</p>
                    <p className="text-xs text-muted-foreground">hints used</p>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-3"
                >
                  <Button
                    variant="outline"
                    onClick={resetRound}
                    className="flex-1"
                  >
                    Play Again
                  </Button>
                  <Button
                    onClick={resetRound}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    Next Song
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl font-bold text-foreground mb-2">Guess the Song</h1>
          <p className="text-muted-foreground">Listen carefully and take your time</p>
        </motion.div>
        
        {/* Main Player Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-8 mb-6"
        >
          {/* Album Art / Visualization Area */}
          <div className="flex flex-col items-center mb-8">
            <motion.div
              animate={{ 
                rotate: isPlaying ? 360 : 0,
                scale: isPlaying ? 1.02 : 1
              }}
              transition={{ 
                rotate: { duration: 8, repeat: isPlaying ? Infinity : 0, ease: "linear" },
                scale: { duration: 0.3 }
              }}
              className="relative w-56 h-56 mb-6"
            >
              {/* Glow effect */}
              <div className={cn(
                "absolute inset-0 rounded-full blur-2xl transition-opacity duration-500",
                isPlaying 
                  ? "bg-gradient-to-br from-primary/40 to-secondary/40 opacity-100" 
                  : "bg-gradient-to-br from-primary/20 to-secondary/20 opacity-50"
              )} />
              
              {/* Vinyl record design */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-zinc-900 to-zinc-800 flex items-center justify-center overflow-hidden border border-white/5">
                {/* Grooves */}
                <div className="absolute inset-4 rounded-full border border-white/5" />
                <div className="absolute inset-8 rounded-full border border-white/5" />
                <div className="absolute inset-12 rounded-full border border-white/5" />
                <div className="absolute inset-16 rounded-full border border-white/5" />
                
                {/* Center label */}
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                  <Music className="w-8 h-8 text-primary" />
                </div>
              </div>
            </motion.div>
            
            {/* Current Stage Label */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Now Playing</p>
              <p className="text-xl font-semibold text-foreground">{stageNames[currentStage]}</p>
            </div>
          </div>
          
          {/* Waveform */}
          <div className="mb-8">
            <WaveformVisualizer isPlaying={isPlaying} />
          </div>
          
          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              className="w-12 h-12 rounded-full"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </Button>
            
            <Button
              size="lg"
              onClick={handlePlayPause}
              className={cn(
                "w-20 h-20 rounded-full transition-all duration-300",
                isPlaying 
                  ? "bg-secondary hover:bg-secondary/90" 
                  : "bg-primary hover:bg-primary/90"
              )}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </Button>
            
            <div className="w-12 h-12 flex items-center justify-center">
              <div className="text-center">
                <span className="text-lg font-bold text-foreground">{totalReplays}</span>
                <p className="text-xs text-muted-foreground">plays</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Hint Progression */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <HintStages 
            currentStage={currentStage} 
            onRevealNext={handleRevealNext}
            isRevealing={isRevealing}
          />
        </motion.div>
        
        {/* Guess Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <GuessInput onSubmit={handleGuess} result={guessResult} />
        </motion.div>
        
        {/* Personal Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Your Statistics</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">24</p>
              <p className="text-xs text-muted-foreground">Songs Solved</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">2.3</p>
              <p className="text-xs text-muted-foreground">Avg. Stage</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">78%</p>
              <p className="text-xs text-muted-foreground">Accuracy</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-xs text-muted-foreground">Best Streak</p>
            </div>
          </div>
        </motion.div>
        
        {/* Skip Song Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center"
        >
          <Button
            variant="ghost"
            onClick={resetRound}
            className="text-muted-foreground hover:text-foreground"
          >
            <SkipForward className="w-4 h-4 mr-2" />
            Skip this song
          </Button>
        </motion.div>
      </main>
    </div>
  )
}

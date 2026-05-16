"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Send, Check, X, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GuessInputProps {
  onSubmit: (guess: string) => void
  result: "correct" | "wrong" | null
}

const suggestions = [
  "Blinding Lights - The Weeknd",
  "Bad Guy - Billie Eilish",
  "Shape of You - Ed Sheeran",
  "Dance Monkey - Tones and I",
  "Someone You Loved - Lewis Capaldi",
]

export function GuessInput({ onSubmit, result }: GuessInputProps) {
  const [guess, setGuess] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  
  const filteredSuggestions = suggestions.filter(s => 
    s.toLowerCase().includes(guess.toLowerCase())
  )
  
  useEffect(() => {
    if (result === "wrong") {
      setIsShaking(true)
      setTimeout(() => {
        setIsShaking(false)
        setGuess("")
      }, 500)
    }
  }, [result])
  
  const handleSubmit = () => {
    if (!guess.trim()) return
    onSubmit(guess)
  }
  
  const selectSuggestion = (suggestion: string) => {
    setGuess(suggestion)
    setShowSuggestions(false)
  }
  
  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-primary" />
        Make Your Guess
      </h3>
      
      <div className="relative">
        <motion.div
          animate={isShaking ? { x: [0, -10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className={cn(
            "relative rounded-xl transition-all duration-300",
            result === "correct" && "ring-2 ring-primary neon-green-glow",
            result === "wrong" && "ring-2 ring-destructive"
          )}
        >
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-muted-foreground" />
            <Input
              value={guess}
              onChange={(e) => {
                setGuess(e.target.value)
                setShowSuggestions(e.target.value.length > 0)
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              onFocus={() => guess.length > 0 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Type song name or artist..."
              className={cn(
                "w-full pl-12 pr-14 py-6 text-lg bg-muted/50 border-border rounded-xl",
                "focus:ring-2 focus:ring-primary focus:border-primary",
                "placeholder:text-muted-foreground/60"
              )}
              disabled={result === "correct"}
            />
            <Button
              onClick={handleSubmit}
              disabled={!guess.trim() || result === "correct"}
              size="icon"
              className="absolute right-2 bg-primary hover:bg-primary/90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Floating Glow Effect */}
          <div className={cn(
            "absolute -inset-1 rounded-xl opacity-0 blur-xl transition-opacity duration-300 -z-10",
            guess.length > 0 && "opacity-30 bg-primary"
          )} />
        </motion.div>
        
        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {showSuggestions && filteredSuggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 glass-card rounded-xl border border-border overflow-hidden z-10"
            >
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={suggestion}
                  onClick={() => selectSuggestion(suggestion)}
                  className="w-full px-4 py-3 text-left text-sm hover:bg-muted/50 transition-colors flex items-center gap-3"
                >
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">{suggestion}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Result Feedback */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={cn(
              "mt-4 p-3 rounded-lg flex items-center gap-2",
              result === "correct" ? "bg-primary/20 text-primary" : "bg-destructive/20 text-destructive"
            )}
          >
            {result === "correct" ? (
              <>
                <Check className="w-5 h-5" />
                <span className="font-medium">Correct! Great job!</span>
              </>
            ) : (
              <>
                <X className="w-5 h-5" />
                <span className="font-medium">Not quite, try again!</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Copy, 
  Users, 
  Crown, 
  Check, 
  X, 
  MessageSquare, 
  Send, 
  Settings, 
  Play,
  Plus,
  LogOut,
  Mic,
  MicOff,
  Volume2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AnimatedBackground } from "@/components/animated-background"
import { Navbar } from "@/components/navbar"
import { cn } from "@/lib/utils"

const players = [
  { id: 1, name: "MusicMaster", avatar: "", isHost: true, isReady: true, rank: "Diamond" },
  { id: 2, name: "SoundHunter", avatar: "", isHost: false, isReady: true, rank: "Platinum" },
  { id: 3, name: "BeatDropper", avatar: "", isHost: false, isReady: false, rank: "Gold" },
  { id: 4, name: "You", avatar: "", isHost: false, isReady: false, rank: "Platinum", isCurrentUser: true },
]

const chatMessages = [
  { id: 1, user: "MusicMaster", message: "Ready to crush some tunes?", time: "12:34" },
  { id: 2, user: "SoundHunter", message: "Let's gooo!", time: "12:35" },
  { id: 3, user: "System", message: "BeatDropper joined the room", isSystem: true, time: "12:36" },
  { id: 4, user: "BeatDropper", message: "Hey everyone!", time: "12:36" },
]

const rankColors: Record<string, string> = {
  Diamond: "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
  Platinum: "text-gray-300 border-gray-300/30 bg-gray-300/10",
  Gold: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  Silver: "text-gray-400 border-gray-400/30 bg-gray-400/10",
  Bronze: "text-orange-400 border-orange-400/30 bg-orange-400/10",
}

export default function LobbyPage() {
  const [copied, setCopied] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [chatInput, setChatInput] = useState("")
  const [messages, setMessages] = useState(chatMessages)
  const [countdown, setCountdown] = useState<number | null>(null)
  
  const roomCode = "BEAT-2847"
  
  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  const sendMessage = () => {
    if (!chatInput.trim()) return
    setMessages([...messages, {
      id: messages.length + 1,
      user: "You",
      message: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }])
    setChatInput("")
  }
  
  const startGame = () => {
    setCountdown(5)
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(interval)
          window.location.href = "/play"
          return null
        }
        return prev ? prev - 1 : null
      })
    }, 1000)
  }
  
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navbar />
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Countdown Overlay */}
        <AnimatePresence>
          {countdown !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            >
              <motion.div
                key={countdown}
                initial={{ scale: 2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="text-9xl font-bold text-primary neon-text-green"
              >
                {countdown}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Multiplayer Lobby</h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 glass rounded-lg">
                <span className="text-muted-foreground text-sm">Room Code:</span>
                <span className="font-mono font-bold text-primary">{roomCode}</span>
                <button
                  onClick={copyRoomCode}
                  className="ml-2 p-1.5 hover:bg-muted rounded transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-primary" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 glass rounded-lg">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{players.length}/8</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-border">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive/10">
              <LogOut className="w-4 h-4 mr-2" />
              Leave
            </Button>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Players Grid */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Players
                </h2>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Plus className="w-4 h-4 mr-2" />
                  Invite Friends
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {players.map((player, index) => (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "relative p-4 rounded-xl border transition-all duration-300",
                      player.isReady 
                        ? "border-primary/50 bg-primary/5" 
                        : "border-border bg-muted/30",
                      player.isCurrentUser && "ring-2 ring-secondary/50"
                    )}
                  >
                    {/* Host Badge */}
                    {player.isHost && (
                      <div className="absolute -top-2 -right-2">
                        <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center border border-yellow-500/30">
                          <Crown className="w-4 h-4 text-yellow-500" />
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={player.avatar} />
                          <AvatarFallback className="bg-secondary/20 text-secondary">
                            {player.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {/* Ready Indicator */}
                        <div className={cn(
                          "absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-card",
                          player.isReady ? "bg-primary" : "bg-muted"
                        )}>
                          {player.isReady ? (
                            <Check className="w-3 h-3 text-primary-foreground" />
                          ) : (
                            <X className="w-3 h-3 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground truncate">
                            {player.name}
                            {player.isCurrentUser && <span className="text-muted-foreground"> (You)</span>}
                          </p>
                        </div>
                        <span className={cn(
                          "inline-flex px-2 py-0.5 text-xs font-medium rounded-full border mt-1",
                          rankColors[player.rank]
                        )}>
                          {player.rank}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Volume2 className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Empty Slots */}
                {Array.from({ length: 8 - players.length }).map((_, index) => (
                  <motion.div
                    key={`empty-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: (players.length + index) * 0.1 }}
                    className="p-4 rounded-xl border border-dashed border-border/50 bg-muted/10 flex items-center justify-center min-h-[88px]"
                  >
                    <span className="text-sm text-muted-foreground">Waiting for player...</span>
                  </motion.div>
                ))}
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
                <Button
                  onClick={() => setIsReady(!isReady)}
                  variant={isReady ? "outline" : "default"}
                  className={cn(
                    "flex-1",
                    isReady 
                      ? "border-primary text-primary hover:bg-primary/10" 
                      : "bg-primary hover:bg-primary/90 neon-green-glow"
                  )}
                >
                  {isReady ? (
                    <>
                      <X className="w-4 h-4 mr-2" />
                      Not Ready
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Ready Up
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={startGame}
                  className="flex-1 bg-secondary hover:bg-secondary/90 neon-purple-glow"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Game
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Chat Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="glass-card rounded-2xl p-6 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-secondary" />
                <h2 className="text-lg font-semibold text-foreground">Chat</h2>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-[400px] min-h-[300px]">
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      "text-sm",
                      msg.isSystem && "text-center"
                    )}
                  >
                    {msg.isSystem ? (
                      <span className="text-xs text-muted-foreground italic">
                        {msg.message}
                      </span>
                    ) : (
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "font-medium",
                            msg.user === "You" ? "text-secondary" : "text-primary"
                          )}>
                            {msg.user}
                          </span>
                          <span className="text-xs text-muted-foreground">{msg.time}</span>
                        </div>
                        <p className="text-foreground/90">{msg.message}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Type a message..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 bg-muted/50 border-border"
                />
                <Button
                  onClick={sendMessage}
                  size="icon"
                  className="bg-secondary hover:bg-secondary/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-border"
                >
                  <Mic className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

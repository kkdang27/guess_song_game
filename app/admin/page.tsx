"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence, Reorder } from "framer-motion"
import { 
  Upload, 
  Music, 
  Play, 
  Pause, 
  Trash2, 
  GripVertical,
  Plus,
  Save,
  X,
  FileAudio,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Edit2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { AnimatedBackground } from "@/components/animated-background"
import { Navbar } from "@/components/navbar"
import { cn } from "@/lib/utils"

interface Stem {
  id: string
  name: string
  file: File | null
  progress: number
  status: "idle" | "uploading" | "complete" | "error"
  duration?: number
}

const defaultStems: Stem[] = [
  { id: "1", name: "Drums", file: null, progress: 0, status: "idle" },
  { id: "2", name: "Bass", file: null, progress: 0, status: "idle" },
  { id: "3", name: "Piano", file: null, progress: 0, status: "idle" },
  { id: "4", name: "Synth", file: null, progress: 0, status: "idle" },
  { id: "5", name: "Melody", file: null, progress: 0, status: "idle" },
  { id: "6", name: "Full Track", file: null, progress: 0, status: "idle" },
]

export default function AdminPage() {
  const [stems, setStems] = useState<Stem[]>(defaultStems)
  const [songTitle, setSongTitle] = useState("")
  const [artist, setArtist] = useState("")
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  
  const handleDrop = useCallback((e: React.DragEvent, stemId: string) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("audio/")) {
      uploadFile(stemId, file)
    }
  }, [])
  
  const handleFileSelect = (stemId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      uploadFile(stemId, file)
    }
  }
  
  const uploadFile = (stemId: string, file: File) => {
    // Simulate upload progress
    setStems(prev => prev.map(s => 
      s.id === stemId ? { ...s, file, status: "uploading" as const, progress: 0 } : s
    ))
    
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 100) {
        clearInterval(interval)
        setStems(prev => prev.map(s => 
          s.id === stemId ? { ...s, progress: 100, status: "complete" as const, duration: Math.random() * 60 + 120 } : s
        ))
      } else {
        setStems(prev => prev.map(s => 
          s.id === stemId ? { ...s, progress } : s
        ))
      }
    }, 200)
  }
  
  const removeStem = (stemId: string) => {
    setStems(prev => prev.map(s => 
      s.id === stemId ? { ...s, file: null, progress: 0, status: "idle" as const } : s
    ))
  }
  
  const addNewStem = () => {
    const newStem: Stem = {
      id: Date.now().toString(),
      name: `Custom Stem ${stems.length + 1}`,
      file: null,
      progress: 0,
      status: "idle",
    }
    setStems([...stems, newStem])
  }
  
  const updateStemName = (stemId: string, name: string) => {
    setStems(prev => prev.map(s => 
      s.id === stemId ? { ...s, name } : s
    ))
    setEditingId(null)
  }
  
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  
  const completedStems = stems.filter(s => s.status === "complete").length
  const totalProgress = (completedStems / stems.length) * 100
  
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
            <Upload className="w-8 h-8 text-primary" />
            Admin Upload Dashboard
          </h1>
          <p className="text-muted-foreground">Upload and manage song stems for the game</p>
        </motion.div>
        
        {/* Song Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Song Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Song Title</label>
              <Input
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                placeholder="Enter song title..."
                className="bg-muted/50 border-border"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Artist</label>
              <Input
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Enter artist name..."
                className="bg-muted/50 border-border"
              />
            </div>
          </div>
        </motion.div>
        
        {/* Upload Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Upload Progress</h2>
            <span className="text-sm text-muted-foreground">{completedStems}/{stems.length} stems</span>
          </div>
          <Progress value={totalProgress} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">
            {totalProgress === 100 
              ? "All stems uploaded! Ready to publish." 
              : `${Math.round(totalProgress)}% complete`}
          </p>
        </motion.div>
        
        {/* Stems List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Audio Stems</h2>
            <Button onClick={addNewStem} variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
              <Plus className="w-4 h-4 mr-2" />
              Add Stem
            </Button>
          </div>
          
          <Reorder.Group axis="y" values={stems} onReorder={setStems} className="space-y-4">
            <AnimatePresence>
              {stems.map((stem, index) => (
                <Reorder.Item
                  key={stem.id}
                  value={stem}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div
                    className={cn(
                      "relative rounded-xl border p-4 transition-all",
                      stem.status === "complete" 
                        ? "border-primary/30 bg-primary/5"
                        : "border-border bg-muted/30",
                      isDragging && "ring-2 ring-primary/50"
                    )}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => handleDrop(e, stem.id)}
                  >
                    <div className="flex items-center gap-4">
                      {/* Drag Handle */}
                      <div className="cursor-grab active:cursor-grabbing">
                        <GripVertical className="w-5 h-5 text-muted-foreground" />
                      </div>
                      
                      {/* Stage Number */}
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold",
                        stem.status === "complete" 
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      )}>
                        {index + 1}
                      </div>
                      
                      {/* Stem Info */}
                      <div className="flex-1 min-w-0">
                        {editingId === stem.id ? (
                          <Input
                            autoFocus
                            defaultValue={stem.name}
                            onBlur={(e) => updateStemName(stem.id, e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && updateStemName(stem.id, (e.target as HTMLInputElement).value)}
                            className="h-8 bg-muted/50 border-border"
                          />
                        ) : (
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-foreground">{stem.name}</p>
                            <button
                              onClick={() => setEditingId(stem.id)}
                              className="p-1 hover:bg-muted rounded"
                            >
                              <Edit2 className="w-3 h-3 text-muted-foreground" />
                            </button>
                          </div>
                        )}
                        
                        {stem.file ? (
                          <div className="flex items-center gap-2 mt-1">
                            <FileAudio className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground truncate">
                              {stem.file.name}
                            </span>
                            {stem.duration && (
                              <span className="text-xs text-muted-foreground">
                                • {formatDuration(stem.duration)}
                              </span>
                            )}
                          </div>
                        ) : (
                          <p className="text-xs text-muted-foreground mt-1">
                            Drag & drop or click to upload
                          </p>
                        )}
                      </div>
                      
                      {/* Status/Actions */}
                      <div className="flex items-center gap-2">
                        {stem.status === "uploading" && (
                          <div className="flex items-center gap-2 w-32">
                            <Progress value={stem.progress} className="h-2 flex-1" />
                            <span className="text-xs text-muted-foreground w-8">
                              {Math.round(stem.progress)}%
                            </span>
                          </div>
                        )}
                        
                        {stem.status === "complete" && (
                          <>
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => setPlayingId(playingId === stem.id ? null : stem.id)}
                            >
                              {playingId === stem.id ? (
                                <Pause className="w-4 h-4" />
                              ) : (
                                <Play className="w-4 h-4" />
                              )}
                            </Button>
                          </>
                        )}
                        
                        {stem.status === "error" && (
                          <AlertCircle className="w-5 h-5 text-destructive" />
                        )}
                        
                        {stem.file ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => removeStem(stem.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        ) : (
                          <label className="cursor-pointer">
                            <input
                              type="file"
                              accept="audio/*"
                              className="hidden"
                              onChange={(e) => handleFileSelect(stem.id, e)}
                            />
                            <Button variant="outline" size="sm" className="pointer-events-none border-border">
                              <Upload className="w-4 h-4 mr-2" />
                              Upload
                            </Button>
                          </label>
                        )}
                      </div>
                    </div>
                    
                    {/* Waveform Preview (placeholder) */}
                    {stem.status === "complete" && (
                      <div className="mt-4 h-12 rounded-lg bg-muted/50 flex items-center justify-center overflow-hidden">
                        <div className="flex items-end gap-[2px] h-full py-2">
                          {Array.from({ length: 80 }).map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-1 bg-gradient-to-t from-primary to-secondary rounded-full"
                              animate={{
                                height: playingId === stem.id 
                                  ? [
                                      `${20 + Math.random() * 60}%`,
                                      `${20 + Math.random() * 60}%`,
                                    ]
                                  : `${20 + (Math.sin(i * 0.3) + 1) * 30}%`
                              }}
                              transition={{
                                duration: 0.2,
                                repeat: playingId === stem.id ? Infinity : 0,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>
          
          {/* Actions */}
          <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-border">
            <Button variant="outline" className="border-border">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button 
              className="bg-primary hover:bg-primary/90 neon-green-glow"
              disabled={completedStems < stems.length || !songTitle || !artist}
            >
              <Save className="w-4 h-4 mr-2" />
              Publish Song
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

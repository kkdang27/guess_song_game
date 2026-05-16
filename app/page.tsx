"use client"

import { motion } from "framer-motion"
import { Play, Trophy, Music, Headphones, ChevronRight, Disc3, Star } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AnimatedBackground } from "@/components/animated-background"
import { TrendingSongs } from "@/components/trending-songs"
import { TopPlayers } from "@/components/top-players"
import { DailyChallenge } from "@/components/daily-challenge"
import { Navbar } from "@/components/navbar"

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden">
      <AnimatedBackground />
      <Navbar />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full glass text-primary">
                <Headphones className="w-4 h-4" />
                Test Your Music Knowledge
              </span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="text-foreground">Can You </span>
              <span className="text-primary">Name</span>
              <br />
              <span className="text-foreground">That </span>
              <span className="text-secondary">Song</span>
              <span className="text-foreground">?</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
              Listen to progressive audio hints and discover how quickly you can identify the track. 
              From drums to melody — how many clues will you need?
            </p>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/play">
                <Button size="lg" className="text-lg px-10 py-7 bg-primary hover:bg-primary/90 rounded-full">
                  <Play className="w-6 h-6 mr-3" />
                  Start Playing
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 mt-20 max-w-4xl"
          >
            {[
              { icon: Disc3, label: "Listen", description: "Start with just the drums" },
              { icon: Music, label: "Guess", description: "Type your answer anytime" },
              { icon: Star, label: "Score", description: "Fewer hints = more points" },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex flex-col items-center gap-3 px-6 py-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-muted/50 flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">{step.label}</p>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
        
        {/* Content Grid */}
        <section className="px-4 py-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Daily Challenge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <DailyChallenge />
            </motion.div>
            
            {/* Trending Songs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <TrendingSongs />
            </motion.div>
            
            {/* Top Players */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <TopPlayers />
            </motion.div>
          </div>
        </section>
        
        {/* Quick Actions */}
        <section className="px-4 py-16 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <Link href="/play" className="group">
              <div className="glass-card rounded-2xl p-6 hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Play className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">Quick Play</h3>
                      <p className="text-muted-foreground">Jump into a random song</p>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            </Link>
            
            <Link href="/leaderboard" className="group">
              <div className="glass-card rounded-2xl p-6 hover:border-secondary/50 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center">
                      <Trophy className="w-7 h-7 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">Leaderboard</h3>
                      <p className="text-muted-foreground">See top players globally</p>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-secondary transition-colors" />
                </div>
              </div>
            </Link>
          </motion.div>
        </section>
        
        {/* Stats Banner */}
        <section className="px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto glass-card rounded-2xl p-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl font-bold text-foreground">50K+</p>
                <p className="text-sm text-muted-foreground">Songs Available</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">6</p>
                <p className="text-sm text-muted-foreground">Hint Stages</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-secondary">100+</p>
                <p className="text-sm text-muted-foreground">Genres</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">Free</p>
                <p className="text-sm text-muted-foreground">To Play</p>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  )
}

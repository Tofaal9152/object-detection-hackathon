"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Shield, Camera, Maximize2, Minimize2, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import TimeLine from "./TimeLine"

const VideoSection = () => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const refreshStream = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1500)
  }

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })

  return (
    <section className="max-w-7xl mx-auto relative">
      <div className="relative">
        {/* Video container with futuristic styling */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`relative rounded-3xl overflow-hidden border border-neutral-800 shadow-[0_0_20px_rgba(0,149,255,0.15)] ${
            isFullscreen ? "fixed inset-0 z-50 m-4" : "aspect-video w-full"
          }`}
        >
          {/* Overlay grid pattern */}
          <div className="absolute inset-0 z-10 pointer-events-none opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          </div>

          {/* Video feed */}
          <div className="relative w-full h-full bg-black">
            <motion.div animate={{ opacity: isRefreshing ? 0.5 : 1 }} transition={{ duration: 0.3 }}>
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}stream/realtime-data/?action=stream`}
                alt="Video Stream"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Scanning line effect */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: "100%" }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
                ease: "linear",
              }}
              className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent z-20 pointer-events-none"
            />

            {/* Camera info overlay */}
            <div className="absolute top-0 left-0 right-0 flex justify-between items-start p-4 z-30">
              <div className="flex items-center space-x-2 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-neutral-800">
                <Camera className="h-4 w-4 text-cyan-400" />
                <span className="text-xs font-mono text-white">MAIN_FEED::01</span>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-black/70 backdrop-blur-sm border-neutral-800 hover:bg-black/90 hover:border-cyan-900"
                  onClick={refreshStream}
                >
                  <RefreshCw className={`h-4 w-4 text-cyan-400 ${isRefreshing ? "animate-spin" : ""}`} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-black/70 backdrop-blur-sm border-neutral-800 hover:bg-black/90 hover:border-cyan-900"
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-4 w-4 text-cyan-400" />
                  ) : (
                    <Maximize2 className="h-4 w-4 text-cyan-400" />
                  )}
                </Button>
              </div>
            </div>

            {/* Bottom info bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm border-t border-neutral-800 flex justify-between items-center px-4 py-2 z-30">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-mono text-white">LIVE</span>
                </div>
                <div className="text-xs font-mono text-neutral-400">{formattedDate}</div>
              </div>

              <div className="text-sm font-mono text-cyan-400">{formattedTime}</div>

              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span className="text-xs font-mono text-white">SECURE</span>
              </div>
            </div>

            {/* Scanning effect */}
            <div className="absolute inset-0 pointer-events-none z-20">
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-30"></div>
              <div className="absolute inset-0 border border-cyan-500/10 rounded-3xl"></div>
            </div>
          </div>
        </motion.div>

        {/* Recording indicator */}
        <div className="absolute top-3 right-4 z-40 flex items-center space-x-2 p-2 bg-black/80 backdrop-blur-sm rounded-lg border border-red-900/50 shadow-[0_0_10px_rgba(239,68,68,0.3)]">
          <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs text-white font-mono tracking-wider">REC</span>
        </div>
      </div>

      {/* Timeline */}
      <TimeLine />
    </section>
  )
}

export default VideoSection

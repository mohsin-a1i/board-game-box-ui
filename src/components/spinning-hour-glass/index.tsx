'use client'

import { type SpringOptions, motion, useSpring } from "motion/react"
import { useEffect } from "react"
import HourGlass from "../icons/hour-glass"
import styles from "./spinning-hour-glass.module.scss"

interface LoadingSpinnerProps {
  className?: string
}

const spring: SpringOptions = { damping: 10, stiffness: 100, mass: 1 }

export default function SpinningHourGlass({ className }: LoadingSpinnerProps) {
  const r = useSpring(0, spring)

  useEffect(() => {
    const interval = setInterval(() => {
      const rotation = r.get()
      if (rotation === 0) return r.set(180)
      if (rotation === 180) return r.set(360)
      r.jump(0)
      r.set(180)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div style={{ rotateZ: r }} className={styles.container}>
      <HourGlass className={className} />
    </motion.div>
  )
}
'use client'

import cn from "@/utilities/cn"
import { type SpringOptions, motion, useSpring } from "motion/react"
import { type Ref, useEffect } from "react"
import styles from "./flippable-card.module.scss"

const spring: SpringOptions = { damping: 10, stiffness: 100, mass: 1 }

interface FlippableCardProps {
  ref?: Ref<HTMLDivElement>
  className?: string
  flipped?: boolean
}

export default function FlippableCard({ ref, className, flipped = false, children }: React.PropsWithChildren<FlippableCardProps>) {
  const r = useSpring(flipped ? 180 : 0, spring)

  useEffect(() => r.set(flipped ? 180 : 0), [flipped])

  return (
    <motion.div
      ref={ref}
      style={{ rotateY: r }}
      className={cn(styles.card, className)}
    >
      {children}
    </motion.div>
  )
}


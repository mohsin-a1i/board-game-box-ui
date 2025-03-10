'use client'

import cn from "@/utilities/cn"
import { type MotionValue, motion } from "motion/react"
import type { RefObject } from "react"
import styles from "./card.module.scss"

export interface CardProps {
  ref?: RefObject<HTMLDivElement | null>
  className?: string
  transform?: {
    x?: MotionValue<number>
    y?: MotionValue<number>
    rotateY?: MotionValue<number>
    rotateZ?: MotionValue<number>
  }
}

export default function Card({ ref, className, transform, children }: React.PropsWithChildren<CardProps>) {
  return (
    <motion.div
      ref={ref}
      className={cn(styles.card, className)}
      style={transform}
    >
      {children}
    </motion.div>
  )
}
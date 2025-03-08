'use client'

import type { TPlayingCard } from "@/types/playing-card"
import styles from "./card-hand.module.scss"
import PlayingCard from "../playing-card"
import { motion, MotionStyle, PanInfo, SpringOptions, useMotionValue, useSpring } from "motion/react"
import { useEffect, useState } from "react"
import { useSizeObserver } from "@/hooks/on-size-observer"
import { TCoordinate, useTouch } from "../touch-context"

interface PlayableCardProps {
  card: TPlayingCard
  position: number
}

const spring: SpringOptions = { damping: 50, stiffness: 1000, mass: 1 }

export default function PlayableCard({ card, position }: PlayableCardProps) {
  const [cardWidth, setCardWidth] = useState(160)
  const cardElement = useSizeObserver<HTMLDivElement>((width) => setCardWidth(width))
  const { touched, registerTouchable, unregisterTouchable } = useTouch()

  const origin = { x: position * cardWidth / 4, y: 0 }
  const x = useSpring(0, spring)
  const y = useSpring(0, spring)

  useEffect(() => {
    const element = cardElement.current as HTMLElement
    element.id = `pc${position}`

    function detectDrag(delta: TCoordinate): TCoordinate | undefined {
      if (delta[1] < -30) return [x.get(), y.get()]
    }

    function onDrag(delta: TCoordinate) {
      x.set(delta[0])
      y.set(delta[1])
    }

    registerTouchable(element, { drag: { detectDrag, onDrag } })
    return () => unregisterTouchable(element)
  }, [position])

  useEffect(() => {
    if (touched === undefined) {
      x.set(origin.x)
      y.set(origin.y)
      return
    }

    const touchedPosition = parseInt(touched.id.split('pc')[1])
    if (position < touchedPosition) {
      x.set(origin.x - cardWidth / 2)
      y.set(origin.y)
    } else if (position > touchedPosition) {
      x.set(origin.x + cardWidth / 2)
      y.set(origin.y)
    } else {
      x.set(origin.x)
      y.set(-cardWidth / 3)
    }
  }, [touched])

  return (
    <motion.div
      ref={cardElement}
      style={{
        x: x,
        y: y,
        rotate: `${position * 3}deg`
      }}
      className={styles.card}
    >
      <PlayingCard card={card} />
    </motion.div>
  )
}
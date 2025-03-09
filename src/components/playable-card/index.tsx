'use client'

import { useSizeObserver } from "@/hooks/on-size-observer"
import { type SpringOptions, motion, useSpring } from "motion/react"
import { useEffect, useState } from "react"
import type { Coordinate } from "../touch-context"
import { useTouch } from "../touch-context"
import styles from "./playable-card.module.scss"

interface PlayableCardProps {
  position: number
}

const spring: SpringOptions = { damping: 50, stiffness: 500, mass: 1 }

export default function PlayableCard({ position, children }: React.PropsWithChildren<PlayableCardProps>) {
  const [cardWidth, setCardWidth] = useState(0)
  const cardElement = useSizeObserver<HTMLDivElement>((width) => setCardWidth(width))
  const { touched, registerTouchable, unregisterTouchable } = useTouch()
  const x = useSpring(0, spring)
  const y = useSpring(0, spring)

  useEffect(() => {
    const element = cardElement.current as HTMLElement
    element.id = `pc${position}`

    function detectDrag(delta: Coordinate): Coordinate | undefined {
      if (delta[1] < -25) return [x.get(), y.get()]
    }

    function onDrag(delta: Coordinate) {
      x.set(delta[0])
      y.set(delta[1])
    }

    registerTouchable(element, { drag: { detectDrag, onDrag } })
    return () => unregisterTouchable(element)
  }, [position])

  useEffect(() => {
    const origin = { x: position * cardWidth / 4, y: cardWidth * 0.75 }
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
      y.set(origin.y - cardWidth / 3)
    }
  }, [touched, cardWidth])

  return (
    <motion.div
      ref={cardElement}
      style={{
        x: x,
        y: y,
        rotate: position * 3
      }}
      className={styles.card}
    >
      {children}
    </motion.div>
  )
}
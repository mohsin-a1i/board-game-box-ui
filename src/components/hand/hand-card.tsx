'use client'

import { useSizeObserver } from "@/hooks/on-size-observer";
import { type SpringOptions, motion, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { type Coordinate, useTouch } from "../touch-context";
import styles from "./hand.module.scss";

interface HandCardProps {
  position?: number
}

const translateSpring: SpringOptions = { damping: 50, stiffness: 500, mass: 1 }
const rotateSpring: SpringOptions = { damping: 10, stiffness: 100, mass: 1 }

export default function HandCard({ position = 0, children }: React.PropsWithChildren<HandCardProps>) {
  const [cardWidth, setCardWidth] = useState(0)
  const ref = useSizeObserver<HTMLDivElement>((width) => setCardWidth(width))
  const { touched, registerTouchable, unregisterTouchable } = useTouch()
  const x = useSpring(0, translateSpring)
  const y = useSpring(0, translateSpring)
  const rotateZ = useSpring(0, rotateSpring)

  useEffect(() => {
    const element = ref.current as HTMLElement

    function detectDrag(delta: Coordinate): Coordinate | undefined {
      if (delta[1] < -25) return [x.get(), y.get()]
    }

    function onDrag(delta: Coordinate) {
      x.set(delta[0])
      y.set(delta[1])
    }

    registerTouchable(element, { drag: { detectDrag, onDrag } })
    return () => unregisterTouchable(element)
  }, [])

  useEffect(() => {
    const element = ref.current as HTMLElement
    element.id = `hc${position}`
    rotateZ.set(position * 3)
  }, [position])

  useEffect(() => {
    const origin = { x: position * cardWidth / 4, y: cardWidth * 0.75 }
    if (touched === undefined) {
      x.set(origin.x)
      y.set(origin.y)
      return
    }

    const touchedCardPosition = touched.id.split('hc')[1]
    if (!touchedCardPosition) return
    const focusedPosition = parseInt(touchedCardPosition)
    if (position < focusedPosition) {
      x.set(origin.x - cardWidth / 2)
      y.set(origin.y)
    } else if (position > focusedPosition) {
      x.set(origin.x + cardWidth / 2)
      y.set(origin.y)
    } else {
      x.set(origin.x)
      y.set(origin.y - cardWidth / 3)
    }
  }, [touched, cardWidth])

  return (
    <motion.div ref={ref} className={styles.card} style={{ x, y, rotateZ }}>
      {children}
    </motion.div>
  )
}
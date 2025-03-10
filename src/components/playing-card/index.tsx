'use client'

import { useSizeObserver } from "@/hooks/on-size-observer"
import type { PlayingCard, PlayingCardSuit } from "@/models/playing-card"
import cn from "@/utilities/cn"
import { type SpringOptions, useSpring } from "motion/react"
import { useEffect, useState } from "react"
import Card, { type CardProps } from "../card"
import CardBack from "../card/card-back"
import CardFront from "../card/card-front"
import { CardBackPattern, ClubIcon, DiamondIcon, HeartIcon, SpadeIcon } from "../icons"
import PlayingCardEdge from "./playing-card-edge"
import PlayingCardPattern from "./playing-card-pattern"
import styles from "./playing-card.module.scss"

type PlayingCardSize = 1 | 2 | 3

interface PlayingCardProps extends CardProps {
  card: PlayingCard
}

const spring: SpringOptions = { damping: 10, stiffness: 100, mass: 1 }

export default function PlayingCard({ className, transform, card }: PlayingCardProps) {
  const [size, setSize] = useState<PlayingCardSize>(1)
  const ref = useSizeObserver<HTMLDivElement>((width) => setSize(width > 100 ? 3 : width > 50 ? 2 : 1))
  const rotateY = useSpring(card.flipped ? 180 : 0, spring)

  const SuitIcon = getSuitIcon(card.suit)
  const suitColor = getSuitColor(card.suit)

  useEffect(() => rotateY.set(card.flipped ? 180 : 0), [card.flipped])

  return (
    <Card ref={ref} className={cn(styles.card, className)} transform={{ ...transform, rotateY }}>
      <CardFront className={cn(styles.front, styles[suitColor])}>
        <PlayingCardEdge rank={card.rank} Icon={SuitIcon} />
        {size === 1 && <SuitIcon className={styles.face} />}
        {size === 3 && <PlayingCardPattern rank={card.rank} suit={card.suit} />}
        {size > 1 && <PlayingCardEdge rank={card.rank} Icon={SuitIcon} reverse={true} />}
      </CardFront>
      <CardBack className={styles.back}>
        <CardBackPattern />
      </CardBack>
    </Card>
  )
}


function getSuitIcon(suit: PlayingCardSuit) {
  if (suit === "S") return SpadeIcon
  if (suit === "C") return ClubIcon
  if (suit === "H") return HeartIcon
  if (suit === "D") return DiamondIcon
  throw new Error(`Invalid card suit ${suit}`)
}

function getSuitColor(suit: PlayingCardSuit) {
  if (suit === "S") return "black"
  if (suit === "C") return "black"
  if (suit === "H") return "red"
  if (suit === "D") return "red"
  throw new Error(`Invalid card suit ${suit}`)
}




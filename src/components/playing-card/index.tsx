'use client'

import { useSizeObserver } from "@/hooks/on-size-observer"
import type { PlayingCard, PlayingCardSuit } from "@/models/playing-card"
import cn from "@/utilities/cn"
import { HTMLAttributes, useState } from "react"
import FlippableCard from "../flippable-card"
import FlippableCardBack from "../flippable-card/flippable-card-back"
import FlippableCardFront from "../flippable-card/flippable-card-front"
import { CardBackPattern, ClubIcon, DiamondIcon, HeartIcon, SpadeIcon } from "../icons"
import PlayingCardEdge from "./playing-card-edge"
import PlayingCardPattern from "./playing-card-pattern"
import styles from "./playing-card.module.scss"

type PlayingCardSize = 1 | 2 | 3

interface PlayingCardProps {
  style?: HTMLAttributes<HTMLDivElement>["style"]
  className?: string
  card: PlayingCard
}

export default function PlayingCard({ card }: PlayingCardProps) {
  const [size, setSize] = useState<PlayingCardSize>(1)
  const cardElement = useSizeObserver<HTMLDivElement>((width) => setSize(width > 100 ? 3 : width > 50 ? 2 : 1))
  const SuitIcon = getSuitIcon(card.suit)
  const suitColor = getSuitColor(card.suit)

  return (
    <FlippableCard ref={cardElement} className={styles.card} flipped={card.flipped}>
      <FlippableCardFront className={cn(styles.front, styles[suitColor])}>
        <PlayingCardEdge rank={card.rank} Icon={SuitIcon} />
        {size === 1 && <SuitIcon className={styles.face} />}
        {size === 3 && <PlayingCardPattern rank={card.rank} suit={card.suit} />}
        {size > 1 && <PlayingCardEdge rank={card.rank} Icon={SuitIcon} reverse={true} />}
      </FlippableCardFront>
      <FlippableCardBack className={styles.back}>
        <CardBackPattern />
      </FlippableCardBack>
    </FlippableCard>
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




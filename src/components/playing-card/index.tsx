'use client'

import { useSizeObserver } from "@/hooks/on-size-observer"
import type { TCardRank, TCardSuit, TPlayingCard } from "@/types/playing-card"
import cn from "@/utilities/cn"
import { type SpringOptions, motion, useSpring } from "motion/react"
import { HTMLAttributes, useEffect, useState } from "react"
import { ClubIcon, DiamondIcon, HeartIcon, SpadeIcon } from "../icons"
import { CardBackPattern } from "../icons/card-back-pattern"
import PlayingCardEdge from "./playing-card-edge"
import PlayingCardFace from "./playing-card-face"
import PlayingCardPattern from "./playing-card-pattern"
import styles from "./playing-card.module.scss"

interface PlayingCardProps {
  style?: HTMLAttributes<HTMLDivElement>["style"]
  className?: string
  card: TPlayingCard,
  flipped?: boolean
}

const spring: SpringOptions = { damping: 10, stiffness: 100, mass: 1 }

export default function PlayingCard({ card, flipped = false }: PlayingCardProps) {
  const [contentVisible, setContentVisible] = useState(false)
  const cardElement = useSizeObserver<HTMLDivElement>((width) => setContentVisible(width > 80))
  const isFaceCard = checkFaceCard(card.rank)
  const SuitIcon = getSuitIcon(card.suit)
  const r = useSpring(0, spring)

  useEffect(() => r.set(flipped ? 180 : 0), [flipped])

  return (
    <motion.div
      ref={cardElement}
      style={{ rotateY: r }}
      className={cn(styles.card)}
    >
      <div className={cn(styles.front, styles[card.suit])}>
        <PlayingCardEdge rank={card.rank} Icon={SuitIcon} />
        {contentVisible && (
          isFaceCard ? (
            <PlayingCardFace rank={card.rank} />
          ) : (
            <PlayingCardPattern rank={card.rank} Icon={SuitIcon} />
          )
        )}
        <PlayingCardEdge rank={card.rank} Icon={SuitIcon} />
      </div>
      <div className={styles.back}>
        <CardBackPattern className={styles.icon} />
      </div>
    </motion.div>
  )
}

function getSuitIcon(suit: TCardSuit) {
  switch (suit) {
    case "spade":
      return SpadeIcon
    case "club":
      return ClubIcon
    case "heart":
      return HeartIcon
    case "diamond":
      return DiamondIcon
    default:
      throw new Error(`Invalid card suit: ${suit}`)
  }
}


function checkFaceCard(rank: TCardRank) {
  switch (rank) {
    case "J":
    case "Q":
    case "K":
      return true
    default:
      return false
  }
}


'use client'

import type { TPlayingCard } from "@/types/playing-card"
import styles from "./card-hand.module.scss"
import PlayingCard from "../playing-card"
import { CSSProperties } from "react"
import cn from "@/utilities/cn"

interface CardHandProps {
  cards: TPlayingCard[]
}

export default function CardHand({ cards }: CardHandProps) {
  return (
    <>
      {cards.map((card, index) =>
        <PlayingCard
          key={card.id}
          style={{ "--i": index - Math.ceil(cards.length / 2), zIndex: index } as CSSProperties}
          className={cn(styles.card)}
          card={card}
        />
      )}
    </>
  )
}
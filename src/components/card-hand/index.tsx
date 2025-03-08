'use client'

import type { TPlayingCard } from "@/types/playing-card"
import styles from "./card-hand.module.scss"
import PlayableCard from "./playable-card"

interface CardHandProps {
  cards: TPlayingCard[]
}

export default function CardHand({ cards }: CardHandProps) {
  return (
    <div className={styles["drag-constraints"]}>
      {cards.map((card, index) =>
        <PlayableCard
          key={card.id}
          card={card}
          position={index - Math.ceil(cards.length / 2)} />
      )}
    </div>
  )
}
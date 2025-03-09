'use client'

import type { TPlayingCard } from "@/types/playing-card"
import PlayableCard from "./playable-card"

interface CardHandProps {
  cards: TPlayingCard[]
}

export default function CardHand({ cards }: CardHandProps) {
  return (
    <>
      {cards.map((card, index) =>
        <PlayableCard
          key={card.id}
          card={card}
          position={index - Math.ceil(cards.length / 2)} />
      )}
    </ >
  )
}
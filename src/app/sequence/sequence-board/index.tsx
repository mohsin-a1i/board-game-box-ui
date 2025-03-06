import type { TPlayingCard } from "@/types/playing-card"
import styles from "./sequence-board.module.scss"
import PlayingCard from "@/components/playing-card"

const cards: TPlayingCard[] = [
  { id: 1, rank: 'A', suit: "spade" },
  { id: 2, rank: 'K', suit: "diamond" },
  { id: 3, rank: 'Q', suit: "club" },
  { id: 4, rank: 'J', suit: "heart" },
  { id: 5, rank: '2', suit: "diamond" },
]

export default function SequenceBoard() {
  return (
    <div className={styles.board}>
      {Array.from({ length: 20 }).map((_, i) =>
        cards.map((card) =>
          <PlayingCard
            key={card.id}
            className={styles.card}
            card={card}
          />
        )
      )}
    </div>
  )
}
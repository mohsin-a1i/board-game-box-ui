'use client'

import PlayingCard from "@/components/playing-card"
import styles from "./sequence-board.module.scss"

export default function SequenceBoard() {
  return (
    <div className={styles.board}>
      {Array.from({ length: 100 }).map((_, i) =>
        <PlayingCard
          key={i}
          className={styles.card}
          card={{ id: 1, rank: 'A', suit: "spade" }}
        />
      )}
    </div>
  )
}
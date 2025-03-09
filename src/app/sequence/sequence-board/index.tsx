import PlayingCard from "@/components/playing-card"
import { playingCardfromCode } from "@/models/playing-card"
import styles from "./sequence-board.module.scss"

const board = [
  "FAS", "AC", "KC", "QC", "10C", "9C", "8C", "7C", "6C", "FAS",
  "AD", "7S", "8S", "9S", "10S", "QS", "KS", "AS", "5C", "2S",
  "KD", "6S", "10C", "9C", "8C", "7C", `6C`, "2D", "4C", "3S",
  "QD", "5S", "QC", "8H", "7H", "6H", "5C", "3D", "3C", "4S",
  "10D", "4S", "KC", "9H", "2H", "5H", "4C", "4D", "2C", "5S",
  "9D", "3S", "AC", "10H", "3H", "4H", "3C", "5D", "AH", "6S",
  "8D", "2S", "AD", "QH", "KH", "AH", "2C", "6D", "kH", "7S",
  "7D", "2H", "KD", "QD", "10D", "9D", "8D", "7D", "QH", "8S",
  "6D", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "9S",
  "FAS", "5D", "4D", "3D", "2D", "AS", "KS", "QS", "10S", "FAS"
]

export default function SequenceBoard() {
  const boardCards = board.map((code, index) => playingCardfromCode(index, code))

  return (
    <div className={styles.board}>
      {boardCards.map((card) =>
        <PlayingCard
          key={card.id}
          className={styles.card}
          card={card}
        />
      )}
    </div>
  )
}


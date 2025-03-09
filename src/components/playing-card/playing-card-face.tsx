import type { TCardRank } from "@/types/playing-card"
import { JackIcon, KingIcon, QueenIcon } from "../icons"
import styles from "./playing-card.module.scss"

interface PlayingCardFaceProps {
  rank: TCardRank
}

export default function PlayingCardFace({ rank }: PlayingCardFaceProps) {
  const FaceIcon = getFaceCardIcon(rank)

  return (
    <div className={styles.face}>
      <FaceIcon className={styles.icon} />
    </div>
  )
}

function getFaceCardIcon(rank: TCardRank) {
  switch (rank) {
    case "J":
      return JackIcon
    case "Q":
      return QueenIcon
    case "K":
      return KingIcon
    default:
      throw new Error(`Invalid card rank: ${rank}`)
  }
}
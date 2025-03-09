import type { PlayingCardRank, PlayingCardSuit } from "@/models/playing-card";
import cn from "@/utilities/cn";
import { ClubIcon, DiamondIcon, HeartIcon, JackIcon, KingIcon, QueenIcon, SpadeIcon } from "../icons";
import styles from "./playing-card.module.scss";

interface PlayingCardPatternProps {
  rank: PlayingCardRank
  suit: PlayingCardSuit
}

export default function PlayingCardPattern({ rank, suit }: PlayingCardPatternProps) {
  const Icon = getIcon(rank, suit)
  const iconCount = getIconCount(rank)
  const numericalCard = isNumericalCard(rank)

  return (
    <div className={cn(styles.pattern, numericalCard && styles[`pattern-${iconCount}`])}>
      {Array.from({ length: iconCount }).map((_, index) => (
        <Icon key={index} className={styles.icon} />
      ))}
    </div>
  )
}

function isNumericalCard(rank: PlayingCardRank): boolean {
  switch (rank) {
    case "J":
    case "Q":
    case "K":
      return false
    default:
      return true
  }
}

function getIconCount(rank: PlayingCardRank) {
  switch (rank) {
    case "J":
    case "Q":
    case "K":
    case "A":
      return 1
    default:
      return parseInt(rank)
  }
}

function getIcon(rank: PlayingCardRank, suit: PlayingCardSuit) {
  if (rank === "J") return JackIcon
  if (rank === "Q") return QueenIcon
  if (rank === "K") return KingIcon
  if (suit === "S") return SpadeIcon
  if (suit === "C") return ClubIcon
  if (suit === "H") return HeartIcon
  if (suit === "D") return DiamondIcon
  throw new Error(`Invalid card rank ${rank} and suit ${suit}`)
}


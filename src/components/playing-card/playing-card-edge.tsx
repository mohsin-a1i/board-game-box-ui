import type { PlayingCardRank } from "@/models/playing-card-model";
import cn from "@/utilities/cn";
import { SVGProps } from "react";
import styles from "./playing-card.module.scss";

interface PlayingCardEdgeProps {
  rank: PlayingCardRank
  Icon: React.FC<SVGProps<SVGSVGElement>>
  reverse?: boolean
}

export default function PlayingCardEdge({ rank, Icon, reverse = false }: PlayingCardEdgeProps) {
  return (
    <div className={cn(styles.edge, reverse && styles.reverse)}>
      <div className={styles.rank}>{rank}</div>
      <Icon className={styles.icon} />
    </div>
  )
}
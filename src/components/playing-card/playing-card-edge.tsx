import type { TCardRank } from "@/types/playing-card";
import { SVGProps } from "react";
import styles from "./playing-card.module.scss";

interface PlayingCardEdgeProps {
  rank: TCardRank
  Icon: React.FC<SVGProps<SVGSVGElement>>
}

export default function PlayingCardEdge({ rank, Icon }: PlayingCardEdgeProps) {
  return (
    <div className={styles.edge}>
      <span className={styles.rank}>{rank}</span>
      <Icon className={styles.icon} />
    </div>
  )
}
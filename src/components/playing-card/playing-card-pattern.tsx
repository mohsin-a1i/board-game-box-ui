import type { TCardRank } from "@/types/playing-card";
import cn from "@/utilities/cn";
import { SVGProps } from "react";
import styles from "./playing-card.module.scss";

interface PlayingCardPatternProps {
  rank: TCardRank
  Icon: React.FC<SVGProps<SVGSVGElement>>
}

export default function PlayingCardPattern({ rank, Icon }: PlayingCardPatternProps) {
  const iconCount = getIconCount(rank)

  return (
    <div className={cn(styles.pattern, styles[`pattern-${iconCount}`])}>
      {Array.from({ length: iconCount }).map((_, index) => (
        <Icon key={index} className={styles.icon} />
      ))}
    </div>
  )
}

function getIconCount(rank: TCardRank) {
  if (rank === "A") return 1
  return parseInt(rank)
}
import styles from "./playing-card.module.scss";
import { SVGProps } from "react";
import type { CardRank } from ".";
import cn from "@/lib/cn";

interface PlayingCardPatternProps {
    rank: CardRank
    Icon: React.FC<SVGProps<SVGSVGElement>>
}

const PlayingCardPattern = ({ rank, Icon }: PlayingCardPatternProps) => {
    const iconCount = getIconCount(rank)

    return (
        <div className={cn(styles.pattern, styles[`pattern-${iconCount}`])}>
            {Array.from({ length: iconCount }).map((_, index) => (
                <Icon key={index} className={styles.icon}/>
            ))}
        </div>
    )
}

function getIconCount(rank: CardRank) { 
    if (rank === "A") return 1
    return parseInt(rank)
}

export default PlayingCardPattern
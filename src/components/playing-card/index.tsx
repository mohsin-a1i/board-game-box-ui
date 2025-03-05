import type { TPlayingCard, TCardSuit, TCardRank } from "@/types/playing-card";
import styles from "./playing-card.module.scss";
import { ClubIcon, DiamondIcon, HeartIcon, SpadeIcon } from "../icons"
import cn from "@/lib/cn";
import PlayingCardPattern from "./playing-card-pattern";
import PlayingCardFace from "./playing-card-face";
import { HTMLAttributes } from "react";

interface PlayingCardProps {
    style: HTMLAttributes<HTMLDivElement>["style"]
    className?: string
    card: TPlayingCard
}

const TPlayingCard = ({ style, className, card: { rank, suit } }: PlayingCardProps) => {
    const isFaceCard = checkFaceCard(rank)
    const SuitIcon = getSuitIcon(suit)

    return (
        <div style={style} className={cn(styles.card, styles[suit], className)}>
            <div className={styles.edge}>
               <span className={styles.rank}>{rank}</span>
               <SuitIcon className={styles.icon}/>
            </div>
            {isFaceCard ? (
                <PlayingCardFace rank={rank} />
            ) : (
                <PlayingCardPattern rank={rank} Icon={SuitIcon} />
            )}
            <div className={styles.edge}>
               <span className={styles.rank}>{rank}</span>
               <SuitIcon className={styles.icon}/>
            </div>
        </div>
    )
}

function getSuitIcon(suit: TCardSuit) {
    switch (suit) {
        case "spade":
            return SpadeIcon
        case "club":
            return ClubIcon
        case "heart":
            return HeartIcon
        case "diamond":
            return DiamondIcon
        default:
            throw new Error(`Invalid card suit: ${suit}`)
    }
}


function checkFaceCard(rank: TCardRank) {
    switch (rank) {
        case "J":
        case "Q":
        case "K":
            return true
        default:
            return false
    }
}


export default TPlayingCard


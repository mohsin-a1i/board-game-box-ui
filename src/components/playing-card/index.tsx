import styles from "./playing-card.module.scss";
import { ClubIcon, DiamondIcon, HeartIcon, SpadeIcon } from "../icons"
import cn from "@/lib/cn";
import PlayingCardPattern from "./playing-card-pattern";
import PlayingCardFace from "./playing-card-face";

export type CardSuit = "spade" | "club" | "heart" | "diamond"
export type CardRank = "A" | "K" | "Q" | "J" | "10" | "9" | "8" | "7" | "6" | "5" | "4" | "3" | "2" | "1"

interface PlayingCardProps {
    rank: CardRank
    suit: CardSuit
}

const PlayingCard = ({ rank, suit }: PlayingCardProps) => {
    const isFaceCard = checkFaceCard(rank)
    const SuitIcon = getSuitIcon(suit)

    return (
        <div className={cn(styles.card, styles[suit])}>
            <div className={styles.edge}>
               <span>{rank}</span>
               <SuitIcon className={styles.icon}/>
            </div>
            {isFaceCard ? (
                <PlayingCardFace rank={rank} />
            ) : (
                <PlayingCardPattern rank={rank} Icon={SuitIcon} />
            )}
            <div className={styles.edge}>
               <span>{rank}</span>
               <SuitIcon className={styles.icon}/>
            </div>
        </div>
    )
}

function getSuitIcon(suit: CardSuit) {
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


function checkFaceCard(rank: CardRank) {
    switch (rank) {
        case "J":
        case "Q":
        case "K":
            return true
        default:
            return false
    }
}


export default PlayingCard


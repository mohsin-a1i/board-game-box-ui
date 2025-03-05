import styles from "./playing-card.module.scss";
import { JackIcon } from "../icons/jack";
import { QueenIcon } from "../icons/queen";
import { KingIcon } from "../icons/king";
import { TCardRank } from "@/types/playing-card";

interface PlayingCardFaceProps {
    rank: TCardRank
}

const PlayingCardFace = ({ rank }: PlayingCardFaceProps) => {
    const FaceIcon = getFaceCardIcon(rank)

    return (
        <div className={styles.face}>
            <FaceIcon className={styles.icon}/>
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

export default PlayingCardFace
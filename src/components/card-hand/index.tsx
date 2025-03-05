import type { TPlayingCard } from "@/types/playing-card"
import styles from "./card-hand.module.scss"
import PlayingCard from "../playing-card"
import { CSSProperties } from "react"

interface CardHandProps {
    cards: TPlayingCard[]
}

const CardHand = ({ cards }: CardHandProps) => {
    return (
        <div className={styles.hand}>
            {cards.map((card, index) => 
                <PlayingCard 
                    key={card.id}
                    style={{ "--i": index - Math.ceil(cards.length / 2) } as CSSProperties}
                    className={styles.card} 
                    card={card}
                />
            )}
        </div>   
    )
}

export default CardHand
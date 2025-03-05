export type TCardSuit = "spade" | "club" | "heart" | "diamond"
export type TCardRank = "A" | "K" | "Q" | "J" | "10" | "9" | "8" | "7" | "6" | "5" | "4" | "3" | "2" | "1"

export interface TPlayingCard {
    id: number
    rank: TCardRank
    suit: TCardSuit
}
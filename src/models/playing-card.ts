export type PlayingCardSuit = "S" | "C" | "H" | "D"
export type PlayingCardRank = "A" | "K" | "Q" | "J" | "10" | "9" | "8" | "7" | "6" | "5" | "4" | "3" | "2" | "1"

export interface PlayingCard {
  id: number,
  rank: PlayingCardRank,
  suit: PlayingCardSuit,
  flipped?: boolean
}

export function playingCardfromCode(id: number, code: string) {
  let i = 0
  let flipped, rank, suit

  if (code[i] === "F") {
    i++
    flipped = true
  } else {
    flipped = false
  }


  if (code.length === i + 3) {
    suit = code[i + 2]
    rank = code[i] + code[i + 1]
  } else {
    suit = code[i + 1]
    rank = code[i]
  }

  return { id, rank, suit, flipped } as PlayingCard
}
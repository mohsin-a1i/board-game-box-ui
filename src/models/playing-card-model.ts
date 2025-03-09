export type PlayingCardSuit = "S" | "C" | "H" | "D"
export type PlayingCardRank = "A" | "K" | "Q" | "J" | "10" | "9" | "8" | "7" | "6" | "5" | "4" | "3" | "2" | "1"

export class PlayingCardModel {
  constructor(
    public id: number,
    public rank: PlayingCardRank,
    public suit: PlayingCardSuit,
    public flipped?: boolean
  ) { }

  static fromCode(id: number, code: string): PlayingCardModel {
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

    return new PlayingCardModel(id, rank as PlayingCardRank, suit as PlayingCardSuit, flipped)
  }
}
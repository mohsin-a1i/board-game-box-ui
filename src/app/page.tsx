import type { TPlayingCard } from "@/types/playing-card";
import CardHand from "@/components/card-hand";
import TouchContextProvider from "@/components/touch-context";

const cards: TPlayingCard[] = [
  { id: 1, rank: 'A', suit: "spade" },
  { id: 2, rank: 'K', suit: "diamond" },
  { id: 3, rank: 'Q', suit: "club" },
  { id: 4, rank: 'J', suit: "heart" },
  { id: 5, rank: '2', suit: "diamond" },
  { id: 6, rank: '3', suit: "spade" }
]

export default function Home() {
  return (
    <TouchContextProvider>
      <CardHand cards={cards} />
    </TouchContextProvider>
  );
}

import CardHand from "@/components/card-hand";
import { TPlayingCard } from "@/types/playing-card";

const cards: TPlayingCard[] = [
  { id: 1, rank: 'A', suit: "spade" },
  { id: 2, rank: 'K', suit: "diamond" },
  { id: 3, rank: 'Q', suit: "club" },
  { id: 4, rank: 'J', suit: "heart" },
  { id: 5, rank: '2', suit: "diamond" },
  { id: 6, rank: '3', suit: "spade" },
  { id: 7, rank: '4', suit: "heart" },
  { id: 8, rank: '5', suit: "spade" },
  { id: 9, rank: '6', suit: "spade" },
  { id: 10, rank: '7', suit: "spade" },
  { id: 11, rank: '8', suit: "club" },
  { id: 12, rank: '9', suit: "heart" },
  { id: 13, rank: '10', suit: "diamond" }
]

export default function Home() {
  return (
    <>
      <main>
        <CardHand cards={cards}/>
      </main>
      <footer>
       
      </footer>
    </>
  );
}

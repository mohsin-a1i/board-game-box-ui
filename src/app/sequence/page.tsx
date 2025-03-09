import PlayableCard from "@/components/playable-card";
import PlayingCard from "@/components/playing-card";
import TouchContextProvider from "@/components/touch-context";
import { PlayingCardModel } from "@/models/playing-card-model";
import SequenceBoard from "./sequence-board";

const hand = ["AS", "KD", "QH", "9S", "10S", "3S"]

export default function SequencePage() {
  const handCards = hand.map((code, index) => PlayingCardModel.fromCode(index, code))

  return (
    <TouchContextProvider>
      <SequenceBoard />
      {handCards.map((card, index) =>
        <PlayableCard
          key={card.id}
          position={index - Math.ceil(handCards.length / 2)}
        >
          <PlayingCard card={card} />
        </PlayableCard>
      )}
    </TouchContextProvider>
  );
}
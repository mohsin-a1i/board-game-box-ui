import PlayableCard from "@/components/playable-card";
import PlayingCard from "@/components/playing-card";
import SpinningHourGlass from "@/components/spinning-hour-glass";
import StatusBar from "@/components/status-bar";
import TouchContextProvider from "@/components/touch-context";
import { playingCardfromCode } from "@/models/playing-card";
import SequenceBoard from "./sequence-board";
import styles from "./sequence-page.module.scss";

const hand = ["AS", "KD", "QH", "9S", "10S", "3S"]

export default function SequencePage() {
  const handCards = hand.map((code, index) => playingCardfromCode(index, code))

  return (
    <TouchContextProvider>
      <div className={styles.page}>
        <StatusBar>
          <SpinningHourGlass className={styles["status-icon"]} />
          <span>Your Turn</span>
        </StatusBar>
        <SequenceBoard />
        {handCards.map((card, index) =>
          <PlayableCard
            key={card.id}
            position={index - Math.ceil(handCards.length / 2)}
          >
            <PlayingCard card={card} />
          </PlayableCard>
        )}
      </div>
    </TouchContextProvider>
  );
}
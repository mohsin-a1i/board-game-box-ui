import PlayingCard from "@/components/playing-card";

export default function Home() {
  return (
    <>
      <main style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <PlayingCard rank={'A'} suit="spade"/>
        <PlayingCard rank={'K'} suit="diamond"/>
        <PlayingCard rank={'Q'} suit="club"/>
        <PlayingCard rank={'J'} suit="heart"/>
        <PlayingCard rank={'2'} suit="diamond"/>
        <PlayingCard rank={'3'} suit="spade"/>
        <PlayingCard rank={'4'} suit="heart"/>
        <PlayingCard rank={'5'} suit="spade"/>
        <PlayingCard rank={'6'} suit="spade"/>
        <PlayingCard rank={'7'} suit="spade"/>
        <PlayingCard rank={'8'} suit="club"/>
        <PlayingCard rank={'9'} suit="heart"/>
        <PlayingCard rank={'10'} suit="diamond"/>
      </main>
      <footer>
       
      </footer>
    </>
  );
}

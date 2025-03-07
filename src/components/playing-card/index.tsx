'use client'

import type { TPlayingCard, TCardSuit, TCardRank } from "@/types/playing-card";
import styles from "./playing-card.module.scss";
import { ClubIcon, DiamondIcon, HeartIcon, SpadeIcon } from "../icons"
import cn from "@/utilities/cn";
import PlayingCardPattern from "./playing-card-pattern";
import PlayingCardFace from "./playing-card-face";
import { HTMLAttributes, useLayoutEffect, useRef, useState } from "react";
import { onResize } from "@/hooks/on-resize";

interface PlayingCardProps {
  style?: HTMLAttributes<HTMLDivElement>["style"]
  className?: string
  card: TPlayingCard
}

export default function PlayingCard({ style, className, card: { rank, suit } }: PlayingCardProps) {
  const [cardElement, contentVisible] = onResize<HTMLDivElement, boolean>(false, (width) => width > 80)
  const isFaceCard = checkFaceCard(rank)
  const SuitIcon = getSuitIcon(suit)

  return (
    <div ref={cardElement} style={style} className={cn(styles.card, styles[suit], className)} data-touchable>
      <div className={styles.edge}>
        <span className={styles.rank}>{rank}</span>
        <SuitIcon className={styles.icon} />
      </div>
      {contentVisible && (
        isFaceCard ? (
          <PlayingCardFace rank={rank} />
        ) : (
          <PlayingCardPattern rank={rank} Icon={SuitIcon} />
        )
      )}
      <div className={styles.edge}>
        <span className={styles.rank}>{rank}</span>
        <SuitIcon className={styles.icon} />
      </div>
    </div>
  )
}

function getSuitIcon(suit: TCardSuit) {
  switch (suit) {
    case "spade":
      return SpadeIcon
    case "club":
      return ClubIcon
    case "heart":
      return HeartIcon
    case "diamond":
      return DiamondIcon
    default:
      throw new Error(`Invalid card suit: ${suit}`)
  }
}


function checkFaceCard(rank: TCardRank) {
  switch (rank) {
    case "J":
    case "Q":
    case "K":
      return true
    default:
      return false
  }
}


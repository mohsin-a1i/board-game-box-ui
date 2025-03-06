'use client'

import { RefObject, useEffect, useRef } from "react"

type TElementCallback = () => void

export function onTouch<E extends HTMLElement>(onTouchStart: TElementCallback, onTouchEnd: TElementCallback): RefObject<E | null> {
  const ref = useRef<E>(null)

  useEffect(() => {
    if (!ref.current) return

    function onElementTouched(event: TouchEvent, callback: TElementCallback) {
      const [touch] = event.touches;
      if (!touch) return
      const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
      const element = elements.find((element) => element === ref.current);
      if (element) callback()
    }

    function touchStartHandler(event: TouchEvent) {
      onElementTouched(event, onTouchStart)
    }

    function touchEndHandler(event: TouchEvent) {
      onElementTouched(event, onTouchEnd)
    }

    ref.current.addEventListener("touchmove", touchStartHandler, { passive: true });
    ref.current.addEventListener("touchend", touchEndHandler, { passive: true });

    return () => {
      if (!ref.current) return
      ref.current.removeEventListener("touchmove", touchStartHandler);
      ref.current.removeEventListener("touchend", touchEndHandler);
    };
  }, []);

  return ref
}
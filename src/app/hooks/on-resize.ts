'use client'

import { RefObject, useLayoutEffect, useRef, useState } from "react"

export function onResize<E extends HTMLElement, S>(initialState: S, updateState: (width: number, height: number) => S): [RefObject<E | null>, S] {
  const ref = useRef<E>(null)
  const [state, setState] = useState<S>(initialState)

  useLayoutEffect(() => {
    if (!ref.current) return
    const observer = new ResizeObserver(([resizable]) => {
      if (!resizable) return
      const newState = updateState(resizable.contentRect.width, resizable.contentRect.height)
      setState(newState)
    });
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return [ref, state]
}
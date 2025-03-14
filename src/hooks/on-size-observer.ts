'use client'

import { RefObject, useLayoutEffect, useRef } from "react";

export function useSizeObserver<E extends HTMLElement>(onResize: (width: number, height: number) => void, _ref?: RefObject<E | null>): RefObject<E | null> {
  const ref = _ref || useRef<E>(null)

  useLayoutEffect(() => {
    if (!ref.current) return
    const observer = new ResizeObserver(([resizable]) => {
      if (!resizable) return
      onResize(resizable.contentRect.width, resizable.contentRect.height)
    })
    observer.observe(ref.current)

    return () => observer.disconnect()
  }, []);

  return ref
}
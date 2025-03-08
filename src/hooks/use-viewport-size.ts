'use client'

import { useState, useEffect } from "react";

interface Size {
  width: number
  height: number
}

export default function useViewportSize() {
  const [size, setSize] = useState<Size | null>(null)

  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    if (size === null) handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return size
}
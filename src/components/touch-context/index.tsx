'use client'

import { createContext, useEffect, useRef, useState } from 'react';

const TouchContext = createContext({})

export default function TouchContextProvider({ children }: React.PropsWithChildren) {
  const touchedElement = useRef<Element | undefined>(null)

  useEffect(() => {
    if (navigator.maxTouchPoints === 0) return
    document.body.classList.add("touch-device")

    function onElementTouched(event: TouchEvent) {
      event.preventDefault()
      const [touch] = event.touches
      if (!touch) return
      const elements = document.elementsFromPoint(touch.clientX, touch.clientY)
      return elements.find((element) => element.hasAttribute("data-touchable"))
    }

    function touchStartHandler(event: TouchEvent) {
      console.log("touchStart")
      setTouched(onElementTouched(event))
    }

    function touchMoveHandler(event: TouchEvent) {
      console.log("touchMove")
      setTouched(onElementTouched(event))
    }

    function touchEndHandler(event: TouchEvent) {
      console.log("touchEnd")
      removeTouched()
    }

    function setTouched(element?: Element) {
      if (element === touchedElement.current) return

      if (touchedElement.current) touchedElement.current.classList.remove("touched")
      if (element) element.classList.add("touched")

      touchedElement.current = element
    }

    function removeTouched() {
      if (touchedElement.current) touchedElement.current.classList.remove("touched")
    }

    document.addEventListener("touchstart", touchStartHandler, { passive: false })
    document.addEventListener("touchmove", touchMoveHandler, { passive: false })
    document.addEventListener("touchend", touchEndHandler, { passive: false })

    return () => {
      document.removeEventListener("touchstart", touchStartHandler)
      document.removeEventListener("touchmove", touchStartHandler)
      document.removeEventListener("touchend", touchEndHandler)
    }
  }, [])

  return (
    <TouchContext.Provider value={{}}>
      {children}
    </TouchContext.Provider>
  );
}
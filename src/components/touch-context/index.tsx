'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react';

export type TCoordinate = { x: number, y: number }
type TTouchableOptions = {
  drag?: {
    detectDrag: (delta: TCoordinate) => TCoordinate | undefined,
    onDrag: (delta: TCoordinate) => void
  }
}
type TTouchableDetails = { element: HTMLElement, options: TTouchableOptions }
type TRegisterTouchable = (element: HTMLElement, options?: TTouchableOptions) => void
type TUnregisterTouchable = (element: HTMLElement) => void

const TouchContext = createContext<{ touched: HTMLElement | undefined, registerTouchable: TRegisterTouchable, unregisterTouchable: TUnregisterTouchable }>({
  touched: undefined,
  registerTouchable: () => undefined,
  unregisterTouchable: () => undefined,
})
export const useTouch = () => useContext(TouchContext)

export default function TouchContextProvider({ children }: React.PropsWithChildren) {
  const [touchedElement, setTouchedElement] = useState<HTMLElement>()
  const touchableElements = useRef<Map<HTMLElement, TTouchableOptions>>(new Map())

  const registerTouchable: TRegisterTouchable = (element, options) => {
    touchableElements.current.set(element, options || {})
  }

  const unregisterTouchable: TUnregisterTouchable = (element: HTMLElement) => {
    touchableElements.current.delete(element)
  }

  useEffect(() => {
    if (navigator.maxTouchPoints === 0) return
    document.body.classList.add("touch-device")

    let touchedElement: HTMLElement | undefined
    let touchOrigin: TCoordinate | undefined;
    let touchableOrigin: TCoordinate | undefined;

    function getTouchCoordinates(event: TouchEvent) {
      const [touch] = event.touches
      return { x: touch.clientX, y: touch.clientY }
    }

    function subtractCoordinates(a: TCoordinate, b: TCoordinate) {
      return { x: b.x - a.x, y: b.y - a.y }
    }

    function addCoordinates(a: TCoordinate, b: TCoordinate) {
      return { x: a.x + b.x, y: a.y + b.y }
    }

    function getTouchedElement(event: TouchEvent): TTouchableDetails | undefined {
      event.preventDefault()
      const { x, y } = getTouchCoordinates(event)
      const elements = document.elementsFromPoint(x, y) as HTMLElement[]
      for (const element of elements) {
        const options = touchableElements.current.get(element)
        if (options) return { element, options }
      }
    }

    function touchStartHandler(event: TouchEvent) {
      const element = getTouchedElement(event)?.element
      touchedElement = element
      setTouchedElement(element)
    }

    function touchMoveHandler(event: TouchEvent) {
      if (touchableOrigin) {
        const coordinates = getTouchCoordinates(event)
        const delta = subtractCoordinates(touchOrigin!, coordinates)
        touchableElements.current.get(touchedElement!)?.drag?.onDrag(addCoordinates(touchableOrigin, delta))
        return
      }

      const touchedElementDetails = getTouchedElement(event)
      const dragOptions = touchedElementDetails?.options.drag
      if (dragOptions && touchedElement && touchedElement === touchedElementDetails?.element) {
        const coordinates = getTouchCoordinates(event)
        if (touchOrigin === undefined) touchOrigin = coordinates
        else touchableOrigin = dragOptions.detectDrag(subtractCoordinates(touchOrigin, coordinates))
        return
      }

      touchOrigin = undefined
      touchableOrigin = undefined
      touchedElement = touchedElementDetails?.element
      setTouchedElement(touchedElementDetails?.element)
    }

    function touchEndHandler(event: TouchEvent) {
      touchOrigin = undefined
      touchableOrigin = undefined
      touchedElement = undefined
      setTouchedElement(undefined)
    }

    document.addEventListener("touchstart", touchStartHandler, { passive: false })
    document.addEventListener("touchmove", touchMoveHandler, { passive: false })
    document.addEventListener("touchend", touchEndHandler, { passive: false })

    return () => {
      document.removeEventListener("touchstart", touchStartHandler)
      document.removeEventListener("touchmove", touchMoveHandler)
      document.removeEventListener("touchend", touchEndHandler)
    }
  }, [])

  return (
    <TouchContext.Provider value={{ touched: touchedElement, registerTouchable, unregisterTouchable }}>
      {children}
    </TouchContext.Provider>
  );
}
'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react';

export type TCoordinate = [number, number]
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
    let dragOrigin: TCoordinate | undefined;

    function getTouchCoordinates(event: TouchEvent): TCoordinate {
      const [touch] = event.touches
      return [touch.clientX, touch.clientY]
    }

    function getTouchedElement(event: TouchEvent): TTouchableDetails | undefined {
      event.preventDefault()
      const [x, y] = getTouchCoordinates(event)
      const elements = document.elementsFromPoint(x, y) as HTMLElement[]
      for (const element of elements) {
        const options = touchableElements.current.get(element)
        if (options) return { element, options }
      }
    }

    function subtractCoordinates(a: TCoordinate, b: TCoordinate): TCoordinate {
      return [a[0] - b[0], a[1] - b[1]]
    }

    function addCoordinates(a: TCoordinate, b: TCoordinate): TCoordinate {
      return [a[0] + b[0], a[1] + b[1]]
    }

    function touchStartHandler(event: TouchEvent) {
      const element = getTouchedElement(event)?.element
      touchedElement = element
      setTouchedElement(element)
    }

    function touchMoveHandler(event: TouchEvent) {
      if (dragOrigin) {
        const coordinates = getTouchCoordinates(event)
        touchableElements.current.get(touchedElement!)?.drag?.onDrag(addCoordinates(dragOrigin, coordinates))
        return
      }

      const touchedElementDetails = getTouchedElement(event)
      const dragOptions = touchedElementDetails?.options.drag
      if (dragOptions && touchedElement && touchedElement === touchedElementDetails?.element) {
        const coordinates = getTouchCoordinates(event)
        if (touchOrigin === undefined) {
          touchOrigin = coordinates
        } else {
          const touchableOrigin = dragOptions.detectDrag(subtractCoordinates(coordinates, touchOrigin))
          if (touchableOrigin) dragOrigin = subtractCoordinates(touchableOrigin, touchOrigin)
        }
        return
      }

      touchOrigin = undefined
      dragOrigin = undefined
      touchedElement = touchedElementDetails?.element
      setTouchedElement(touchedElementDetails?.element)
    }

    function touchEndHandler(event: TouchEvent) {
      touchOrigin = undefined
      dragOrigin = undefined
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
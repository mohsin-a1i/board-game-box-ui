'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react';

export type Coordinate = [number, number]
type TouchableOptions = {
  drag?: {
    detectDrag: (delta: Coordinate) => Coordinate | undefined,
    onDrag: (delta: Coordinate) => void
  }
}
type TouchableDetails = { element: HTMLElement, options: TouchableOptions }
type RegisterTouchable = (element: HTMLElement, options?: TouchableOptions) => void
type UnregisterTouchable = (element: HTMLElement) => void

const TouchContext = createContext<{ touched: HTMLElement | undefined, registerTouchable: RegisterTouchable, unregisterTouchable: UnregisterTouchable }>({
  touched: undefined,
  registerTouchable: () => undefined,
  unregisterTouchable: () => undefined,
})
export const useTouch = () => useContext(TouchContext)

export default function TouchContextProvider({ children }: React.PropsWithChildren) {
  const [touchedElement, setTouchedElement] = useState<HTMLElement>()
  const touchableElements = useRef<Map<HTMLElement, TouchableOptions>>(new Map())

  const registerTouchable: RegisterTouchable = (element, options) => {
    touchableElements.current.set(element, options || {})
  }

  const unregisterTouchable: UnregisterTouchable = (element: HTMLElement) => {
    touchableElements.current.delete(element)
  }

  useEffect(() => {
    if (navigator.maxTouchPoints === 0) return
    document.body.classList.add("touch-device")

    let touchedElement: HTMLElement | undefined
    let touchOrigin: Coordinate | undefined;
    let dragOrigin: Coordinate | undefined;

    function getTouchCoordinates(event: TouchEvent): Coordinate {
      const [touch] = event.touches
      return [touch.clientX, touch.clientY]
    }

    function getTouchedElement(event: TouchEvent): TouchableDetails | undefined {
      const [x, y] = getTouchCoordinates(event)
      const elements = document.elementsFromPoint(x, y) as HTMLElement[]
      for (const element of elements) {
        const options = touchableElements.current.get(element)
        if (options) {
          event.preventDefault()
          return { element, options }
        }
      }
    }

    function subtractCoordinates(a: Coordinate, b: Coordinate): Coordinate {
      return [a[0] - b[0], a[1] - b[1]]
    }

    function addCoordinates(a: Coordinate, b: Coordinate): Coordinate {
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
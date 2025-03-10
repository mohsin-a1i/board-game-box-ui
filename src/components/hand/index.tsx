import { Children } from "react"
import HandCard from "./hand-card"

export default function Hand({ children }: React.PropsWithChildren) {
  const count = Children.count(children)

  return Children.map(children, (child, index) => (
    <HandCard position={index - Math.ceil(count / 2)}>
      {child}
    </HandCard>
  ))
}
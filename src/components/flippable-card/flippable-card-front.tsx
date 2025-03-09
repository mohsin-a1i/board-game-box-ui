import cn from "@/utilities/cn"
import styles from "./flippable-card.module.scss"

interface FlippableCardProps {
  className?: string
}

export default function FlippableCardFront({ className, children }: React.PropsWithChildren<FlippableCardProps>) {
  return (
    <div className={cn(styles.front, className)}>
      {children}
    </div>
  )
}


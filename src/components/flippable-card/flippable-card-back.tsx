import cn from "@/utilities/cn"
import styles from "./flippable-card.module.scss"

interface FlippableCardProps {
  className?: string
}

export default function FlippableCardBack({ className, children }: React.PropsWithChildren<FlippableCardProps>) {
  return (
    <div className={cn(styles.back, className)}>
      {children}
    </div>
  )
}


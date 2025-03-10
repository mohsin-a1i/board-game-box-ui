import cn from "@/utilities/cn"
import styles from "./card.module.scss"

interface FlippableCardProps {
  className?: string
}

export default function CardBack({ className, children }: React.PropsWithChildren<FlippableCardProps>) {
  return (
    <div className={cn(styles.back, className)}>
      {children}
    </div>
  )
}


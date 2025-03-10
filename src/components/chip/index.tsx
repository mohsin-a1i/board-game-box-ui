import cn from "@/utilities/cn";
import styles from "./chip.module.scss";

interface ChipProps {
  className: string;
  color?: 'red' | 'blue' | 'green'
}

export default function Chip({ className, color = "red" }: ChipProps) {
  return (
    <div className={cn(styles.chip, styles[color], className)} />
  )
}
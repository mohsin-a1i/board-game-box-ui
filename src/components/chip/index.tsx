import cn from "@/utilities/cn";
import styles from "./chip.module.scss";

interface ChipProps {
  className: string;
}

export default function Chip({ className }: ChipProps) {
  return (
    <div className={cn(styles.chip, className)} />
  )
}
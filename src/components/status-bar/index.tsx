import styles from "./status-bar.module.scss"

export default function StatusBar({ children }: React.PropsWithChildren) {
  return (
    <div className={styles.bar}>
      {children}
    </div>
  )
}
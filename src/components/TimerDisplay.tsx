import styles from './TimerDisplay.module.css'

interface Props {
  remaining: number
  finished: boolean
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export function TimerDisplay({ remaining, finished }: Props) {
  const mins = Math.floor(remaining / 60)
  const secs = remaining % 60

  return (
    <div className={`${styles.display} ${finished ? styles.finished : ''}`}>
      <span className={styles.time}>
        {pad(mins)}:{pad(secs)}
      </span>
      {finished && <p className={styles.message}>Session complete 🔔</p>}
    </div>
  )
}

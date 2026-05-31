import type { TimerStatus } from '../useTimer'
import styles from './Controls.module.css'

interface Props {
  status: TimerStatus
  onStart: () => void
  onPause: () => void
  onReset: () => void
}

export function Controls({ status, onStart, onPause, onReset }: Props) {
  return (
    <div className={styles.row}>
      {status === 'idle' && (
        <button className={`${styles.btn} ${styles.primary}`} onClick={onStart}>
          Start
        </button>
      )}
      {status === 'running' && (
        <button className={`${styles.btn} ${styles.secondary}`} onClick={onPause}>
          Pause
        </button>
      )}
      {status === 'idle' && (
        <button className={`${styles.btn} ${styles.ghost}`} onClick={onReset}>
          Reset
        </button>
      )}
      {status === 'finished' && (
        <>
          <button className={`${styles.btn} ${styles.primary}`} onClick={onStart}>
            Again
          </button>
          <button className={`${styles.btn} ${styles.ghost}`} onClick={onReset}>
            Reset
          </button>
        </>
      )}
      {status === 'running' && (
        <button className={`${styles.btn} ${styles.ghost}`} onClick={onReset}>
          Reset
        </button>
      )}
    </div>
  )
}

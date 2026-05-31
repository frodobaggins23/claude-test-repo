import { useState } from 'react'
import { useTimer } from './useTimer'
import { QuoteDisplay } from './components/QuoteDisplay'
import { TimerDisplay } from './components/TimerDisplay'
import { DurationPicker } from './components/DurationPicker'
import { Controls } from './components/Controls'
import styles from './App.module.css'

export default function App() {
  const [minutes, setMinutes] = useState(10)
  const { status, remaining, start, pause, reset } = useTimer()

  const handleStart = () => start(minutes)
  const handleReset = () => reset()

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Mindful Moments</h1>

        <QuoteDisplay running={status === 'running'} />

        <TimerDisplay remaining={remaining} finished={status === 'finished'} />

        <DurationPicker
          value={minutes}
          onChange={setMinutes}
          disabled={status === 'running' || status === 'finished'}
        />

        <Controls status={status} onStart={handleStart} onPause={pause} onReset={handleReset} />
      </div>
    </div>
  )
}

import styles from './DurationPicker.module.css'

const PRESETS = [5, 10, 15, 20, 30]

interface Props {
  value: number
  onChange: (minutes: number) => void
  disabled: boolean
}

export function DurationPicker({ value, onChange, disabled }: Props) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor="duration-input">
        Duration (minutes)
      </label>
      <div className={styles.row}>
        {PRESETS.map((p) => (
          <button
            key={p}
            className={`${styles.preset} ${value === p ? styles.active : ''}`}
            onClick={() => onChange(p)}
            disabled={disabled}
          >
            {p}
          </button>
        ))}
        <input
          id="duration-input"
          className={styles.input}
          type="number"
          min={1}
          max={120}
          value={value}
          disabled={disabled}
          onChange={(e) => {
            const v = parseInt(e.target.value, 10)
            if (!isNaN(v) && v >= 1) onChange(v)
          }}
        />
      </div>
    </div>
  )
}

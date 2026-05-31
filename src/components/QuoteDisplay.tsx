import { useEffect, useState } from 'react'
import { quotes } from '../quotes'
import styles from './QuoteDisplay.module.css'

interface Props {
  running: boolean
}

export function QuoteDisplay({ running }: Props) {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * quotes.length))

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setIndex((i) => (i + 1) % quotes.length), 30_000)
    return () => clearInterval(id)
  }, [running])

  return (
    <blockquote className={styles.quote}>
      <p>"{quotes[index]}"</p>
    </blockquote>
  )
}

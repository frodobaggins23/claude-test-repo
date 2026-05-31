import { useReducer, useEffect, useRef } from 'react'

export type TimerStatus = 'idle' | 'running' | 'finished'

interface TimerState {
  status: TimerStatus
  remaining: number
  duration: number
}

type TimerAction =
  | { type: 'START'; duration: number }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'RESET' }
  | { type: 'TICK' }
  | { type: 'FINISH' }

function timerReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case 'START':
      return { status: 'running', duration: action.duration, remaining: action.duration }
    case 'PAUSE':
      return { ...state, status: 'idle' }
    case 'RESUME':
      return state.remaining > 0 ? { ...state, status: 'running' } : state
    case 'RESET':
      return { ...state, status: 'idle', remaining: state.duration }
    case 'TICK':
      return { ...state, remaining: state.remaining - 1 }
    case 'FINISH':
      return { ...state, status: 'finished', remaining: 0 }
    default:
      return state
  }
}

function ringBell() {
  try {
    const ctx = new AudioContext()
    const gain = ctx.createGain()
    gain.connect(ctx.destination)

    const frequencies = [523.25, 659.25, 783.99] // C5, E5, G5
    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.value = freq
      osc.connect(gain)
      const start = ctx.currentTime + i * 0.25
      osc.start(start)
      osc.stop(start + 1.8)
      gain.gain.setValueAtTime(0.4, start)
      gain.gain.exponentialRampToValueAtTime(0.001, start + 1.8)
    })
  } catch {
    // AudioContext unavailable — silently ignore
  }
}

export function useTimer() {
  const [state, dispatch] = useReducer(timerReducer, {
    status: 'idle',
    remaining: 0,
    duration: 0,
  })

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (state.status === 'running') {
      intervalRef.current = setInterval(() => {
        dispatch({ type: 'TICK' })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [state.status])

  useEffect(() => {
    if (state.status === 'running' && state.remaining === 0) {
      dispatch({ type: 'FINISH' })
      ringBell()
    }
  }, [state.remaining, state.status])

  const start = (minutes: number) => dispatch({ type: 'START', duration: minutes * 60 })
  const pause = () => dispatch({ type: 'PAUSE' })
  const resume = () => dispatch({ type: 'RESUME' })
  const reset = () => dispatch({ type: 'RESET' })

  return { ...state, start, pause, resume, reset }
}

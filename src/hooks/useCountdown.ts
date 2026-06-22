import { useEffect, useState } from 'react'

export interface CountdownParts {
  days: number
  hours: number
  minutes: number
  seconds: number
  done: boolean
}

function diff(target: Date): CountdownParts {
  const ms = Math.max(0, target.getTime() - Date.now())
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    minutes: Math.floor(ms / 60_000) % 60,
    seconds: Math.floor(ms / 1_000) % 60,
    done: ms === 0,
  }
}

export function useCountdown(target: Date): CountdownParts {
  const [parts, setParts] = useState(() => diff(target))
  useEffect(() => {
    const id = setInterval(() => setParts(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])
  return parts
}

export const pad = (n: number) => String(n).padStart(2, '0')

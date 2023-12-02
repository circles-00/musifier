import { useEffect, useState } from 'react'

export const useDebounce = <T>(value: T, duaration = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, duaration)

    return () => {
      clearTimeout(timeout)
    }
  }, [duaration, value])

  return debouncedValue
}

import { useEffect, useState } from "react"

// checking if value exists yet in LS

export function useLocalStorage<T>(key: string,
  initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
      const jsonValue = localStorage.getItem(key)
      if (jsonValue == null) {
        if (typeof initialValue === "function") {
          return (initialValue as () => T)()
        } else {
          return initialValue
        }
      } else {
        return JSON.parse(jsonValue)
      }
    })


    // Updates value every time it changes w/ a useEffect hook

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return [value, setValue] as [T, typeof setValue]
}
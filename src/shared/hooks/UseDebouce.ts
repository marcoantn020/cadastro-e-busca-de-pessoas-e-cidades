import { useCallback, useRef } from 'react'


export const useDebouce = (delay = 800, notDelayFirstTime = true) => {

  const isFirstTime = useRef(notDelayFirstTime)
  const debouncing = useRef<NodeJS.Timeout>()
  
  const debounce = useCallback((func: () => void) => {
    if(isFirstTime.current) {
      isFirstTime.current = false
      func()
    } else {
      if(debouncing.current) {
        clearInterval(debouncing.current)
      }
      debouncing.current = setTimeout(() => func() , delay)  
    }

  }, [delay])

  return { debounce }
}
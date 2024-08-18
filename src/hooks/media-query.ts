import { useEffect, useState } from 'react'

const MATCH_MEDIA_QUERY = '(width < 1024px)'

export const useMediaQuery = () => {
  const [isSp, setIsSp] = useState(
    typeof window === 'undefined'
      ? false
      : window.matchMedia(MATCH_MEDIA_QUERY).matches
  )

  useEffect(() => {
    const mediaQueryList =
      typeof window === 'undefined'
        ? null
        : window?.matchMedia(MATCH_MEDIA_QUERY)

    if (
      mediaQueryList?.media === 'not all' ||
      mediaQueryList?.media === 'invalid'
    ) {
      console.error('useMediaQuery Error: Invalid media query')
    }

    if (!mediaQueryList) {
      return
    }

    mediaQueryList.onchange = (e) => {
      setIsSp(e.matches)
    }

    return () => {
      mediaQueryList.onchange = null
    }
  }, [setIsSp])

  return { isSp }
}

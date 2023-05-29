import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * This function scrolls the page to the top with a smooth animation when the location changes in a React app.
 * @returns The `ScrollToTop` component is returning `null`.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [pathname])

  return null
}

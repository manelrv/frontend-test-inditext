import { DELAY_IN_HOURS, MILLISECONDS_IN_HOUR } from '../constants/constants'

function checkElapsedTime(timestamp: number): boolean {
  const now = new Date().getTime()
  return (now - timestamp) / MILLISECONDS_IN_HOUR < DELAY_IN_HOURS
}

export default checkElapsedTime

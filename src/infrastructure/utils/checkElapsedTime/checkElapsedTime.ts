import { MILLISECONDS_IN_HOUR } from '../../constants/constants'

function checkElapsedTime({
  timestamp,
  delayInHours
}: {
  timestamp: number
  delayInHours: number
}): boolean {
  const now = new Date().getTime()
  return (now - timestamp) / MILLISECONDS_IN_HOUR < delayInHours
}

export default checkElapsedTime

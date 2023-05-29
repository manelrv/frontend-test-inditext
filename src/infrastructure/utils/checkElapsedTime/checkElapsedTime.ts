import { MILLISECONDS_IN_HOUR } from '../../constants/constants'

/* This is a TypeScript function named `checkElapsedTime` that takes an object as its argument with two properties:
`timestamp` and `delayInHours`, both of which are numbers. The function calculates the elapsed time in hours between the
current time and the `timestamp` provided, and returns a boolean indicating whether the elapsed time is less than the
`delayInHours` provided. The `MILLISECONDS_IN_HOUR` constant is used to convert the elapsed time from milliseconds to
hours. */
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

/**
 * This function converts a given number of milliseconds into a formatted string representing hours, minutes, and seconds.
 * @param {number} milliseconds - The number of milliseconds that you want to convert to the format HH:MM:SS.
 * @returns a formatted string representing the input time in hours, minutes, and seconds (HH:MM:SS) format.
 */
export const convertMillisecondsToHHMMSS = (milliseconds: number) => {
  const hours = Math.floor(milliseconds / 3600000)
  const minutes = Math.floor((milliseconds % 3600000) / 60000)
  const seconds = Math.floor((milliseconds % 60000) / 1000)

  let formattedTime = ''

  if (hours > 0) {
    const hoursStr = hours.toString().padStart(2, '0')
    formattedTime += `${hoursStr}:`
  }

  const minutesStr = minutes.toString().padStart(2, '0')
  const secondsStr = seconds.toString().padStart(2, '0')

  formattedTime += `${minutesStr}:${secondsStr}`

  return formattedTime
}

import { isValid, format } from 'date-fns'

/**
 * The function converts a given date string to a formatted date string in the format of MM/dd/yyyy.
 * @param {string} dateString - The dateString parameter is a string that represents a date. It can be in any format that
 * can be recognized by the JavaScript Date constructor, such as "2022-01-01" or "January 1, 2022".
 * @returns a string that represents the input date in the format of "MM/dd/yyyy". If the input date is invalid, an empty
 * string is returned and an error message is logged to the console.
 */
export default function convertDate(dateString: string): string {
  const date = new Date(dateString)
  if (!isValid(date)) {
    console.log('Invalid date')
    return ''
  }
  return format(date, 'MM/dd/yyyy')
}

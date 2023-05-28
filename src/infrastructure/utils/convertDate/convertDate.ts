import { isValid, format } from 'date-fns'

export default function convertDate(dateString: string): string {
  const date = new Date(dateString)
  if (!isValid(date)) {
    console.error('Invalid date')
    return ''
  }
  return format(date, 'MM/dd/yyyy')
}

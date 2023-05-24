export function convertDate(dateString: string): string {
  const date = new Date(dateString)

  const month = date.getMonth() + 1 // Months in JavaScript are zero-based
  const day = date.getDate()
  const year = date.getFullYear()

  // Format the date in mm/dd/yyyy format
  return ('0' + month).slice(-2) + '/' + ('0' + day).slice(-2) + '/' + year
}

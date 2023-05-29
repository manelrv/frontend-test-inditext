/**
 * This function validates a JSON string and returns the parsed object or logs an error message if the JSON is invalid.
 * @param {string} json - The `json` parameter is a string that represents a JSON object. The function attempts to parse
 * this string into a JavaScript object using the `JSON.parse()` method. If the parsing is successful, the function returns
 * the resulting object. If the parsing fails due to invalid JSON syntax, the function catches the
 * @returns the parsed JSON object if the parsing is successful, and it is returning null if the parsing fails.
 */
export default function validateJSON(json: string) {
  try {
    return JSON.parse(json)
  } catch (error: any) {
    console.error({
      message: error?.message,
      stack: error?.stack,
      comment: 'API call returned invalid JSON.'
    })
    return null
  }
}

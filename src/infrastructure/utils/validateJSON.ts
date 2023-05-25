export default function validateJSON(json: string) {
  try {
    const result = JSON.parse(json)
    return result
  } catch (error: any) {
    console.error({
      message: error?.message,
      stack: error?.stack,
      comment: 'API call returned invalid JSON.'
    })
    return null
  }
}

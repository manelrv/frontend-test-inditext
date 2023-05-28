import validateJSON from './validateJSON'

describe('validateJSON', () => {
  test('returns true when given valid JSON', () => {
    const json = { valid: true }
    const validJSON = JSON.stringify(json)
    expect(validateJSON(validJSON)).toMatchObject(json)
  })
  test('returns false when given invalid JSON', () => {
    const invalidJSON = '{ invalid: true }'
    expect(validateJSON(invalidJSON)).toBe(null)
  })
})

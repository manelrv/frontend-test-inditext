import checkElapsedTime from './checkElapsedTime'

describe('checkElapsedTime', () => {
  test('returns_false_when_elapsed_time_is_smaller_than_delay_in_hours', () => {
    const timestamp = Date.now() - 1000 * 60 * 60 * 23
    expect(checkElapsedTime({ timestamp, delayInHours: 24 })).toBe(true)
  })

  test('returns_true_when_elapsed_time_is_bigger_than_delay_in_hours', () => {
    const timestamp = Date.now() - 1000 * 60 * 60 * 25
    expect(checkElapsedTime({ timestamp, delayInHours: 24 })).toBe(false)
  })
})

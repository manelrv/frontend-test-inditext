import convertMillisecondsToHHMMSS from './convertMillisecondsToHHMMSS'

describe('convertMillisecondsToHHMMSS', () => {
  test('converts_0_milliseconds_to_00:00', () => {
    expect(convertMillisecondsToHHMMSS(0)).toBe('00:00')
  })

  test('converts_1000_milliseconds_to_00:01', () => {
    expect(convertMillisecondsToHHMMSS(1000)).toBe('00:01')
  })

  test('converts_60000_milliseconds_to_01:00', () => {
    expect(convertMillisecondsToHHMMSS(60000)).toBe('01:00')
  })

  test('converts_3600000milliseconds_to_01:00:00', () => {
    expect(convertMillisecondsToHHMMSS(3600000)).toBe('01:00:00')
  })

  test('test_convert_milliseconds_to_hhmmss_with_negative_input', () => {
    expect(convertMillisecondsToHHMMSS(-1000)).toBe('00:00')
  })

  test('test_convert_milliseconds_to_hhmmss_with_infinity_input', () => {
    expect(convertMillisecondsToHHMMSS(Infinity)).toBe('00:00')
  })
})

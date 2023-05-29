import convertDate from './convertDate'

describe('convertDate', () => {
  test('2023-05-16T08:44:00Z_must_return_05/16/2023', () => {
    const date = '2023-05-16T08:44:00Z'
    expect(convertDate(date)).toBe('05/16/2023')
  })

  test('an_invalid_date_must_return_an_empty_string', () => {
    const date = 'invalid date'
    expect(convertDate(date)).toBe('')
  })
})

import { act, renderHook } from '@testing-library/react'
import useFilter from './index'

it('test_setting_filter_value ', function () {
  const { result } = renderHook(() => useFilter())
  act(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    result.current.handleFilter({ target: { value: 'test' } })
  })
  expect(result.current.filter).toBe('test')
})

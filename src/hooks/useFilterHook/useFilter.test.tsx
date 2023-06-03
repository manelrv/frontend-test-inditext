import '@testing-library/jest-dom/extend-expect'
import { act, renderHook } from '@testing-library/react'
import useFilter from './useFilter'
import { ChangeEvent } from 'react'

describe('useFilter', () => {
  test('test_filter_input_changes', () => {
    const { result } = renderHook(() => useFilter())
    const event = {
      target: {
        value: 'test'
      }
    }
    act(() => {
      result.current.handleFilter(event as ChangeEvent<HTMLInputElement>)
    })
    expect(result.current.filter).toBe(event.target.value)
  })
})

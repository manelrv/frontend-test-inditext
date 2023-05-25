import '@testing-library/jest-dom/extend-expect'
import InputSearch from '../InputSearch'
import {
  act,
  fireEvent,
  render,
  renderHook,
  RenderResult
} from '@testing-library/react'
import useFetchStatusStore from '../../../infrastructure/stores/fecthStatusStore'
describe('InputSearch', () => {
  const PLACEHOLDER_TEXT = 'Discraceland, Andrew, etc...'
  let component: RenderResult
  beforeEach(() => {
    component = render(
      <InputSearch filter={''} handleFilter={() => null} podcastsCount={0} />
    )
  })

  test('renders_the_component', () => {
    expect(component.container).toHaveTextContent('-')
    expect(component.getByPlaceholderText(PLACEHOLDER_TEXT)).toBeInTheDocument()
  })

  test('renders_the_correct_number_of_podcasts', () => {
    component.rerender(
      <InputSearch filter={''} handleFilter={() => null} podcastsCount={1} />
    )
    expect(component.container).toHaveTextContent('1')
  })

  test('test_disabled_input_field', () => {
    const { setLoading } = renderHook(() => useFetchStatusStore()).result
      .current
    act(() => {
      setLoading(true)
    })
    const inputField = component.getByPlaceholderText(PLACEHOLDER_TEXT)

    expect(inputField).toBeDisabled()
  })

  test('test_enabled_input_field', () => {
    const { setLoading } = renderHook(() => useFetchStatusStore()).result
      .current
    act(() => {
      setLoading(false)
    })
    const inputField = component.getByPlaceholderText(PLACEHOLDER_TEXT)

    expect(inputField).not.toBeDisabled()
  })

  test('test_handleFilter_is_called_when_input_value_change', () => {
    const TEXT_TO_FILTER = 'test'
    const handleFilterMock = jest.fn((value: string) => value)
    component.rerender(
      <InputSearch
        filter={handleFilterMock(TEXT_TO_FILTER)}
        handleFilter={handleFilterMock as any}
        podcastsCount={0}
      />
    )

    const inputField = component.getByPlaceholderText(
      PLACEHOLDER_TEXT
    ) as HTMLInputElement
    fireEvent.change(inputField, { target: { value: TEXT_TO_FILTER } })
    expect(handleFilterMock).toHaveBeenCalledTimes(1)
    expect(inputField.value).toBe(TEXT_TO_FILTER)
  })
})

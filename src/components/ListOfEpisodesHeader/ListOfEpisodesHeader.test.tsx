import '@testing-library/jest-dom/extend-expect'
import ListOfEpisodesHeader from './ListOfEpisodesHeader'
import { act, render, renderHook } from '@testing-library/react'
import useFetchStatusStore from '../../infrastructure/stores/fecthStatusStore'

describe('ListOfEpisodesHeader', () => {
  const originalState = useFetchStatusStore.getState()

  beforeEach(() => {
    useFetchStatusStore.setState(originalState)
  })

  test('renders_the_component_and_the_correct_number_of_episodes', () => {
    const component = render(<ListOfEpisodesHeader numberOfEpisodes={1} />)
    expect(component.container).toHaveTextContent('1')
  })

  test('renders_-_when_numberOfEpisodes_is_0', () => {
    const component = render(<ListOfEpisodesHeader numberOfEpisodes={0} />)
    expect(component.container).toHaveTextContent('-')
  })

  test('rendes_a_loading_message_when_isLoading_is_true', () => {
    const component = render(<ListOfEpisodesHeader numberOfEpisodes={1} />)
    const { setLoading } = renderHook(() => useFetchStatusStore()).result
      .current
    act(() => {
      setLoading(true)
    })
    expect(component.getByText('Loading...')).toBeInTheDocument()
  })
})

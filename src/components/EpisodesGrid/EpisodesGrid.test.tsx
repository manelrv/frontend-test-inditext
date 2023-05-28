import '@testing-library/jest-dom/extend-expect'
import {
  act,
  fireEvent,
  render,
  renderHook,
  RenderResult
} from '@testing-library/react'
import EpisodesGrid from './index'
import { PodcastEpisodeRow } from '../../infrastructure/types/types'
import { BrowserRouter } from 'react-router-dom'
import convertDate from '../../infrastructure/utils/convertDate/convertDate'
import useFetchStatusStore from '../../infrastructure/stores/fecthStatusStore'

describe('EpisodesGrid', () => {
  const podcastId = '123'
  let component: RenderResult
  const originalState = useFetchStatusStore.getState()
  const episodes: PodcastEpisodeRow[] = [
    {
      title: 'Test Episode 1',
      date: '2020-02-25T03:00:00Z',
      duration: '30:00',
      episodeId: '001'
    },
    {
      title: 'Test Episode 2',
      date: '2020-02-26T03:00:00Z',
      duration: '32:20',
      episodeId: '002'
    }
  ]

  beforeEach(() => {
    useFetchStatusStore.setState(originalState)
    component = render(
      <BrowserRouter>
        <EpisodesGrid episodes={episodes} podcastId={podcastId} />
      </BrowserRouter>
    )
  })

  test('renders_the_component_correctly_when_episodes_lenght_is_bigger_than_0', () => {
    expect(component.container).toHaveTextContent(episodes[0].title)
    expect(component.container).toHaveTextContent(convertDate(episodes[0].date))
    expect(component.container).toHaveTextContent(episodes[0].duration)
    expect(component.container).toHaveTextContent(episodes[1].title)
    expect(component.container).toHaveTextContent(convertDate(episodes[1].date))
    expect(component.container).toHaveTextContent(episodes[1].duration)
  })

  test('renders_the_component_correctly_when_episodes_lenght_is_0', () => {
    component = render(
      <BrowserRouter>
        <EpisodesGrid episodes={[]} podcastId={podcastId} />
      </BrowserRouter>
    )
    expect(component.container).toHaveTextContent('No episodes found')
  })

  test('component_shows_a_loading_indicator_when_loading_is_true', () => {
    const { setLoading } = renderHook(() => useFetchStatusStore()).result
      .current
    act(() => {
      setLoading(true)
    })
    expect(component.container).toHaveTextContent('Loading...')
  })

  test('test_clicking_podcast_title_navigates_to_podcast_detail', () => {
    fireEvent.click(component.getByText(episodes[0].title))
    expect(window.location.pathname).toBe(
      `/podcast/${podcastId}/episode/${episodes[0].episodeId}`
    )
  })
})

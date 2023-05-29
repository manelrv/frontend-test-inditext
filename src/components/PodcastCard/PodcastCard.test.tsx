import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter } from 'react-router-dom'
import PodcastCard from './PodcastCard'
import {
  act,
  fireEvent,
  render,
  renderHook,
  RenderResult
} from '@testing-library/react'
import usePodcastsStore from '../../infrastructure/stores/podcastsStore'

describe('<PodcastCard/>', () => {
  const podcastId = 'validId'
  const originalState = usePodcastsStore.getState()
  let component: RenderResult

  const podcasts = [
    {
      podcastId: podcastId,
      name: 'validName',
      artist: 'validArtist',
      image: 'validImage',
      description: 'validDescription'
    }
  ]

  // let component: RenderResult
  beforeEach(() => {
    usePodcastsStore.setState(originalState)
    const { setPodcasts } = renderHook(() => usePodcastsStore()).result.current
    act(() => {
      setPodcasts(podcasts)
    })
    component = render(
      <BrowserRouter>
        <PodcastCard podcastId={podcastId} />
      </BrowserRouter>
    )
  })

  test('test_podcast_card_renders_with_valid_podcast_id_and_does_not_allow_navigation', () => {
    expect(component.getByText(podcasts[0].name)).toBeInTheDocument()
    expect(component.getByText(podcasts[0].description)).toBeInTheDocument()
    expect(component.getByText(`by ${podcasts[0].artist}`)).toBeInTheDocument()
  })

  test('test_podcast_card_renders_with_valid_podcast_id_and_allows_navigation', () => {
    component.rerender(
      <BrowserRouter>
        <PodcastCard
          podcastId={podcastId}
          allowNavigateToListOfEpisodes={true}
        />
      </BrowserRouter>
    )
    expect(component.getByText(podcasts[0].name)).toBeInTheDocument()
    expect(component.getByText(podcasts[0].description)).toBeInTheDocument()
    expect(component.getByText(`by ${podcasts[0].artist}`)).toBeInTheDocument()
    fireEvent.click(component.getByText(podcasts[0].name))
    expect(window.location.pathname).toBe(`/podcast/${podcastId}`)
  })
})

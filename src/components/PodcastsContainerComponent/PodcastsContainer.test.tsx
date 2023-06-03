import '@testing-library/jest-dom/extend-expect'
import { act, render, renderHook, RenderResult } from '@testing-library/react'
import PodcastsContainer from './PodcastsContainer'
import { Podcast } from '../../infrastructure/types/types'
import { BrowserRouter } from 'react-router-dom'
import useFetchStatusStore from '../../infrastructure/stores/fecthStatusStore'

describe('PodcastsContainer', () => {
  const originalState = useFetchStatusStore.getState()
  const podcasts: Podcast[] = [
    {
      podcastId: '1',
      name: 'Podcast 1',
      description: 'Description 1',
      image: 'https://via.placeholder.com/150',
      artist: 'Artist 1'
    },
    {
      podcastId: '2',
      name: 'Podcast 2',
      description: 'Description 2',
      image: 'https://via.placeholder.com/150',
      artist: 'Artist 2'
    },
    {
      podcastId: '3',
      name: 'Podcast 3',
      description: 'Description 3',
      image: 'https://via.placeholder.com/150',
      artist: 'Artist 3'
    }
  ]
  let component: RenderResult
  beforeEach(() => {
    useFetchStatusStore.setState(originalState)
    component = render(
      <BrowserRouter>
        <PodcastsContainer podcasts={podcasts} />
      </BrowserRouter>
    )
  })

  test('should_render_podcast_summary_for_each_podcast', () => {
    podcasts.forEach((podcast, index) => {
      expect(component.container).toHaveTextContent(podcast.name.toUpperCase())
      expect(component.container).toHaveTextContent(`Author: ${podcast.artist}`)
      expect(component.container.querySelectorAll('img')[index]).toHaveProperty(
        'src',
        podcast.image
      )
    })
  })

  test('component_shows_a_loading_indicator_when_loading_is_true', () => {
    const { setLoading } = renderHook(() => useFetchStatusStore()).result
      .current
    act(() => {
      setLoading(true)
    })
    expect(component.container).toHaveTextContent('Loading...')
  })
})

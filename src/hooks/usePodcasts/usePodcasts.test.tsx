import '@testing-library/jest-dom/extend-expect'
import usePodcasts from './usePodcasts'
import { act, renderHook } from '@testing-library/react'
import usePodcastsStore from '../../infrastructure/stores/podcastsStore'
import { Podcast } from '../../infrastructure/types/types'
describe('usePodcasts', () => {
  const originalState = usePodcastsStore.getState()

  const podcasts: Podcast[] = [
    {
      podcastId: '1',
      name: 'Podcast 1',
      image: 'Image 1',
      artist: 'Artist 1',
      description: 'Description 1'
    }
  ]

  jest.mock(
    '../../infrastructure/services/podcasts/getPodcasts/getPodcasts',
    () => jest.fn(() => Promise.resolve(podcasts))
  )

  beforeEach(() => {
    usePodcastsStore.setState(originalState)
  })

  test('should_return_podcasts_from_podcasts_store', async () => {
    const { setPodcasts } = renderHook(() => usePodcastsStore()).result.current
    act(() => {
      setPodcasts(podcasts)
    })
    const { result } = await renderHook(() => usePodcasts())
    expect(result.current.podcasts).toEqual(podcasts)
  })
})

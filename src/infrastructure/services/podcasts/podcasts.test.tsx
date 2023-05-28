import axios from 'axios'
import { getPodcasts } from './getPodcasts/getPodcasts'
import { Podcast, PodcastDetails } from '../../types/types'
import { getPodcastDetailsById } from './getPodcastDetailsById/getPodcastDetailsById'

jest.mock('axios')

describe('getPodcasts', () => {
  test('should_return_null_if_no_podcasts', async () => {
    axios.get = jest.fn().mockResolvedValueOnce({ data: {} })

    const cancelToken = axios.CancelToken.source()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await getPodcasts({ cancelToken })

    expect(result).toBeNull()
  })

  test('should_return_a_valid_podcasts_list', async () => {
    const mockResponse = {
      data: {
        feed: {
          entry: [
            {
              id: { attributes: { 'im:id': '1' } },
              'im:name': { label: 'Podcast 1' },
              'im:image': [
                { label: 'image1' },
                { label: 'image2' },
                { label: 'image3' }
              ],
              'im:artist': { label: 'Artist 1' },
              summary: { label: 'Summary 1' }
            },
            {
              id: { attributes: { 'im:id': '2' } },
              'im:name': { label: 'Podcast 2' },
              'im:image': [
                { label: 'image1' },
                { label: 'image2' },
                { label: 'image3' }
              ],
              'im:artist': { label: 'Artist 2' },
              summary: { label: 'Summary 2' }
            }
          ]
        }
      }
    }

    axios.get = jest.fn().mockResolvedValueOnce(mockResponse)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await getPodcasts({ cancelToken: '' })
    const expected: Podcast[] = [
      {
        podcastId: '1',
        name: 'Podcast 1',
        image: 'image3',
        artist: 'Artist 1',
        description: 'Summary 1'
      },
      {
        podcastId: '2',
        name: 'Podcast 2',
        image: 'image3',
        artist: 'Artist 2',
        description: 'Summary 2'
      }
    ]

    expect(result).toEqual(expected)
  })
})

describe('getPodcastDetailsById', () => {
  test('should_return_null_if_no_response', async () => {
    axios.get = jest.fn().mockResolvedValueOnce(null)

    const result = await getPodcastDetailsById({
      podcastId: '1',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cancelToken: ''
    })

    expect(result).toBeNull()
  })

  it('should_return_podcast_details_correctly', async () => {
    const mockResponse = {
      data: {
        contents:
          '{"resultCount":1,"results": [{"trackId":1, "releaseDate":"2023-01-01T04:00:00Z"}, {"trackTimeMillis":600000, "collectionId":1, "description":"Description 1", "releaseDate":"2023-01-01", "trackId":1, "trackName":"Episode 1", "previewUrl":"previewUrl1"}]}',
        status: {
          url: 'https://itunes.apple.com/lookup?id=1&media=podcast&entity=podcastEpisode&limit=1',
          content_type: 'text/javascript; charset=utf-8',
          http_code: 200,
          response_time: 66,
          content_length: 1323
        }
      }
    }

    axios.get = jest.fn().mockResolvedValueOnce(mockResponse)

    const result = await getPodcastDetailsById({
      podcastId: '1',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cancelToken: ''
    })
    //
    const expected: PodcastDetails = {
      podcastId: '1',
      timestamp: expect.any(Number),
      episodes: [
        {
          episodeId: '1',
          title: 'Episode 1',
          date: '2023-01-01',
          duration: '10:00',
          description: 'Description 1',
          streamUrl: 'previewUrl1'
        }
      ]
    }
    expect(result).toEqual(expected)
  })
})

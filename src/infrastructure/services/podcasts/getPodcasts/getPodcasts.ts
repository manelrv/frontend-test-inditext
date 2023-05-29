import axios, { CancelToken } from 'axios'
import { URL_GET_PODCASTS } from '../../../constants/constants'
import { Podcast } from '../../../types/types'

/**
 * This function retrieves a list of podcasts from a specified URL and returns an array of Podcast objects.
 * @param  - The function `getPodcasts` takes in an object with an optional `cancelToken` property, which is of type
 * `CancelToken`. The `cancelToken` is used to cancel the request if needed. The function returns an array of `Podcast`
 * objects, where each object has the properties
 * @returns The function `getPodcasts` returns an array of `Podcast` objects. If there is an error or if the response does
 * not contain any podcasts, it returns `null`.
 */
export const getPodcasts = async ({
  cancelToken
}: {
  cancelToken?: CancelToken
}):Promise<null | Podcast[]> => {
  const response = await axios
    .get(URL_GET_PODCASTS, { cancelToken })
    .catch((error) => {
      console.error({ message: error.message, stack: error.stack })
    })
  const rawPodcasts = response?.data?.feed?.entry
  if (!rawPodcasts) return null
  return rawPodcasts.map((podcast: any) => {
    return {
      podcastId: podcast.id.attributes['im:id'],
      name: podcast['im:name'].label,
      image: podcast['im:image'][2].label,
      artist: podcast['im:artist'].label,
      description: podcast.summary.label
    } as Podcast
  })
}

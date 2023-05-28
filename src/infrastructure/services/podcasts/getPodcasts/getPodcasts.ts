import axios, { CancelToken } from 'axios'
import { URL_GET_PODCASTS } from '../../../constants/constants'
import { Podcast } from '../../../types/types'

export const getPodcasts = async ({
  cancelToken
}: {
  cancelToken?: CancelToken
}) => {
  const response = await axios
    .get(URL_GET_PODCASTS, { cancelToken })
    .catch((error) => {
      console.error({ message: error.message, stack: error.stack })
    })
  const rawPodcasts = response?.data?.feed?.entry
  if (!rawPodcasts) return null
  return rawPodcasts.map((podcast: any) => {
    console.log({ podcast: podcast['im:image'][2].label })
    return {
      podcastId: podcast.id.attributes['im:id'],
      name: podcast['im:name'].label,
      image: podcast['im:image'][2].label,
      artist: podcast['im:artist'].label,
      description: podcast.summary.label
    } as Podcast
  })
}

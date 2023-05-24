import { useEffect } from 'react'
import { getPodcasts } from '../../infrastructure/services/podcasts/podcasts'
import usePodcastsStore from '../../infrastructure/stores/podcastsStore'
import checkElapsedTime from '../../infrastructure/utils/checkElapsedTime'
import useFetchStatusStore from '../../infrastructure/stores/fecthStatusStore'
import axios from 'axios'

const usePodcasts = () => {
  const { podcasts, setPodcasts, timestamp, setTimestamp } = usePodcastsStore()
  const { setLoading } = useFetchStatusStore()
  useEffect(() => {
    if (podcasts.length > 0 && checkElapsedTime(timestamp)) return
    const now = Date.now()
    const source = axios.CancelToken.source()
    const fetchPodcasts = async () => {
      setLoading(true)
      const newpodcasts = await getPodcasts({ cancelToken: source.token })
      setPodcasts(newpodcasts)
      setTimestamp(now)
      setLoading(false)
    }
    fetchPodcasts()
    return () => {
      source.cancel('Podcasts request cancelled')
      setLoading(false)
    }
  }, [])

  const getPodcastById = (id: string) => {
    return podcasts.find((podcast) => podcast.podcastId === id)
  }

  return { podcasts, getPodcastById }
}

export default usePodcasts

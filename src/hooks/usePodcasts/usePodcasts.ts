import { useEffect } from 'react'
import { getPodcasts } from '../../services/podcasts/podcasts'
import usePodcastsStore from '../../stores/podcastsStore'

const MILLISECONDS_IN_HOUR = 3600000
const DELAY_IN_HOURS = 24

const usePodcasts = () => {
  const { podcasts, setPodcasts, timestamp, setTimestamp } = usePodcastsStore()

  useEffect(() => {
    const now = Date.now()
    if (
      podcasts.length > 0 &&
      (now - timestamp) / MILLISECONDS_IN_HOUR < DELAY_IN_HOURS
    )
      return
    const fetchPodcasts = async () => {
      const newpodcasts = await getPodcasts()
      setPodcasts(newpodcasts)
      setTimestamp(now)
    }
    fetchPodcasts()
  }, [])
  return { podcasts }
}

export default usePodcasts

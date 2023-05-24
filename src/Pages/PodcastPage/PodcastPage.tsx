import { useParams } from 'react-router-dom'
import usePodcasts from '../../hooks/usePodcasts'
import { Podcast } from '../../infrastructure/types/types'
import { useMemo } from 'react'
import PodcastCard from '../../components/PodcastCard'

const PodcastPage = () => {
  const { podcastId } = useParams()
  const { getPodcastById } = usePodcasts()
  const podcast: Podcast = useMemo(
    () => getPodcastById(podcastId ?? '') ?? ({} as Podcast),
    [podcastId]
  )
  console.log({ podcast })
  return (
    <div className={'podcast-page grid grid-cols-3 gap-10'}>
      <section className={''}>
        <PodcastCard podcast={podcast} />
      </section>
      <section className={'col-span-2 bg-blue-100'}>{podcastId}</section>
    </div>
  )
}

export default PodcastPage

import { useParams } from 'react-router-dom'
import usePodcasts from '../../hooks/usePodcasts'
import { Podcast } from '../../infrastructure/types/types'
import { useMemo } from 'react'
import PodcastCard from '../../components/PodcastCard'
import usePodcastsDetails from '../../hooks/usePodcastsDetails'
import ListOfEpisodesHeader from '../../components/ListOfEpisodesHeader'
import EpisodesGrid from '../../components/EpisodesGrid'

const PodcastPage = () => {
  const { podcastId } = useParams()
  const { getPodcastById } = usePodcasts()
  const { currentPodcastDetails, numberOfEpisodes } = usePodcastsDetails(
    podcastId ?? ''
  )
  console.log({ currentPodcastDetails })
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
      <section className={'col-span-2 flex flex-col gap-8'}>
        <ListOfEpisodesHeader numberOfEpisodes={numberOfEpisodes} />
        <EpisodesGrid
          episodes={currentPodcastDetails?.episodes ?? []}
          podcastId={currentPodcastDetails.podcastId}
        />
      </section>
    </div>
  )
}

export default PodcastPage

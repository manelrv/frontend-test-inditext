import { useParams } from 'react-router-dom'
import PodcastCard from '../../components/PodcastCard'
import usePodcastsDetails from '../../hooks/usePodcastsDetails'
import ListOfEpisodesHeader from '../../components/ListOfEpisodesHeader'
import EpisodesGrid from '../../components/EpisodesGrid'

const PodcastPage = () => {
  const { podcastId } = useParams()
  const { currentPodcastDetails, numberOfEpisodes } = usePodcastsDetails(
    podcastId ?? ''
  )

  return (
    <div className={'podcast-page grid grid-cols-3 gap-10'}>
      <section>
        <PodcastCard podcastId={podcastId ?? ''} />
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

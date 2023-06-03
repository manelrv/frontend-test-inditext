import { useParams } from 'react-router-dom'
import PodcastCard from '../../components/PodcastCardComponent/PodcastCard'
import usePodcastsDetails from '../../hooks/usePodcastsDetailsHook/usePodcastsDetails'
import ListOfEpisodesHeader from '../../components/ListOfEpisodesHeaderComponent/ListOfEpisodesHeader'
import EpisodesGrid from '../../components/EpisodesGridCompoment/EpisodesGrid'

const Podcast = () => {
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

export default Podcast

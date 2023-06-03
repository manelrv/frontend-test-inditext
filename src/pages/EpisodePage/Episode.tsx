import { useParams } from 'react-router-dom'
import usePodcastsDetails from '../../hooks/usePodcastsDetails'
import PodcastCard from '../../components/PodcastCardComponent/PodcastCard'
import { PodcastEpisode } from '../../infrastructure/types/types'
import EpisodeDetails from '../../components/EpisodeDetailsComponent/EpisodeDetails'

const Episode = () => {
  const { podcastId, episodeId } = useParams()
  const { getEpisodeByPodcastAndEpisodeId } = usePodcastsDetails()
  const episode: PodcastEpisode | undefined = getEpisodeByPodcastAndEpisodeId({
    podcastId: podcastId ?? '',
    episodeId: episodeId ?? ''
  })
  return (
    <div className={'episode-page grid grid-cols-3 gap-10'}>
      <section>
        <PodcastCard
          podcastId={podcastId ?? ''}
          allowNavigateToListOfEpisodes={true}
        />
      </section>
      <section className={'col-span-2 flex flex-col gap-8'}>
        <EpisodeDetails episode={episode as PodcastEpisode} />
      </section>
    </div>
  )
}

export default Episode

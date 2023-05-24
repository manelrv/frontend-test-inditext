import { PodcastEpisodeRow } from '../../../../infrastructure/types/types'
import { convertDate } from '../../../../infrastructure/utils/convertDate'
interface EpisodeRowProps {
  podcastId: string
  episode: PodcastEpisodeRow
  index: number
}
const EpisodeRow = ({ podcastId, episode, index }: EpisodeRowProps) => {
  const { title, date, duration, episodeId } = episode
  console.log({ title, date, duration, podcastId, episodeId })
  return (
    <div
      className={`episode-row grid grid-cols-6 p-2 text-lg ${
        index % 2 === 0 ? 'border-y bg-zinc-50' : ' bg-white'
      }`}
    >
      <p
        className={
          'col-span-4 cursor-pointer truncate text-blue-500 hover:underline'
        }
      >
        {title}
      </p>
      <p>{convertDate(date)}</p>
      <p>{duration}</p>
    </div>
  )
}

export default EpisodeRow

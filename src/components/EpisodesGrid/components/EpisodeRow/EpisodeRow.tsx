import { PodcastEpisodeRow } from '../../../../infrastructure/types/types'
import { convertDate } from '../../../../infrastructure/utils/convertDate'
import { useNavigate } from 'react-router-dom'
interface EpisodeRowProps {
  podcastId: string
  episode: PodcastEpisodeRow
  index: number
}
const EpisodeRow = ({ podcastId, episode, index }: EpisodeRowProps) => {
  const navigate = useNavigate()
  const { title, date, duration, episodeId } = episode
  const handleClick = () => {
    navigate(`/podcast/${podcastId}/episode/${episodeId}`)
  }
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
        onClick={handleClick}
      >
        {title}
      </p>
      <p>{convertDate(date)}</p>
      <p>{duration}</p>
    </div>
  )
}

export default EpisodeRow

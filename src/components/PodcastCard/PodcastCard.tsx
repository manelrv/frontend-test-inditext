import usePodcasts from '../../hooks/usePodcasts'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

interface PodcastCardProps {
  podcastId: string
  allowNavitateToListOfEpisodes?: boolean
}
const PodcastCard = ({
  podcastId,
  allowNavitateToListOfEpisodes = false
}: PodcastCardProps) => {
  const { getPodcastById } = usePodcasts()
  const navigate = useNavigate()
  const handleClick = () => {
    if (allowNavitateToListOfEpisodes) {
      navigate(`/podcast/${podcastId}`)
    }
  }
  const podcast = useMemo(() => getPodcastById(podcastId), [])
  return (
    <div
      className={
        'podcast-card flex flex-col gap-4 divide-y-2 border border-gray-50 px-4 py-6 shadow-xl'
      }
    >
      <img
        src={podcast?.image}
        alt={podcast?.name}
        className={`px-10 ${allowNavitateToListOfEpisodes && 'cursor-pointer'}`}
        onClick={handleClick}
      />
      <p
        className={`py-4 ${allowNavitateToListOfEpisodes && 'cursor-pointer'}`}
        onClick={handleClick}
      >
        <span className={'text-2xl font-bold'}>{podcast?.name}</span>
        <span className={'block italic'}>{`by ${podcast?.artist}`}</span>
      </p>
      <p className={'overflow-hidden text-ellipsis py-4'}>
        <span className={'text-xl font-bold'}>Description:</span>
        <span className={'block pt-2 italic'}>{podcast?.description}</span>
      </p>
    </div>
  )
}

export default PodcastCard

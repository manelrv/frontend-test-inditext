import useFetchStatusStore from '../../infrastructure/stores/fecthStatusStore'
import Loading from '../Loading'

interface ListOfEpisodesHeaderProps {
  numberOfEpisodes: number
}
const ListOfEpisodesHeader = ({
  numberOfEpisodes
}: ListOfEpisodesHeaderProps) => {
  const { loading } = useFetchStatusStore()
  if (loading) {
    return <Loading small={true} />
  }
  return (
    <div
      className={
        'h-16 w-full border border-gray-50 p-4 text-3xl font-bold shadow-lg'
      }
    >
      <p>{`Episodes: ${numberOfEpisodes > 0 ? numberOfEpisodes : '-'}`}</p>
    </div>
  )
}

export default ListOfEpisodesHeader

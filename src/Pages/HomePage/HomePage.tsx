import useFilter from '../../hooks/useFilter'
import PodcastsContainer from '../../components/PodcastsContainer/PodcastsContainer'
import InputSearch from '../../components/InputSearch'

const HomePage = () => {
  const { podcasts, handleFilter, filter } = useFilter()
  return (
    <div className={'home-page flex flex-col gap-10'}>
      <InputSearch
        filter={filter}
        handleFilter={handleFilter}
        podcastsCount={podcasts.length}
      />
      <PodcastsContainer podcasts={podcasts} />
    </div>
  )
}

export default HomePage

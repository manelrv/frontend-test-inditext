import '@testing-library/jest-dom/extend-expect'
import EpisodeDetails from './EpisodeDetails'
import { render } from '@testing-library/react'
import { PodcastEpisode } from '../../infrastructure/types/types'

describe('EpisodeDetails', () => {
  test('renders_the_component_whith_correct_episode', async () => {
    const episode: PodcastEpisode = {
      episodeId: '999999999',
      title: 'EpisodeTitle',
      date: '12/12/1212',
      duration: '00:00:00',
      description: 'This is a description',
      streamUrl: 'https://www.google.com'
    }
    const component = render(<EpisodeDetails episode={episode} />)
    expect(component.container).toHaveTextContent('This is a description')
    expect(component.container).toHaveTextContent('EpisodeTitle')
  })

  test('renders_the_component_whith_empty_episode', async () => {
    const episode: PodcastEpisode = {
      episodeId: '',
      title: '',
      date: '',
      duration: '',
      description: '',
      streamUrl: ''
    }
    const component = render(<EpisodeDetails episode={episode} />)
    expect(component.container).toHaveTextContent('No title')
    expect(component.container).toHaveTextContent('No description supplied')
    expect(component.container).toHaveTextContent('No audio available')
  })
})

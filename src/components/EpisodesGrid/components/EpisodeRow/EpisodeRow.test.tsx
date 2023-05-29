import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import EpisodeRow from './EpisodeRow'
import convertDate from '../../../../infrastructure/utils/convertDate/convertDate'
describe('<EpisodeRow/>', () => {
  let component: RenderResult
  const podcastId = '123'
  const episode = {
    title: 'Test Episode',
    date: '2020-02-25T03:00:00Z',
    duration: '30:00',
    episodeId: '456'
  }
  beforeEach(() => {
    const index = 0
    component = render(
      <BrowserRouter>
        <EpisodeRow podcastId={podcastId} episode={episode} index={index} />
      </BrowserRouter>
    )
  })
  test('renders_the_component', () => {
    expect(component.container).toHaveTextContent(episode.title)
    expect(component.container).toHaveTextContent(episode.duration)
    expect(component.container).toHaveTextContent(convertDate(episode.date))
  })

  test('test_clicking_podcast_title_navigates_to_podcast_detail', () => {
    // const navigateMock = jest.fn()
    fireEvent.click(component.getByText(episode.title))
    expect(window.location.pathname).toBe(
      `/podcast/${podcastId}/episode/${episode.episodeId}`
    )
  })
})

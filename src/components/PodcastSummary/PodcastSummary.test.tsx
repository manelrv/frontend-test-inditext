import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import PodcastSummary from './PodcastSummary'
import { PodcastSummaryType } from '../../infrastructure/types/types'
import { BrowserRouter } from 'react-router-dom'

describe('PodcastSummary', () => {
  const podcast: PodcastSummaryType = {
    podcastId: '1',
    name: 'pocast name',
    image: '/image',
    artist: 'artist name'
  }
  let component: RenderResult

  beforeEach(() => {
    component = render(
      <BrowserRouter>
        <PodcastSummary podcast={podcast} />
      </BrowserRouter>
    )
  })

  test('renders_podcast_summary_with_correct_data', () => {
    expect(component.container).toHaveTextContent(`Author: ${podcast.artist}`)
    expect(component.container).toHaveTextContent(podcast.artist)
    expect(component.getByRole('img')).toHaveAttribute('src', podcast.image)
    // expect(component.container).toHaveTextContent(podcast.image)
  })

  test('test_clicking_summary_navigates_to_correct_podcast_page_when_click_on_component', () => {
    // const navigateMock = jest.fn()
    fireEvent.click(
      component
        .getByText(`Author: ${podcast.artist}`)
        .closest('div') as HTMLElement
    )
    expect(window.location.pathname).toBe(`/podcast/${podcast.podcastId}`)
  })
})

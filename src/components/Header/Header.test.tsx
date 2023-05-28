import Header from './Header'
import { render, renderHook, RenderResult, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter } from 'react-router-dom'

import useFetchStatusStore from '../../infrastructure/stores/fecthStatusStore'

describe('<Header/>', () => {
  let component: RenderResult
  const originalState = useFetchStatusStore.getState()
  beforeEach(() => {
    useFetchStatusStore.setState(originalState)
    component = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
  })

  test('renders_the_component', () => {
    expect(component.container).toHaveTextContent('Podcaster')
  })

  test('renders_a_indicator_when_isLoading_state_from_store_is_true', () => {
    const { setLoading } = renderHook(() => useFetchStatusStore()).result
      .current
    act(() => {
      setLoading(true)
    })
    expect(component.getByTestId('loading-signal')).toBeInTheDocument()
  })

  test('does_not_render_a_indicator_when_isLoading_state_from_store_is_false', () => {
    const loadingCircle = component.queryByTestId('loading-signal')
    expect(loadingCircle).not.toBeInTheDocument()
  })

  test('Cant_navigate_to_home_when_on_home', async () => {
    expect(component.getByText('Podcaster').closest('button')).toBeDisabled()
  })

  test('Can_navigate_to_home_when_not_on_home', async () => {
    Object.defineProperty(window, 'location', {
      value: { pathname: '/not-at-home-page' },
      writable: true
    })

    component.rerender(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
    expect(
      component.getByText('Podcaster').closest('button')
    ).not.toBeDisabled()
  })

  test('Styling is correct', () => {
    expect(component.getByTestId('home-button').firstChild).toHaveClass(
      'items-center text-2xl font-bold text-blue-600'
    )
  })
})

import Header from '../Header'
import { render, renderHook, RenderResult, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter } from 'react-router-dom'

import useFetchStatusStore from '../../../infrastructure/stores/fecthStatusStore'

describe('<Header/>', () => {
  let component: RenderResult
  jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn()
  }))
  beforeEach(() => {
    component = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
  })

  test('renders the component', () => {
    expect(component.container).toHaveTextContent('Podcaster')
  })

  test('renders a indicator when isLoading state from store is true', () => {
    const { setLoading } = renderHook(() => useFetchStatusStore()).result
      .current
    act(() => {
      setLoading(true)
    })
    expect(component.getByTestId('loading-signal')).toBeInTheDocument()
  })

  test('does not render a indicator when isLoading state from store is false', () => {
    const { setLoading } = renderHook(() => useFetchStatusStore()).result
      .current
    act(() => {
      setLoading(false)
    })
    const loadingCircle = component.queryByTestId('loading-signal')
    expect(loadingCircle).not.toBeInTheDocument()
  })

  test('Cant navigate to home when on home', async () => {
    expect(component.getByText('Podcaster').closest('button')).toBeDisabled()
  })

  test('Can navigate to home when not on home', async () => {
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
    const { setLoading } = renderHook(() => useFetchStatusStore()).result
      .current
    act(() => {
      setLoading(false)
    })
    expect(component.getByTestId('home-button').firstChild).toHaveClass(
      'items-center text-2xl font-bold text-blue-600'
    )
  })
})

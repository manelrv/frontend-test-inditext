import '@testing-library/jest-dom/extend-expect'
import Loading from './Loading'
import { render } from '@testing-library/react'

describe('Loading', () => {
  test('renders_the_component_with_no_props', () => {
    const component = render(<Loading />)
    expect(component.container).toHaveTextContent('Loading...')
    expect(component.getByText('Loading...')).toHaveClass('h-96')
  })
  test('renders_the_component_with_props', () => {
    const component = render(<Loading small />)
    expect(component.getByText('Loading...')).toHaveClass('h-16')
  })
})

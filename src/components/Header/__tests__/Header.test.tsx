import Header from '../Header'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('Header component', () => {
  test('renders the component', () => {
    const component = render(<Header />)
    expect(component.container).toHaveTextContent('Podcaster')
  })
})

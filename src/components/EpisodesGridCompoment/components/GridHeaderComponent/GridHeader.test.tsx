import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import GridHeader from './index'

describe('GridHeader', () => {
  test('should_render_component_correctly', () => {
    const component = render(<GridHeader />)
    expect(component.container).toHaveTextContent('Date')
    expect(component.container).toHaveTextContent('Duration')
  })
})

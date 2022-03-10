import { render, screen } from '@testing-library/react'
import RouteTree from '../RouteTree'

test('renders learn react link', () => {
    render(<RouteTree />)
    const linkElement = screen.getByText('Home')
    expect(linkElement).toBeInTheDocument()
})

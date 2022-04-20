import { render, screen } from '@testing-library/react'
import Footer from './Footer'

test('Renders NavigationBar', () => {
    render(<Footer />)
    const appFooter = screen.getByTestId('app-footer')
    expect(appFooter).toBeInTheDocument()
})

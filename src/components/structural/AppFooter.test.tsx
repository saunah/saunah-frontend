import { render, screen } from '@testing-library/react'
import AppFooter from './AppFooter'

test('AppFooter containing children', () => {
    render(
        <AppFooter>
            <div data-testid="child"></div>
        </AppFooter>
    )
    const appFooter = screen.getByTestId('app-footer')
    const child = screen.getByTestId('child')

    expect(appFooter).toBeInTheDocument()
    expect(appFooter).toContainElement(child)
})

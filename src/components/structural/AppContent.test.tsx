import { render, screen } from '@testing-library/react'
import AppContent from './AppContent'

test('AppContent containing children', () => {
    render(
        <AppContent>
            <div data-testid="child"></div>
        </AppContent>
    )
    const appContent = screen.getByTestId('app-content')
    const child = screen.getByTestId('child')

    expect(appContent).toBeInTheDocument()
    expect(appContent).toContainElement(child)
})

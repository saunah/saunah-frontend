import { render, screen } from '@testing-library/react'
import AppContainer from './AppContainer'

test('AppContainer containing children', () => {
    render(
        <AppContainer>
            <div data-testid="child"></div>
        </AppContainer>
    )
    const appContainer = screen.getByTestId('app-container')
    const child = screen.getByTestId('child')

    expect(appContainer).toBeInTheDocument()
    expect(appContainer).toContainElement(child)
})

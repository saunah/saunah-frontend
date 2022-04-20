import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './AuthProvider'
import NavigationBar from './NavigationBar'

test('Renders NavigationBar', () => {
    render(wrappedView())
    const navigationBar = screen.getByTestId('app-menu')
    expect(navigationBar).toBeInTheDocument()
})

/**
 * A helper that returns the view wrapped with
 * its needed dependencies.
 * @returns The wrapped view.
 */
const wrappedView = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <NavigationBar />
            </BrowserRouter>
        </AuthProvider>
    )
}

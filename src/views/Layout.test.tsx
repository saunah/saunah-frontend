import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import AlertProvider from './shared/AlertProvider'
import AuthProvider from './shared/AuthProvider'

test('Renders AppContainer', () => {
    render(wrappedLayout())
    const appContainer = screen.getByTestId('app-container')
    expect(appContainer).toBeInTheDocument()
})

test('Renders AppContent', () => {
    render(wrappedLayout())
    const appContent = screen.getByTestId('app-content')
    expect(appContent).toBeInTheDocument()
})

/**
 * A helper that returns the layout wrapped with
 * its needed dependencies.
 * @returns The wrapped layout.
 */
const wrappedLayout = () => {
    return (
        <AlertProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Layout />
                </BrowserRouter>
            </AuthProvider>
        </AlertProvider>
    )
}

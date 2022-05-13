import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { mockUserAPI } from '../networking/api'
import { UserMock } from '../networking/api/user.mock'
import Layout from './Layout'
import AlertProvider from './shared/AlertProvider'
import AuthProvider from './shared/AuthProvider'

describe('<Layout>', () => {
    beforeEach(() => {
        mockUserAPI(UserMock.simpleMock())
    })

    test('Renders AppContainer', async () => {
        render(wrappedLayout())
        const appContainer = await screen.findByTestId('app-container')
        expect(appContainer).toBeInTheDocument()
    })

    test('Renders AppContent', async () => {
        render(wrappedLayout())
        const appContent = await screen.findByTestId('app-content')
        expect(appContent).toBeInTheDocument()
    })
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

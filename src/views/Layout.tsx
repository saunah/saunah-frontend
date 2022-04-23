import { Outlet } from 'react-router-dom'
import AppContainer from '../components/structural/AppContainer'
import AppContent from '../components/structural/AppContent'
import Footer from './shared/Footer'
import NavigationBar from './shared/NavigationBar'

/**
 * View containing the root of the visible
 * layout hierarchy.
 * As this view contains {@link NavigationBar}, it is
 * required to wrap this view with {@link AuthProvider}
 * and {@link BrowserRouter} in order to satisfy the
 * requirements of said component.
 */
const Layout = () => {
    return (
        <AppContainer>
            <NavigationBar />

            <AppContent>
                <Outlet />
            </AppContent>

            <Footer />
        </AppContainer>
    )
}

export default Layout

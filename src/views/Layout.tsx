import { Outlet } from 'react-router-dom'
import AppContainer from '../components/structural/AppContainer'
import AppContent from '../components/structural/AppContent'
import Footer from './shared/Footer'
import NavigationBar from './shared/NavigationBar'

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

import { Link, Outlet } from 'react-router-dom'
import AppContainer from '../components/structural/AppContainer'
import AppFooter from '../components/structural/AppFooter'
import AppMenu from '../components/structural/AppMenu'
import { useAuth } from './shared/AuthProvider'

function App() {
    const { isAuthenticated, login, logout } = useAuth()

    return (
        <AppContainer>
            <AppMenu>
                <Link to="/"> Home </Link>
                <Link to="/greeting/1"> Greeting </Link>
                <Link to="/protected"> Protected </Link>
                <Link to="/showroom">Components Showroom</Link>
                <button className="bg-white px-2" onClick={login}>
                    Login
                </button>
                <button className="bg-white px-2" onClick={logout}>
                    Logout
                </button>
                <span>isAuthenticated: {`${isAuthenticated}`} </span>
            </AppMenu>

            <div className="content">
                <Outlet />
            </div>

            <AppFooter>
                <span> REACT_APP_API_BASE_URL: {process.env.REACT_APP_API_BASE_URL || '-'} </span>
                <br />
                <span> REACT_APP_TEST_VAR: {process.env.REACT_APP_TEST_VAR || '-'} </span>
            </AppFooter>
        </AppContainer>
    )
}

export default App

import { Link } from 'react-router-dom'
import AppMenu from '../../components/structural/AppMenu'
import { useAuth } from './AuthProvider'

/**
 * Content view for the navigation bar. It uses
 * the {@link AppMenu} component.
 * NavinBar depends to be wrapped in {@link AuthProvider}
 * and {@link BrowserRouter}.
 */
const NavigationBar = () => {
    const { isAuthenticated, login, logout } = useAuth()

    return (
        <AppMenu>
            <Link to="/">Home</Link>
            <Link to="/greeting/1">Greeting</Link>
            <Link to="/showroom">Showroom</Link>
            <Link to="/saunas">Saunas</Link>
            <button className="text-accent-300" onClick={login}>
                Login
            </button>
            <button className="text-accent-300" onClick={logout}>
                Logout
            </button>
            <span>isAuthenticated: {`${isAuthenticated}`} </span>
        </AppMenu>
    )
}

export default NavigationBar

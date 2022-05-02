import { Link } from 'react-router-dom'
import AppMenu from '../../components/structural/AppMenu'

/**
 * Content view for the navigation bar. It uses
 * the {@link AppMenu} component.
 * NavinBar depends to be wrapped in {@link AuthProvider}
 * and {@link BrowserRouter}.
 */
const NavigationBar = () => {
    
    return (
        <AppMenu>
            <Link to="/">Home</Link>
            <Link to="/showroom">Showroom</Link>
            <Link to="/saunas">Saunas</Link>
            <Link to="/register">Register</Link>
        </AppMenu>
    )
}

export default NavigationBar

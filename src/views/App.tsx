import { BrowserRouter } from 'react-router-dom'
import RouteTree from './RouteTree'
import AlertProvider from './shared/AlertProvider'
import AuthProvider from './shared/AuthProvider'

/**
 * Root view which will be passed to the
 * ReactDOM renderer.
 */
function App() {
    return (
        <AuthProvider>
            <AlertProvider>
                <BrowserRouter>
                    <RouteTree />
                </BrowserRouter>
            </AlertProvider>
        </AuthProvider>
    )
}

export default App

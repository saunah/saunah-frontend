import { BrowserRouter } from 'react-router-dom'
import RouteTree from './RouteTree'
import AlertProvider from './shared/AlertProvider'
import AuthProvider from './shared/AuthProvider'

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

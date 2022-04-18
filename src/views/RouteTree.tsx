import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import GreetingView from './routes/GreetingView'
import Home from './routes/Home'
import Showroom from './routes/Showroom'
import AlertProvider from './shared/AlertProvider'
import AuthProvider from './shared/AuthProvider'
import ProtectedRoute from './shared/ProtectedRoute'

const RouteTree = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AlertProvider>
                    <Routes>
                        <Route path="/" element={<App />}>
                            <Route index element={<Home />} />
                            <Route path="/greeting/:greetingId" element={<GreetingView />} />
                            <Route path="/showroom" element={<Showroom />} />
                            <Route
                                path="/protected"
                                element={<ProtectedRoute element={<div> Protected Route </div>} />}
                            />
                        </Route>
                    </Routes>
                </AlertProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default RouteTree

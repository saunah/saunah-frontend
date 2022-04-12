import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './views/App'
import Home from './views/app/Home'
import Showroom from './views/app/Showroom'
import GreetingView from './views/app/GreetingView'
import AuthProvider from './auth/AuthProvider'
import ProtectedRoute from './auth/ProtectedRoute'
import Overview from './views/app/Overview'

const RouteTree = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<Home />} />
                        <Route path="/greeting/:greetingId" element={<GreetingView />} />
                        <Route path="/Overview" element={<Overview/>}/>
                        <Route path="/showroom" element={<Showroom />} />
                        <Route path="/protected" element={<ProtectedRoute element={<div> Protected Route </div>} />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default RouteTree

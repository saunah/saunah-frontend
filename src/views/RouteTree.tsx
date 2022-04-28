import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import GreetingView from './routes/GreetingView'
import Home from './routes/Home'
import Overview from './routes/Overview'
import Showroom from './routes/Showroom'
import LoginView from './routes/LoginView'
import ProtectedRoute from './shared/ProtectedRoute'
import RegisterView from '../views/routes/RegisterView'

const RouteTree = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/greeting/:greetingId" element={<GreetingView />} />
                <Route path="/showroom" element={<Showroom />} />
                <Route path="/login" element={<LoginView />} />
                <Route path="/saunas" element={<Overview />} />
                <Route path="/protected" element={<ProtectedRoute element={<div> Protected Route </div>} />} />
                <Route path="/register" element={<RegisterView />} />
            </Route>
        </Routes>
    )
}

export default RouteTree

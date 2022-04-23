import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import GreetingView from './routes/GreetingView'
import Home from './routes/Home'
import Overview from './routes/Overview'
import Showroom from './routes/Showroom'
import ProtectedRoute from './shared/ProtectedRoute'

const RouteTree = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/greeting/:greetingId" element={<GreetingView />} />
                <Route path="/showroom" element={<Showroom />} />
                <Route path="/saunas" element={<Overview />} />
                <Route path="/protected" element={<ProtectedRoute element={<div> Protected Route </div>} />} />
            </Route>
        </Routes>
    )
}

export default RouteTree

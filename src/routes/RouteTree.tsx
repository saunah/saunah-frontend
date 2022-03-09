import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import Home from './Home'
import Test from './Test'

const RouteTree = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path="test" element={<Test />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RouteTree

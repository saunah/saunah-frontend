import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './views/App'
import Home from './views/app/Home'
import GreetingView from './views/app/GreetingView'
import LoginView from './views/app/LoginView'
import { routes, routeParams } from './routes'

const RouteTree = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path={routes.greeting(`:${routeParams.user}`)} element={<GreetingView />} />
                    <Route path={routes.login} element={<LoginView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RouteTree

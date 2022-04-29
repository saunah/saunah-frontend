import { BrowserRouter, useRoutes } from 'react-router-dom'
import useBreadcrumbs, { createRoutesFromChildren } from 'use-react-router-breadcrumbs'
import RouteTree from './RouteTree'
import AlertProvider from './shared/AlertProvider'
import AuthProvider from './shared/AuthProvider'
import BreadcrumbsRouteProvider from './shared/BreadcrumbsRouteProvider'

/**
 * Root view which will be passed to the
 * ReactDOM renderer.
 */
function App() {
    return (
        <AuthProvider>
            <AlertProvider>
                <BrowserRouter>
                    <GenerateRoutes />
                </BrowserRouter>
            </AlertProvider>
        </AuthProvider>
    )
}

export default App

const GenerateRoutes = () => {
    const appRouteObjects = createRoutesFromChildren(RouteTree())
    const breadcrumbs = useBreadcrumbs(appRouteObjects, { disableDefaults: true })
    const GeneratedRoutes = () => useRoutes(appRouteObjects)

    return (
        <BreadcrumbsRouteProvider breadcrumbs={breadcrumbs}>
            <GeneratedRoutes />
        </BreadcrumbsRouteProvider>
    )
}

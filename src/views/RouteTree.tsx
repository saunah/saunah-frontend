import { Route } from 'use-react-router-breadcrumbs'
import Layout from './Layout'
import Home from './routes/Home'
import Overview from './routes/Overview'
import SaunaEditorView from './routes/sauna/SaunaEditorView'
import Showroom from './routes/Showroom'
import LoginView from './routes/LoginView'
import { BreadcrumbRoutes } from './shared/BreadcrumbsRouter'
import ProtectedRoute from './shared/ProtectedRoute'
import RegisterView from '../views/routes/RegisterView'
import SaunaDetailBreadcrumb from './shared/SaunaDetailBreadcrumb'

const RouteTree = () => {
    return (
        <BreadcrumbRoutes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/showroom" breadcrumb="Showroom" element={<Showroom />} />
                <Route path="/login" breadcrumb="Login" element={<LoginView />} />
                <Route path="/saunas" breadcrumb="Saunas">
                    <Route index element={<Overview />} />
                    <Route path=":saunaId" breadcrumb={SaunaDetailBreadcrumb}>
                        <Route index element={<div>Sauna Details</div>} />
                        <Route path="edit" breadcrumb="Bearbeiten" element={<SaunaEditorView />} />
                    </Route>
                    <Route path="create" breadcrumb="Erstellen" element={<SaunaEditorView />} />
                </Route>
                <Route path="/protected" element={<ProtectedRoute element={<div> Protected Route </div>} />} />
                <Route path="/register" element={<RegisterView />} />
            </Route>
        </BreadcrumbRoutes>
    )
}

export default RouteTree

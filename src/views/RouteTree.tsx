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
import SaunaDetailView from './routes/sauna/SaunaDetailView'
import PriceEditorView from './routes/sauna/PriceEditorView'
import ActivationView from './routes/ActivationView'
import BookingView from './routes/sauna/BookingView'

const RouteTree = () => {
    return (
        <BreadcrumbRoutes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/showroom" breadcrumb="Showroom" element={<Showroom />} />
                <Route path="/login" breadcrumb="Login" element={<LoginView />} />
                <Route
                    path="/forgot-password"
                    breadcrumb={'Passwort vergessen'}
                    element={<div>Passwort vergessen</div>}
                />
                <Route path="/saunas" breadcrumb="Saunas">
                    <Route index element={<Overview />} />
                    <Route path="pricing" breadcrumb={'Preise'} element={<PriceEditorView />} />
                    <Route path=":saunaId" breadcrumb={SaunaDetailBreadcrumb}>
                        <Route index element={<SaunaDetailView />} />
                        <Route path="edit" breadcrumb="Bearbeiten" element={<SaunaEditorView />} />
                    </Route>
                    <Route path="create" breadcrumb="Erstellen" element={<SaunaEditorView />} />
                </Route>
                <Route path="/protected" element={<ProtectedRoute element={<div> Protected Route </div>} />} />
                <Route path="/register" element={<RegisterView />} />
                <Route path="/verify/:token" element={<ActivationView />} breadcrumb="Account aktivieren" />
            </Route>
        </BreadcrumbRoutes>
    )
}

export default RouteTree

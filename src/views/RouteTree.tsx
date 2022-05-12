import { Route } from 'use-react-router-breadcrumbs'
import Layout from './Layout'
import Home from './routes/Home'
import SaunaEditorView from './routes/sauna/SaunaEditorView'
import Showroom from './routes/Showroom'
import LoginView from './routes/users/LoginView'
import { BreadcrumbRoutes } from './shared/BreadcrumbsRouter'
import ProtectedRoute from './shared/ProtectedRoute'
import RegisterView from '../views/routes/users/RegisterView'
import SaunaDetailBreadcrumb from './shared/SaunaDetailBreadcrumb'
import SaunaDetailView from './routes/sauna/SaunaDetailView'
import PriceEditorView from './routes/sauna/PriceEditorView'
import ActivationView from './routes/users/ActivationView'
import UserEditorView from './routes/users/UserEditorView'
import Overview from './routes/sauna/Overview'
import UsersListView from './routes/users/UsersListView'
import { UserRole } from '../entities/UserRole'
import { Navigate } from 'react-router-dom'

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
                    <Route
                        path="pricing"
                        breadcrumb={'Preise'}
                        element={
                            <ProtectedRoute roles={[UserRole.Local.ADMIN]}>
                                <PriceEditorView />
                            </ProtectedRoute>
                        }
                    />
                    <Route path=":saunaId" breadcrumb={SaunaDetailBreadcrumb}>
                        <Route index element={<SaunaDetailView />} />
                        <Route
                            path="edit"
                            breadcrumb="Bearbeiten"
                            element={
                                <ProtectedRoute roles={[UserRole.Local.ADMIN]}>
                                    <SaunaEditorView />
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                    <Route path="create" breadcrumb="Erstellen" element={<SaunaEditorView />} />
                </Route>
                <Route path="/users" breadcrumb="Benutzer">
                    <Route
                        index
                        element={
                            <ProtectedRoute roles={[UserRole.Local.ADMIN]}>
                                <UsersListView />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path=":userId"
                        breadcrumb="Bearbeiten"
                        element={
                            <ProtectedRoute>
                                <UserEditorView />
                            </ProtectedRoute>
                        }
                    />
                </Route>
                <Route path="/register" breadcrumb="Registrieren" element={<RegisterView />} />
                <Route path="/verify/:token" element={<ActivationView />} breadcrumb="Account aktivieren" />
            </Route>
            <Route path="*" element={<Navigate to={'/'} />}></Route>
        </BreadcrumbRoutes>
    )
}

export default RouteTree

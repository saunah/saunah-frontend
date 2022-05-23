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
import { Navigate, Outlet } from 'react-router-dom'
import BookingView from './routes/sauna/BookingView'
import BookingListView from './routes/booking/BookingListView'
import BookingEditorView from './routes/booking/BookingEditorView'
import BookingDetailView from './routes/booking/BookingDetailView'
import ProfileView from './routes/users/ProfileView'
import ResetPasswordView from './routes/ResetPasswordView'
import NewPasswordView from './routes/NewPasswordView'
import Datenschutz from '../components/users/Datenschutz'

const RouteTree = () => {
    return (
        <BreadcrumbRoutes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/showroom" breadcrumb="Showroom" element={<Showroom />} />
                <Route path="/login" breadcrumb="Login" element={<LoginView />} />
                <Route path="/reset-password" breadcrumb="Password vergessen">
                    <Route index element={<ResetPasswordView />} />
                    <Route path=":token" breadcrumb="Passwort setzen" element={<NewPasswordView />} />
                </Route>
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
                            path="book"
                            breadcrumb="Buchen"
                            element={
                                <ProtectedRoute>
                                    <BookingView />
                                </ProtectedRoute>
                            }
                        />
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
                <Route
                    path="/bookings"
                    breadcrumb="Buchungen"
                    element={
                        <ProtectedRoute>
                            <Outlet />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<BookingListView />} />
                    <Route path=":bookingId" breadcrumb={'Details'}>
                        <Route index element={<BookingDetailView />}></Route>
                        <Route
                            path="edit"
                            breadcrumb={'Bearbeiten'}
                            element={
                                <ProtectedRoute roles={[UserRole.Local.ADMIN]}>
                                    <BookingEditorView />
                                </ProtectedRoute>
                            }
                        ></Route>
                    </Route>
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
                <Route
                    path="/profile"
                    breadcrumb={'Profil'}
                    element={
                        <ProtectedRoute>
                            <ProfileView />
                        </ProtectedRoute>
                    }
                />
                <Route path="/register" breadcrumb="Registrieren" element={<RegisterView />} />
                <Route path="/verify/:token" element={<ActivationView />} breadcrumb="Account aktivieren" />
                <Route path="/datenschutz" element={<Datenschutz />} />
            </Route>
            <Route path="*" element={<Navigate to={'/'} />}></Route>
        </BreadcrumbRoutes>
    )
}

export default RouteTree

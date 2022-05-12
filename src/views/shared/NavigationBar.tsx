import { HomeIcon, UserCircleIcon } from '@heroicons/react/solid'
import { ReactElement } from 'react'
import { BreadcrumbData } from 'use-react-router-breadcrumbs'
import AppMenu, { AppMenuTextItem } from '../../components/structural/AppMenu'
import { AlertState, useAlert } from './AlertProvider'
import { AuthState, useAuth } from './AuthProvider'
import { useBreadcrumbs } from './BreadcrumbsRouter'

/**
 * Content view for the navigation bar. It uses
 * the {@link AppMenu} component.
 * NavinBar depends to be wrapped in {@link AuthProvider}
 * and {@link BrowserRouter}.
 */
const NavigationBar = () => {
    const authState = useAuth()
    const alertState = useAlert()
    const breadcrumbs = useBreadcrumbs()

    return (
        <AppMenu
            leadingItem={{ icon: HomeIcon, url: '/' }}
            primaryItems={createBreadcrumbItems(breadcrumbs)}
            trailingItem={{ icon: UserCircleIcon, iconClasses: 'w-9 h-9' }}
            secondaryItems={createSecondaryItems(authState, alertState)}
        />
    )
}

export default NavigationBar

function createBreadcrumbItems(breadcrumbs: BreadcrumbData<string>[]): AppMenuTextItem[] {
    return breadcrumbs.map(item => ({
        title: item.breadcrumb as ReactElement,
        url: item.match.pathname,
    }))
}

function createSecondaryItems(
    { isAuthenticated, isAdmin, logout }: AuthState,
    { success }: AlertState
): AppMenuTextItem[] {
    const logoutWithSuccess = () => {
        logout()
        success('Sie haben sich ausgeloggt.')
    }

    if (isAuthenticated()) {
        const items: AppMenuTextItem[] = [{ title: 'Profil', url: '/profile' }]
        if (isAdmin()) {
            items.push(
                { title: 'Sauna erstellen', url: '/saunas/create' },
                { title: 'Preise', url: '/saunas/pricing' },
                { title: 'Benutzer', url: '/users' }
            )
        }
        items.push({ title: 'Logout', onClick: logoutWithSuccess })
        return items
    }

    return [
        { title: 'Registrieren', url: '/register' },
        { title: 'Login', url: '/login' },
    ]
}

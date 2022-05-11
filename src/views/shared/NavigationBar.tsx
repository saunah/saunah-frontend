import { HomeIcon, UserCircleIcon } from '@heroicons/react/solid'
import { ReactElement } from 'react'
import { BreadcrumbData } from 'use-react-router-breadcrumbs'
import AppMenu, { AppMenuTextItem } from '../../components/structural/AppMenu'
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
    const breadcrumbs = useBreadcrumbs()

    return (
        <AppMenu
            leadingItem={{ icon: HomeIcon, url: '/' }}
            primaryItems={createBreadcrumbItems(breadcrumbs)}
            trailingItem={{ icon: UserCircleIcon, iconClasses: 'w-9 h-9' }}
            secondaryItems={createSecondaryItems(authState)}
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

function createSecondaryItems({ isAuthenticated, isAdmin, logout }: AuthState): AppMenuTextItem[] {
    if (isAuthenticated()) {
        // TODO: Change Profile url
        const items: AppMenuTextItem[] = [{ title: 'Profil', url: '/' }]
        if (isAdmin()) {
            items.push({ title: 'Sauna erstellen', url: '/saunas/create' }, { title: 'Benutzer', url: '/users' })
        }
        items.push({ title: 'Logout', onClick: () => logout() })
        return items
    }

    return [
        { title: 'Registrieren', url: '/register' },
        { title: 'Login', url: '/login' },
    ]
}

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
            mainItems={createBreadcrumbItems(breadcrumbs)}
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

function createSecondaryItems({ isAuthenticated }: AuthState): AppMenuTextItem[] {
    return [
        { title: <>Showroom</>, url: '/showroom' },
        ...(isAuthenticated
            ? [
                  { title: <>Erstellen</>, url: '/saunas/create' },
                  { title: <>Logout</>, url: '/logout' },
              ]
            : [
                  { title: <>Register</>, url: '/register' },
                  { title: <>Login</>, url: '/login' },
              ]),
    ]
}

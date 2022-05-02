import { HomeIcon, UserCircleIcon } from '@heroicons/react/solid'
import { ReactElement } from 'react'
import { BreadcrumbData } from 'use-react-router-breadcrumbs'
import AppMenu, { AppMenuTextItem } from '../../components/structural/AppMenu'
import { useBreadcrumbs } from './BreadcrumbsRouter'

/**
 * Content view for the navigation bar. It uses
 * the {@link AppMenu} component.
 * NavinBar depends to be wrapped in {@link AuthProvider}
 * and {@link BrowserRouter}.
 */
const NavigationBar = () => {
    const breadcrumbs = useBreadcrumbs()

    return (
        <AppMenu
            leadingItem={{ icon: HomeIcon, url: '/' }}
            mainItems={createBreadcrumbItems(breadcrumbs)}
            trailingItem={{ icon: UserCircleIcon, size: 9 }}
            secondaryItems={[
                { title: 'Showroom', url: '/showroom' },
                { title: 'Register', url: '/register' },
                { title: 'Login', url: '/login' },
                { title: 'Protected', url: '/protected' },
            ]}
        />
    )
}

export default NavigationBar

function createBreadcrumbItems(breadcrumbs: BreadcrumbData<string>[]): AppMenuTextItem[] {
    return breadcrumbs.map(item => ({
        title: ((item.breadcrumb as ReactElement).props.children as string) || '',
        url: item.match.pathname,
    }))
}

import { ReactNode } from 'react'
import { HomeIcon, UserCircleIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'
import { BreadcrumbData } from 'use-react-router-breadcrumbs'
import { useBreadcrumbs } from '../../views/shared/BreadcrumbsRouteProvider'

/**
 * This component provides the structure for a
 * navigation bar. Items can be passed as children.
 */
const AppMenu = (props: AppMenuProps) => {
    const breadcrumbs = useBreadcrumbs()

    return (
        <div className="p-4 w-full fixed top-0 left-0" data-testid="app-menu">
            <div className="h-14 px-4 py-2 w-full bg-primary-100 rounded-3xl flex flex-row justify-center shrink-0 shadow-xl shadow-primary-900/[0.1]">
                <nav className="flex flex-row justify-start grow items-center space-x-4">
                    <Link to="/">
                        <HomeIcon className="h-7 w-7 text-primary-500" />
                    </Link>
                    <BreadcrumbTrail breadcrumbs={breadcrumbs} />
                </nav>
                <div className="flex flex-row justify-end grow-0 items-center space-x-4">
                    <button>
                        <UserCircleIcon className="h-8 w-8 text-primary-500" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AppMenu

export type AppMenuProps = {
    children?: ReactNode
}

type BreadcrumbTrailProps = {
    breadcrumbs: BreadcrumbData<string>[]
}

// map & render your breadcrumb components however you want.
const BreadcrumbTrail = (props: BreadcrumbTrailProps) => {
    return (
        <>
            {props.breadcrumbs.map(({ match, breadcrumb }) => (
                <span key={match.pathname}>
                    <Link to={match.pathname}>{breadcrumb}</Link>
                </span>
            ))}
        </>
    )
}

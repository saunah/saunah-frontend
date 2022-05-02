import { createContext, ReactNode, useContext } from 'react'
import { useRoutes } from 'react-router-dom'
import setupBreadcrumbs, { BreadcrumbData, createRoutesFromChildren } from 'use-react-router-breadcrumbs'

export const BreadcrumbsContext = createContext<BreadcrumbData<string>[]>([])
export const useBreadcrumbs = () => useContext(BreadcrumbsContext)

export type BreadcrumbRoutesProps = {
    children?: ReactNode
}

export const BreadcrumbRoutes = ({ children }: BreadcrumbRoutesProps) => {
    const appRouteObjects = createRoutesFromChildren(children)
    const breadcrumbs = setupBreadcrumbs(appRouteObjects, { disableDefaults: true })
    const GeneratedRoutes = () => useRoutes(appRouteObjects)

    return (
        <BreadcrumbsContext.Provider value={breadcrumbs}>
            <GeneratedRoutes />
        </BreadcrumbsContext.Provider>
    )
}

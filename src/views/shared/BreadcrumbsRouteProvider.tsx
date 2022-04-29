import { createContext, ReactNode, useContext } from 'react'
import { BreadcrumbData } from 'use-react-router-breadcrumbs'

export const BreadcrumbsContext = createContext<BreadcrumbData<string>[]>(null!)
export const useBreadcrumbs = () => useContext(BreadcrumbsContext)

export type BreadcrumbsContextProps = {
    breadcrumbs: BreadcrumbData<string>[]
    children?: ReactNode
}

const BreadcrumbsRouteProvider = (props: BreadcrumbsContextProps) => {
    return <BreadcrumbsContext.Provider value={props.breadcrumbs}>{props.children}</BreadcrumbsContext.Provider>
}

export default BreadcrumbsRouteProvider

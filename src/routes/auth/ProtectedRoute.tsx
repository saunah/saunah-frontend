import { ReactNode } from 'react'
import { Navigate } from 'react-router'
import { useAuth } from './AuthProvider'

export type ProtectedRouteProps = {
    redirectRoute?: string
    element?: ReactNode
    children?: ReactNode
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) return <Navigate to="/" />
    else return <div>{props.children || props.element}</div>
}

export default ProtectedRoute

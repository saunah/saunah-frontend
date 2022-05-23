import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router'
import { UserRole } from '../../entities/UserRole'
import { useAuth } from './AuthProvider'

export type ProtectedRouteProps = {
    roles?: UserRole.Local[]
    redirectRoute?: string
    element?: ReactNode
    children?: ReactNode
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
    const { isInitialized, me } = useAuth()
    const location = useLocation()

    if (!isInitialized) {
        return <div />
    } else if (me == null) {
        const returnTo = encodeURIComponent(location.pathname)
        return <Navigate to={`/login?redirect=${returnTo}`} replace={true} />
    } else if (props.roles && !props.roles.includes(me.role)) {
        return <Navigate to="/" replace={true} />
    } else {
        return <div>{props.children || props.element}</div>
    }
}

export default ProtectedRoute

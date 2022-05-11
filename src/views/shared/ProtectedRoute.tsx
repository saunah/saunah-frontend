import { ReactNode } from 'react'
import { Navigate } from 'react-router'
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

    if (!isInitialized) return <div />
    else if (me == null || (props.roles && !props.roles.includes(me.role))) return <Navigate to="/" replace={true} />
    else return <div>{props.children || props.element}</div>
}

export default ProtectedRoute

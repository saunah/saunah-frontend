import React, { ReactNode, useState } from 'react'
import { LoginCredentials } from '../../entities/LoginCredentials'
import api from '../../networking/api'
import cookieStore from '../../networking/cookieStore'

export type AuthState = {
    isAuthenticated: boolean
    login: (credentials: LoginCredentials.Request) => Promise<void>
    logout: () => void
}

export const AuthContext = React.createContext<AuthState>(null!)
export const useAuth = () => React.useContext(AuthContext)

export type AuthProviderProps = {
    children?: ReactNode
}

const AuthProvider = (props: AuthProviderProps) => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false)

    const login = (credentials: LoginCredentials.Request) =>
        api.user.login(credentials).then(token => {
            cookieStore.set('saunah-token', token.token)
            setAuthenticated(true)
        })

    const logout = () => {
        cookieStore.remove('saunah-token')
        setAuthenticated(false)
    }

    const state: AuthState = {
        isAuthenticated: isAuthenticated,
        login: login,
        logout: logout,
    }

    return <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
}

export default AuthProvider

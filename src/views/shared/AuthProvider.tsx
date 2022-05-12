import axios from 'axios'
import React, { ReactNode, useEffect, useState } from 'react'
import { LoginCredentials } from '../../entities/LoginCredentials'
import { User } from '../../entities/User'
import { UserRole } from '../../entities/UserRole'
import api from '../../networking/api'
import cookieStore from '../../networking/cookieStore'

export type AuthState = {
    isInitialized: boolean
    isAuthenticated: () => boolean
    isAdmin: () => boolean
    me: User.Response | null
    login: (credentials: LoginCredentials.Request) => Promise<void>
    logout: () => void
}

export const AuthContext = React.createContext<AuthState>(null!)
export const useAuth = () => React.useContext(AuthContext)

export type AuthProviderProps = {
    children?: ReactNode
}

const AuthProvider = (props: AuthProviderProps) => {
    const [user, setUser] = useState<User.Response | null>(null)
    const [isInitialized, setInitialized] = useState<boolean>(false)
    const isAuthenticated = () => user !== null
    const isAdmin = () => user?.role === UserRole.Local.ADMIN

    useEffect(() => {
        api.user
            .whoami()
            .then(setUser)
            .finally(() => setInitialized(true))
    }, [])

    const login = (credentials: LoginCredentials.Request) =>
        api.user.login(credentials).then(token => {
            cookieStore.set('saunah-token', token.token)
            api.user.whoami().then(setUser)
        })

    const logout = () => {
        setUser(null)
        cookieStore.remove('saunah-token')
    }

    axios.interceptors.response.use(
        response => response,
        error => {
            const statusCode = error?.response?.status as number | undefined
            if (statusCode === 401) {
                cookieStore.remove('saunah-token')
                setUser(null)
            }
            return Promise.reject(error)
        }
    )

    const state: AuthState = {
        isAuthenticated,
        isAdmin,
        isInitialized,
        me: user,
        login,
        logout,
    }

    return <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
}

export default AuthProvider

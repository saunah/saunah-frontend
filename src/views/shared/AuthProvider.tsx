import axios from 'axios'
import React, { ReactNode, useEffect, useState } from 'react'
import { LoginCredentials } from '../../entities/LoginCredentials'
import { User } from '../../entities/User'
import { UserRole } from '../../entities/UserRole'
import api from '../../networking/api'
import cookieStore from '../../networking/cookieStore'

export type AuthState = {
    isAuthenticated: boolean
    me: User.Response | null
    isAdmin(): boolean
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
    const [user, setUser] = useState<User.Response | null>(null)

    useEffect(() => {
        api.user.whoami().then(user => {
            setUser(user)
            setAuthenticated(true)
        })
    }, [])

    const login = (credentials: LoginCredentials.Request) =>
        api.user.login(credentials).then(token => {
            cookieStore.set('saunah-token', token.token)
            setAuthenticated(true)
        })

    const logout = () => {
        setUser(null)
        setAuthenticated(false)
        cookieStore.remove('saunah-token')
    }

    axios.interceptors.response.use(
        response => response,
        error => {
            const statusCode = error?.response?.status as number | undefined
            if (statusCode === 401) {
                cookieStore.remove('saunah-token')
                setAuthenticated(false)
            }
            return Promise.reject(error)
        }
    )

    const isAdmin = () => user?.role === UserRole.Local.ADMIN

    const state: AuthState = {
        isAuthenticated,
        login,
        logout,
        me: user,
        isAdmin,
    }

    return <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
}

export default AuthProvider

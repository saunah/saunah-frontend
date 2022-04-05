import React, { ReactNode, useState } from 'react'

export type AuthState = {
    isAuthenticated: boolean
    login: () => Promise<void>
    logout: () => void
}

export const AuthContext = React.createContext<AuthState>(null!)

export function useAuth() {
    return React.useContext(AuthContext)
}

export type AuthProviderProps = {
    children?: ReactNode
}

const AuthProvider = (props: AuthProviderProps) => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false)

    const login = async () => {
        return new Promise<void>(resolve => {
            setTimeout(() => {
                setAuthenticated(true)
                resolve()
            }, 100)
        })
    }

    const logout = () => {
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

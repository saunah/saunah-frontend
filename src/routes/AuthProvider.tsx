import React, { ReactNode, useState } from 'react'

export type AuthState = {
    isAuthenticated: boolean
    login: () => void
    logout: () => void
}

export const AuthContext = React.createContext<AuthState>(null!)

export function useAuth() {
    return React.useContext(AuthContext)
}

const AuthProvider = (props: { children: ReactNode }) => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false)

    const login = () => {
        setTimeout(() => setAuthenticated(true), 500)
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

import LoginForm from '../../components/LoginForm'
import { useState } from 'react'
import { LoginCredentials } from '../../entities/LoginCredentials'
import { useAuth } from '../shared/AuthProvider'

const LoginView = () => {
    const [user, setUser] = useState<LoginCredentials.Request>(LoginCredentials.empty())

    const { login } = useAuth()
    return (
        <div>
            <LoginForm user={user} onChange={setUser} />
        </div>
    )
}

export default LoginView

import LoginForm from '../../components/LoginForm'
import { useState } from 'react'
import { LoginCredentials } from '../../entities/LoginCredentials'
import { useAuth } from '../shared/AuthProvider'
import { useAlert } from '../shared/AlertProvider'

const LoginView = () => {
    const [user, setUser] = useState<LoginCredentials.Request>(LoginCredentials.empty())
    const { login } = useAuth()
    const { success } = useAlert()

    const onSubmit = () => {
        login(user).then(() => {
            success('Login erfolgreich')
        })
    }

    return (
        <div data-testid={'loginform'}>
            <LoginForm  user={user} onChange={setUser} onSubmit={onSubmit} />
        </div>
    )
}

export default LoginView

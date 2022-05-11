import LoginForm from '../../components/users/LoginForm'
import { useState } from 'react'
import { LoginCredentials } from '../../entities/LoginCredentials'
import { useAuth } from '../shared/AuthProvider'
import { useAlert } from '../shared/AlertProvider'
import { useNavigate } from 'react-router-dom'
import PageTitle from '../../components/base/PageTitle'

const LoginView = () => {
    const [user, setUser] = useState<LoginCredentials.Request>(LoginCredentials.empty())
    const { login } = useAuth()
    const { success } = useAlert()
    const navigate = useNavigate()

    const onSubmit = () => {
        login(user).then(() => {
            success('Login erfolgreich')
            navigate('/')
        })
    }

    return (
        <div data-testid={'loginform'}>
            <PageTitle> Login </PageTitle>
            <LoginForm user={user} onChange={setUser} onSubmit={onSubmit} />
        </div>
    )
}

export default LoginView

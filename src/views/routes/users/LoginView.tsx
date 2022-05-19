import LoginForm from '../../../components/users/LoginForm'
import { useState } from 'react'
import { LoginCredentials } from '../../../entities/LoginCredentials'
import { useAuth } from '../../shared/AuthProvider'
import { useAlert } from '../../shared/AlertProvider'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import PageTitle from '../../../components/base/PageTitle'
import Button from '../../../components/base/Button'

const LoginView = () => {
    const [user, setUser] = useState<LoginCredentials.Request>(LoginCredentials.empty())
    const { login } = useAuth()
    const { success } = useAlert()
    const navigate = useNavigate()
    const [queryParams] = useSearchParams()
    const redirect = queryParams.get('redirect')

    const onSubmit = () => {
        login(user).then(() => {
            success('Login erfolgreich')
            if (redirect) navigate(decodeURIComponent(redirect))
            else navigate('/')
        })
    }

    return (
        <div data-testid={'loginform'}>
            <PageTitle> Login </PageTitle>

            <p className="text-primary-500 mb-6">
                <span>Loggen Sie sich ein, um fortzufahren. Sie haben noch kein Konto?</span>
                <Link
                    className="font-medium"
                    to={redirect ? `/register?redirect=${encodeURIComponent(redirect)}` : '/register'}
                >
                    {' '}
                    Jetzt registrieren
                </Link>
            </p>
            <LoginForm user={user} onChange={setUser} />
            <Button data-testid="login-button" onClick={onSubmit}>
                Login
            </Button>
        </div>
    )
}

export default LoginView

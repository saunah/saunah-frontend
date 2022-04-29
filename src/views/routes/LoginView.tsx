import LoginForm from '../../components/LoginForm'
import { useState } from 'react'
import { LoginCredentials } from '../../entities/LoginCredentials'
//import { useAuth } from '../shared/AuthProvider'

const LoginView = () => {
    const [user, setUser] = useState<LoginCredentials.Request>(LoginCredentials.empty())
    // login auth noch rausgenommen, unklar wie testen
    //const { login } = useAuth()

    return (
        <div data-testid="loginID">
            <LoginForm user={user} onChange={setUser} />
        </div>
    )
}

export default LoginView

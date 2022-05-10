import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTitle from '../../components/base/PageTitle'
import RegisterForm from '../../components/RegisterForm'
import { User } from '../../entities/User'
import api from '../../networking/api'
import { useAlert } from '../shared/AlertProvider'

const RegisterView = () => {
    const [user, setUser] = useState<User.Request>(User.emptyRequest())
    const { success } = useAlert()
    const navigate = useNavigate()

    const signupUser = () => {
        api.user.signup(user).then(() => {
            success('Registration erfolgreich')
            navigate('/login')
        })
    }

    return (
        <div>
            <PageTitle>Benutzer registrieren</PageTitle>
            <RegisterForm data-testid={'registerform'} user={user} onChange={setUser} onSubmit={signupUser} />
        </div>
    )
}

export default RegisterView

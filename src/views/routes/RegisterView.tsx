import { useState } from 'react'
import RegisterForm from '../../components/RegisterForm'
import { User } from '../../entities/User'
import api from '../../networking/api'
import { useAlert } from '../shared/AlertProvider'

const RegisterView = () => {
    const [user, setUser] = useState<User.Request>(User.empty())
    const { success } = useAlert()

    const signupUser = () => {
        api.user.signup(user).then(() => {
            // print success message
            success('Registration erfolgreich')
        })
    }

    return (
        <div>
            <RegisterForm data-testid={'registerform'} user={user} onChange={setUser} onSubmit={signupUser} />
        </div>
    )
}

export default RegisterView

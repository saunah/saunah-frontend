import { useState } from 'react'
import RegisterForm from '../../../components/RegisterForm'
import { User } from '../../../entities/User'
import api from '../../../networking/api'

const RegisterView = () => {
    const [user, setUser] = useState<User.Edit>(User.empty())

    const signupUser = () => {
        api.user.signup(user).then(() => {
            // print success message
            // do other stuff
        })
    }

    return (
        <div>
            <RegisterForm user={user} onChange={setUser} />
        </div>
    )
}

export default RegisterView

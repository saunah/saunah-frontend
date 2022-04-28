import LoginForm from '../../components/LoginForm'
import { useState } from 'react'
import { User } from '../../entities/User'

const LoginView = () => {
    const [user, setUser] = useState<User.Edit>(User.empty())

    return (
        <div>
            <LoginForm user={user} onChange={setUser} />
        </div>
    )
}

export default LoginView
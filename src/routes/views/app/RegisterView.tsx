import { useState } from 'react'
import RegisterForm from '../../../components/base/RegisterForm'
import { Credentials } from '../../../entities/Credentials'

const RegisterView = () => {
    const [credentials, setCredentials] = useState<Credentials>({
        username: '',
        name: '',
        firstname: '',
        email: '',
        telephone: '',
        street: '',
        place: '',
        zip: '',
        password: '',
        repeatPassword: '',
    })

    return (
        <div>
            <RegisterForm credentials={credentials} onChange={setCredentials} />
        </div>
    )
}

export default RegisterView

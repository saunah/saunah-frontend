import InputField from './InputField'
import Button from './Button'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Credentials } from '../entities/Credentials'

export type InputFieldProps = {
    username?: string
    password?: string
}

const LoginForm = (props: InputFieldProps) => {
    const [credentials, setCredentials] = useState<Credentials>({
        username: '',
        password: '',
    })

    return (
        <div>
            <InputField
                title="Username"
                placeholder="Username"
                color="yellow"
                value={credentials.username}
                onChange={username => setCredentials({ ...credentials, username })}
            />
            <InputField
                title="Password"
                placeholder="****************"
                type="password"
                color="yellow"
                value={credentials.password}
                onChange={password => setCredentials({ ...credentials, password })}
            />
            <div className="flex items-center justify-between">
                <Button color="yellow" onClick={() => console.log('Login!')}>
                    Click me
                </Button>
                <Link
                    to="/" //change when we know where the link needs to go
                    className={`inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker`}
                >
                    Forgot Password?
                </Link>
            </div>
            username: {credentials.username} <br />
            password: {credentials.password}
        </div>
    )
}

export default LoginForm

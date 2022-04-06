import InputField from './InputField'
import Button from './Button'
import routes from '../routes/routes'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export type InputFieldProps = {
    username?: string
    password?: string
}

const LoginForm = (props: InputFieldProps) => {
    const [{ username, password }, setCredentials] = useState({
        username: props.username,
        password: props.password,
    })
    function handleCredentials(event: any) {
        setCredentials(event.target.username)
        setCredentials(event.target.password)
        console.log(event.target.username)
        console.log(event.target.password)
    }

    return (
        <div>
            <InputField title="Username" placeholder="Username" color="yellow" />
            <InputField title="Password" placeholder="****************" type="password" color="yellow" />
            <div className="flex items-center justify-between">
                <Button color="yellow" onClick={() => console.log('Login!')}>
                    Click me
                </Button>
                <Link
                    to={routes.home} //change when we know where the link needs to go
                    className={`inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker`}
                >
                    Forgot Password?
                </Link>
            </div>
        </div>
    )
}

export default LoginForm

import Button from './base/Button'
import { Link } from 'react-router-dom'
import Input from './base/Input'
import { LoginCredentials } from '../entities/LoginCredentials'

// Neuer Typ machen " Login Credentials "
export type LoginCredentials = {
    user: LoginCredentials.Edit
    onChange?: (user: LoginCredentials.Edit) => void
}

const LoginForm = (props: LoginCredentials.Edit) => {
    return (
        <div className="grid gap-4">
            <div className="ml-10 mr-10 grid gap-x-6 gap-y-2 grid-cols-1">
                <Input
                    name="Username"
                    placeholder="Username"
                    value={props.username}
                    //onChange={username => props.onChange?.({ ...props.user, username })}
                />
                <Input
                    name="Password"
                    placeholder="Password"
                    value={props.password}
                   // onChange={password => props.onChange?.({ ...props.user, password })}
                />
            </div>
            <div className="ml-20 mr-20 grid gap-x-8 gap-y-3 grid-cols-2">
                <Button onClick={() => console.log('Login')}> Login </Button>
                <Link
                    to="/" //change when we know where the link needs to go
                    className={`inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker`}
                >
                    Forgot Password?
                </Link>
            </div>
            username: {props.username} <br />
            password: {props.password}
        </div>
    )
}

export default LoginForm

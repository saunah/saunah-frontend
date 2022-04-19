import Button from './base/Button'
import { Link } from 'react-router-dom'
import Input from './base/Input'
import { User } from '../entities/User'

export type LoginFormProps = {
    user: User.Edit
    onChange?: (user: User.Edit) => void
}

const LoginForm = (props: LoginFormProps) => {
    return (
        <div className="grid gap-4">
            <div className="ml-10 mr-10 grid gap-x-6 gap-y-2 grid-cols-1">
                <Input
                    name="Username"
                    placeholder="Username"
                    value={props.user.username}
                    onChange={username => props.onChange?.({ ...props.user, username })}
                />
                <Input
                    name="Password"
                    placeholder="Password"
                    value={props.user.password}
                    onChange={password => props.onChange?.({ ...props.user, password })}
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
            username: {props.user.username} <br />
            password: {props.user.password}
        </div>
    )
}

export default LoginForm

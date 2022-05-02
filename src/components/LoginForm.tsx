import Button from './base/Button'
import { Link } from 'react-router-dom'
import Input from './base/Input'
import { LoginCredentials } from '../entities/LoginCredentials'

// eslint-disable-next-line
export type LoginCredentials = {
    user: LoginCredentials.Request
    onChange?: (user: LoginCredentials.Request) => void
    onSubmit?: () => void
}

const LoginForm = (props: LoginCredentials) => {
    return (
        <div className="space-y-2">
            <Input
                data-testid="username-input"
                name="Benutzername"
                placeholder="Benutzername"
                autoComplete="username"
                value={props.user.username}
                onChange={username => props.onChange?.({ ...props.user, username })}
            />
            <Input
                data-testid="password-input"
                name="Passwort"
                placeholder="Passwort"
                type="password"
                autoComplete="current-password"
                value={props.user.password}
                onChange={password => props.onChange?.({ ...props.user, password })}
            />
            <div className="space-x-4">
                <Button data-testid="login-button" onClick={props.onSubmit}>
                    Login
                </Button>
                <Link
                    to="/" //change when we know where the link needs to go
                    className={`inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker`}
                >
                    Forgot Password?
                </Link>
            </div>
        </div>
    )
}

export default LoginForm

import { Link } from 'react-router-dom'
import Input from './../base/Input'
import { LoginCredentials } from '../../entities/LoginCredentials'

export type LoginFormProps = {
    user: LoginCredentials.Request
    onChange?: (user: LoginCredentials.Request) => void
}

const LoginForm = (props: LoginFormProps) => {
    return (
        <div>
            <div className="space-y-2">
                <Input
                    data-testid="username-input"
                    name="Email"
                    placeholder="Email"
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
            </div>
            <div className="flex justify-end">
                <Link to="/reset-password" className="font-semibold text-sm mt-2">
                    Passwort vergessen?
                </Link>
            </div>
        </div>
    )
}

export default LoginForm

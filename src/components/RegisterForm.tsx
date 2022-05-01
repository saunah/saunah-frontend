import Input from './base/Input'
import Button from './base/Button'
import { User } from '../entities/User'

export type RegisterFormProps = {
    user: User.Request
    onChange?: (user: User.Request) => void
    onSubmit?: () => void
    ['data-testid']?: string
}

const RegisterForm = (props: RegisterFormProps) => {
    return (
        <div className="grid gap-4" data-testid={props['data-testid'] || 'register-form'}>
            <div className="ml-13 mr-13 grid gap-x-6 gap-y-2 sm:grid-cols-1 md:grid-cols-2">
                <div>
                    <Input
                        data-testid="name-input"
                        name="Name"
                        placeholder="Name"
                        value={props.user.name}
                        onChange={name => props.onChange?.({ ...props.user, name })}
                    />
                    <Input
                        data-testid="firstname-input"
                        name="Vorname"
                        placeholder="Vorname"
                        value={props.user.firstname}
                        onChange={firstname => props.onChange?.({ ...props.user, firstname })}
                    />
                    <Input
                        data-testid="mail-input"
                        name="Mail"
                        placeholder="Mail"
                        value={props.user.email}
                        onChange={email => props.onChange?.({ ...props.user, email })}
                    />
                    <Input
                        data-testid="place-input"
                        name="Ort"
                        placeholder="Ort"
                        value={props.user.place}
                        onChange={place => props.onChange?.({ ...props.user, place })}
                    />
                    <Input
                        data-testid="street-input"
                        name="Strasse"
                        placeholder="Strasse"
                        value={props.user.street}
                        onChange={street => props.onChange?.({ ...props.user, street })}
                    />
                </div>
                <div>
                    <Input
                        data-testid="password-input"
                        name="Passwort"
                        placeholder="****************"
                        type="password"
                        value={props.user.password}
                        onChange={password => props.onChange?.({ ...props.user, password })}
                        //how to check if password is valid?
                    />
                    <Input
                        data-testid="repeatPassword-input"
                        name="Passwort"
                        placeholder="****************"
                        type="password"
                        value={props.user.repeatPassword}
                        onChange={repeatPassword => props.onChange?.({ ...props.user, repeatPassword })}
                        //how to see if it's the same password?
                    />
                    <Input
                        data-testid="telephone-input"
                        name="Telefon"
                        placeholder="Telefon"
                        value={props.user.telephone}
                        onChange={telephone => props.onChange?.({ ...props.user, telephone })}
                    />
                    <Input
                        data-testid="zip-input"
                        name="PLZ"
                        placeholder="PLZ"
                        value={props.user.zip}
                        onChange={zip => props.onChange?.({ ...props.user, zip })}
                    />
                </div>
            </div>
            <div className="ml-20 mr-20 grid gap-x-8 gap-y-3 grid-cols-2">
                <Button data-testid="register-button" onClick={props.onSubmit}>
                    Register
                </Button>
            </div>
        </div>
    )
}

export default RegisterForm
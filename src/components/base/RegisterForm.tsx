import Input from './Input'
import Button from './Button'
import { Credentials } from '../../entities/Credentials'

export type RegisterFormProps = {
    credentials: Credentials
    onChange?: (credentials: Credentials) => void
}

const RegisterForm = (props: RegisterFormProps) => {
    return (
        <div className="grid gap-4">
            <div className="ml-13 mr-13 grid gap-x-6 gap-y-2 sm:grid-cols-1 md:grid-cols-2">
                <div>
                    <Input
                        name="Name"
                        placeholder="Name"
                        value={props.credentials.name}
                        onChange={name => props.onChange?.({ ...props.credentials, name })}
                    />
                    <Input
                        name="Vorname"
                        placeholder="Vorname"
                        value={props.credentials.firstname}
                        onChange={firstname => props.onChange?.({ ...props.credentials, firstname })}
                    />
                    <Input
                        name="Mail"
                        placeholder="Mail"
                        value={props.credentials.email}
                        onChange={email => props.onChange?.({ ...props.credentials, email })}
                    />
                    <Input
                        name="Ort"
                        placeholder="Ort"
                        value={props.credentials.place}
                        onChange={place => props.onChange?.({ ...props.credentials, place })}
                    />
                    <Input
                        name="Strasse"
                        placeholder="Strasse"
                        value={props.credentials.street}
                        onChange={street => props.onChange?.({ ...props.credentials, street })}
                    />
                </div>
                <div>
                    <Input
                        name="Password"
                        placeholder="****************"
                        type="password"
                        value={props.credentials.password}
                        onChange={password => props.onChange?.({ ...props.credentials, password })}
                        //how to check if password is valid?
                    />
                    <Input
                        name="Password"
                        placeholder="****************"
                        type="password"
                        value={props.credentials.repeatPassword}
                        onChange={repeatPassword => props.onChange?.({ ...props.credentials, repeatPassword })}
                        //how to see if it's the same password?
                    />
                    <Input
                        name="Telefon"
                        placeholder="Telefon"
                        value={props.credentials.telephone}
                        onChange={telephone => props.onChange?.({ ...props.credentials, telephone })}
                    />
                    <Input
                        name="PLZ"
                        placeholder="PLZ"
                        value={props.credentials.zip}
                        onChange={zip => props.onChange?.({ ...props.credentials, zip })}
                    />
                </div>
            </div>
            <div className="ml-20 mr-20 grid gap-x-8 gap-y-3 grid-cols-2">
                <Button onClick={() => console.log('Cancel?!')}>Cancel</Button>
                <Button onClick={() => console.log('Register!')}>Register</Button>
            </div>
            name: {props.credentials.name} <br />
            vorname: {props.credentials.firstname} <br />
            mail: {props.credentials.email} <br />
            telefon: {props.credentials.telephone} <br />
            strasse: {props.credentials.street} <br />
            ort: {props.credentials.place} <br />
            plz: {props.credentials.zip} <br />
            password: {props.credentials.password} <br />
            repeatPassword: {props.credentials.repeatPassword}
        </div>
    )
}

export default RegisterForm

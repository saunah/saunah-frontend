import Input from './Input'
import Button from './Button'
import { User } from '../../entities/User'

export type RegisterFormProps = {
    user: User.Edit
    onChange?: (user: User.Edit) => void
}

const RegisterForm = (props: RegisterFormProps) => {
    return (
        <div className="grid gap-4">
            <div className="ml-13 mr-13 grid gap-x-6 gap-y-2 sm:grid-cols-1 md:grid-cols-2">
                <div>
                    <Input
                        name="Name"
                        placeholder="Name"
                        value={props.user.name}
                        onChange={name => props.onChange?.({ ...props.user, name })}
                    />
                    <Input
                        name="Vorname"
                        placeholder="Vorname"
                        value={props.user.firstname}
                        onChange={firstname => props.onChange?.({ ...props.user, firstname })}
                    />
                    <Input
                        name="Mail"
                        placeholder="Mail"
                        value={props.user.email}
                        onChange={email => props.onChange?.({ ...props.user, email })}
                    />
                    <Input
                        name="Ort"
                        placeholder="Ort"
                        value={props.user.place}
                        onChange={place => props.onChange?.({ ...props.user, place })}
                    />
                    <Input
                        name="Strasse"
                        placeholder="Strasse"
                        value={props.user.street}
                        onChange={street => props.onChange?.({ ...props.user, street })}
                    />
                </div>
                <div>
                    <Input
                        name="Password"
                        placeholder="****************"
                        type="password"
                        value={props.user.password}
                        onChange={password => props.onChange?.({ ...props.user, password })}
                        //how to check if password is valid?
                    />
                    <Input
                        name="Password"
                        placeholder="****************"
                        type="password"
                        value={props.user.repeatPassword}
                        onChange={repeatPassword => props.onChange?.({ ...props.user, repeatPassword })}
                        //how to see if it's the same password?
                    />
                    <Input
                        name="Telefon"
                        placeholder="Telefon"
                        value={props.user.telephone}
                        onChange={telephone => props.onChange?.({ ...props.user, telephone })}
                    />
                    <Input
                        name="PLZ"
                        placeholder="PLZ"
                        value={props.user.zip}
                        onChange={zip => props.onChange?.({ ...props.user, zip })}
                    />
                </div>
            </div>
            <div className="ml-20 mr-20 grid gap-x-8 gap-y-3 grid-cols-2">
                <Button onClick={() => console.log('Cancel?!')}>Cancel</Button>
                <Button onClick={() => console.log('Register!')}>Register</Button>
            </div>
            name: {props.user.name} <br />
            vorname: {props.user.firstname} <br />
            mail: {props.user.email} <br />
            telefon: {props.user.telephone} <br />
            strasse: {props.user.street} <br />
            ort: {props.user.place} <br />
            plz: {props.user.zip} <br />
            password: {props.user.password} <br />
            repeatPassword: {props.user.repeatPassword}
        </div>
    )
}

export default RegisterForm

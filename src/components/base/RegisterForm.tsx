import InputField from './Input'
import Button from './Button'
import { useState } from 'react'
import { Credentials } from '../../entities/Credentials'

export type InputFieldProps = {
    username?: string
    password?: string

    repeatPassword?: string
    name?: string
    firstname?: string
    email?: string
    telephone?: string
    street?: string
    place?: string
    zip?: string
}

const RegisterForm = (_props: InputFieldProps) => {
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
    const classes = 'ml-13 mr-13 grid gap-x-6 gap-y-2 sm:grid-cols-1 md:grid-cols-2'

    return (
        <div className="grid gap-4">
            <div className={classes}>
                <div>
                    <InputField
                        name="Name"
                        placeholder="Name"
                        value={credentials.name}
                        onChange={name => setCredentials({ ...credentials, name })}
                    />
                    <InputField
                        name="Vorname"
                        placeholder="Vorname"
                        value={credentials.firstname}
                        onChange={firstname => setCredentials({ ...credentials, firstname })}
                    />
                    <InputField
                        name="Mail"
                        placeholder="Mail"
                        value={credentials.email}
                        onChange={email => setCredentials({ ...credentials, email })}
                    />
                    <InputField
                        name="Ort"
                        placeholder="Ort"
                        value={credentials.place}
                        onChange={place => setCredentials({ ...credentials, place })}
                    />
                    <InputField
                        name="Strasse"
                        placeholder="Strasse"
                        value={credentials.street}
                        onChange={street => setCredentials({ ...credentials, street })}
                    />
                </div>
                <div>
                    <InputField
                        name="Password"
                        placeholder="****************"
                        type="password"
                        value={credentials.password}
                        onChange={password => setCredentials({ ...credentials, password })}
                        //how to check if password is valid?
                    />
                    <InputField
                        name="Password"
                        placeholder="****************"
                        type="password"
                        value={credentials.repeatPassword}
                        onChange={repeatPassword => setCredentials({ ...credentials, repeatPassword })}
                        //how to see if it's the same password?
                    />
                    <InputField
                        name="Telefon"
                        placeholder="Telefon"
                        value={credentials.telephone}
                        onChange={telephone => setCredentials({ ...credentials, telephone })}
                    />
                    <InputField
                        name="PLZ"
                        placeholder="PLZ"
                        value={credentials.zip}
                        onChange={zip => setCredentials({ ...credentials, zip })}
                    />
                </div>
            </div>
            <div className="ml-20 mr-20 grid gap-x-8 gap-y-3 grid-cols-2">
                <Button onClick={() => console.log('Cancel?!')}>Cancel</Button>
                <Button onClick={() => console.log('Register!')}>Register</Button>
            </div>
            name: {credentials.name} <br />
            vorname: {credentials.firstname} <br />
            mail: {credentials.email} <br />
            telefon: {credentials.telephone} <br />
            strasse: {credentials.street} <br />
            ort: {credentials.place} <br />
            plz: {credentials.zip} <br />
            password: {credentials.password} <br />
            repeatPassword: {credentials.repeatPassword}
        </div>
    )
}

export default RegisterForm

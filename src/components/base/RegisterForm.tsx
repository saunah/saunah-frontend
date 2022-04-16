import InputField from './Input'
import Button from './Button'
import { useState } from 'react'
import { Credentials } from '../../entities/Credentials'

export type InputFieldProps = {
    username?: string
    password?: string

    //use english or german?
    repeatPassword?: string
    name?: string
    vorname?: string
    mail?: string
    telefon?: string
    strasse?: string
    ort?: string
    plz?: string
}

const RegisterForm = (_props: InputFieldProps) => {
    const [credentials, setCredentials] = useState<Credentials>({
        username: '',
        name: '',
        vorname: '',
        mail: '',
        telefon: '',
        strasse: '',
        ort: '',
        plz: '',
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
                        value={credentials.vorname}
                        onChange={vorname => setCredentials({ ...credentials, vorname })}
                    />
                    <InputField
                        name="Mail"
                        placeholder="Mail"
                        value={credentials.mail}
                        onChange={mail => setCredentials({ ...credentials, mail })}
                    />
                    <InputField
                        name="Ort"
                        placeholder="Ort"
                        value={credentials.ort}
                        onChange={ort => setCredentials({ ...credentials, ort })}
                    />
                    <InputField
                        name="Strasse"
                        placeholder="Strasse"
                        value={credentials.strasse}
                        onChange={strasse => setCredentials({ ...credentials, strasse })}
                    />
                </div>
                <div>
                    <InputField
                        name="Password"
                        placeholder="****************"
                        type="password"
                        value={credentials.password}
                        onChange={password => setCredentials({ ...credentials, password })}
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
                        value={credentials.telefon}
                        onChange={telefon => setCredentials({ ...credentials, telefon })}
                    />
                    <InputField
                        name="PLZ"
                        placeholder="PLZ"
                        value={credentials.plz}
                        onChange={plz => setCredentials({ ...credentials, plz })}
                    />
                </div>
            </div>
            <div className="ml-20 mr-20 grid gap-x-8 gap-y-3 grid-cols-2">
                <Button onClick={() => console.log('Cancel?!')}>Cancel</Button>
                <Button onClick={() => console.log('Register!')}>Register</Button>
            </div>
            name: {credentials.name} <br />
            vorname: {credentials.vorname} <br />
            mail: {credentials.mail} <br />
            telefon: {credentials.telefon} <br />
            strasse: {credentials.strasse} <br />
            ort: {credentials.ort} <br />
            plz: {credentials.plz} <br />
            password: {credentials.password} <br />
            repeatPassword: {credentials.repeatPassword}
        </div>
    )
}

export default RegisterForm

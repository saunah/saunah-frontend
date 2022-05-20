import { User } from '../../entities/User'
import { UserRole } from '../../entities/UserRole'
import Button from '../base/Button'
import Input from '../base/Input'
import Select from '../base/Select'

export type UserEditorProps = {
    value: User.Request
    onChange?: (newValue: User.Request) => void
    onSubmit?: () => void
    onDelete?: () => void
    isCreate?: boolean
    showRole?: boolean
    showDelete?: boolean
    testId?: string
}

/**
 * Editor for user values. Can either be used to edit user
 * details or to register a new user.
 */
const UserEditor = (props: UserEditorProps) => {
    const user = props.value
    const isCreate = props.isCreate || false

    const onDelete = () => {
        const confirm = window.confirm('Möchten Sie den Benutzer wirklich unwiderruflich löschen?')
        if (confirm) props.onDelete?.()
    }

    return (
        <div data-testid={props.testId || 'user-editor'}>
            <div className="grid gap-x-4 gap-y-2 grid-cols-1 md:grid-cols-2">
                <Input
                    name="Vorname"
                    placeholder="Vorname"
                    data-testid="input-first-name"
                    autoComplete={isCreate ? 'given-name' : undefined}
                    value={user.firstName}
                    onChange={newValue => props.onChange?.({ ...user, firstName: newValue })}
                />
                <Input
                    name="Nachname"
                    placeholder="Nachname"
                    data-testid="input-last-name"
                    autoComplete={isCreate ? 'family-name' : undefined}
                    value={user.lastName}
                    onChange={newValue => props.onChange?.({ ...user, lastName: newValue })}
                />
                <Input
                    name="Email"
                    placeholder="Email"
                    data-testid="input-email"
                    autoComplete={isCreate ? 'email' : undefined}
                    value={user.email}
                    type="email"
                    onChange={newValue => props.onChange?.({ ...user, email: newValue })}
                />
                <Input
                    name="Telefonnummer"
                    placeholder="Telefonnummer"
                    data-testid="input-telephone"
                    autoComplete={isCreate ? 'email' : undefined}
                    value={user.telephone}
                    type="tel"
                    onChange={newValue => props.onChange?.({ ...user, telephone: newValue })}
                />
                {isCreate && (
                    <Input
                        name="Passwort"
                        placeholder="Passwort"
                        data-testid="input-password"
                        autoComplete="new-password"
                        value={user.password}
                        type="password"
                        onChange={password => props.onChange?.({ ...user, password })}
                        //how to check if password is valid?
                    />
                )}
                {isCreate && (
                    <Input
                        name="Passwort wiederholen"
                        placeholder="Passwort"
                        data-testid="input-repeat-password"
                        value={user.repeatPassword}
                        type="password"
                        onChange={repeatPassword => props.onChange?.({ ...user, repeatPassword })}
                        //how to see if it's the same password?
                    />
                )}
                <Input
                    name="Strasse"
                    placeholder="Strasse"
                    data-testid="input-street"
                    value={user.street}
                    autoComplete={isCreate ? 'street-address' : undefined}
                    onChange={newValue => props.onChange?.({ ...user, street: newValue })}
                />
                <Input
                    name="PLZ"
                    placeholder="PLZ"
                    data-testid="input-zip"
                    value={user.zip}
                    type="number"
                    autoComplete="postal-code"
                    onChange={newValue => props.onChange?.({ ...user, zip: newValue })}
                />
                <Input
                    name="Ort"
                    placeholder="Ort"
                    data-testid="input-place"
                    value={user.place}
                    autoComplete={isCreate ? 'country-name' : undefined}
                    onChange={newValue => props.onChange?.({ ...user, place: newValue })}
                />
                {!isCreate && props.showRole && (
                    <Select
                        name="Rolle"
                        values={[UserRole.Local.ADMIN, UserRole.Local.USER]}
                        selected={user.role}
                        data-testid="select-role"
                        onChange={newValue => props.onChange?.({ ...user, role: newValue })}
                    />
                )}
            </div>
            <div className="mt-6 flex space-x-4">
                <Button
                    title={isCreate ? 'Registrieren' : 'Speichern'}
                    data-testid="submit-button"
                    onClick={props.onSubmit}
                />
                {!isCreate && props.showDelete && (
                    <Button title="Löschen" data-testid="delete-button" onClick={onDelete} color="red" />
                )}
            </div>
        </div>
    )
}

export default UserEditor

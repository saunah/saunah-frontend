import { User } from '../../entities/User'
import { UserRole } from '../../entities/UserRole'
import Button from '../base/Button'
import Input from '../base/Input'
import Select from '../base/Select'

export type UserEditorProps = {
    value: User.Request
    onChange?: (newValue: User.Request) => void
    onSubmit?: () => void
    showDelete?: boolean
    onDelete?: () => void
}

const UserEditor = (props: UserEditorProps) => {
    const user = props.value

    const onDelete = () => {
        const confirm = window.confirm('Möchten Sie den Benutzer wirklich unwiderruflich löschen?')
        if (confirm) props.onDelete?.()
    }

    return (
        <div data-testid="user-editor">
            <div className="grid gap-x-4 gap-y-2 grid-cols-1 md:grid-cols-2">
                <Input
                    name="Vorname"
                    data-testid="input-first-name"
                    value={user.firstName}
                    onChange={newValue => props.onChange?.({ ...user, firstName: newValue })}
                />
                <Input
                    name="Nachname"
                    data-testid="input-last-name"
                    value={user.lastName}
                    onChange={newValue => props.onChange?.({ ...user, lastName: newValue })}
                />
                <Input
                    name="Email"
                    data-testid="input-email"
                    value={user.email}
                    type="email"
                    onChange={newValue => props.onChange?.({ ...user, email: newValue })}
                />
                <Input
                    name="Telefonnummer"
                    data-testid="input-telephone"
                    value={user.telephone}
                    type="tel"
                    onChange={newValue => props.onChange?.({ ...user, telephone: newValue })}
                />
                <Input
                    name="Strasse"
                    data-testid="input-street"
                    value={user.street}
                    onChange={newValue => props.onChange?.({ ...user, street: newValue })}
                />
                <Input
                    name="PLZ"
                    data-testid="input-zip"
                    value={user.zip}
                    type="number"
                    onChange={newValue => props.onChange?.({ ...user, zip: newValue })}
                />
                <Input
                    name="Ort"
                    data-testid="input-place"
                    value={user.place}
                    onChange={newValue => props.onChange?.({ ...user, place: newValue })}
                />
                <Select
                    name="Rolle"
                    values={[UserRole.Local.ADMIN, UserRole.Local.USER]}
                    selected={user.role}
                    onChange={newValue => props.onChange?.({ ...user, role: newValue })}
                />
            </div>
            <div className="mt-6 flex space-x-4">
                <Button title="Speichern" data-testid="submit-button" onClick={props.onSubmit} />
                {props.showDelete && (
                    <Button title="Löschen" data-testid="delete-button" onClick={onDelete} color="red" />
                )}
            </div>
        </div>
    )
}

export default UserEditor

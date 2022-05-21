import { NewPassword } from '../../entities/NewPassword'
import Button from '../base/Button'
import Input from '../base/Input'

export type NewPasswordFormProps = {
    value: NewPassword.Request
    onChange?: (request: NewPassword.Request) => void
    onSubmit?: () => void
}

const NewPasswordForm = (props: NewPasswordFormProps) => {
    return (
        <div data-testid="new-password-form">
            <div className="space-y-2">
                <Input
                    data-testid="input-new-password"
                    name="Neues Passwort"
                    placeholder="Neues Passwort"
                    type="password"
                    autoComplete="new-password"
                    value={props.value.newPassword}
                    onChange={newPassword => props.onChange?.({ ...props.value, newPassword })}
                />
            </div>
            <div className="flex justify-between">
                <Button className="mt-6" data-testid="button-submit" onClick={props.onSubmit}>
                    Speichern
                </Button>
            </div>
        </div>
    )
}

export default NewPasswordForm

import Button from './base/Button'
import Input from './base/Input'
import { SetNewPassword } from '../entities/SetNewPassword'

// eslint-disable-next-line
export type SetNewPassword = {
    request: SetNewPassword.Request
    onChange?: (request: SetNewPassword.Request) => void
    onSubmit?: () => void
}

const SetNewPasswordForm = (props: SetNewPassword) => {
    return (
        <div className="space-y-2">
            <div className="space-y-2">
                <Input
                    data-testid="mailaddress"
                    name="Mailadresse"
                    placeholder="Mailadresse eingeben"
                    autoComplete="mailaddress"
                    value={props.request.mailadress}
                    onChange={mailadress => props.onChange?.({ ...props.request, mailadress })}
                />
            </div>
            <div className="space-y-2">
                <Input
                    data-testid="set-new-pw-field"
                    name="Neues Passwort eingebe"
                    placeholder="neues passwort..."
                    autoComplete="password"
                    value={props.request.newPassword}
                    onChange={newPassword => props.onChange?.({ ...props.request, newPassword })}
                />
            </div>
            <div className="space-y-2">
                <Input
                    data-testid="confirm-new-pw-field"
                    name="Neues Passwort bestätigen"
                    placeholder="neues passwort..."
                    autoComplete="password"
                    value={props.request.newPassword}
                    onChange={newPassword => props.onChange?.({ ...props.request, newPassword })}
                />
            </div>
            <div className="flex justify-between">
                <Button className="mt-6" data-testid="send-button" onClick={props.onSubmit}>
                    Reset Passwort 
                </Button>
            </div>
        </div>
    )
}

export default SetNewPasswordForm
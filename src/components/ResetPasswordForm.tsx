import Button from './base/Button'
import Input from './base/Input'
import { LoginCredentials } from '../entities/LoginCredentials'

// eslint-disable-next-line
export type LoginCredentials = {
    user: LoginCredentials.PasswordResetRequest
    onChange?: (user: LoginCredentials.PasswordResetRequest) => void
    onSubmit?: () => void
}

const ResetPasswordForm = (props: LoginCredentials) => {
    return (
        <div>
            <div className="space-y-2">
                <Input
                    data-testid="mailaddress-input"
                    name="Mailadresse"
                    placeholder="Mailadresse eingeben"
                    autoComplete="mailaddress"
                    value={props.user.mailadress}
                    onChange={mailadress => props.onChange?.({ ...props.user, mailadress })}
                />
            </div>
            <div className="flex justify-between">
                <Button className="mt-6" data-testid="send-button" onClick={props.onSubmit}>
                    Reset Link Anfordern
                </Button>
            </div>
        </div>
    )
}

export default ResetPasswordForm
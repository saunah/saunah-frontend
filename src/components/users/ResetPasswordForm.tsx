import { ResetPassword } from '../../entities/ResetPassword'
import Button from '../base/Button'
import Input from '../base/Input'

export type ResetPasswordFormProps = {
    value: ResetPassword.Request
    onChange?: (newValue: ResetPassword.Request) => void
    onSubmit?: () => Promise<void>
}

const ResetPasswordForm = ({ value, onChange, onSubmit }: ResetPasswordFormProps) => {
    return (
        <div data-testid="reset-password-form">
            <div className="space-y-2">
                <Input
                    data-testid="input-email"
                    name="Email"
                    placeholder="Email"
                    autoComplete="email"
                    value={value.email}
                    onChange={email => onChange?.({ ...value, email })}
                />
            </div>
            <div className="flex justify-between">
                <Button className="mt-6" data-testid="button-submit" onClick={onSubmit}>
                    Link senden
                </Button>
            </div>
        </div>
    )
}

export default ResetPasswordForm

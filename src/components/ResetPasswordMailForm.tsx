import Button from './base/Button'
import Input from './base/Input'
import { PwResetMailRequest } from '../entities/PwResetMailRequest'

// eslint-disable-next-line
export type PwResetMailRequest = {
    request: PwResetMailRequest.Request
    onChange?: (request: PwResetMailRequest.Request) => void
    onSubmit?: () => void
}

const ResetPasswordMailForm = (props: PwResetMailRequest) => {
    return (
        <div>
            <div className="space-y-2">
                <Input
                    data-testid="mailaddress-input"
                    name="Mailadresse"
                    placeholder="Mailadresse eingeben"
                    autoComplete="mailaddress"
                    value={props.request.mailadress}
                    onChange={mailadress => props.onChange?.({ ...props.request, mailadress })}
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

export default ResetPasswordMailForm
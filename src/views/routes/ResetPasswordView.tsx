import { useState } from 'react'
import { useAlert } from '../shared/AlertProvider'
import { useNavigate } from 'react-router-dom'
import api from '../../networking/api'
import PageTitle from '../../components/base/PageTitle'
import { ResetPassword } from '../../entities/ResetPassword'
import ResetPasswordForm from '../../components/users/ResetPasswordForm'

const ResetPasswordView = () => {
    const { success } = useAlert()
    const navigate = useNavigate()
    const [request, setRequest] = useState<ResetPassword.Request>(ResetPassword.emptyRequest())

    const onSubmit = async () => {
        await api.user.resetPassword(request)
        success('Email wurde versendet')
        navigate('/')
    }

    return (
        <div data-testid={'reset-password-view'}>
            <PageTitle>Passwort vergessen</PageTitle>
            <p className="text-primary-500 mb-6">
                <span>
                    Geben Sie Ihre Email-Adresse an, um einen Link zum Zurücksetzen Ihres Passwortes zu erlhalten.
                </span>
            </p>
            <ResetPasswordForm value={request} onChange={setRequest} onSubmit={onSubmit} />
        </div>
    )
}

export default ResetPasswordView

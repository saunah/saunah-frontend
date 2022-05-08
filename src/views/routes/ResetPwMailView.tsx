import ResetPasswordMailForm from '../../components/ResetPasswordMailForm'
import { PwResetMailRequest } from '../../entities/PwResetMailRequest'
import { useState } from 'react'
import { useAlert } from '../shared/AlertProvider'
import { useNavigate } from 'react-router-dom'
import api from '../../networking/api'
import PageTitle from '../../components/base/PageTitle'

const ResetPwMailView = () => {
    const [email, setUser] = useState<PwResetMailRequest.Request>(PwResetMailRequest.empty())
    const { success } = useAlert()
    const navigate = useNavigate()

    const onSubmit = () => {
        api.user.passwordResetMail(email).then(() => {
            success('Reset Mail wurde gesendet')
            navigate('/')
        })
    }

    return (
        <div data-testid={'pw-reset-mail-form'}>
            <PageTitle> Passwort Reset Email Anfordern </PageTitle>
            <ResetPasswordMailForm request={email} onChange={setUser} onSubmit={onSubmit} />
        </div>
    )
}

export default ResetPwMailView

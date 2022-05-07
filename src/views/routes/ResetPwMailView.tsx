import ResetPasswordMailForm from '../../components/ResetPasswordMailForm'
import { PwResetMailRequest } from '../../entities/PwResetMailRequest'
import { useState } from 'react'
import { useAuth } from '../shared/AuthProvider'
import { useAlert } from '../shared/AlertProvider'
import { useNavigate } from 'react-router-dom'
import PageTitle from '../../components/base/PageTitle'

const ResetPwMailView = () => {
    const [email, setUser] = useState<PwResetMailRequest.Request>(PwResetMailRequest.empty())
    const { login } = useAuth()
    const { success } = useAlert()
    const navigate = useNavigate()

    const onSubmit = () => {
        passwordResetMail(email).then(() => {
            success('Reset Mail wurde gesendet')
            navigate('/')
        })
    }

    return (
        <div data-testid={'loginform'}>
            <PageTitle> Login </PageTitle>
            <ResetPasswordMailForm request={email} onChange={setUser} onSubmit={onSubmit} />
        </div>
    )
}

export default ResetPwMailView

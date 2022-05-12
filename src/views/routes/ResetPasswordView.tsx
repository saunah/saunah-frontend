import SetNewPaswordForm from '../../components/SetNewPasswordForm'
import { SetNewPassword } from '../../entities/SetNewPassword'
import { useState } from 'react'
import { useAlert } from '../shared/AlertProvider'
import { useNavigate } from 'react-router-dom'
import api from '../../networking/api'
import PageTitle from '../../components/base/PageTitle'

const ResetPasswordView = () => {
    const [newPw, setUser] = useState<SetNewPassword.Request>(SetNewPassword.empty())
    const { success } = useAlert()
    const navigate = useNavigate()

    const onSubmit = () => {
        api.user.setNewPassword(newPw).then(() => {
            success('Passwort neu gesetzt')
            navigate('/')
        })
    }

    return (
        <div data-testid={'pw-reset-mail-form'}>
            <PageTitle> Passwort neu setzen </PageTitle>
            <SetNewPaswordForm request={newPw} onChange={setUser} onSubmit={onSubmit} />
        </div>
    )
}

export default ResetPasswordView
import SetNewPaswordForm from '../../components/SetNewPasswordForm'
import { SetNewPassword } from '../../entities/SetNewPassword'
import {useParams, useNavigate} from "react-router-dom"
import { useState } from 'react'
import { useAlert } from '../shared/AlertProvider'
import api from '../../networking/api'
import PageTitle from '../../components/base/PageTitle'

const ResetPasswordView = () => {
    const params = useParams()
    const token = params['token']
    const [newPw, setUser] = useState<SetNewPassword.Request>(SetNewPassword.empty())
    const { success } = useAlert()
    const navigate = useNavigate()

    const onSubmit = () => {
        newPw.resetToken = token || ""
        api.user.setNewPassword(newPw).then(() => {
            success('Passwort neu gesetzt')
            navigate('/')
        })
    }

    return (
        <div className="space-y-5" data-testid={'pw-reset-mail-form'}>
            <PageTitle> Passwort Reset </PageTitle>
            <SetNewPaswordForm request={newPw} onChange={setUser} onSubmit={onSubmit} />
        </div>
    )
}

export default ResetPasswordView
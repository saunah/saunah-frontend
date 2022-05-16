import SetNewPaswordForm from '../../components/SetNewPasswordForm'
import { SetNewPassword } from '../../entities/SetNewPassword'
import {useParams} from "react-router-dom"
import { useState } from 'react'
import { useAlert } from '../shared/AlertProvider'
import { useNavigate } from 'react-router-dom'
import api from '../../networking/api'
import PageTitle from '../../components/base/PageTitle'

const ResetPasswordView = () => {
    const {params} = useParams();
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
        <div className="space-y-5" data-testid={'pw-reset-mail-form'}>
            <h1>Dein Token :{JSON.stringify(params)} </h1>
            <PageTitle> Passwort neu setzen </PageTitle>
            <SetNewPaswordForm request={newPw} onChange={setUser} onSubmit={onSubmit} />
        </div>
    )
}

export default ResetPasswordView
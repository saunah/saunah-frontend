import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAlert } from '../shared/AlertProvider'
import api from '../../networking/api'
import PageTitle from '../../components/base/PageTitle'
import { NewPassword } from '../../entities/NewPassword'
import NewPasswordForm from '../../components/users/NewPasswordForm'

const NewPasswordView = () => {
    const params = useParams()
    const token = params['token'] || ''
    const [request, setRequest] = useState<NewPassword.Request>(NewPassword.emptyRequest())
    const { success } = useAlert()
    const navigate = useNavigate()

    const onSubmit = async () => {
        await api.user.newPassword(token, request).then(() => {
            success('Neues Passwort gesetzt.')
            navigate('/login')
        })
    }

    return (
        <div data-testid={'new-password-view'}>
            <PageTitle>Neues Passwort setzen</PageTitle>
            <p className="text-primary-500 mb-6">
                <span>Geben Sie Ihr neues Passwort im untenstehenden Textfeld und speichern Sie die Eingabe.</span>
            </p>
            <NewPasswordForm value={request} onChange={setRequest} onSubmit={onSubmit} />
        </div>
    )
}

export default NewPasswordView

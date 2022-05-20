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

    const onSubmit = () => {
        api.user.newPassword(token, request).then(() => {
            success('Neues Passwort gesetzt.')
            navigate('/')
        })
    }

    return (
        <div data-testid={'new-password-view'}>
            <PageTitle>Neues Passwort setzen</PageTitle>
            <NewPasswordForm value={request} onChange={setRequest} onSubmit={onSubmit} />
        </div>
    )
}

export default NewPasswordView

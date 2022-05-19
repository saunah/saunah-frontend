import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTitle from '../../../components/base/PageTitle'
import UserEditor from '../../../components/users/UserEditor'
import { User } from '../../../entities/User'
import api from '../../../networking/api'
import { useAlert } from '../../shared/AlertProvider'
import { useAuth } from '../../shared/AuthProvider'

/**
 * View to show profile of active user
 */
export default function ProfileView() {
    const { me, fetchMe } = useAuth()
    const navigate = useNavigate()

    const [user, setUser] = useState<User.Request>(User.emptyRequest())

    useEffect(() => {
        if (me) setUser(User.mapToRequest(me))
    }, [me])

    const { success } = useAlert()
    const submit = async () => {
        if (me)
            await api.user.edit(me.id, user).then(() => {
                fetchMe()
                success('Ihr Profil wurde aktualisiert.')
                navigate('/')
            })
    }

    return (
        <div data-testid="sauna-editor-view">
            <PageTitle>Profil bearbeiten</PageTitle>
            <UserEditor value={user} onChange={setUser} onSubmit={submit} showRole={false} showDelete={false} />
        </div>
    )
}

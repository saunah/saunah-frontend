import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageTitle from '../../../components/base/PageTitle'
import UserEditor from '../../../components/users/UserEditor'
import { User } from '../../../entities/User'
import api from '../../../networking/api'
import { parseId } from '../../../utils/identifiable'
import { useAlert } from '../../shared/AlertProvider'

/**
 * View to fetch a user and edit it's details.
 */
function UserEditorView() {
    const params = useParams()
    const userId = parseId(params['userId'])
    const navigate = useNavigate()

    const [user, setUser] = useState<User.Request>(User.emptyRequest())

    useEffect(() => {
        let loaded = true
        if (userId) {
            api.user.get(userId).then(response => loaded && setUser(User.mapToRequest(response)))
        }
        return () => {
            loaded = false
        }
    }, [userId])

    const { success } = useAlert()
    const submit = async () => {
        if (userId)
            await api.user.edit(userId, user).then(() => {
                success('Der Benutzer wurde erfolgreich gespeichert.')
                navigate(`/users`)
            })
    }

    const deleteUser = async () => {
        if (userId)
            await api.user.remove(userId).then(() => {
                success('Der Benutzer wurde gelöscht.')
                navigate('/users')
            })
    }

    return (
        <div data-testid="sauna-editor-view">
            <PageTitle>Benutzer bearbeiten</PageTitle>
            <UserEditor
                value={user}
                onChange={setUser}
                onSubmit={submit}
                showRole={true}
                showDelete={true}
                onDelete={deleteUser}
            />
        </div>
    )
}

export default UserEditorView

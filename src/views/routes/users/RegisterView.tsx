import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import PageTitle from '../../../components/base/PageTitle'
import UserEditor from '../../../components/users/UserEditor'
import { AlertDuration } from '../../../entities/Alert'
import { User } from '../../../entities/User'
import api from '../../../networking/api'
import { useAlert } from '../../shared/AlertProvider'

const RegisterView = () => {
    const [user, setUser] = useState<User.Request>(User.emptyRequest())
    const { success } = useAlert()
    const navigate = useNavigate()
    const [queryParams] = useSearchParams()
    const redirect = queryParams.get('redirect')

    const getLoginRoute = () => {
        return redirect ? `/login?redirect=${encodeURIComponent(redirect)}` : '/login'
    }

    const signupUser = () => {
        api.user.signup(user).then(() => {
            success('Aktivierungs-Email wurde verschickt. Konsultieren Sie ihr Postfach.', AlertDuration.LONG)
            navigate(getLoginRoute())
        })
    }

    return (
        <div>
            <PageTitle>Registrieren</PageTitle>
            <p className="text-primary-500 mb-6">
                <span>Registrieren Sie ein neues Konto. Sie haben schon ein Konto?</span>
                <Link className="font-medium" to={getLoginRoute()}>
                    {' '}
                    Jetzt einloggen
                </Link>
            </p>
            <UserEditor testId="registerform" value={user} isCreate={true} onChange={setUser} onSubmit={signupUser} />
        </div>
    )
}

export default RegisterView

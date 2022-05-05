import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AlertDuration } from '../../entities/Alert'
import api from '../../networking/api'
import { useAlert } from '../shared/AlertProvider'

const ActivationView = () => {
    const params = useParams()
    const token = params['token']
    const navigate = useNavigate()
    const { error, success } = useAlert()

    useEffect(() => {
        if (token)
            api.user
                .verify(token)
                .then(() => {
                    success('Der Account wurde erfolgreich aktiviert.')
                    navigate('/login')
                })
                .catch(() => {
                    error('Der Account konnte nicht aktiviert werden.', AlertDuration.LONG)
                    navigate('/login')
                })
    }, [])

    return <div />
}

export default ActivationView

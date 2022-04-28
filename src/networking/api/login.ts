import { DeepReadonly } from '../../utils/object'
import { LoginCredentials } from '../../entities/LoginCredentials'
import axios from 'axios'
import apiRoutes from '../apiRoutes'

export type LoginAPI = DeepReadonly<{
    login(credentials: LoginCredentials.Edit): Promise<void>
}>

const user: LoginAPI = {
    async login(credentials: LoginCredentials.Edit): Promise<void> {
        const requestData = LoginCredentials.mapOut(credentials)
        await axios.post(apiRoutes.user.login, requestData)
    },
}

export default user

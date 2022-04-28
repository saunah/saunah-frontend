import { DeepReadonly } from '../../utils/object'
import { User } from '../../entities/User'
import axios from 'axios'
import apiRoutes from '../apiRoutes'
import { LoginCredentials } from '../../entities/LoginCredentials'

export type UserAPI = DeepReadonly<{
    signup(user: User.Edit): Promise<void>
    login(credentials: LoginCredentials.Edit): Promise<void>
}>

const user: UserAPI = {
    async signup(user: User.Edit): Promise<void> {
        const requestData = User.mapOut(user)
        await axios.post(apiRoutes.user.signup, requestData)
    },
    async login(credentials: LoginCredentials.Edit): Promise<void> {
        const requestData = LoginCredentials.mapOut(credentials)
        await axios.post(apiRoutes.user.login, requestData)
    },

}

export default user

import { DeepReadonly } from '../../utils/object'
import { User } from '../../entities/User'
import axios from 'axios'
import apiRoutes from '../apiRoutes'
import { LoginCredentials } from '../../entities/LoginCredentials'

export type UserAPI = DeepReadonly<{
    signup(user: User.Request): Promise<void>
    login(credentials: LoginCredentials.Request): Promise<void>
}>

const user: UserAPI = {
    async signup(newUser: User.Request): Promise<void> {
        const requestData = User.mapOut(newUser)
        await axios.post(apiRoutes.user.signup, requestData)
    },
    async login(credentials: LoginCredentials.Request): Promise<void> {
        const requestData = LoginCredentials.mapOut(credentials)
        await axios.post(apiRoutes.user.login, requestData)
    },
}

export default user
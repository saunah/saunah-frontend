import { DeepReadonly } from '../../utils/object'
import { User } from '../../entities/User'
import axios from 'axios'
import apiRoutes from '../apiRoutes'
import { LoginCredentials } from '../../entities/LoginCredentials'
import { Token } from '../../entities/Token'

export type UserAPI = DeepReadonly<{
    signup(user: User.Edit): Promise<void>
    login(credentials: LoginCredentials.Request): Promise<Token.Response>
}>

const user: UserAPI = {
    async signup(user: User.Edit): Promise<void> {
        const requestData = User.mapOut(user)
        await axios.post(apiRoutes.user.signup, requestData)
    },
    async login(credentials: LoginCredentials.Request): Promise<Token.Response> {
        const requestData = LoginCredentials.mapOut(credentials)
        const response = await axios.post(apiRoutes.user.login, requestData)
        return Token.mapIn(response.data)
    },
}

export default user

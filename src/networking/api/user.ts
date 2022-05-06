import { DeepReadonly } from '../../utils/object'
import { User } from '../../entities/User'
import axios from 'axios'
import apiRoutes from '../apiRoutes'
import { LoginCredentials } from '../../entities/LoginCredentials'
import { Token } from '../../entities/Token'

export type UserAPI = DeepReadonly<{
    signup(user: User.Request): Promise<void>
    login(credentials: LoginCredentials.Request): Promise<Token.Response>
    passwordReset(credentials:LoginCredentials.PasswordResetRequest): Promise<void>
}>

const user: UserAPI = {
    async signup(newUser: User.Request): Promise<void> {
        const requestData = User.mapOut(newUser)
        await axios.post(apiRoutes.user.signup, requestData)
    },
    async login(credentials: LoginCredentials.Request): Promise<Token.Response> {
        const requestData = LoginCredentials.mapOut(credentials)
        const response = await axios.post(apiRoutes.user.login, requestData)
        return Token.mapIn(response.data)
    },
    async passwordReset(credentials: LoginCredentials.PasswordResetRequest): Promise<void> {
        const requestData = LoginCredentials.mapOutPasswordReset(credentials)
        await axios.post(apiRoutes.user.resetPassword, requestData)
    },
}

export default user

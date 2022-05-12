import { DeepReadonly } from '../../utils/object'
import { User } from '../../entities/User'
import axios from 'axios'
import apiRoutes from '../apiRoutes'
import { LoginCredentials } from '../../entities/LoginCredentials'
import { PwResetMailRequest } from '../../entities/PwResetMailRequest'
import { Token } from '../../entities/Token'
import { SetNewPassword } from '../../entities/SetNewPassword'

export type UserAPI = DeepReadonly<{
    signup(user: User.Request): Promise<void>
    login(credentials: LoginCredentials.Request): Promise<Token.Response>
    passwordResetMail(credentials : PwResetMailRequest.Request): Promise<void>
    setNewPassword(credentials : SetNewPassword.Request):Promise<void>
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
    async passwordResetMail(credentials: PwResetMailRequest.Request): Promise<void> {
        const requestData = PwResetMailRequest.mapOut(credentials)
        await axios.post(apiRoutes.user.resetPasswordRequest, requestData)
    },
    async setNewPassword(credentials: SetNewPassword.Request): Promise<void> {
        const requestData = SetNewPassword.mapOut(credentials)
        await axios.post(apiRoutes.user.setNewPassword, requestData)
    },
}

export default user

import { DeepReadonly } from '../../utils/object'
import { User } from '../../entities/User'
import axios from 'axios'
import apiRoutes from '../apiRoutes'
import { LoginCredentials } from '../../entities/LoginCredentials'
import { Token } from '../../entities/Token'
import { mapInArray } from '../../utils/mapping'
import { ResetPassword } from '../../entities/ResetPassword'
import { NewPassword } from '../../entities/NewPassword'

export type UserAPI = DeepReadonly<{
    signup(user: User.Request): Promise<void>
    login(credentials: LoginCredentials.Request): Promise<Token.Response>
    verify(token: string): Promise<void>
    list(): Promise<User.Response[]>
    get(userId: number): Promise<User.Response>
    edit(userId: number, user: User.Request): Promise<User.Response>
    remove(userId: number): Promise<void>
    whoami(): Promise<User.Response>
    resetPassword(credentials: ResetPassword.Request): Promise<void>
    newPassword(token: string, credentials: NewPassword.Request): Promise<void>
}>

const UserApi: UserAPI = {
    async signup(newUser: User.Request): Promise<void> {
        const requestData = User.mapOut(newUser)
        await axios.post(apiRoutes.user.signup, requestData)
    },
    async login(credentials: LoginCredentials.Request): Promise<Token.Response> {
        const requestData = LoginCredentials.mapOut(credentials)
        const response = await axios.post(apiRoutes.user.login, requestData)
        return Token.mapIn(response.data)
    },
    async verify(token: string): Promise<void> {
        await axios.get(apiRoutes.user.verify(token))
    },
    async list(): Promise<User.Response[]> {
        const response = await axios.get(apiRoutes.user.list)
        return mapInArray(response.data, User.mapIn)
    },
    async get(userId: number): Promise<User.Response> {
        const response = await axios.get(apiRoutes.user.get(userId))
        return User.mapIn(response.data)
    },
    async edit(userId: number, user: User.Request): Promise<User.Response> {
        const remoteRequest = User.mapOut(user)
        const response = await axios.put(apiRoutes.user.edit(userId), remoteRequest)
        return User.mapIn(response.data)
    },
    async remove(userId: number): Promise<void> {
        await axios.delete(apiRoutes.user.remove(userId))
    },
    async whoami(): Promise<User.Response> {
        const response = await axios.get(apiRoutes.user.whoami)
        return User.mapIn(response.data)
    },
    async resetPassword(credentials: ResetPassword.Request): Promise<void> {
        const requestData = ResetPassword.mapOut(credentials)
        await axios.post(apiRoutes.user.resetPasswordRequest, requestData)
    },
    async newPassword(token: string, credentials: NewPassword.Request): Promise<void> {
        const requestData = NewPassword.mapOut(credentials)
        await axios.put(apiRoutes.user.resetPasswordSubmit(token), requestData)
    },
}

export default UserApi

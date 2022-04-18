import { DeepReadonly } from '../../utils/object'
import { User } from '../../entities/User'
import axios from 'axios'
import apiRoutes from '../apiRoutes'

export type UserAPI = DeepReadonly<{
    signup(user: User.Edit): Promise<void>
}>

const user: UserAPI = {
    async signup(user: User.Edit): Promise<void> {
        const requestData = User.mapOut(user)
        await axios.post(apiRoutes.user.signup, requestData)
    },
}

export default user

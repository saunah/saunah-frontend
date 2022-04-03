import greeting from './api/greeting'
import { readonly } from '../utils/object'

const api = {
    greeting,
}

export default readonly(api)

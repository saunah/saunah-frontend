import greeting from './requests/greeting'
import { readonly } from '../utils/object'

const api = {
    greeting,
}

export default readonly(api)

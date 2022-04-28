import Cookies from 'js-cookie'
import moment from 'moment'
import { readonly } from '../utils/object'

export type CookieKeys = 'saunah-token'

const DEFAULT_CONFIG: Cookies.CookieAttributes = {
    expires: moment().add(30, 'days').toDate(),
    secure: true,
    sameSite: 'strict',
}

const cookieStore = {
    /**
     * If a cookie with the given key is set in the cookieStore.
     * @param key the key to check
     * @returns true, if the cookie is set
     */
    isSet: (key: CookieKeys) => Cookies.get(key) != null,
    /**
     * Returns the value of the cookie with the given key.
     * @param key the key of the desired cookie.
     * @returns the value of the cookie or null, if it does not exist
     */
    get: (key: CookieKeys) => Cookies.get(key) || null,
    /**
     * Sets a cookie in the cookieStore.
     * @param key the key of the cookie
     * @param value the value of the cookie
     * @param config additional config parameters
     */
    set: (key: CookieKeys, value: string, config: Cookies.CookieAttributes = DEFAULT_CONFIG) => {
        Cookies.set(key, value, config)
    },
    /**
     * Removes the cookie with the given key from the cookieStore.
     * @param key the key of the cookie.
     */
    remove: (key: CookieKeys) => Cookies.remove(key),
}

export default readonly(cookieStore)

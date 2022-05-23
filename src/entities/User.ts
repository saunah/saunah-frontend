import { UserRole } from './UserRole'

/**
 * Namespace representing a user in its different forms.
 */
export namespace User {
    type Base = {
        firstName: string
        lastName: string
        email: string
        telephone: string
        street: string
        place: string
        zip: string
        role: UserRole.Local
    }

    type RemoteBase = {
        firstName: string
        lastName: string
        email: string
        phoneNumber: string
        street: string
        place: string
        zip: string
    }

    /**
     * Local entity representing a user, in the form to
     * be edited.
     */
    export type Request = {
        password: string
    } & Base

    /**
     * User entity in the format expected by the API.
     */
    export type RemoteRequest = {
        password: string
        role: string
    } & RemoteBase

    /**
     * User entity to be used locally, has been mapped into this
     * type from the type received by the API.
     */
    export type Response = {
        id: number
        role: UserRole.Local
    } & Base

    /**
     * User entity in the form as it's received from the API, without
     * mapping it in to the local type.
     */
    export type RemoteResponse = {
        id: number
        role: string
    } & RemoteBase

    /**
     * Checks if given object is of type User.RemoteResponse
     * @param object The object to check
     * @returns true, if the object is of type User.RemoteResponse
     */
    export function isRemoteResponse(object: unknown): object is RemoteResponse {
        const user = object as RemoteResponse
        return (
            user != null &&
            typeof user.id === 'number' &&
            typeof user.role === 'string' &&
            typeof user.firstName === 'string' &&
            typeof user.lastName === 'string' &&
            typeof user.email === 'string' &&
            typeof user.phoneNumber === 'string' &&
            typeof user.street === 'string' &&
            typeof user.place === 'string' &&
            typeof user.zip === 'string'
        )
    }

    /**
     * Creates an empty User.Request object
     * @returns the empty request
     */
    export function emptyRequest(): Request {
        return {
            role: UserRole.Local.USER,
            firstName: '',
            lastName: '',
            email: '',
            telephone: '',
            street: '',
            place: '',
            zip: '',
            password: '',
        }
    }

    /**
     * Maps in an unknown object (which should be of type User.RemoteResponse)
     * to User.Response.
     * Mapping will throw an error if the user passed is not of type User.RemoteResponse.
     * @param user the user to be mapped in.
     * @returns the mapped in User.Response
     */
    export function mapIn(user: unknown): Response {
        if (!isRemoteResponse(user)) {
            throw new Error('Object could not be mapped in. It is not of type User.RemoteResponse')
        }

        if (!UserRole.isRemote(user.role)) {
            throw new Error(`User role could not be mapped in. Invalid value ${user.role} given.`)
        }

        return {
            id: user.id,
            role: UserRole.mapIn(user.role),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            telephone: user.phoneNumber,
            street: user.street,
            place: user.place,
            zip: user.zip,
        }
    }

    /**
     * Maps an object of type User.Response to User.Request
     * @param user the user of type User.Response
     * @returns the user of type User.Request, with empty password
     */
    export function mapToRequest(user: Response): Request {
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            telephone: user.telephone,
            street: user.street,
            place: user.place,
            zip: user.zip,
            role: user.role,
            password: '',
        }
    }

    /**
     * Maps out object of type User.Request to User.RemoteRequest
     * @param user the object to map out
     * @returns the mapped out User.Request
     */
    export function mapOut(user: Request): RemoteRequest {
        return {
            role: UserRole.mapOut(user.role),
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            email: user.email,
            phoneNumber: user.telephone,
            street: user.street,
            place: user.place,
            zip: user.zip,
        }
    }
}

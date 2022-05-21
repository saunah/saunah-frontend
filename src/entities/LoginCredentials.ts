export namespace LoginCredentials {
    export type Request = {
        username: string
        password: string
    }

    export type RemoteRequest = {
        email: string
        password: string
    }

    export function empty(): Request {
        return {
            username: '',
            password: '',
        }
    }

    export function mapOut(credentials: Request): RemoteRequest {
        return {
            email: credentials.username,
            password: credentials.password,
        }
    }
}
